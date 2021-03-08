<<<<<<< HEAD
 #define map(p) min(length(p-vec3(0,0,4))-2,dot(p,vec3(0,1,0))+2)

void main() 
{
    vec3 res=vec3(960,540,1.78);
    vec3 pos;
    vec3 ld=normalize(vec3(vec2(1),-1));
    vec3 rd=normalize(vec3((gl_FragCoord/res-1)*vec2(res.z,1),1));
    vec3 norm;
    float threshold=.0001,aprx=1;
    while(threshold<aprx && length(pos)<25) 
    {
        pos+=rd*aprx;
        aprx=map(pos);
    }
    mat3 k = mat3(pos,pos,pos) - mat3(threshold);
    norm=normalize(map(pos) - vec3(map(k[0]),map(k[1]),map(k[2])));
    gl_FragColor.xyz=(norm*.5+.5)*(.33+max(dot(norm,ld),0)+pow(max(dot(rd, reflect(ld,norm)), .0), 8))*.5*exp2(-.9*length(p/4))*(aprx<threshold);
=======
#version 460

uniform vec2 iResolution;

out vec3 COLOR;

vec2 uv=(gl_FragCoord.xy/iResolution*2-1)*vec2(1.78,1);
vec3 ro=vec3(0,0,0);
vec3 p=ro;
vec3 rd=normalize(vec3(uv,1.));
vec3 ld=normalize(vec3(1,1,-1));
vec3 n;
float lp=.5;
float aprx=1;
float li;
float threshold=.0001;

float map(vec3 p)
{
    return min(length(p-vec3(0,0,3))-1.5,dot(p,vec3(0,1,0))+2);  
}

void main()
{
    for(int i=0;i<1024 && aprx>threshold;i++)
    {        
        aprx=map(p);
        p+=rd*aprx;
    }
    mat3 k = mat3(p,p,p) - mat3(.05);
    n=normalize(map(p) - vec3( map(k[0]),map(k[1]),map(k[2])));
    li=((.33+max(dot(n,ld),0)+pow(max(dot(rd, reflect(ld,n)), .0), 8))*lp);
    COLOR=vec3(li)*(n*.5+.5);
>>>>>>> a046d3d1d1a520b65abc1436a61ae6ae15877d17
}