uniform float runtime[3];
float iTime=runtime[0];
float aspect=runtime[2]/runtime[1];

// float sphere(vec3 position)
// {
//       return length(position)-1.0;
// }

void main ()
{
      vec2 uv=gl_FragCoord/vec2(runtime[1]*aspect,runtime[2])*2-vec2(1/aspect,1);

      // // uv.y+=sin(uv.x*uv.y*10+iTime)*.2;
      // // uv.x+=cos(uv.y*10+iTime)*.2;

      // // uv+=iTime*.1;
      // // uv=mod(uv,.2)-.2*.5;
      // bool hit=false;
      // vec3 ro=vec3(.0,.0,-3); vec3 p=ro;
      // vec3 rd=normalize(vec3(uv,1.));

      // float shading=.0;

      // for(float i=0;i<100.;i++)
      // {
      //       // float d=sphere(p);
      //       if(d<.01)
      //       {
      //             hit=true;
      //             shading=i/100;
      //             break;
      //       }
      //       p += .1;
      // }




      // // float lineX=smoothstep(.05,.051,(length(uv)));
      // gl_FragColor=vec4(vec3(shading),1);
}