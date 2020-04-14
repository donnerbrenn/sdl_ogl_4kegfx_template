uniform float runtime[3];
float iTime=runtime[0];
float aspect=runtime[2]/runtime[1];

// mat4 rotateY(float theta) {
//     float c = cos(theta);
//     float s = sin(theta);

//     return mat4(
//         vec4(c, 0, s, 0),
//         vec4(0, 1, 0, 0),
//         vec4(-s, 0, c, 0),
//         vec4(0, 0, 0, 1)
//     );
// }

float sdRoundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

mat2 r2(float r)
{
      return mat2(cos(r),sin(r),-sin(r),cos(r));
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

float map(vec3 p)
{
      p=mod(p,8)-4.;
      float mytorus=sdTorus(p,vec2(2.,.4));
      float mycube=sdRoundBox(p,vec3(1.),.05);
      float mysphere=sphere(p,2.);
      float mypill=sdRoundedCylinder(p,1.,.5,.01);
      float myoct=sdOctahedron(p,2.);
      return mix(mypill,myoct,sin(iTime*.5)*.5+.5);
}
vec3 normal(vec3 p)
{
      vec2 eps=vec2(.005,0);
      return normalize(vec3(  map(p+eps.xyy)-map(p-eps.xyy),
                              map(p+eps.yxy)-map(p-eps.yxy),
                              map(p+eps.yyx)-map(p-eps.yyx)));
}

// float diffuse_directional(vec3 n,vec3 l)
// {
//       return dot(n,normalize(l))*.5+.5;
// }

// float specular_directional(vec3 n, vec3 l, vec3 v)
// {

//       vec3 r=reflect(normalize(l),n);
//       return pow(max(dot(v,r),0),32);
// }


void main()
{
      vec2 uv=((gl_FragCoord.xy/vec2(runtime[1],runtime[2]))-.5)/vec2(aspect,1);
      vec3 ro=vec3(.0,.0,-3.); 
      vec3 p=ro;
      vec3 rd=normalize(vec3(uv,1.));
      float shading=.0;

       vec3 color;
      for(float i=0;i<300.;i++)
      {
            float d=map(p);

            if(d<.01)
            {
                  shading=p/.1;
                  vec3 n=normal(p);
                  vec3 l=vec3(.5,.8,.2);
                  float diffuse=dot(n,normalize(l))*.5+.5;
                  vec3 r=reflect(normalize(l),n);
                  float specular=pow(max(dot(rd,r),0),32);
                  color+=mix(vec3(.0,.0,.0),vec3(1.,.0,.0),diffuse*.5);
                  color+=mix(color,vec3(.75),specular);
                  break;
            }
            p += d*rd;
      }

      float t=length(ro-p);
     
      color*=mix(color,vec3(1.,1.,1.),1-exp(-.1*t*t));
      gl_FragColor=vec4(color,1);
}