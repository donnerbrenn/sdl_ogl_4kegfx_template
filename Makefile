CC = cc-8

SHADERPATH=shaders
SHADER=stars.frag

CFLAGS = -Os -s -march=nocona  -fverbose-asm
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

LIBS=-lSDL2 -lGL
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
LDFLAGS+=-Wl,-flto 
LDFLAGS+=-Wl,-z,nodynamic-undefined-weak
LDFLAGS+=-Wl,-z,noseparate-code 
# LDFLAGS+=-fuse-ld=gold

STRIP=-R .gnu.hash
STRIP+=-R .comment
STRIP+=-R .note.GNU-stack
# STRIP+=-R .data
STRIP+=-R .note.gnu.gold-version
STRIP+=-R .note
STRIP+=-R .note.ABI-tag
STRIP+=-R .shstrtab
STRIP+=-R .eh_frame
STRIP+=-R .eh_frame_hdr
STRIP+=-R .got
STRIP+=-R .got.plt
STRIP+=-R .bss
STRIP+=-R .shstrtab  
STRIP+=-R .init
STRIP+=-R .fini
STRIP+=-R .hash
STRIP+=-R .init_array 
STRIP+=-R .fini_array 

shader.h: $(SHADERPATH)/$(SHADER)
	cp $< shader.frag
	mono ./shader_minifier.exe shader.frag -o $@ #--smoothstep

main.S: main.c shader.h
	$(CC) $(CFLAGS) $(LDFLAGS) -S $< -o $@
	grep -v 'GCC:\|note.GNU-stack' $@ > $@.temp
	mv $@.temp $@

main.o: main.S
	$(CC) $(CFLAGS) $(LDFLAGS) -c $< -o $@
	# rm $^

main.elf: main.o
	$(CC) $(CFLAGS) $(LDFLAGS) $< -o $@
	rm $^
	wc -c $@


main.stripped: main.elf
	sed -i 's/_edata/\x00\x00\x00\x00\x00\x00/g' $<;
	sed -i 's/__bss_start/\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00/g' $<;
	sed -i 's/_end/\x00\x00\x00\x00/g' $<;
	sed -i 's/GLIBC_2\.2\.5/\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00/g' $<;
	strip $(STRIP) $<
	readelf -S $<
	./noelfver $< > $@
	sstrip -z $@
	rm $^
	wc -c $@


main.xz: main.stripped
	python3 ./opt_lzma.py $< -o $@
	rm $^

vondehi.elf: vondehi/vondehi.asm
	nasm -fbin  -DNO_CHEATING -DNO_UBUNTU_COMPAT -o $@ $<

main: vondehi.elf main.xz
	cat $^ > $@
	chmod +x $@
	rm $^
	wc -c $@

all: main

default: all

clean: 
	-rm -f main.o main.S main.elf main.stripped main.xz vondehi.elf shader.h