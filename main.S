	.file	"main.c"
# GNU C11 (GCC) version 8.3.0 (x86_64-pc-linux-gnu)
#	compiled by GNU C version 8.3.0, GMP version 6.1.2, MPFR version 4.0.2, MPC version 1.1.0, isl version isl-0.21-GMP

# GGC heuristics: --param ggc-min-expand=100 --param ggc-min-heapsize=131072
# angegebene Optionen:  main.c -march=nocona -malign-data=cacheline
# -mno-fancy-math-387 -mno-ieee-fp -auxbase-strip main.S -Os -std=gnu11
# -fverbose-asm -fno-plt -fno-stack-protector -fstack-check=no
# -fno-unwind-tables -fno-asynchronous-unwind-tables -fno-exceptions
# -funsafe-math-optimizations -ffast-math -fomit-frame-pointer
# -ffunction-sections -fdata-sections -fmerge-all-constants -fno-pic
# eingeschaltete Optionen:  -faggressive-loop-optimizations
# -falign-functions -falign-jumps -falign-labels -falign-loops
# -fassociative-math -fauto-inc-dec -fbranch-count-reg -fcaller-saves
# -fchkp-check-incomplete-type -fchkp-check-read -fchkp-check-write
# -fchkp-instrument-calls -fchkp-narrow-bounds -fchkp-optimize
# -fchkp-store-bounds -fchkp-use-static-bounds
# -fchkp-use-static-const-bounds -fchkp-use-wrappers -fcode-hoisting
# -fcombine-stack-adjustments -fcommon -fcompare-elim -fcprop-registers
# -fcrossjumping -fcse-follow-jumps -fcx-limited-range -fdata-sections
# -fdefer-pop -fdelete-null-pointer-checks -fdevirtualize
# -fdevirtualize-speculatively -fdwarf2-cfi-asm -fearly-inlining
# -feliminate-unused-debug-types -fexpensive-optimizations
# -ffinite-math-only -fforward-propagate -ffp-int-builtin-inexact
# -ffunction-cse -ffunction-sections -fgcse -fgcse-lm -fgnu-runtime
# -fgnu-unique -fguess-branch-probability -fhoist-adjacent-loads -fident
# -fif-conversion -fif-conversion2 -findirect-inlining -finline
# -finline-atomics -finline-functions -finline-functions-called-once
# -finline-small-functions -fipa-bit-cp -fipa-cp -fipa-icf
# -fipa-icf-functions -fipa-icf-variables -fipa-profile -fipa-pure-const
# -fipa-ra -fipa-reference -fipa-sra -fipa-vrp -fira-hoist-pressure
# -fira-share-save-slots -fira-share-spill-slots
# -fisolate-erroneous-paths-dereference -fivopts -fkeep-static-consts
# -fleading-underscore -flifetime-dse -flra-remat -flto-odr-type-merging
# -fmerge-all-constants -fmerge-debug-strings -fmove-loop-invariants
# -fomit-frame-pointer -foptimize-sibling-calls -fpartial-inlining
# -fpeephole -fpeephole2 -fprefetch-loop-arrays -freciprocal-math -free
# -freg-struct-return -freorder-blocks -freorder-blocks-and-partition
# -freorder-functions -frerun-cse-after-loop
# -fsched-critical-path-heuristic -fsched-dep-count-heuristic
# -fsched-group-heuristic -fsched-interblock -fsched-last-insn-heuristic
# -fsched-rank-heuristic -fsched-spec -fsched-spec-insn-heuristic
# -fsched-stalled-insns-dep -fschedule-fusion -fsemantic-interposition
# -fshow-column -fshrink-wrap -fshrink-wrap-separate
# -fsplit-ivs-in-unroller -fsplit-wide-types -fssa-backprop -fssa-phiopt
# -fstdarg-opt -fstore-merging -fstrict-aliasing
# -fstrict-volatile-bitfields -fsync-libcalls -fthread-jumps
# -ftoplevel-reorder -ftree-bit-ccp -ftree-builtin-call-dce -ftree-ccp
# -ftree-ch -ftree-coalesce-vars -ftree-copy-prop -ftree-cselim -ftree-dce
# -ftree-dominator-opts -ftree-dse -ftree-forwprop -ftree-fre
# -ftree-loop-if-convert -ftree-loop-im -ftree-loop-ivcanon
# -ftree-loop-optimize -ftree-parallelize-loops= -ftree-phiprop -ftree-pre
# -ftree-pta -ftree-reassoc -ftree-scev-cprop -ftree-sink -ftree-slsr
# -ftree-sra -ftree-switch-conversion -ftree-tail-merge -ftree-ter
# -ftree-vrp -funit-at-a-time -funsafe-math-optimizations -fverbose-asm
# -fzero-initialized-in-bss -m128bit-long-double -m64 -m80387
# -maccumulate-outgoing-args -malign-stringops -mcx16 -mfancy-math-387
# -mfp-ret-in-387 -mfxsr -mglibc -mlong-double-80 -mmmx -mno-sse4
# -mpush-args -mred-zone -msse -msse2 -msse3 -mstv -mtls-direct-seg-refs
# -mvzeroupper

	.text
	.section	.rodata._start.str1.1,"aMS",@progbits,1
