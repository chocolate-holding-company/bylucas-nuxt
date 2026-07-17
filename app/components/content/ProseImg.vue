<template>
 <!--
    We use <span> (inline) instead of <figure> (block) so it is valid HTML inside <p>.
    Using Tailwind's "block" class makes it look and behave exactly like a figure.
  -->
 <span class="block my-8 not-prose text-center">
  <img
   :src="refinedSrc"
   :alt="alt"
   :width="width"
   :height="height"
   class="mx-auto rounded-xl shadow-md max-w-full"
  />
  <!--
      We use <span> styled as block to replace <figcaption>
    -->
  <span
   v-if="alt"
   class="block mt-3 text-center text-base text-(--caption)/60 font-medium italic"
  >
   {{ alt }}
  </span>
 </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "ufo";
import { useRuntimeConfig } from "#app";

const props = defineProps({
 src: { type: String, default: "" },
 alt: { type: String, default: "" },
 width: { type: [String, Number], default: undefined },
 height: { type: [String, Number], default: undefined },
});

const refinedSrc = computed(() => {
 if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
  const config = useRuntimeConfig();
  return withBase(props.src, config.app.baseURL);
 }
 return props.src;
});
</script>
