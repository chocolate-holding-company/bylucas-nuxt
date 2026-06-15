<script setup lang="ts">
const { submitContact, loading, success, errors } = useContact();
const form = reactive({ name: "", email: "", message: "", fax_number: "" });

const handleSubmit = async () => {
 const ok = await submitContact({
  name: form.name,
  email: form.email,
  message: form.message,
  honeypot: form.fax_number,
 });
 if (ok) {
  form.name = "";
  form.email = "";
  form.message = "";
  form.fax_number = "";
 }
};
</script>

<template>
 <div class="mx-auto my-6 max-w-[550px] rounded-xl p-6 sm:p-12">
  <!-- Header -->
  <h2 class="mb-4 text-3xl font-bold text-indigo-100">Contact Us</h2>
  <p class="mb-5 text-lg text-indigo-100">
   Have a question or want to get in touch?<br />Fill out the form below.
  </p>

  <form @submit.prevent="handleSubmit" class="space-y-5">
   <!-- Honeypot (Spam Protection) -->
   <div class="hidden" aria-hidden="true">
    <input v-model="form.fax_number" type="text" tabindex="-1" />
   </div>

   <!-- Name Field -->
   <div>
    <input
     v-model="form.name"
     type="text"
     placeholder="Name"
     class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-slate-800"
    />
    <p v-if="errors.name" class="mt-1 text-sm font-medium text-red-600">
     {{ errors.name }}
    </p>
   </div>

   <!-- Email Field -->
   <div>
    <input
     v-model="form.email"
     type="text"
     placeholder="Email"
     class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-slate-800"
    />
    <p v-if="errors.email" class="mt-1 text-sm font-medium text-red-600">
     {{ errors.email }}
    </p>
   </div>

   <!-- Message Field -->
   <div>
    <textarea
     v-model="form.message"
     placeholder="Message..."
     rows="4"
     class="w-full border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-slate-800"
    ></textarea>
    <p v-if="errors.message" class="mt-1 text-sm font-medium text-red-600">
     {{ errors.message }}
    </p>
   </div>

   <!-- Submit Button -->
   <button
    :disabled="loading"
    class="mx-auto mt-6 flex w-full items-center justify-center rounded-lg bg-white px-3 py-2.5 text-center font-medium text-(--primary) border-2 border-(--primary) transition-colors hover:bg-(--primary) hover:text-white disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto sm:px-4 sm:py-2 sm:text-base"
   >
    <span v-if="loading" class="flex items-center gap-2">
     <BaseSpinner class="h-4 w-4 text-white" /> Submitting...
    </span>
    <span v-else>Submit</span>
   </button>

   <!-- Success Toast -->
   <Transition name="fade">
    <div
     v-if="success"
     class="mt-4 rounded-lg bg-emerald-600 p-3 text-center font-medium text-white shadow-md"
    >
     Success! We'll be in touch.
    </div>
   </Transition>
  </form>
 </div>
</template>

<style scoped>
/* Vue Transitions still require normal CSS classes */
.fade-enter-active,
.fade-leave-active {
 transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
 opacity: 0;
}
</style>
