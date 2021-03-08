SHADERPATH=shaders
SHADER=white.frag

CC=gcc-8
USELTO=false
ALIGNSTACK=false
#dlfixup or dnload
SMOLLOADER=dlfixup


OBJDIR := obj
BINDIR := bin
RTDIR := rt
SRCDIR:= src
SCRIPTS:= scripts




NASM ?= nasm
OBJCOPY ?= objcopy



BITS ?= 64#$(shell getconf LONG_BIT)

COPTFLAGS= -Os -march=nocona -DWIDTH=1920 -DHEIGHT=1080
COPTFLAGS+= -fno-plt -fno-stack-protector -fno-stack-check -fno-unwind-tables \
	-fno-asynchronous-unwind-tables -fomit-frame-pointer -ffast-math -no-pie \
	-fno-pic -fno-PIE -ffunction-sections -fdata-sections -fmerge-all-constants \
	-funsafe-math-optimizations -malign-data=cacheline -fsingle-precision-constant \
	-fwhole-program -fno-exceptions -fvisibility=hidden \
      -mno-fancy-math-387 -mno-ieee-fp  #-flto 

CFLAGS = -std=gnu11 -nodefaultlibs -fno-PIC $(COPTFLAGS) -m$(BITS)
CFLAGS += -Wall -Wextra -Wpedantic
# CFLAGS+=-DDEBUG


LIBS = -lSDL2 -lGL  -lc

PWD ?= .

SMOLFLAGS = --smolrt "$(PWD)/smol/rt" --smolld "$(PWD)/smol/ld" \
	-c -fuse-$(SMOLLOADER)-loader -fno-start-arg -fno-ifunc-support -fuse-dt-debug -funsafe-dynamic 

	# --verbose 

PYTHON3 ?= python3

all: vndh #heatmap
	

$(BINDIR)/main: $(BINDIR)/main.smol
	./autovndh.py $(VNDH_FLAGS) $< > $@
	chmod +x $@

clean:
	@$(RM) -vrf $(OBJDIR) $(BINDIR) $(SRCDIR)/shader.h vshader.h

%/:
	@mkdir -vp "$@"

.SECONDARY:

$(SRCDIR)/shader.h: $(SHADERPATH)/$(SHADER)
	cp $< shader.frag

	mono ./tools/shader_minifier.exe shader.frag --no-renaming-list ss,main -o $@
	rm shader.frag

$(OBJDIR)/%.o: $(SRCDIR)/shader.h $(SRCDIR)/%.c $(OBJDIR)/
ifeq ($(USELTO),true)
	$(CC) $(CFLAGS) -flto -c $(SRCDIR)/main.c -o "$@"
else
	$(CC) $(CFLAGS) -c $(SRCDIR)/main.c -o "$@"
endif
	$(OBJCOPY) $@ --set-section-alignment *=1 -g -x -X -S --strip-unneeded
	size $@

VNDH_FLAGS :=-l -v --vndh vondehi #--vndh_unibin
$(BINDIR)/%.dbg $(BINDIR)/%.smol: $(OBJDIR)/%.o $(BINDIR)/
ifeq ($(ALIGNSTACK),true)
	$(PYTHON3) ./smol/smold.py -falign-stack --debugout "$@.dbg" $(SMOLFLAGS) --ldflags=-Wl,-Map=$(BINDIR)/$*.map $(LIBS) "$<" "$@"
else
	$(PYTHON3) ./smol/smold.py -fno-align-stack --debugout "$@.dbg" $(SMOLFLAGS) --ldflags=-Wl,-Map=$(BINDIR)/$*.map $(LIBS) "$<" "$@"
endif
	$(PYTHON3) ./smol/smoltrunc.py "$@" "$(OBJDIR)/$(notdir $@)" && mv "$(OBJDIR)/$(notdir $@)" "$@" && chmod +x "$@"
	wc -c $@

$(BINDIR)/%.lzma: $(BINDIR)/main.smol
	./autovndh.py $(VNDH_FLAGS) --nostub  "$<" > "$@"
	rm $<

heatmap: $(BINDIR)/%.lzma
	../LZMA-Vizualizer/LzmaSpec $<
	@stat --printf="$@: %s bytes\n" $<
	rm $<

$(BINDIR)/main.sh: $(SCRIPTS)/shelldropper.sh $(BINDIR)/main.lzma
	cat $^ > $@
	chmod +x $@



xlink: $(BINDIR)/main.smol
	cat $< | ~/coding/xlink/bin/xlink
	# chmod +x $@

cmix: $(BINDIR)/main.cmix
	wc -c $<

vndh: $(BINDIR)/main
	wc -c $<
	

sh: $(BINDIR)/main.sh
	wc -c $<

$(BINDIR)/main.cmix: $(BINDIR)/main.smol
	cmix -c $< $@.cm
	cat $(SCRIPTS)/cmixdropper.sh $@.cm > $@
	rm $@.cm
	chmod +x $@
	@stat --printf="$@: %s bytes\n" $@


.PHONY: all clean

