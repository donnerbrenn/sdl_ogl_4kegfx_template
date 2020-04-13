CC = cc-8

SHADERPATH=shaders
SHADER=ribbon.frag

LIBS=-lSDL2 -lGL 

CFLAGS=
# CFLAGS+= -lc -DDEBUG
CFLAGS+= -DRUNTIME
CFLAGS+= -Os -s -march=nocona -fverbose-asm 
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
# CFLAGS+=-flto

LDFLAGS=$(LIBS)
LDFLAGS+=-nostartfiles -nostdlib -nodefaultlibs
LDFLAGS+=-Wl,--build-id=none 
LDFLAGS+=-Wl,-z,norelro
LDFLAGS+=-Wl,-z,nocombreloc
LDFLAGS+=-Wl,--gc-sections 
LDFLAGS+=-Wl,--hash-style=sysv
LDFLAGS+=-Wl,--no-ld-generated-unwind-info
LDFLAGS+=-Wl,--no-eh-frame-hdr
LDFLAGS+=-Wl,--hash-style=sysv
LDFLAGS+=-no-pie -fno-pic
LDFLAGS+=-Wl,--whole-archive
LDFLAGS+=-Wl,--print-gc-sections
LDFLAGS+=-Wl,--spare-dynamic-tags=6
# LDFLAGS+=-Wl,-flto 
LDFLAGS+=-Wl,-z,nodynamic-undefined-weak
LDFLAGS+=-Wl,-z,noseparate-code 
LDFLAGS+=-Wl,--spare-dynamic-tags=4 -T linker.ld


default: all

shader.h: $(SHADERPATH)/$(SHADER)
	cp $< shader.frag
	mono ./tools/shader_minifier.exe shader.frag -o $@ #--smoothstep
	rm shader.frag

main.S: main.c shader.h
	$(CC) $(CFLAGS) $(LDFLAGS) -S $< -o $@
	grep -v 'GCC:\|note.GNU-stack' $@ > $@.temp
	mv $@.temp $@

main.o: main.S
	$(CC) $(CFLAGS) $(LDFLAGS) -c $< -o $@
	rm $^

main.elf: main.o
	$(CC) $(CFLAGS) $(LDFLAGS) $< -o $@
	rm $^
	wc -c $@

main.stripped: main.elf
	strip -R .crap $<
	readelf -S $<
	./tools/noelfver $< > $@
	./tools/Section-Header-Stripper/section-stripper.py $@
	rm $^
	wc -c $@

main.xz: main.stripped
	python3 ./tools/opt_lzma.py $< -o $@
	# rm $^

vondehi.elf: vondehi/vondehi.asm
	nasm -fbin  -DNO_CHEATING -DNO_UBUNTU_COMPAT -o $@ $<

VNDH_FLAGS :=-l -v --vndh vondehi --vndh_unibin
main: main.stripped
	./autovndh.py $(VNDH_FLAGS) "$<" > "$@"
	# ./tools/nicer.py $< -o $<.lzma
	# ./tools/LZMA-Vizualizer/LzmaSpec $<.lzma
	chmod +x $@
	wc -c $@

main.cmix: main.stripped
	cmix -c $< $@.cm
	cat cmix/cmixdropper.sh $@.cm > $@
	rm $@.cm
	chmod +x $@
	wc -c $@

all: main #main.cmix

clean: 
	-rm -f main.o main.S main.elf main.stripped main.xz vondehi.elf shader.h