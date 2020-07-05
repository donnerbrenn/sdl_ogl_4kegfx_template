#version 450

// uniform float iTime;
uniform vec2 iResolution;

out vec3 color;

float sdfCircle(vec2 p, float r)
{
    return length(p)-r;
}

void main(void)
{
    vec2 uv=(gl_FragCoord.xy/iResolution)*2.-1.;
    uv*=vec2(1.,iResolution.y/iResolution.x);
    float sdf=sdfCircle(uv,.25);
    if(sdf>0 && sdf < .01)
        color=vec3(1.);
}