<script setup lang="ts">
// No import needed! useScrollProgress is auto-imported by Nuxt.
const { isVisible, dashOffset, circumference, radius, scrollToTop } =
 useScrollProgress(400);
</script>

<template>
 <button
  class="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border-none bg-zinc-950 text-green-600 shadow-lg cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] md:flex hidden"
  :class="
   isVisible
    ? 'opacity-100 translate-y-0 visible'
    : 'opacity-0 translate-y-5 invisible'
  "
  @click="scrollToTop"
 >
  <svg class="absolute left-0 top-0 -rotate-90" width="48" height="48">
   <circle
    class="transition-[stroke-dashoffset] duration-100 linear"
    stroke="currentColor"
    stroke-width="3"
    fill="transparent"
    :r="radius"
    cx="24"
    cy="24"
    :style="{
     strokeDasharray: `${circumference} ${circumference}`,
     strokeDashoffset: dashOffset,
    }"
   />
  </svg>

  <svg
   class="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
   viewBox="0 0 24 24"
   width="20"
   height="20"
   fill="none"
   stroke="currentColor"
   stroke-width="2"
  >
   <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
 </button>
</template>

<style scoped>
/* Look mom, no CSS! All styles have been migrated to Tailwind. */
</style>
