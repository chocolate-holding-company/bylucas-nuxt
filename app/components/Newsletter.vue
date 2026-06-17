<script setup lang="ts">
const { subscribe, loading, success, error } = useNewsletter();
const email = ref("");
const honeypot = ref("");

const onSubscribe = async () => {
 await subscribe(email.value, honeypot.value);
 if (success.value) email.value = "";
};
</script>

<template>
 <section
  class="max-w-4xl my-30 mx-auto py-10 px-6 md:px-25 bg-(--form-bg) border border-(--border-color) rounded-xl text-center shadow-lg"
 >
  <h3 class="mb-6 font-bold">Join our inner circle</h3>
  <p class="mb-2 text-lg">
   Get curated insights and weekly updates delivered straight to your inbox.
  </p>

  <form @submit.prevent="onSubscribe" class="flex flex-col gap-4 items-center">
   <input v-model="honeypot" type="text" style="display: none" tabindex="-1" />
   <input
    v-model="email"
    type="email"
    required
    aria-label="Email address"
    placeholder="Enter your email"
    class="mt-6 mb-6"
   />
   <button :disabled="loading" class="py-3 px-4 mb-5 but-primary">
    <span v-if="loading"> <BaseSpinner /> Submitting... </span>
    <span v-else> Subscribe </span>
   </button>
  </form>
  <p v-if="error" class="msg-error">{{ error }}</p>
  <Transition name="fade">
   <p v-if="success" class="msg-success">Welcome to the family! 🎉</p>
  </Transition>
 </section>
</template>
