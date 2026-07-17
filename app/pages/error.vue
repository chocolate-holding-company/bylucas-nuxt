<template>
 <div class="h-[50vh] flex flex-col items-center justify-center">
  <h3 class="text-3xl text-red-700 md:text-4xl">{{ error.statusCode }}</h3>
  <p class="text-lg tracking-wide font-semibold md:text-2xl">
   {{ error.message }}
  </p>
  <button
   class="text-lg tracking-wide italic hover:text-blue-600 hover:underline md:text-2xl"
   @click="handleError"
  >
   Go Home...
  </button>
 </div>
</template>

<script setup>
defineProps({
 error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
