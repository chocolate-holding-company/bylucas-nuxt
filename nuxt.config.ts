import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
 compatibilityDate: "2025-07-15",
 future: {
  compatibilityVersion: 4,
 },
 devtools: { enabled: true },
 plugins: ["./plugins/firebase.client.ts"],
 runtimeConfig: {
  public: {
   firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
   firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
   firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   firebaseMessagingSenderId:
    process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
  },
 },
 modules: ["@nuxt/content", "@nuxtjs/color-mode"],
 colorMode: {
  classSuffix: "",
 },
 css: ["./app/css/main.css"],
 vite: {
  plugins: [tailwindcss()],
 },
});
