uniform float runtime[3];
float iTime=runtime[0];
float aspect=runtime[2]/runtime[1];




// mat3 rotateX(float theta) 
// {
//     float c = cos(theta);
//     float s = sin(theta);
//     return mat3(
//         vec3(1, 0, 0),
//         vec3(0, c, -s),
//         vec3(0, s, c)
//     );
// }


// mat3 rotateY(float theta) 
// {
//     float c = cos(theta);
//     float s = sin(theta);
//     return mat3(
//         vec3(c, 0, s),
//         vec3(0, 1, 0),
//         vec3(-s, 0, c)
//     );
// }

// mat3 rotateZ(float theta) {
//     float c = cos(theta);
//     float s = sin(theta);
//     return mat3(
//         vec3(c, -s, 0),
//         vec3(s, c, 0),
//         vec3(0, 0, 1)
//     );
// }




mat3 rotateXYZ(vec3 theta)
{
      float cx = cos(theta.x);
      float sx = sin(theta.x);
      float cy = cos(theta.y);
      float sy = sin(theta.y);
      float cz = cos(theta.z);
      float sz = sin(theta.z);
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
        vec3(0, 0, 1));
}

float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

float sphere(vec3 position, float radius)
{
      return(length(position)-radius);
}

float sdTorus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float sdRoundedCylinder( vec3 p, float ra, float rb, float h )
{
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;
}

float sdOctahedron( vec3 p, float s)
{
  p = abs(p);
  float m = p.x+p.y+p.z-s;
  vec3 q;
       if( 3.0*p.x < m ) q = p.xyz;
  else if( 3.0*p.y < m ) q = p.yzx;
  else if( 3.0*p.z < m ) q = p.zxy;
  else return m*0.57735027;
    
  float k = clamp(0.5*(q.z-q.y+s),0.0,s); 
  return length(vec3(q.x,q.y-s+k,q.z-k)); 
}


//SDF
float map(vec3 p)
{
      vec3 origin=p;
      // p=mod(p,2.)-1.;
      p=rotateXYZ(vec3(1,0,0))*p;

      p.z-=1.5;
      float myplane=sdRoundBox(p,vec3(4,4,.01),.1);
      p=rotateXYZ(vec3(1,iTime,sin(iTime*.5)*.5))*origin;
      float mytorus=sdTorus(p,vec2(.7,.25));
      float mycube=sdRoundBox(mod(p,.5)-.25,vec3(.5),.05);
      
      float mysphere=sphere(p,.50);
      float mypill=sdRoundedCylinder(p,.5,.5,.01);
      float myoct=sdOctahedron(p,1.);
      // float final=max(myoct,-mycube);
      // return min(myplane,final);

      float final= mix(mysphere,mycube,abs(sin(iTime*.5))*.5);
      return(min(final,myplane));
}
vec3 normal(vec3 p)
{
      vec2 eps=vec2(.005,0);
      return normalize(vec3(  map(p+eps.xyy)-map(p-eps.xyy),
                              map(p+eps.yxy)-map(p-eps.yxy),
                              map(p+eps.yyx)-map(p-eps.yyx)));
}

float diffuse_directional(vec3 n,vec3 l, float strength)
{
      return (dot(n,normalize(l))*.5+.5)*strength;
}

float specular_directional(vec3 n, vec3 l, vec3 v, float strength)
{
      vec3 r=reflect(normalize(l),n);
      return pow(max(dot(v,r),0),32)*strength;
}

float shadow( in vec3 ro, in vec3 rd, float mint, float maxt, float k )
{
    float res = 1.0;
    float ph = 1e20;
    for( float t=mint; t<maxt; )
    {
        float h = map(ro + rd*t);
        if( h<0.001 )
            return 0.0;
        float y = h*h/(2.0*ph);
        float d = sqrt(h*h-y*y);
        res = min( res, k*d/max(0.0,t-y) );
        ph = h;
        t += h;
    }
    return smoothstep(.0,.2,res);
}


void main()
{
      vec2 uv=((gl_FragCoord.xy/vec2(runtime[1],runtime[2]))-.5)/vec2(aspect,1);
      vec3 ro=vec3(.0,.0,-3.); 
      vec3 p=ro;
      vec3 rd=normalize(vec3(uv,1.));
      float shading=.0;

      vec3 color;
      for(float i=0;i<400.;i++)
      {
            float d=map(p);
            if(d<.001)
            {
                  shading=p/.1;
                  vec3 n=normal(p);
                  vec3 l1=vec3(1,.5,-.5);
                  vec3 l2=vec3(-.5,.4,.1);
                  vec3 l3=vec3(-.5,1.8,-.1);
                  float rl=diffuse_directional(n,l1,.125)+specular_directional(n,l1,rd,.9);
                  float gl=diffuse_directional(n,l2,.035)+specular_directional(n,l2,rd,.4);
                  float bl=diffuse_directional(n,l3,.0125)+specular_directional(n,l3,rd,.14);
                  color=vec3(rl+gl+bl)+vec3(.8,0,0);

                  float t=length(ro-p);
                  vec3 pos = ro + t*rd;
                  color*=shadow(pos,normalize(l1),.1,10.0,length(l1-pos)*2)*.5+.5;
                  // color*=shadow(pos,normalize(l2),.1,10.0,length(l1-pos)*2)*.5+.5;
                  // color*=shadow(pos,normalize(l3),.1,10.0,length(l1-pos)*2)*.5+.5;

                  break;
            }
            p += d*rd;
      }
      float t=length(ro-p);
     
      color*=mix(color,vec3(1.,1.,1.),1-exp(-.1*t*t));

      gl_FragColor=vec4(color,1);
}