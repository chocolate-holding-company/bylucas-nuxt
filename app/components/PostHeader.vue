<template>
 <transition name="fade" mode="out-in">
  <header
   id="post-header"
   class="relative h-[70vh] min-h-125 flex items-end overflow-hidden bg-black"
  >
   <img
    id="header-image"
    :src="post.image"
    alt="post.title header image"
    class="absolute inset-0 w-full h-full object-cover opacity-60"
   />
   <div class="inner">
    <div class="relative z-10 max-w-5xl mx-auto pb-16 text-white">
     <span
      id="post-category"
      class="bg-rose-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block tracking-widest"
      >{{ post.category }}</span
     >
     <h1 id="post-title" class="mb-6 leading-tight text-gray-200 font-black">
      {{ post.title }}
     </h1>
     <p
      id="post-summary"
      class="text-gray-200 text-lead-fluid mb-8 font-medium"
     >
      {{ post.description }}
     </p>
     <div class="text-sm font-medium border-l-4 border-rose-800 pl-4">
      <div class="ml-auto">
       <p
        class="text-gray-200 uppercase text-[10px] font-black tracking-widest"
       >
        Published
       </p>
       <p id="post-date" class="text-xs md:text-sm text-gray-200">
        {{ formatDate(post.date) }}
       </p>
      </div>
     </div>
    </div>
   </div>
  </header>
 </transition>
</template>

<script setup>
import { computed } from "vue";
import { blogPosts } from "~/data/blogPosts";

const route = useRoute();

const postsSorted = [...blogPosts].sort(
 (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const post = computed(() => postsSorted.find((p) => p._path === route.path));

if (!post.value) {
 throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

const formatDate = (dateString) => {
 const options = { year: "numeric", month: "long", day: "numeric" };
 return new Date(dateString).toLocaleDateString("en-GB", options);
};

useHead({
 title: post.value.title,
 meta: [{ name: "description", content: post.value.seo_description }],
});
</script>