.LC0:
	.string	"f"
	.section	.text._start,"ax",@progbits
	.globl	_start
	.type	_start, @function
_start:
	pushq	%r12	#
	pushq	%rbp	#
	pushq	%rbx	#
	subq	$64, %rsp	#,
# main.c:20:     asm ("sub $8, %rsp\n");
#APP
# 20 "main.c" 1
	sub $8, %rsp

# 0 "" 2
# main.c:23:     SDL_Init(SDL_INIT_EVERYTHING);
#NO_APP
	movl	$62001, %edi	#,
	call	*SDL_Init@GOTPCREL(%rip)	#
# main.c:24:     SDL_Window *window=SDL_CreateWindow(NULL,0,0,WIDTH,HEIGHT,SDL_WINDOW_OPENGL);
	movl	$2, %r9d	#,
	movl	$1080, %r8d	#,
	movl	$1920, %ecx	#,
	xorl	%edx, %edx	#
	xorl	%esi, %esi	#
	xorl	%edi, %edi	#
	call	*SDL_CreateWindow@GOTPCREL(%rip)	#
	movq	%rax, %r12	#, window
# main.c:25:     SDL_GL_CreateContext(window);
	movq	%rax, %rdi	# window,
	call	*SDL_GL_CreateContext@GOTPCREL(%rip)	#
# main.c:26:     const GLuint f = glCreateShader(GL_FRAGMENT_SHADER);
	movl	$35632, %edi	#,
	xorl	%eax, %eax	#
	call	*glCreateShader@GOTPCREL(%rip)	#
	movl	%eax, %ebp	#, _1
# main.c:27: 	glShaderSource(f, 1, &shader_frag, NULL);
	xorl	%ecx, %ecx	#
	movl	$shader_frag, %edx	#,
	movl	$1, %esi	#,
	movl	%eax, %edi	# _1,
	xorl	%eax, %eax	#
	call	*glShaderSource@GOTPCREL(%rip)	#
# main.c:28: 	glCompileShader(f);
	movl	%ebp, %edi	# _1,
	xorl	%eax, %eax	#
	call	*glCompileShader@GOTPCREL(%rip)	#
# main.c:46: 	const GLuint p = glCreateProgram();
	xorl	%eax, %eax	#
	call	*glCreateProgram@GOTPCREL(%rip)	#
	movl	%eax, %ebx	#, _2
# main.c:47: 	glAttachShader(p,f);
	movl	%ebp, %esi	# _1,
	movl	%eax, %edi	# _2,
	xorl	%eax, %eax	#
	call	*glAttachShader@GOTPCREL(%rip)	#
# main.c:48: 	glLinkProgram(p);
	movl	%ebx, %edi	# _2,
	xorl	%eax, %eax	#
	call	*glLinkProgram@GOTPCREL(%rip)	#
# main.c:67: 	glUseProgram(p);
	movl	%ebx, %edi	# _2,
	xorl	%eax, %eax	#
	call	*glUseProgram@GOTPCREL(%rip)	#
# main.c:69: 	const GLint runtimePOS = glGetUniformLocation( p, VAR_RUNTIME ); 
	movl	$.LC0, %esi	#,
	movl	%ebx, %edi	# _2,
	xorl	%eax, %eax	#
	call	*glGetUniformLocation@GOTPCREL(%rip)	#
	movl	%eax, %ebx	#, runtimePOS
