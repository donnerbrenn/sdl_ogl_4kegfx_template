CC = cc

EXE =main

SHADERPATH=shaders
SHADER=basic.frag

LIBS=-lSDL2 -lGL# -lc

CFLAGS=  -Os -s -march=nocona
CFLAGS+= -fno-plt
CFLAGS+= -fno-stack-protector -fno-stack-check
CFLAGS+= -fno-unwind-tables -fno-asynchronous-unwind-tables -fno-exceptions
CFLAGS+= -funsafe-math-optimizations -ffast-math
CFLAGS+= -fomit-frame-pointer
CFLAGS+= -ffunction-sections -fdata-sections 
CFLAGS+= -fmerge-all-constants 
CFLAGS+= -fno-PIC #-fno-PIE
CFLAGS+= -std=gnu89
CFLAGS+= -malign-data=cacheline
CFLAGS+= -mno-fancy-math-387 -mno-ieee-fp -flto

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
	objcopy $@ --set-section-alignment *=1 -g -x -X -S --strip-unneeded -R .comment -R .data


SMOLARGS= -fuse-interp -falign-stack -funsafe-dynamic -fuse-dt-debug -fno-start-arg --det
smol.elf: main.o
	python3 ./smol/smold.py --smolrt "smol/rt" --smolld "smol/ld" $(SMOLARGS) $(LIBS) $< $@
	@stat --printf="$@: %s bytes\n" $@

main.elf: main.c shader.h
	$(CC) -DALIGN $(LIBS) -nostartfiles $< -o $@
	@stat --printf="$@: %s bytes\n" $@

VNDH_FLAGS :=-l -v --vndh vondehi# --vndh_unibin
$(EXE): smol.elf
	./autovndh.py $(VNDH_FLAGS) "$<" > $@
	chmod +x $@
	@stat --printf="$@: %s bytes\n" $@

smol.lzma: smol.elf
	./autovndh.py $(VNDH_FLAGS) --nostub "$<" > $@
	wc -c $@

heatmap: smol.elf
	./autovndh.py $(VNDH_FLAGS) --nostub "$<" > "/tmp/$@"
	./tools/LZMA-Vizualizer/LzmaSpec "/tmp/$@"
	@stat --printf="$@: %s bytes\n" /tmp/$@
	rm /tmp/$@

clean: 
	-rm -f main.gz main.elf main.o main.S main.elf main.stripped main.xz vondehi.elf shader.h smol.elf $(EXE)

main.cmix: smol.elf
	cmix -c $< /tmp/$@
	cat cmixdropper.sh /tmp/$@ > $@
	chmod +x $@ 
	@stat --printf="$@: %s bytes\n" $@

main.gz: smol.elf
	cat $< | 7z a dummy -tGZip -mx=9 -si -so > /tmp/$@
	cat unpack_header /tmp/$@ > $@
	chmod +x $@
	@stat --printf="$@: %s bytes\n" $@


main.sh: smol.elf
	./autovndh.py $(VNDH_FLAGS) -n "$<" > /tmp/$@
	cat shelldropper.sh /tmp/$@ > $@
	chmod +x $@
	@stat --printf="$@: %s bytes\n" $@

all: $(EXE)

run: $(EXE)
	./$(EXE)

default: all