export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-03-20",
  //add i18n for internationalizacion (languages)
  modules: ['@nuxtjs/i18n'], 

  i18n: {
    locales: [
      {code: 'de', name: 'Deutsch'},
      {code: 'en', name: 'English'},
    ],
    
    defaultLocale: 'de',
    vueI18n: './i18n.config.ts' 
  }

});