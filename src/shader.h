/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
# define VAR_FRAME "i"
# define VAR_ITIME "f"

const char *shader_frag =
 "uniform int f,i;"
 "float t(float f,int i,int t,int x)"
 "{"
   "return sin(f+i+t+x);"
 "}"
 "void main()"
 "{"
   "if(i%2)"
     "{"
       "discard;"
     "}"
   "float x=4;"
   "vec2 r=vec2(1920,1080),l=((gl_FragCoord.xy/r*.5+.5)*1.1*2-1)*vec2(r.x/r.y,1),g=floor(l*x),y=fract(l*x)*2.-1.;"
   "float s=g.y*x+g.x,z=f*.001,c=clamp(t(z,int(s),int(g.x),int(g.y)),-.9,.9);"
   "gl_FragColor.x=float(length(y)-abs(c)<0);"
   "gl_FragColor.xyz=c>0?gl_FragColor.xyz:gl_FragColor.xxx;"
 "}";

#endif // SHADER_H_
