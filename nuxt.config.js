const baseName = 'UPDATE'
const baseTitle = '世界をアップデートしていくクリエイターチーム'
const baseDescription =
  'UPDATE Design (アップデート・デザイン) は、制作費無料、月額7,900円からホームページの制作・更新をおこなう Web 制作チームです。「ホームページが欲しいけどお金や時間をかけたくない」とお悩みの場合は，ぜひホームページの制作・管理を我々に丸投げしてください。'
const baseUrl = 'http://localhost:3000/'
const baseOgp = '/static/icon.png'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + baseName,
    title: baseTitle,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: baseDescription },
      { hid: 'og:url', property: 'og:url', content: baseUrl },
      { hid: 'og:site_name', property: 'og:site_name', content: baseName },
      { hid: 'og:title', property: 'og:title', content: baseName },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: baseDescription
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${baseOgp}/common.jpg`
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@kosuke_upd' }
      // { property: 'article:publisher', content: 'FacebookURL' },
      // { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/app.scss', lang: 'scss' }
  ],
  /*
  ** Global Sub CSS
  */
  styleResources: {
    scss: [
      '~/assets/scss/reset.scss',
      '~/assets/scss/variables.scss',
      '~/assets/scss/element-base.scss'
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID
  }
}
