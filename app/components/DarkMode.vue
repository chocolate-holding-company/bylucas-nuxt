<template>
 <button
  type="button"
  @click="toggleColorMode"
  class="relative p-6 my-5 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-yellow-400 transition-colors duration-300 dark:ring-zinc-700 active:scale-90"
  aria-label="Toggle Dark Mode"
 >
  <span v-if="colorMode.value">
   <svg
    v-if="colorMode.value === 'light'"
    class="absolute inset-0 m-auto w-6 h-6 transition-all duration-500 transform dark:opacity-0 dark:-rotate-90 opacity-100 rotate-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    stroke-width="2"
   >
    <path
     stroke-linecap="round"
     stroke-linejoin="round"
     d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
    ></path>
   </svg>

   <svg
    v-else
    class="absolute inset-0 m-auto w-6 h-6 transition-all duration-500 transform dark:opacity-100 dark:rotate-0 opacity-0 rotate-90"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    stroke-width="2"
   >
    <path
     stroke-linecap="round"
     stroke-linejoin="round"
     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
    ></path>
   </svg>
  </span>
 </button>
</template>

<script setup>
const colorMode = useColorMode();

const toggleColorMode = () => {
 colorMode.preference = colorMode.value === "light" ? "dark" : "light";
};
</script>
