CC = cc

SHADERPATH=shaders
SHADER=basic.frag

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

SMOLARGS= -fuse-interp -falign-stack -funsafe-dynamic -fuse-dt-debug -fno-start-arg --det
smol.elf: main.o
	python3 ./smol/smold.py --smolrt "smol/rt" --smolld "smol/ld" $(SMOLARGS) $(LIBS) $< $@
	@stat --printf="$@: %s bytes\n" $@

VNDH_FLAGS :=-l -v --vndh vondehi #--vndh_unibin
main: smol.elf
	./autovndh.py $(VNDH_FLAGS) "$<" > "$@"
	chmod +x $@
	@stat --printf="$@: %s bytes\n" $@

heatmap: smol.elf
	./autovndh.py $(VNDH_FLAGS) --nostub "$<" > "/tmp/$@"
	./tools/LZMA-Vizualizer/LzmaSpec "/tmp/$@"
	rm /tmp/$@

all: main

clean: 
	-rm -f main.o main.S main.elf main.stripped main.xz vondehi.elf shader.h
	-rm smol.elf smol.asm smol.o
