void main ()
{
  vec2 uv_1;
  vec2 tmpvar_2;
  tmpvar_2 = (((gl_FragCoord.xy / vec2(1920.0, 1080.0)) * 2.0) - 1.0);
  uv_1.x = tmpvar_2.x;
  uv_1.y = (tmpvar_2.y * 0.5625);
  gl_FragColor = abs(uv_1.yxyx);
}

