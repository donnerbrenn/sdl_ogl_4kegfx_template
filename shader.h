/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
<<<<<<< HEAD
# define VAR_ITIME "f"

const char *shader_frag =
 "uniform int f;"
 "float t(float y,int f,int t,int i)"
 "{"
   "return sin(t*i+y);"
 "}"
 "void main()"
 "{"
   "float i=8;"
   "vec2 r=vec2(1920,1080),l=((gl_FragCoord.xy/r*.5+.5)*1.1*2-1)*vec2(r.x/r.y,1),x=floor(l*i),g=fract(l*i)*2.-1.;"
   "float y=x.x,c=x.y,z=c*i+y,o=f*.001,v=clamp(t(o,int(z),int(y),int(c)),-.9,.9);"
   "gl_FragColor.x=float(length(g)-abs(v)<0);"
   "gl_FragColor.xyz=v>0?gl_FragColor.xyz:gl_FragColor.xxx;"
=======
# define VAR_COLOR "m"
# define VAR_IRESOLUTION "v"

const char *shader_frag =
 "#version 460\n"
 "uniform vec2 v;"
 "out vec3 m;"
 "vec2 d=(gl_FragCoord.xy/v*2-1)*vec2(1.78,1);"
 "vec3 n=vec3(0,0,0),r=n,i=normalize(vec3(d,1.)),l=normalize(vec3(1,1,-1)),f;"
 "float e=.5,o=1,g,c=.0001;"
 "float t(vec3 r)"
 "{"
   "return min(length(r-vec3(0,0,3))-1.5,dot(r,vec3(0,1,0))+2);"
 "}"
 "void main()"
 "{"
   "for(int v=0;v<1024&&o>c;v++)"
     "o=t(r),r+=i*o;"
   "mat3 v=mat3(r,r,r)-mat3(.05);"
   "f=normalize(t(r)-vec3(t(v[0]),t(v[1]),t(v[2])));"
   "g=(.33+max(dot(f,l),0)+pow(max(dot(i,reflect(l,f)),0.),8))*e;"
   "m=vec3(g)*(f*.5+.5);"
>>>>>>> a046d3d1d1a520b65abc1436a61ae6ae15877d17
 "}";

#endif // SHADER_H_
