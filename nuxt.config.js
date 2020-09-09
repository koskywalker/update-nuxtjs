import path from 'path'
import fs from 'fs'
import { CONSTANTS } from './assets/js/constants'
require('dotenv').config()
const client = require('./plugins/contentful').default

export default {
  mode: 'universal',
  target: 'static',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + CONSTANTS.BLOG_INFO.BLOG_NAME,
    title: CONSTANTS.BLOG_INFO.BASE_TITLE,
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: CONSTANTS.BLOG_INFO.BASE_DESCRIPTION },
      { hid: 'robots', name: 'robots', content: 'noindex' },
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:site_name', property: 'og:site_name', content: CONSTANTS.BLOG_INFO.BLOG_NAME },
      { hid: 'og:title', property: 'og:title', content: CONSTANTS.BLOG_INFO.BLOG_NAME },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: CONSTANTS.BLOG_INFO.BASE_DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: CONSTANTS.BLOG_INFO.BASE_OGP_IMAGE },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@kosuke_upd' },
      { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  },
  /*
  ** Global CSS
  */
  styleResources: {
    scss: [
      '@/assets/scss/reset.scss',
      '@/assets/scss/variables.scss',
      '@/assets/scss/tools.scss',
      '@/assets/scss/base.scss',
      '@/assets/scss/util.scss',
    ],
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~plugins/contentful.js' },
    { src: '~plugins/vue-typed-js.js' },
    { src: '~plugins/vuejs-paginate.js', mode: 'client' },
    { src: '~plugins/utility.js' },
    { src: '~plugins/router-option.js' },
    { src: '~plugins/markdown-it.js' },
    { src: '~plugins/prism.js' },
  ],
  /*
  ** Middleware
  */
  router: {
    middleware: [
      'redirect',
      'getContentful',
    ],
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/moment', ['ja']],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-5Q8M5KF' }],
    'nuxt-fontawesome',
    '~/modules/hook',
  ],
  /*
  ** FontAwesome
  */
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
  generate: {
    // routes () {
    //   return Promise.all([
    //     client.getEntries({
    //       content_type: process.env.CTF_BLOG_POST_TYPE_ID,
    //     }),
    //     client.getEntries({
    //       content_type: 'tag',
    //     }),
    //   ]).then(([ posts, tags ]) => {
    //     const postsNumberPerPage = 10
    //     const tagPathList = tags.items.map((tag) => {
    //       const tagPosts = posts.items.filter(post => post.fields.tags.some(postTag => postTag.sys.id === tag.sys.id))
    //       const tagPostsNumber = tagPosts.length
    //       return Array(Math.floor(tagPostsNumber / postsNumberPerPage)).fill(null).map((_, i) => {
    //         return { route: `tags/${tag.fields.slug}/${i + 1}`, payload: tag }
    //       })
    //     })
    //     return [
    //       ...posts.items.map((post) => {
    //         return { route: post.fields.slug, payload: post }
    //       }),
    //       ...Array(Math.floor(posts.items.length / postsNumberPerPage)).fill(null).map((_, i) => {
    //         return { route: `page/${i + 1}` }
    //       }),
    //       ...tags.items.map((tag) => {
    //         return { route: `tags/${tag.fields.slug}`, payload: tag }
    //       }),
    //       ...[].concat(...tagPathList),
    //     ]
    //   })
    // },
  },
  server: {
    port: 3000,
    host: 'localhost',
    https: process.env.NODE_ENV === 'production' ? {} : {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
}
