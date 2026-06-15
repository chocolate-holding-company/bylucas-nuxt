<script setup lang="ts">
// Define the structure of your blog post data
interface Post {
 _path: string;
 title: string;
 description: string;
 image: string;
 category: string;
 date: string;
}

const props = defineProps<{
 post: Post;
 index: number;
}>();

const { observe } = useReveal();
const cardRef = ref<HTMLElement | null>(null);

// Utility for date formatting
const formatDate = (dateString: string) => {
 const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
 };
 return new Date(dateString).toLocaleDateString("en-GB", options);
};

onMounted(() => {
 if (cardRef.value) observe(cardRef.value);
});
</script>

<template>
 <article
  ref="cardRef"
  class="post-card group cursor-pointer bg-(--card-bg) border border-slate-300 rounded-xl overflow-hidden shadow-[0_2px_8px_var(--shadow)] hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
  :style="{ 'transition-delay': `${(index % 3) * 0.15}s` }"
  @click="navigateTo(props.post._path)"
 >
  <div class="relative overflow-hidden rounded-t-lg h-[200px]">
   <img
    class="w-full h-full object-cover transition-(--transition) duration-500 ease-in-out group-hover:scale-105"
    :src="props.post.image"
    :alt="props.post.title"
    loading="lazy"
   />
   <div
    class="absolute top-3 right-3 bg-(--primary) text-white py-1.25 px-2.5 rounded-lg text-sm font-medium"
   >
    {{ props.post.category }}
   </div>
  </div>

  <div class="p-4">
   <h3 class="mb-2 text-xl text-slate-600 font-semibold">
    {{ props.post.title }}
   </h3>
   <p class="text-(--page-text) text-base overflow-hidden mb-3 line-clamp-3">
    {{ props.post.description }}
   </p>
   <div
    class="text-[0.875rem] text-[#999] pt-3 border-t-2 border-t-solid border-t-slate-200 font-medium"
   >
    <span class="post-date">{{ formatDate(props.post.date) }}</span>
   </div>
  </div>
 </article>
</template>

<style scoped>
/* Dedicated styles for the JS scroll-reveal hook */
.post-card {
 opacity: 0;
 transform: translateY(30px);
 transition:
  opacity 0.8s cubic-bezier(0.2, 1, 0.3, 1),
  transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
}

.post-card.reveal-active {
 opacity: 1;
 transform: translateY(0);
}
</style>
