<template>
 <header
  :class="[
   'fixed top-0 left-0 w-full h-20 mb-5 z-10001 transition-transform duration-400 ease-out',
   { 'translate-y-[-120%]': !isVisible, 'bg-neutral-800': isMenuOpen },
  ]"
 >
  <div
   class="absolute right-5 top-5 w-15 px-px bg-neutral-800 rounded-sm z-10003"
  >
   <MagneticLink>
    <button
     @click="toggleMenu"
     :class="[
      'relative bg-none border-none cursor-pointer p-3.75 flex flex-col gap-1.5 z-10002 group',
      { active: isMenuOpen },
     ]"
    >
     <span
      class="w-7.5 h-0.5 bg-white transition-all duration-300 group-[.active]:translate-y-1 group-[.active]:rotate-45"
     ></span>
     <span
      class="w-7.5 h-0.5 bg-white transition-all duration-300 group-[.active]:-translate-y-1 group-[.active]:rotate-[-45deg]"
     ></span>
    </button>
   </MagneticLink>
  </div>

  <Transition name="overlay">
   <div
    v-if="isMenuOpen"
    class="menu-overlay fixed inset-0 w-screen h-screen bg-neutral-800 flex items-start justify-center overflow-y-auto"
    @click="handleOverlayClick"
   >
    <nav
     class="w-full max-w-300 mx-auto px-10 md:px-18.75 pt-24 pb-16 flex flex-col md:flex-row gap-10 md:gap-16 min-[1020px]:grid min-[1020px]:grid-cols-2 min-[1020px]:gap-15"
    >
     <div class="flex-1 text-center">
      <MagneticLink
       v-for="group in leftLinks"
       :key="group.cat"
       class="block mb-8"
      >
       <h3
        class="text-[0.9rem] md:text-[0.8rem] uppercase tracking-[0.1rem] text-blue-400 border-b border-[#eee] pb-2 w-25 mx-auto mb-[0.9rem]"
       >
        {{ group.cat }}
       </h3>
       <ul class="list-none p-0 m-0">
        <li v-for="(item, i) in group.links" :key="item.link_url" class="mb-2">
         <NuxtLink
          :to="item.link_url"
          class="menu-link block text-white text-[2rem] leading-[1.3] no-underline py-2 hover:text-sky-700 transition-colors duration-300"
          :style="{ transitionDelay: `${(i + 1) * 0.1}s` }"
          @click="closeMenu"
         >
          {{ item.link }}
         </NuxtLink>
        </li>
       </ul>
      </MagneticLink>
     </div>

     <div class="flex-1 text-center">
      <MagneticLink
       v-for="group in rightLinks"
       :key="group.cat"
       class="block mb-[2rem]"
      >
       <h3
        class="text-[0.9rem] md:text-[0.8rem] uppercase tracking-[0.1rem] text-blue-400 border-b border-[#eee] pb-2 w-25 mx-auto mb-5"
       >
        {{ group.cat }}
       </h3>
       <ul class="list-none p-0 m-0">
        <li v-for="(item, i) in group.links" :key="item.link_url" class="mb-2">
         <NuxtLink
          :to="item.link_url"
          class="menu-link block text-white text-[2rem] leading-[1.5] no-underline py-2 hover:text-sky-700 transition-colors duration-300"
          :style="{ transitionDelay: `${(i + 1) * 0.1}s` }"
          @click="closeMenu"
         >
          {{ item.link }}
         </NuxtLink>
        </li>
       </ul>
      </MagneticLink>
     </div>
    </nav>
   </div>
  </Transition>
 </header>
</template>

<script setup>
import { leftLinks, rightLinks } from "~/data/MenuLinks";
const route = useRoute();
const isVisible = ref(true);
const isMenuOpen = ref(false);
const lastY = ref(0);

const closeMenu = () => {
 isMenuOpen.value = false;
 document.body.style.overflow = "";
 document.body.classList.remove("menu-open");
};

const toggleMenu = () => {
 isMenuOpen.value = !isMenuOpen.value;
 if (isMenuOpen.value) {
  document.body.style.overflow = "hidden";
  document.body.classList.add("menu-open");
 } else {
  closeMenu();
 }
};

const handleOverlayClick = (e) => {
 if (e.target.classList.contains("menu-overlay")) closeMenu();
};

const handleScroll = () => {
 if (isMenuOpen.value) return;
 const currentY = window.scrollY;
 isVisible.value = currentY <= 80 || currentY < lastY.value;
 lastY.value = currentY;
};

onMounted(() => {
 window.addEventListener("scroll", handleScroll);
 window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
 });
});

onUnmounted(() => {
 window.removeEventListener("scroll", handleScroll);
 closeMenu();
});

watch(
 () => route.fullPath,
 () => closeMenu(),
);
</script>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
 transition: all 0.4s ease-out;
}

.overlay-enter-from,
.overlay-leave-to {
 transform: translateX(20px);
 opacity: 0;
}

/* Stays clean as simple CSS fade-ins if you decide to add entry animations later */
.menu-link {
 opacity: 1;
 transform: none;
}
</style>
