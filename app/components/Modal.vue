<script setup>
defineEmits(["close"]);
</script>

<template>
 <div
  class="fixed inset-0 flex items-center justify-center z-[10004] p-2 animate-(--animate-fade-in) modal-overlay sm:p-4"
  @click.self="$emit('close')"
 >
  <div
   class="bg-slate-800 rounded-lg px-6 py-10 max-w-[600px] w-full max-h-[90vh] overflow-y-auto relative animate-(--animate-slide-up) md:p-0"
  >
   <button
    class="absolute top-8 right-8 bg-transparent border-none text-slate-100 cursor-pointer p-2 flex items-center justify-center rounded-full transition-(--transition) hover:bg-amber-100 hover:text-slate-700"
    @click="$emit('close')"
    aria-label="Close modal"
   >
    <svg
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
    >
     <line x1="18" y1="6" x2="6" y2="18"></line>
     <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
   </button>
   <slot />
  </div>
 </div>
</template>
<style>
.modal-overlay {
 background-color: color-mix(in srgb, black 70%, transparent);
}
body.no-scroll {
 overflow: hidden;
}
</style>
