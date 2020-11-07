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
}