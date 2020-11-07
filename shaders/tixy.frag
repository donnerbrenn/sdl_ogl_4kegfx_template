uniform int iTime;

float tixy(float t, int i, int x, int y)
{
      return sin(x*y+t);
}

void main()
{  
      float size=8;
      vec2 resolution=vec2(1920,1080);
      vec2 uv=(((gl_FragCoord.xy/resolution*.5+.5)*1.1)*2-1)*vec2(resolution.x/resolution.y,1);
      vec2 index=floor(uv*size);
      vec2 offset=fract(uv*size)*2.-1.;
      float x=index.x;
      float y=index.y;
      float i=y*size+x;
      float t=iTime*.001;

      //tixy line
      float r=clamp(tixy(t,int(i), int(x), int(y)),-.9,.9);

      gl_FragColor.x=float((length(offset)-abs(r))<0);
      gl_FragColor.xyz=r>0?gl_FragColor.xyz:gl_FragColor.xxx;  
}