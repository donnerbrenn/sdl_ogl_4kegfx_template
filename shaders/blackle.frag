vec2 iResolution=vec2(1920,1080);

void main()
{
    // Normalized pixel coordinates (from -1 to 1)
    vec2 uv = (gl_FragCoord.xy/iResolution.xy)*2.0 - 1.0;
    uv.y *= iResolution.y/iResolution.x;
    gl_FragColor = abs(uv.yxyx);
}