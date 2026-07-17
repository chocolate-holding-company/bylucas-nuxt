<script setup lang="ts">
const props = defineProps<{ postId: string }>();
const { comments, submitComment, fetchComments, loading, success, error } =
 useComments(props.postId);

const form = reactive({ name: "", content: "", fax: "" });

onMounted(() => fetchComments());

const handleComment = async () => {
 await submitComment(form.name, form.content, form.fax);
 if (success.value) {
  form.name = "";
  form.content = "";
 }
};
</script>
<template>
 <section
  class="mx-auto my-32 max-w-4xl border border-(--border-color) bg-(--form-bg) px-3 py-16 text-center shadow-lg rounded-xl sm:px-6 md:px-24"
 >
  <h3 class="mb-10 text-center font-bold text-(--form-text)">
   Comments ({{ comments.length }})
  </h3>

  <div v-if="comments.length > 0" class="mb-8 space-y-6 text-left">
   <div
    v-for="c in comments"
    :key="c.id"
    class="rounded-lg border border-(--border-color) bg-(--form-inner) p-5 shadow-xs transition-all has-[.moderation-badge]:border-l-4 has-[.moderation-badge]:border-l-amber-300 has-[.moderation-badge]:bg-slate-50/50"
   >
    <div class="mb-2 flex items-center justify-between">
     <span class="flex items-center gap-2 font-bold text-blue-700">
      {{ c.userName }}
      <span
       v-if="c.isPending"
       class="moderation-badge ml-2 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-amber-800"
      >
       Awaiting Moderation
      </span>
     </span>
     <span class="text-xs font-semibold text-form-text">
      {{
       c.createdAt?.toDate
        ? c.createdAt.toDate().toLocaleDateString()
        : "Just now"
      }}
     </span>
    </div>

    <p class="text-form-text text-sm">{{ c.content }}</p>

    <div
     v-if="c.adminReply"
     class="mt-4 ml-6 rounded border-l-4 border-blue-500 bg-blue-50 p-4"
    >
     <span
      class="mb-1 block text-[0.7rem] font-extrabold uppercase text-blue-900"
      >Admin Response</span
     >
     <p class="text-form-text">{{ c.adminReply }}</p>
    </div>
   </div>
  </div>

  <p v-else class="mb-6 text-center font-medium text-form-text">
   No comments yet. Be the first to start the conversation!
  </p>

  <div
   class="rounded-xl border border-(--border-color) bg-(--form-inner) p-6 text-left shadow-md"
  >
   <h4 class="mb-4 text-xl font-semibold text-(--form-text)">
    Leave a Comment
   </h4>
   <form @submit.prevent="handleComment" class="space-y-4">
    <input v-model="form.fax" type="text" class="hidden" tabindex="-1" />

    <div>
     <input
      v-model="form.name"
      type="text"
      placeholder="Your Name"
      required
      class=""
     />
    </div>

    <div>
     <textarea
      v-model="form.content"
      placeholder="Your thoughts..."
      rows="4"
      required
      class=""
     ></textarea>
    </div>

    <button
     type="submit"
     :disabled="loading"
     class="but-primary mx-auto flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-colors disabled:cursor-not-allowed disabled:bg-slate-400"
    >
     <BaseSpinner v-if="loading" />
     {{ loading ? "Posting..." : "Post Comment" }}
    </button>

    <p
     v-if="error"
     class="mx-auto mt-4 max-w-md rounded p-3 text-center text-sm font-medium text-white bg-[var(--error-color),#ef4444]"
    >
     {{ error }}
    </p>
    <p
     v-if="success"
     class="mx-auto mt-4 max-w-md rounded p-3 text-center text-sm font-medium text-white bg-[var(--success-color),#22c55e]"
    >
     Thanks! Sent for moderation.
    </p>
   </form>
  </div>
 </section>
</template>
