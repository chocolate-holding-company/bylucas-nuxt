<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
 return queryCollection("content").path(route.path).first();
});
const postId = computed(() => route.path);
</script>

<template>
 <ProgressBar />
 <NavSlider />
 <PostHeader />
 <div class="inner">
  <div class="prose max-w-5xl my-10 mx-auto border border-amber-800">
   <transition name="fade" mode="out-in">
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>Page not found</div>
   </transition>
  </div>
  <div class="max-w-5xl my-10 mx-auto border border-blue-800">
   <BackNavigation />
   <Newsletter />
   <Comments :postId="postId" />
  </div>
 </div>
 <Footer />
 <BackTop />
</template>
