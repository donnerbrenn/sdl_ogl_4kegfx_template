OUTPUT_ARCH(i386:x86-64)
ENTRY(_start)
SEARCH_DIR("/lib"); 
SECTIONS
{
  PROVIDE (__executable_start = SEGMENT_START("text-segment", 0x10000)); . = SEGMENT_START("text-segment", 0x10000) + SIZEOF_HEADERS; . = ALIGN(1) + (. & (1-1));
  .dynamic          : {*(.dynamic*)}
  .dynsym           : {*(.dynsym*)}
  .rela.got         : {*(.rela.got*)}
  .data             : {*(.data*)}
  .text             : {*(.text*) *(.rodata*)}
  .interp           : {*(.interp*)}
  .dynstr           : {*(.dynstr*)}
  .crap             : {*(.bss*) *(.got*) *(.hash*) *(.plt*)} 
  /DISCARD/         : {*(.gnu.version_r*) *(.shstrtab*) *(.gnu.version*)  *(.eh_frame*) *(.comment*) *(.note*)}
}
