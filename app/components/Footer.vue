<template>
 <footer class="bg-slate-800 pt-8 text-center pb-12 px-7 mt-18">
  <div class="inner">
   <div class="mb-7">
    <h3 class="text-(--primary) font-medium mb-1">Hill Walking Made Easy</h3>
    <p class="mb-3 opacity-90 text-neutral-100">
     Your guide to exploring the hills safely and confidently.
    </p>
   </div>

   <DarkMode />
   <div class="border-t-solid border-t-2 border-t-neutral-700 pt-4">
    <p class="m-0 opacity-80 text-sm text-neutral-100">
     &copy; {{ currentYear }}

     <!-- Show plain text if on index/home page -->
     <span v-if="isIndex">bylucas</span>

     <!-- Show link if on any other page -->
     <a
      v-else
      class="text-neutral-100 opacity-80 transition-(--transition) hover:opacity-100 hover:text-(--primary) cursor-pointer"
      href="/"
      >bylucas</a
     >

     |
     <a
      class="text-neutral-100 opacity-80 transition-(--transition) hover:opacity-100 hover:text-(--primary) cursor-pointer"
      href="#"
      @click.prevent="showContactModal = true"
      >Contact Us</a
     >
     |
     <a
      class="text-neutral-100 opacity-80 transition-(--transition) hover:opacity-100 hover:text-(--primary)"
      href="#"
      @click.prevent="showPrivacyModal = true"
      >Privacy</a
     >
    </p>
    <Modal v-if="showPrivacyModal" @close="showPrivacyModal = false">
     <Privacy />
    </Modal>
    <Modal v-if="showContactModal" @close="showContactModal = false">
     <Contact />
    </Modal>
   </div>
  </div>
 </footer>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute } from "vue-router"; // Imported to check current page route

const route = useRoute();
const currentYear = new Date().getFullYear();
defineEmits(["openContact", "openPrivacy"]);
const showPrivacyModal = ref(false);
const showContactModal = ref(false);

// Evaluates true if the path is exactly '/' or if the route name is 'index'
const isIndex = computed(() => route.path === "/" || route.name === "index");

let body = null;
onMounted(() => {
 body = typeof document !== "undefined" ? document.body : null;
 if (!body) return;
 if (showContactModal.value || showPrivacyModal.value) {
  body.classList.add("no-scroll");
 } else {
  body.classList.remove("no-scroll");
 }
});

const stopWatch = watch(
 [showContactModal, showPrivacyModal],
 ([contact, privacy]) => {
  if (!body) return;
  if (contact || privacy) body.classList.add("no-scroll");
  else body.classList.remove("no-scroll");
 },
);

onBeforeUnmount(() => {
 stopWatch();
 if (body) body.classList.remove("no-scroll");
});
</script>
