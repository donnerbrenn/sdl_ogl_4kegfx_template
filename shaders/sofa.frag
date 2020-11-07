#version 460
uniform int iTime;
vec4 iResolution=vec4(960,540,1.78,1.0);
vec2 uv = (gl_FragCoord.xy/iResolution.xy-1)*vec2(iResolution.za)/2;

float threshold=.0001;
out vec3 color;
vec3 ro=vec3(0,0,-6);
vec3 rd=normalize(vec3(uv,1));
vec3 p=ro,p2;
vec3 lp[3];
vec3 lc[3];

#define B vec3(-.015)
#define R vec3(.4,-.015,-.015)
#define G vec3(.03)
#define ls .8

// float hash21(vec2 p) 
// {
//     p = fract(p * vec2(233.34, 851.74));
//     p += dot(p, p + 23.45);
//     return fract(p.x * p.y);
// }

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

struct MA
{
    float d;
    vec3 col;
    bool hit;
};

//by iq
float dot2( vec2 v ) { return dot(v,v); }

//by iq
MA sdRoundBox( vec3 p, vec3 b, float r, vec3 color)
{
  vec3 q = abs(p) - b;
  return MA(length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r,color,false);
}

//by iq
MA sdPlane( vec3 p, vec3 n, float h, vec3 color)
{
  return MA(dot(p,n) + h,color,false);
}

MA _min(MA a, MA b)
{
    return a.d<b.d?a:b;
}

// float softmin(float f1, float f2, float balance)
// {
//       float e = pow(max(balance - abs(f1 - f2), 0.0),2)*.25;
//       return min(f1, f2) - e / balance;
// }

MA map(vec3 p)
{
      p=rotate(p,vec3(0,sin(iTime*.001)*.5,0));
      p.y-=1.;
      p.z+=1.5;
      MA plane = sdPlane(p+vec3(0,1.25,0),vec3(0,1,0),1.,G);
      MA wall= sdPlane(p+vec3(0,1.25,0),vec3(0,0,-1),1.,G);
      p.z-=.6;

      MA sofa  = sdRoundBox( p+vec3(0,1.9,0), vec3(2,.1,1), .1, R);
      MA rlean = sdRoundBox( p+vec3(-1.9,1.5,0), vec3(.2,.5,1), .1, R);
      MA llean = sdRoundBox( p+vec3( 1.9,1.5,0), vec3(.2,.5,1), .1, R);
      MA blean  = sdRoundBox( p+vec3(0,1.6,-.5), vec3(1.7,1.2,.1), .1, R);
      MA lleg= sdRoundBox(p+vec3(1.9,2.2,.9),vec3(.07),.1,B );
      MA rleg= sdRoundBox( p+vec3(-1.9,2.2,.9),vec3(.07),.1,B );
      MA lleg2= sdRoundBox(p+vec3(1.9,2.2,-.3),vec3(.07),.1,B );
      MA rleg2= sdRoundBox( p+vec3(-1.9,2.2,-.3),vec3(.07),.1,B);

      MA lpillow = sdRoundBox( p+vec3( .8,1.55,0), vec3(.7,.05,1), .1, R);
      MA rpillow = sdRoundBox( p+vec3(-.8,1.55,0), vec3(.7,.05,1), .1, R);

      p=rotate(rotate(p,vec3(1.6,.0,.0)),vec3(0));
      MA lpillow2 = sdRoundBox( p+vec3( .8,-.3,-.8), vec3(.7,.05,.5), .1, R);
      MA rpillow2 = sdRoundBox( p+vec3(-.8,-.3,-.8), vec3(.7,.05,.5), .1, R);

      sofa=_min(sofa,llean);
      sofa=_min(sofa,rlean);
      sofa=_min(sofa,blean);
      sofa=_min(sofa,wall);
      sofa=_min(sofa,plane);
      sofa=_min(sofa,lpillow);
      sofa=_min(sofa,rpillow);
      sofa=_min(sofa,lpillow2);
      sofa=_min(sofa,rpillow2);

      sofa.col.x=mod(abs(floor(sin(p.x)*2.5)*.2),1);
      sofa.col.y=mod(abs(floor(cos(p.x)*2.5)*.2),1);
      sofa.col.z=mod(abs(floor(sin(-p.x)*2.5)*.2),1);

      rleg=_min(rleg,rleg2);
      lleg=_min(lleg,lleg2);

      return _min(_min(sofa,rleg),lleg);
}

MA march(vec3 ro, vec3 rd, float len)
{
    MA result;
    while( distance(ro,p)<len &&!result.hit)
    {
        p+=result.d*rd;
        result=map(p);
        result.hit=result.d<threshold;
    }
    return result;
}

vec3 normal(vec3 p) 
{
    mat3 k = mat3(p,p,p) - mat3(.0001);
    return normalize(map(p).d - vec3( map(k[0]).d,map(k[1]).d,map(k[2]).d ) );
}


//by iq
float softshadow( in vec3 ro, in vec3 rd, float mint, float maxt, float k )
{
    float res = 1.0;
    float ph = 1e20;
    for( float t=mint; t<maxt; )
    {
        float h = map(ro + rd*t).d;
        if( h<0.001 )
            return 0.0;
        float y = h*h/(2.0*ph);
        float d = sqrt(h*h-y*y);
        res = min( res, k*d/max(0.0,t-y) );
        ph = h;
        t += h;
    }
    return res;
}

vec3 calcLight(vec3 p, vec3 n, vec3 color, float power)
{
    vec3 oc;
    float diffuse;
    float specular;

    for(int i=0;i<3;i++)
    {

        diffuse=max(.0,dot(reflect(lp[i],n),rd));
        diffuse+=.25;
        specular=pow(max(dot(rd, reflect(lp[i],n)), .0), 8);
        float s=softshadow(p,lp[i],.1,20.,25);
        s=max(0,s);
        s=clamp(s,.01,1.);
        oc+=(diffuse*power+specular*.5*power)*lc[i]*s;
    }
    return color*oc;
}

void main()
{
    lp[0]=normalize(vec3(0,10,-10));
    lp[1]=normalize(vec3(-50,20.,-50.));
    lp[2]=normalize(vec3(-50,60.,-700.));
    
    vec2 mlc=vec2(.5,.7);
    lc[0]=mlc.xxy*2;
    lc[1]=mlc.xyx;
    lc[2]=mlc.yxx*.75;

    MA res=march(ro,rd,100);
    vec3 n=normal(p);
    if(res.hit)
    {
        color=res.col;
        color=calcLight(p,n,res.col,ls);
        p2=p;
        if(res.col==B)
        {
            p-=rd*.01;
            rd=normalize(reflect(rd,n));   
            res=march(p,rd,10);
            if(res.hit)
            {
                color=mix(color,calcLight(p,normal(p),res.col,.01),ls);
            }
        }
    }
    color=pow((((color*exp2(-2.5*(length(p2)*.25)))*2-1)*1.005)*.5+.5,vec3(.4545));
}