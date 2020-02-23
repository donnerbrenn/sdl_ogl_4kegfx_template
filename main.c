#include <SDL2/SDL.h>
#include <stdint.h>
#include "shader.h"
#include <GL/gl.h>

#define WIDTH 1920
#define HEIGHT 1080
// #define DEBUG
#define RUNTIME

static void draw(SDL_Window *window, GLint runtimePOS)
{
        glUniform1i(runtimePOS,SDL_GetTicks());
        glRecti(-1,-1,1,1);
        SDL_GL_SwapWindow(window);
}

void _start()
{
    asm ("sub $8, %rsp\n");
    SDL_Event event;
    SDL_Init(SDL_INIT_EVERYTHING);
    SDL_Window *window=SDL_CreateWindow(NULL,0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL);
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
        while(SDL_PollEvent(&event))
        {
            if((event.type == SDL_KEYDOWN))
            {
                asm volatile(".intel_syntax noprefix;push 231;pop rax;xor edi, edi;syscall;.att_syntax prefix");
            }
        }
		#ifdef RUNTIME
        draw(window,runtimePOS);
		#else
		draw(window,0);
		#endif
    }
}