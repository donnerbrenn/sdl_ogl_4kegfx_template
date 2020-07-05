CC = cc

SHADERPATH=shaders
SHADER=blackle.frag

LIBS=-lSDL2 -lGL -lc

CFLAGS=  -Os -s -march=nocona
CFLAGS+= -fno-plt
CFLAGS+= -fno-stack-protector -fno-stack-check
CFLAGS+= -fno-unwind-tables -fno-asynchronous-unwind-tables -fno-exceptions
CFLAGS+= -funsafe-math-optimizations -ffast-math
CFLAGS+= -fomit-frame-pointer
CFLAGS+= -ffunction-sections -fdata-sections 
CFLAGS+= -fmerge-all-constants 
CFLAGS+= -fno-PIC -fno-PIE
CFLAGS+= -std=gnu11
CFLAGS+= -malign-data=cacheline
CFLAGS+= -mno-fancy-math-387 -mno-ieee-fp 

# uncomment this line to get fullscreen rendering
# CFLAGS+= -DFULLSCREEN

# Activate Debug mode here
# CFLAGS+= -DDEBUG

default: all

shader.h: $(SHADERPATH)/$(SHADER)
	cp $< shader.frag
	mono ./tools/shader_minifier.exe shader.frag -o $@  #--smoothstep
	rm shader.frag
	
main.o: main.c shader.h
	$(CC) $(CFLAGS) -c $< -o $@

smol.asm: main.o
	./smol/src/smol.py --det $(LIBS) $< $@

smol.o: smol.asm
	nasm -I smol/rt/ -f elf64 -o $@ $< -DALIGN_STACK -DUSE_INTERP -DUSE_DNLOAD_LOADER -DUSE_DT_DEBUG -DUNSAFE_DYNAMIC -DNO_START_ARG

smol.elf: smol.o main.o
	ld -T smol/ld/link.ld --oformat=binary -o $@ $^
	wc -c $@

main.xz: smol.elf
	python3 ./tools/opt_lzma.py $< -o $@

VNDH_FLAGS :=-l -v --vndh vondehi --vndh_unibin
main: smol.elf
	./autovndh.py $(VNDH_FLAGS) "$<" > "$@"
	chmod +x $@
	wc -c $@

heatmap: smol.elf
	./autovndh.py $(VNDH_FLAGS) --nostub "$<" > "/tmp/$@"
	./tools/LZMA-Vizualizer/LzmaSpec "/tmp/$@"
	rm /tmp/$@

main.cmix: smol.elf
	cmix -c $< $@.cm
	cat cmix/cmixdropper.sh $@.cm > $@
	rm $@.cm
	chmod +x $@
	wc -c $@

all: main

clean: 
	-rm -f main.o main.S main.elf main.stripped main.xz vondehi.elf shader.h
	-rm smol.elf smol.asm smol.o