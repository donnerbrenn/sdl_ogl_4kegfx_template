; vim: set ft=nasm:
bits 64
%include "header64.asm"
dynamic.needed:
    dq 1;DT_NEEDED
    dq (_symbols.libgl - _strtab)
    dq 1;DT_NEEDED
    dq (_symbols.libsdl2_2 - _strtab)
dynamic.symtab:
    dq DT_SYMTAB        ; d_tag
    dq 0                ; d_un.d_ptr
dynamic.end:
%ifndef UNSAFE_DYNAMIC
    dq DT_NULL
%endif
[section .rodata.neededlibs]
global _strtab
_strtab:
	_symbols.libgl: db "libGL.so.1",0
	_symbols.libsdl2_2: db "libSDL2-2.0.so.0",0
[section .data.smolgot]
global _symbols
_symbols:
global glUniform2f
glUniform2f:
		_symbols.libgl.glUniform2f: dq 0x27101f0
global glCreateProgram
glCreateProgram:
		_symbols.libgl.glCreateProgram: dq 0x205c8f24
global glLinkProgram
glLinkProgram:
		_symbols.libgl.glLinkProgram: dq 0x2fed8c1e
global glUseProgram
glUseProgram:
		_symbols.libgl.glUseProgram: dq 0x4f3ddefd
global glCompileShader
glCompileShader:
		_symbols.libgl.glCompileShader: dq 0x712f7898
global glCreateShader
glCreateShader:
		_symbols.libgl.glCreateShader: dq 0x835cdd03
global glAttachShader
glAttachShader:
		_symbols.libgl.glAttachShader: dq 0x9f5da104
global glShaderSource
glShaderSource:
		_symbols.libgl.glShaderSource: dq 0xbba22800
global glRecti
glRecti:
		_symbols.libgl.glRecti: dq 0xfe60230f
global SDL_GetTicks
SDL_GetTicks:
		_symbols.libsdl2_2.SDL_GetTicks: dq 0xb38f265
global SDL_Init
SDL_Init:
		_symbols.libsdl2_2.SDL_Init: dq 0x3fac837b
global SDL_CreateWindow
SDL_CreateWindow:
		_symbols.libsdl2_2.SDL_CreateWindow: dq 0x4acb1f33
global SDL_GL_SwapWindow
SDL_GL_SwapWindow:
		_symbols.libsdl2_2.SDL_GL_SwapWindow: dq 0x4b5704cc
global SDL_DestroyWindow
SDL_DestroyWindow:
		_symbols.libsdl2_2.SDL_DestroyWindow: dq 0x6f907729
global SDL_PollEvent
SDL_PollEvent:
		_symbols.libsdl2_2.SDL_PollEvent: dq 0x92f25140
global SDL_GL_CreateContext
SDL_GL_CreateContext:
		_symbols.libsdl2_2.SDL_GL_CreateContext: dq 0xbd5b4e72
db 0
_symbols.end:
global _smolplt
_smolplt:
_smolplt.end:
%include "loader64.asm"
