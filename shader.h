/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
# define VAR_RUNTIME "v"

const char *shader_frag =
 "uniform float v[3];"
 "vec2 m=vec2(v[1],v[2]);"
 "float s(vec3 v)"
 "{"
   "return cos(v.x)+cos(v.y*1.5)+cos(v.z)+cos(v.y*20.)*.05;"
 "}"
 "float n(vec3 m)"
 "{"
   "return length(max(abs(m-vec3(cos(m.z*1.5)*.3,-.5+cos(m.z)*.2,0.))-vec3(.125,.02,v[0]+3.),vec3(0.)));"
 "}"
 "float c(vec3 v)"
 "{"
   "return min(s(v),n(v));"
 "}"
 "vec3 x(vec3 v)"
 "{"
   "vec3 m=vec3(.1,0,0);"
   "return normalize(vec3(c(v+m.xyy),c(v+m.yxy),c(v+m.yyx)));"
 "}"
 "void main()"
 "{"
   "vec2 f=-1.+2.*gl_FragCoord.xy/m.xy;"
   "f.x*=m.x/m.y;"
   "vec4 i=vec4(0.);"
   "vec3 y=vec3(sin(v[0])*.5,cos(v[0]*.5)*.25+.25,v[0]),r=normalize(vec3(f.x*1.6,f.y,1.)),l=y,z;"
   "float e=0.;"
   "for(int g=0;g<64;g++)"
     "e=c(l),l+=e*r;"
   "z=l;"
   "float g=length(l-y)*.02;"
   "r=reflect(r,x(l));"
   "l+=r;"
   "for(int o=0;o<32;o++)"
     "e=c(l),l+=e*r;"
   "i=max(dot(x(l),vec3(.1,.1,0.)),0.)+vec4(.3,cos(v[0]*.5)*.5+.5,sin(v[0]*.5)*.5+.5,1.)*min(length(l-y)*.04,1.);"
   "if(s(z)>n(z))"
     "i=mix(i,vec4(cos(v[0]*.3)*.5+.5,cos(v[0]*.2)*.5+.5,sin(v[0]*.3)*.5+.5,1.),.3);"
   "vec4 o=(i+vec4(g)+(1.-min(z.y+1.9,1.))*vec4(1.,.8,.7,1.))*min(v[0]*.5,1.);"
   "gl_FragColor=vec4(o.xyz,1.);"
 "}";

#endif // SHADER_H_
