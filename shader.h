/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */
#ifndef SHADER_H_
# define SHADER_H_
# define VAR_RUNTIME "f"

const char *shader_frag =
 "uniform int f;"
 "vec2 m=vec2(1920,1080);"
 "vec3 v;"
 "float t(vec2 m)"
 "{"
   "return m=fract(m*vec2(233.34,851.74))+dot(m,m+23.45),fract(m.x*m.y);"
 "}"
 "mat2 x(float m)"
 "{"
   "return mat2(cos(m),sin(m),-sin(m),cos(m));"
 "}"
 "void main()"
 "{"
   "float i=f*.001;"
   "vec2 s=(2*gl_FragCoord.xy-m)/m.y+vec2(1.+2*cos(i/2),2*sin(i/10))*.5*x(i/10);"
   "for(int y=0;y<5;y++)"
     "{"
       "float l=fract(y*.2+i/10),c=smoothstep(0.,.5,l)*smoothstep(1.,.8,l);"
       "vec2 z=s;"
       "float e,d,o=.5;"
       "for(int r=0;r<8;r++)"
         "{"
           "vec2 a=ceil(z),n=fract(z)*fract(z)*(3-2*fract(z));"
           "float g=t(a),h=t(a+vec2(1,0)),u=t(a+vec2(0,1)),p=t(a+vec2(1,1));"
           "e+=o*mix(mix(g,h,n.x),mix(u,p,n.x),n.y);"
           "d+=o;"
           "o/=2;"
           "z*=2;"
         "}"
       "v+=e/d*.5*mix(vec3(0,.5,.5),vec3(1,.5,0),c);"
       "vec2 a=(x(y*3.14)*s*mix(5.,.1,l)+y)*4,n=floor(a),h=fract(a)-.5,u=sin(vec2(t(n),t(n+t(n)))*25.)*.3;"
       "v+=mix(vec3(0,0,1),vec3(1,.4,0),mix(0,1,l))*(1.-smoothstep(.3*t(n),.3*t(n)+.05,length(h-u)))*(1./dot((u-h)*25,(u-h)*25))*(.7*t(n))*c+mix(.8*sin(i/5)*vec3(.5,.2,0),vec3(0),length(.5+s/2));"
     "}"
   "gl_FragColor.xyz=v;"
 "}";

#endif // SHADER_H_
