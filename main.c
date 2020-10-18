#define GL_GLEXT_PROTOTYPES

#include <SDL2/SDL.h>
#include <GL/gl.h>
#include "shader.h"


#define WIDTH 1920
#define HEIGHT 1080

#ifdef VAR_ITIME
static void draw(SDL_Window *window, GLint *iResolutionPOS, GLint *iTimePOS)
#else
static void draw(SDL_Window *window, GLint *iResolutionPOS)
#endif
{
	glUniform2f(*iResolutionPOS,(float)WIDTH,(float)HEIGHT);
	#ifdef VAR_ITIME
	float time=SDL_GetTicks()*.001f;
	glUniform1f(*iTimePOS,time);
	#endif
	glRecti(-1,-1,1,1);
	SDL_GL_SwapWindow(window);
}

static void handleEvents(SDL_Window *window)
{
	SDL_Event event;
	do
	{
		if((event.type == SDL_KEYDOWN))
		{
			SDL_DestroyWindow(window);
			asm volatile("push $231;pop %rax;syscall");
			__builtin_unreachable();
		}
	} while(SDL_PollEvent(&event));
}

static void createSDLWindow(SDL_Window **window)
{
	#ifdef DEBUG
		#ifdef FULLSCREEN
			*window=SDL_CreateWindow("DEBUG VERSION",0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL | SDL_WINDOW_FULLSCREEN);
		#else
			*window=SDL_CreateWindow("DEBUG VERSION",0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL);
		#endif
		printf("Created window\n");
	#else
		#ifdef FULLSCREEN
			*window=SDL_CreateWindow(NULL,0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL|SDL_WINDOW_FULLSCREEN);
		#else
			*window=SDL_CreateWindow(NULL,0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL);
		#endif
	#endif
	SDL_GL_CreateContext(*window);
}

static void createShader(GLint *shader)
{
	*shader = glCreateShader(GL_FRAGMENT_SHADER);
	glShaderSource(*shader, 1, &shader_frag, NULL);
	glCompileShader(*shader);

	#ifdef DEBUG
		GLint isCompiled = 0;
		glGetShaderiv(*shader, GL_COMPILE_STATUS, &isCompiled);
		if(isCompiled == GL_FALSE) {
			GLint maxLength = 0;
			glGetShaderiv(*shader, GL_INFO_LOG_LENGTH, &maxLength);

			char* error = malloc(maxLength);
			glGetShaderInfoLog(*shader, maxLength, &maxLength, error);
			printf("%s\n", error);

			exit(-10);
		}
		else
		{
			printf("Shader compiled successfully\n");
		}
	#endif
}

static void createProgram(GLint *program, GLint *shader)
{
	// link shader
	*program = glCreateProgram();
	glAttachShader(*program,*shader);
	glLinkProgram(*program);

	#ifdef DEBUG
		GLint isLinked = 0;
		glGetProgramiv(*program, GL_LINK_STATUS, (int *)&isLinked);
		if (isLinked == GL_FALSE) {
			GLint maxLength = 0;
			glGetProgramiv(*program, GL_INFO_LOG_LENGTH, &maxLength);

			char* error = malloc(maxLength);
			glGetProgramInfoLog(*program, maxLength, &maxLength,error);
			printf("%s\n", error);

			exit(-10);
		}
		else
		{
			printf("Created Shader Program\n");
		}
	#endif

	glUseProgram(*program);
}

#ifdef VAR_ITIME
static void getUniforms(GLint *program,  GLint *iTimePOS, GLint *iResolutionPOS)
#else
static void getUniforms(GLint *program, GLint *iResolutionPOS)
#endif
{
	*iResolutionPOS = glGetUniformLocation( *program, VAR_IRESOLUTION ); 
	#ifdef VAR_ITIME
	*iTimePOS = glGetUniformLocation( *program, VAR_ITIME ); 
	#endif


	#ifdef DEBUG
	if( *iResolutionPOS == -1 )
	{
		printf( "%s is not a valid glsl program variable!\n", VAR_IRESOLUTION );
	}
	else if( *iTimePOS == -1 )
	{
		printf( "%s is not a valid glsl program variable!\n", VAR_ITIME );
	}
	else 
	{
		printf( "iTime is at uniform %i\n", *iTimePOS );
		printf( "iResolution is at uniform %i\n", *iResolutionPOS );
	}

	#endif

}

#ifdef VAR_ITIME
static void mainloop(SDL_Window *window, GLint *iTimePOS, GLint *iResolutionPOS)
#else
static void mainloop(SDL_Window *window, GLint *iResolutionPOS)
#endif
{
	for(;;)
	{
		handleEvents(window);
		#ifdef VAR_ITIME
		draw(window,iResolutionPOS,iTimePOS);
		#else
		draw(window,iResolutionPOS);
		#endif
	}
	__builtin_unreachable();
}

extern void _start()
{
	SDL_Init(SDL_INIT_EVERYTHING);
	SDL_Window *window;
	GLint shader,program,iResolutionPOS;
	#ifdef VAR_ITIME
	GLint iTimePOS;
	#endif
	createSDLWindow(&window);
	createShader(&shader);
	createProgram(&program,&shader);
	#ifdef VAR_ITIME
	getUniforms(&program,&iTimePOS,&iResolutionPOS);
	mainloop(window,&iTimePOS,&iResolutionPOS);
	#else
	mainloop(window,&iResolutionPOS);
	#endif
	
	__builtin_unreachable();
}