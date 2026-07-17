<script setup lang="ts">
import { computed } from "vue";
import { blogPosts } from "~/data/blogPosts";

const route = useRoute();
const siteRoot = "https://bylucas.org";

const { data: page } = await useAsyncData(route.path, () => {
 return queryCollection("content").path(route.path).first();
});
//Pull the matching metadata object directly from your local TypeScript file
const currentPostMeta = computed(() => {
 return blogPosts.find((post) => post._path === route.path);
});

// Build the absolute image URL safely using your TS file data
const absoluteImageUrl = computed(() => {
 const imagePath = currentPostMeta.value?.image;

 if (!imagePath) return `${siteRoot}/images/default-share.webp`;
 if (imagePath.startsWith("http")) return imagePath;

 const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
 return `${siteRoot}${cleanPath}`;
});

// Bind the SEO variables cleanly to the local TS file values
useSeoMeta({
 title: () => currentPostMeta.value?.title ?? "Blog",
 description: () => currentPostMeta.value?.description ?? "",

 // Open Graph
 ogTitle: () => currentPostMeta.value?.title,
 ogDescription: () => currentPostMeta.value?.description,
 ogType: "article",
 ogUrl: () => `${siteRoot}${route.path}`,
 ogImage: () => absoluteImageUrl.value,

 // Twitter Card
 twitterCard: "summary_large_image",
 twitterTitle: () => currentPostMeta.value?.title,
 twitterDescription: () => currentPostMeta.value?.description,
 twitterImage: () => absoluteImageUrl.value,
});

// Structural header attributes
useHead({
 link: [
  {
   rel: "canonical",
   href: () => `${siteRoot}${route.path}`,
  },
 ],
});

const postId = computed(() => route.path);
</script>

<template>
 <ProgressBar />
 <NavSlider />
 <PostHeader />
 <div class="inner">
  <div
   class="prose max-w-5xl my-10 mx-auto prose-headings:text-(--page-text) prose-p:text-(--page-text) prose-ul:text-(--page-text) prose-ol:text-(--page-text) prose-li:marker:text-(--post-color-text) prose-blockquote:border-l-(--post-color) prose-blockquote:bg-(--post-color-bg)"
  >
   <transition name="fade" mode="out-in">
    <ContentRenderer v-if="page" :value="page" />

    <!-- Use not-prose to keep fallback styles clean and isolated -->
    <div v-else class="not-prose text-center py-12">
     <h2 class="text-2xl font-bold text-red-600">Page not found</h2>
     <p class="text-gray-600">Please check the URL and try again.</p>
    </div>
   </transition>
  </div>
  <div class="max-w-5xl my-10 mx-auto">
   <BackNavigation />
   <Newsletter />
   <!-- <Comments :postId="postId" /> -->
  </div>
 </div>
 <Footer />
 <BackTop />
</template>
