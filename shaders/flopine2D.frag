uniform float runtime[3];
float iTime=runtime[0];
// float width=runtime[1];
// float height=runtime[2];
float aspect=runtime[2]/runtime[1];
// vec2 aspect=vec(1/aspectratio,1);


void main ()
{
      vec2 uv=gl_FragCoord/vec2(runtime[1]*aspect,runtime[2])*2-vec2(1/aspect,1);

      // uv.y+=sin(uv.x*uv.y*10+iTime)*.2;
      // uv.x+=cos(uv.y*10+iTime)*.2;

      uv+=iTime*.1;
      uv=mod(uv,.2)-.2*.5;


      float lineX=smoothstep(.05,.051,(length(uv)));
      gl_FragColor=vec4(vec3(lineX),1);
}