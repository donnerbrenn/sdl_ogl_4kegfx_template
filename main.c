#define GL_GLEXT_PROTOTYPES

#include <SDL2/SDL.h>
#include "shader.h"
#include <GL/gl.h>

#define WIDTH 2560
#define HEIGHT 1440
// #define DEBUG
// #define RUNTIME
// #define DESPERATE

static void draw(SDL_Window *window, GLint *runtimePOS)
{
	GLfloat runtime[3]={SDL_GetTicks()*.001f,WIDTH,HEIGHT};
	glUniform1fv(*runtimePOS,3,&runtime);
	glRecti(-1,-1,1,1);
	SDL_GL_SwapWindow(window);
}

static void handleEvents()
{
	SDL_Event event;
	do
	{
		if((event.type == SDL_KEYDOWN))
		{
			#ifdef DESPERATE
			asm volatile("int3");
			#else
			asm volatile("push $231;pop %rax;syscall");
			#endif
			
		}
	} while(SDL_PollEvent(&event));
}

extern void _start()
{
	asm ("sub $8, %rsp\n");
	// static GLuint pf[2];
	SDL_Init(SDL_INIT_EVERYTHING);
	const SDL_Window *window=SDL_CreateWindow(NULL,0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL);
	SDL_GL_CreateContext(window);
	const GLuint f = glCreateShader(GL_FRAGMENT_SHADER);
	glShaderSource(f, 1, &shader_frag, NULL);
	glCompileShader(f);

    	#ifdef DEBUG
		GLint isCompiled = 0;
		glGetShaderiv(f, GL_COMPILE_STATUS, &isCompiled);
		if(isCompiled == GL_FALSE) {
			GLint maxLength = 0;
			glGetShaderiv(f, GL_INFO_LOG_LENGTH, &maxLength);

			char* error = malloc(maxLength);
			glGetShaderInfoLog(f, maxLength, &maxLength, error);
			printf("%s\n", error);

			exit(-10);
		}
	#endif

	// link shader
	const GLuint p = glCreateProgram();
	glAttachShader(p,f);
	glLinkProgram(p);


	#ifdef DEBUG
		GLint isLinked = 0;
		glGetProgramiv(p, GL_LINK_STATUS, (int *)&isLinked);
		if (isLinked == GL_FALSE) {
			GLint maxLength = 0;
			glGetProgramiv(p, GL_INFO_LOG_LENGTH, &maxLength);

			char* error = malloc(maxLength);
			glGetProgramInfoLog(p, maxLength, &maxLength,error);
			printf("%s\n", error);

			exit(-10);
		}
	#endif


	glUseProgram(p);
	#ifdef RUNTIME
	const GLint runtimePOS = glGetUniformLocation( p, VAR_RUNTIME ); 
	#endif

    #ifdef DEBUG
	if( runtimePOS == -1 )
    {
        printf( "%s is not a valid glsl program variable!\n", "runtime" );
    }
	#endif

	for(;;)
	{
		handleEvents();
		#ifdef RUNTIME
		draw(window,&runtimePOS);
		#else
		draw(window,0);
		#endif
    }
}