.L2:
# main.c:81:         while(SDL_PollEvent(&event))
	leaq	8(%rsp), %rdi	#, tmp98
	call	*SDL_PollEvent@GOTPCREL(%rip)	#
# main.c:81:         while(SDL_PollEvent(&event))
	testl	%eax, %eax	# _5
	je	.L7	#,
# main.c:83:             if((event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE))
	cmpl	$768, 8(%rsp)	#, event.type
	jne	.L2	#,
# main.c:83:             if((event.type == SDL_KEYDOWN && event.key.keysym.sym == SDLK_ESCAPE))
	cmpl	$27, 28(%rsp)	#, event.key.keysym.sym
	jne	.L2	#,
# main.c:85:                 asm volatile(".intel_syntax noprefix;push 231;pop rax;xor edi, edi;syscall;.att_syntax prefix");
#APP
# 85 "main.c" 1
	.intel_syntax noprefix;push 231;pop rax;xor edi, edi;syscall;.att_syntax prefix
# 0 "" 2
#NO_APP
	jmp	.L2	#
.L7:
# main.c:13:         glUniform1i(runtimePOS,SDL_GetTicks());
	call	*SDL_GetTicks@GOTPCREL(%rip)	#
	movl	%eax, %esi	# _28,
	movl	%ebx, %edi	# runtimePOS,
	xorl	%eax, %eax	#
	call	*glUniform1i@GOTPCREL(%rip)	#
# main.c:14:         glRecti(-1,-1,1,1);
	movl	$1, %ecx	#,
	movl	$1, %edx	#,
	orl	$-1, %esi	#,
	movl	%esi, %edi	#,
	call	*glRecti@GOTPCREL(%rip)	#
# main.c:15:         SDL_GL_SwapWindow(window);
	movq	%r12, %rdi	# window,
	call	*SDL_GL_SwapWindow@GOTPCREL(%rip)	#
	jmp	.L2	#
	.size	_start, .-_start
	.globl	shader_frag
	.section	.rodata.str1.1,"aMS",@progbits,1
.LC1:
	.ascii	"uniform int f;vec2 m=vec2(1920,1080);vec3 v;float t(vec2 m){"
	.ascii	"return m=fract(m*vec2(233.34,851.74))+dot(m,m+23.45),fract(m"
	.ascii	".x*m.y);}mat2 x(float m){return mat2(cos(m),sin(m),-sin(m),c"
	.ascii	"os(m));}void main(){float i=f*.001;vec2 s=(2*gl_FragCoord.xy"
	.ascii	"-m)/m.y+vec2(1.+2*cos(i/2),2*sin(i/10))*.5*x(i/10);for(int y"
	.ascii	"=0;y<5;y++){float l=fract(y*.2+i/10),c=smoothstep(0.,.5,l)*s"
	.ascii	"moothstep(1.,.8,l);vec2 z=s;float e,d,o=.5;for(int r=0;r<8;r"
	.ascii	"++){vec2 a=ceil(z),n=fract(z)*fract(z)*(3-2*fract(z));float "
	.ascii	"g=t(a),h=t(a+vec2(1,0)),u=t(a+vec2(0,1)),p=t(a+vec2(1,1));e+"
	.ascii	"=o*mix(mix(g,h,n.x),mix(u,p,n.x),n.y);d+=o;o/=2;z*=2;}v+=e/d"
	.ascii	"*.5*mix(vec3(0,.5,.5),vec3(1,.5,0),c);vec2 a=(x(y*3.14)*s*mi"
	.ascii	"x(5.,.1,l)+y)*4,n=floor(a),h"
	.string	"=fract(a)-.5,u=sin(vec2(t(n),t(n+t(n)))*25.)*.3;v+=mix(vec3(0,0,1),vec3(1,.4,0),mix(0,1,l))*(1.-smoothstep(.3*t(n),.3*t(n)+.05,length(h-u)))*(1./dot((u-h)*25,(u-h)*25))*(.7*t(n))*c+mix(.8*sin(i/5)*vec3(.5,.2,0),vec3(0),length(.5+s/2));}gl_FragColor.xyz=v;}"
	.section	.data.shader_frag,"aw"
	.align 8
	.type	shader_frag, @object
	.size	shader_frag, 8
shader_frag:
	.quad	.LC1
