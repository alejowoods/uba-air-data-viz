export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],

  app: {
    baseURL: '/', // <- muy importante
  },

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
  }, 

  nitro: {
    
    publicAssets: [
      {
        dir: '.output/public/_nuxt',
        baseURL: '/uba-air-data-viz/_nuxt/',
      }
    ],
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        '/200.html',
        '/404.html'
      ],
    }
  }    
});