/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
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
 "}";

#endif // SHADER_H_
