#define GL_GLEXT_PROTOTYPES

#include <SDL2/SDL.h>
#include <GL/gl.h>
#include "shader.h"

#define WIDTH 1920
#define HEIGHT 1080


__attribute__((__externally_visible__, __section__(".text.startup._start"),__noreturn__,__used__))
void _start()
{
	#ifdef ALIGN
	asm volatile("sub $8, %rsp\n");
	#endif
	GLint shader,program;
	SDL_Window *window;
	static SDL_Event event;
	SDL_Init(0xFF);
	
//create window
	window=SDL_CreateWindow(NULL,0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL);
	SDL_GL_CreateContext(window);

//create shader
	shader = glCreateShader(GL_FRAGMENT_SHADER);
	glShaderSource(shader, 1, &shader_frag, NULL);
	glCompileShader(shader);

	#ifdef DEBUG
		GLint isCompiled = 0;
		glGetShaderiv(shader, GL_COMPILE_STATUS, &isCompiled);
		if(isCompiled == GL_FALSE) {
			GLint maxLength = 0;
			glGetShaderiv(shader, GL_INFO_LOG_LENGTH, &maxLength);

			char* error = malloc(maxLength);
			glGetShaderInfoLog(shader, maxLength, &maxLength, error);
			printf("%s\n", error);

			exit(-10);
		}
	#endif

// link shader
	program = glCreateProgram();
	glAttachShader(program,shader);
	glLinkProgram(program);
	glUseProgram(program);

//mainloop
	for(;;)
	{
	//draw
		glRecti(-1,-1,1,1);
	//handle events;
		do
		{
			if((event.type == SDL_KEYDOWN))
			{
				// SDL_DestroyWindow(window);
				asm volatile("push $231;pop %rax;syscall");
			}
		} while(SDL_PollEvent(&event));
		#ifdef VAR_ITIME
		glUniform1i(glGetUniformLocation( program, VAR_ITIME ),SDL_GetTicks());
		#endif
		SDL_GL_SwapWindow(window);
	}
}