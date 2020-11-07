vec4 iResolution=vec4(960,540,1.78,1.0);
uniform int time;
float iTime=time*.001;

//Object A (tunnel)
float oa(vec3 q)
{
 return cos(q.x)+cos(q.y*1.5)+cos(q.z)+cos(q.y*20.)*.05;
}

//Object B (ribbon)
float ob(vec3 q)
{
 return length(max(abs(q-vec3(cos(q.z*1.5)*.3,-.5+cos(q.z)*.2,.0))-vec3(.125,.02,iTime+3.),vec3(.0)));
}

//Scene
float o(vec3 q)
{
 return min(oa(q),ob(q));
}

//Get Normal
// vec3 gn(vec3 q)
// {
//  vec3 f=vec3(.01,0,0);
//  return normalize(vec3(o(q+f.xyy),o(q+f.yxy),o(q+f.yyx)));
// }

vec3 gn(vec3 p)
{
    mat3 k = mat3(p,p,p) - mat3(.01);
    return normalize(o(p) - vec3( o(k[0]),o(k[1]),o(k[2])));
}

//MainLoop
void main(void)
{
 vec2 p = (gl_FragCoord/iResolution-1)*vec2(iResolution.za);

 vec4 c=vec4(1.0);
 vec3 org=vec3(sin(iTime)*.5,cos(iTime*.5)*.25+.25,iTime),dir=normalize(vec3(p.x*1.6,p.y,1.0)),q=org,pp;
 float d=.0;

 //First raymarching
 for(int i=0;i<64;i++)
 {
  d=o(q);
  q+=d*dir;
 }
 pp=q;
 float f=length(q-org)*0.02;

 //Second raymarching (reflection)
 dir=reflect(dir,gn(q));
 q+=dir;
 for(int i=0;i<64;i++)
 {
      d=o(q);
      q+=d*dir;
 }
 c=max(dot(gn(q),vec3(.1,.1,.0)),.0)+vec4(.3,cos(iTime*.5)*.5+.5,sin(iTime*.5)*.5+.5,1.)*min(length(q-org)*.04,1.);

 //Ribbon Color
 if(oa(pp)>ob(pp))c=mix(c,vec4(cos(iTime*.3)*.5+.5,cos(iTime*.2)*.5+.5,sin(iTime*.3)*.5+.5,1.),.3);

 //Final Color
 vec4 fcolor = ((c+vec4(f))+(1.-min(pp.y+1.9,1.))*vec4(1.,.8,.7,1.))*min(iTime*.5,1.);
 gl_FragColor=vec4(fcolor.xyz,1.0);
}
