#version 460
uniform vec2 iResolution;
uniform float iTime;
vec2 uv = (gl_FragCoord.xy-vec2(iResolution.x)*vec2(0.5,.28))/iResolution.x;
out vec3 color;

vec3 ro = vec3(0, 0, -4);
vec3 rd = normalize(vec3(uv,1));
vec3 p = ro;
bool hit = false;
float dist=.1;
float approx=.001;

vec3 rotate(vec3 p,vec3 t)
{
      float c=cos(t.x),s=sin(t.x);
      mat3 m=mat3(vec3(1,0,0),vec3(0,c,-s),vec3(0,s,c));

      c=cos(t.y);s=sin(t.y);
      m*=mat3(vec3(c,0,s),vec3(0,1,0),vec3(-s,0,c));

      c=cos(t.z);s=sin(t.z);
      m*=mat3(vec3(c,-s,0),vec3(s,c,0),vec3(0,0,1));

      return m*p;
}

float map(vec3 p)
{
    p=rotate(p,vec3(iTime*.1));
    p=mod(p,.5)-.25;
    return length(p)-.1;
}

float lightRender(vec3 n,vec3 ld, vec3 v, float strength)
{   
      return ((.33+max(dot(n,ld),0)+pow(max(dot(rd, reflect(ld,n)), .0), 8))*strength);
}

void main()
{
    while(dist>approx && distance(ro,p)<30)
    {
        dist = map(p);
        hit=dist < approx;
        if(hit)
            break;
        p += dist*rd;
    }
    if(hit)
    {
        mat3 k = mat3(p,p,p) - mat3(.001);
        vec3 n=normalize(map(p) - vec3( map(k[0]),map(k[1]),map(k[2]) ) );
        color=(sin(p)*0.5+0.5)*lightRender(n,vec3(-1,-1,0),ro,.23)*.5;
    }
    color=sqrt(color);
}