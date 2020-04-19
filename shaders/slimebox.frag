#version 460

uniform float runtime[2];
float iTime=runtime[0];
float detail=10000;
out vec3 color;

// vec3 translate(vec3 p, vec3 v)
// {
//       return p+v;
// }

// vec3 scale(vec3 p, vec3 s)
// {
//       return p*s;
// }

// float softmin(float f1, float f2, float val)
// {
//       float e = max(val - abs(f1 - f2), 0.0);
//       return min(f1, f2) - e*e*0.25 / val;     
// }


vec3 rotate(vec3 p,vec3 t)
{
      float cx = cos(t.x);
      float sx = sin(t.x);
      float cy = cos(t.y);
      float sy = sin(t.y);
      float cz = cos(t.z);
      float sz = sin(t.z);
      mat3 m=mat3(
        vec3(1, 0, 0),
        vec3(0, cx, -sx),
        vec3(0, sx, cx));

      m*=mat3(
        vec3(cy, 0, sy),
        vec3(0, 1, 0),
        vec3(-sy, 0, cy));

      return m*mat3(
        vec3(cz, -sz, 0),
        vec3(sz, cz, 0),
        vec3(0, 0, 1))*p;
}

//SDF-Functions
float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

// float sdSphere(vec3 p, float r)
// {
//       return(length(p)-r);
// }

// float sdTorus( vec3 p, vec2 t )
// {
//   vec2 q = vec2(length(p.xz)-t.x,p.y);
//   return length(q)-t.y;
// }

// float sdRoundedCylinder( vec3 p, float ra, float rb, float h )
// {
//   vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
//   return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;
// }

// float sdOctahedron(vec3 p, float s)
// {
//   p = abs(p);
//   float m = p.x+p.y+p.z-s;
//   vec3 q;
//        if( 3.0*p.x < m ) q = p.xyz;
//   else if( 3.0*p.y < m ) q = p.yzx;
//   else if( 3.0*p.z < m ) q = p.zxy;
//   else return m*0.57735027;
    
//   float k = clamp(0.5*(q.z-q.y+s),0.0,s); 
//   return length(vec3(q.x,q.y-s+k,q.z-k)); 
// }

float cross(vec3 p, vec2 s)
{
      return min(min(sdRoundBox(p,s.xyy,.0),sdRoundBox(p,s.yxy,.0)),sdRoundBox(p,s.yyx,.0));
      // return min(final,sdRoundBox(p,s.yyx,.0));
}

// float sdGyroid(vec3 p, float scale)
// {
//     p*=scale;
//     return dot(sin(p+iTime),cos(p.zxy+iTime))/scale;
// }



float map(vec3 p)
{
      float ground=sdRoundBox(rotate(p+vec3(0,2.5,0),vec3(1.,0.,0.)),vec3(40,16,.1),.0);
      p=rotate(p,vec3(iTime*.5,iTime*.5,.5));
      float final=cross(p,vec2(4.5,.98));
      float box=sdRoundBox(p,vec3(1.),.25);
      final=max(box,-final);
      final=min(final,sdRoundBox(p,vec3(0),.3));
      final=mix(box,final,sin(iTime*2)*.5+.5);
      return min(final,ground);
}

vec3 normal(vec3 p)
{
      vec2 eps=vec2(1./detail,0);
      return normalize(vec3(map(p+eps.xyy)-map(p-eps.xyy),
                            map(p+eps.yxy)-map(p-eps.yxy),
                            map(p+eps.yyx)-map(p-eps.yyx)));
}

// LIGHT
float diffuse_directional(vec3 n,vec3 l, float strength)
{
      return (dot(n,normalize(l))*.5+.5)*strength;
}

float specular_directional(vec3 n, vec3 l, vec3 v, float strength)
{
      vec3 r=reflect(normalize(l),n);
      return pow(max(dot(v,r),0),128)*strength;
}

float ambient_omni(vec3 p, vec3 l)
{
      float d=1-abs(length(p-l))/100.;
      return pow(d,32.)*1.5;
}



//SHADOW
float softshadow(vec3 ro, vec3 rd, float mint, float maxt, float k)
{
    float res = 1.0;
    float ph = 1e20;
    for( float t=mint; t<maxt; )
    {
        float h = map(ro + rd*t);
        if( h<1./detail )
            return 0;
        float y = h*h/(2.0*ph);
        float d = sqrt(h*h-y*y);
        res = min( res, k*d/max(0.0,t-y) );
        ph = h;
        t += h;
    }
    return res;
}


// MAINLOOP
void main()
{
      vec2 uv=gl_FragCoord.xy/vec2(runtime[1])-vec2(.5,.25);

      vec3 ro=vec3(uv*5,-10.); 
      vec3 p=ro;
      vec3 rd=normalize(vec3(uv,1.));
      bool hit=false;
      float t;
      
      for(int i=0;i<500&&t<30.;i++)
      {
            t=length(ro-p);
            float d=map(p);
            if(d<1./detail)
            {
                  hit=true;
                  break;
            }
            p += rd*d;
      }
      
      
      vec3 n=normal(p);
      if (hit)
      {
            vec3 lightColor;
            vec3 l1=vec3(.1,.25,-.2);
            vec3 l2=vec3(-.1,.15,-.25);
            vec3 l3=vec3(-1,.5,.25);
            lightColor+=vec3(ambient_omni(p,l1)*diffuse_directional(n,l1,.75)+specular_directional(n,l1,rd,.45));
            lightColor+=ambient_omni(p,l2)*diffuse_directional(n,l2,.525)+specular_directional(n,l2,rd,.35);
            lightColor+=ambient_omni(p,l3)*diffuse_directional(n,l3,.225)+specular_directional(n,l3,rd,.725);
            color=lightColor*vec3(.1,.5,.1);
            vec3 pos = ro + t*rd;
            color=mix(vec3(.0),color,softshadow(pos,normalize(l1),.01,length(t*rd),100.)*.25+.75);
      }
      color*=mix(color,vec3(1.,1.,1.),1-exp(-.1*pow(t,256.)));
      color-=t*.0125;
}