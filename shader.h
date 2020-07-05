/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
# define VAR_IRESOLUTION "x"

const char *shader_frag =
 "uniform vec2 x;"
 "void main()"
 "{"
   "vec2 v=gl_FragCoord.xy/x.xy*2.-1.;"
   "v.y*=x.y/x.x;"
   "gl_FragColor=abs(v.yxyx);"
 "}";

#endif // SHADER_H_
