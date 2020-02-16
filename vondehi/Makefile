
default: test

testbin: hello.c #test.c
	$(CC) -O3 -s -o "$@" "$<" #-static -nostdlib -nostartfiles

%.gz: %
	< "$<" gzip -cnk9 > "$@"
%.lzma: %
	< "$<" lzma --format=lzma -9 --extreme --lzma1=preset=9,lc=1,lp=0,pb=0 --keep --stdout > "$@"

vondehi: vondehi.asm
	nasm -fbin -DNO_CHEATING -o"$@" "$<"
	chmod +x "$@"

test: vondehi testbin.lzma
	-cat $^ > test && chmod +x test && strace -f ./test
	wc -c "$<"

.PHONY: default test

