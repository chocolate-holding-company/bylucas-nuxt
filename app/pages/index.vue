<template>
 <ProgressBar />
 <section
  class="bg-gradient-to-b from-rose-800/70 to-red-900/90 py-30 text-center"
 >
  <div class="inner">
   <div class="max-w-200 mx-auto">
    <h1 class="text-slate-50 font-bold mb-4 hero-title">
     Hill Walking Made Easy
    </h1>
    <p
     class="text-lead-fluid text-slate-50 opacity-95 leading-8 hero-description"
    >
     Discover expert guides, essential tips, and inspiring routes to make your
     hill walking adventures safe, enjoyable, and unforgettable.
    </p>
   </div>
  </div>
 </section>

 <section class="py-30">
  <div class="inner">
   <div class="mb-6 text-center">
    <h2 class="mb-10 font-bold">Explore Our Guides</h2>
    <div class="flex flex-wrap gap-3 justify-center mb-16">
     <button
      class="py-2 px-3 but-primary"
      :class="{ 'bg-(--primary) text-white': selectedCategory === 'All' }"
      @click="filterPosts('All')"
     >
      All Posts
     </button>

     <button
      v-for="category in categories"
      :key="category"
      class="py-2 px-3 but-primary"
      :class="{ 'bg-(--primary) text-white': selectedCategory === category }"
      @click="filterPosts(category)"
     >
      {{ category }}
     </button>
    </div>
   </div>

   <div
    class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 md:gap-7 mb-6"
   >
    <PostCard
     v-for="(post, index) in displayedPosts"
     :key="post._path"
     :post="post"
     :index="index"
    />
   </div>
   <div class="text-center pt-6">
    <LoadingSpinner v-if="isLoading" />

    <button
     v-else-if="hasMorePosts"
     class="but-primary py-2 px-2.5"
     @click="loadMore"
    >
     Load More Posts
    </button>
   </div>
  </div>
 </section>
 <Footer />
 <BackTop />
</template>

<script setup lang="ts">
import { blogPosts } from "~/data/blogPosts";

// Sort posts once on load
const posts = ref(
 [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
 ),
);

const selectedCategory = ref("All");
const postsPerPage = 6;
const currentPage = ref(1);

const categories = computed(() => {
 const cats = new Set<string>();
 posts.value.forEach((post) => {
  if (post.category) cats.add(post.category);
 });
 return Array.from(cats).sort();
});

const filteredPosts = computed(() => {
 if (selectedCategory.value === "All") return posts.value;
 return posts.value.filter((post) => post.category === selectedCategory.value);
});

const displayedPosts = computed(() => {
 return filteredPosts.value.slice(0, currentPage.value * postsPerPage);
});

const hasMorePosts = computed(() => {
 return displayedPosts.value.length < filteredPosts.value.length;
});

const filterPosts = (category: string) => {
 selectedCategory.value = category;
 currentPage.value = 1;
};

const isLoading = ref(false);

const loadMore = async () => {
 isLoading.value = true;

 // Simulate a short delay (e.g., 500ms) for a smoother transition
 // In a real API call, you would await your fetch here instead
 await new Promise((resolve) => setTimeout(resolve, 500));

 currentPage.value++;
 isLoading.value = false;
};

const siteRoot = "https://bylucas.org";

useSeoMeta({
 title: "Home | bylucas",
 description: "description for bylucas to come.",

 // Open Graph
 ogTitle: "Home | bylucas",
 ogDescription:
  "A personal collection of long-distance hiking routes, cycling adventures, and web development references.",
 ogType: "website",
 ogUrl: siteRoot,
 ogImage: `${siteRoot}/images/default-share.webp`, // Your primary brand share image

 // Twitter Card
 twitterCard: "summary_large_image",
 twitterTitle: "Home | bylucas",
 twitterDescription:
  "A personal collection of long-distance hiking routes, cycling adventures, and web development references.",
 twitterImage: `${siteRoot}/images/default-share.webp`,
});

useHead({
 htmlAttrs: {
  lang: "en",
 },
 link: [
  {
   rel: "canonical",
   href: siteRoot,
  },
 ],
});
</script>

<style>
.hero-title {
 animation: fadeInUp 0.8s ease;
}
.hero-description {
 animation: fadeInUp 0.8s ease 0.2s both;
}
@keyframes fadeInUp {
 from {
  opacity: 0;
  transform: translateY(30px);
 }
 to {
  opacity: 1;
  transform: translateY(0);
 }
}
</style>
