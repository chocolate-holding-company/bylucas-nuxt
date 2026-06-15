<script setup lang="ts">
// No import needed! useScrollProgress is auto-imported by Nuxt.
const { progress } = useScrollProgress();
</script>

<template>
 <div class="fixed left-0 top-0 z-[100] h-1 w-full bg-black/10">
  <div
   class="h-full w-full origin-left bg-[#00dc82] transition-transform duration-100 ease-linear"
   :style="{ transform: `scaleX(${progress})` }"
  ></div>
 </div>
</template>

<style scoped>
/* Look mom, no CSS! All styles have been migrated to Tailwind. */
</style>
