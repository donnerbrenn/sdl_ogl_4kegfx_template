/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
# define VAR_RUNTIME "v"

const char *shader_frag =
 "uniform int v;"
 "float c=v*.001;"
 "vec2 m=vec2(1920,1080);"
 "float s(vec3 c)"
 "{"
   "return cos(c.x)+cos(c.y*1.5)+cos(c.z)+cos(c.y*20.)*.05;"
 "}"
 "float n(vec3 v)"
 "{"
   "return length(max(abs(v-vec3(cos(v.z*1.5)*.3,-.5+cos(v.z)*.2,0.))-vec3(.125,.02,c+3.),vec3(0.)));"
 "}"
 "float r(vec3 c)"
 "{"
   "return min(s(c),n(c));"
 "}"
 "vec3 i(vec3 c)"
 "{"
   "vec3 m=vec3(.1,0,0);"
   "return normalize(vec3(r(c+m.xyy),r(c+m.yxy),r(c+m.yyx)));"
 "}"
 "void main()"
 "{"
   "vec2 v=-1.+2.*gl_FragCoord.xy/m.xy;"
   "v.x*=m.x/m.y;"
   "vec4 f=vec4(0.);"
   "vec3 y=vec3(sin(c)*.5,cos(c*.5)*.25+.25,c),l=normalize(vec3(v.x*1.6,v.y,1.)),x=y,z;"
   "float e=0.;"
   "for(int g=0;g<64;g++)"
     "e=r(x),x+=e*l;"
   "z=x;"
   "float g=length(x-y)*.02;"
   "l=reflect(l,i(x));"
   "x+=l;"
   "for(int o=0;o<32;o++)"
     "e=r(x),x+=e*l;"
   "f=max(dot(i(x),vec3(.1,.1,0.)),0.)+vec4(.3,cos(c*.5)*.5+.5,sin(c*.5)*.5+.5,1.)*min(length(x-y)*.04,1.);"
   "if(s(z)>n(z))"
     "f=mix(f,vec4(cos(c*.3)*.5+.5,cos(c*.2)*.5+.5,sin(c*.3)*.5+.5,1.),.3);"
   "vec4 o=(f+vec4(g)+(1.-min(z.y+1.9,1.))*vec4(1.,.8,.7,1.))*min(c*.5,1.);"
   "gl_FragColor=vec4(o.xyz,1.);"
 "}";

#endif // SHADER_H_
