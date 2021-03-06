import path from 'path'
import fs from 'fs'
import { client } from './plugins/contentful'
import { CONSTANTS } from './assets/js/constants'

require('dotenv').config()

const Sass = require('sass')
const Fiber = require('fibers')

export default {
  target: 'static',
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
      { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL },
      { hid: 'og:site_name', property: 'og:site_name', content: CONSTANTS.BLOG_INFO.BLOG_NAME },
      { hid: 'og:title', property: 'og:title', content: CONSTANTS.BLOG_INFO.BLOG_NAME },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:description', property: 'og:description', content: CONSTANTS.BLOG_INFO.BASE_DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: process.env.BASE_URL + CONSTANTS.BLOG_INFO.BASE_OGP_IMAGE },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: `@${CONSTANTS.MY_INFO.SNS.TWITTER.USER}` },
      { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ],
  },
  styleResources: {
    scss: [
      '@/assets/scss/reset.scss',
      '@/assets/scss/variables.scss',
      '@/assets/scss/tools.scss',
      '@/assets/scss/base.scss',
      '@/assets/scss/util.scss',
    ],
  },
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' },
    { src: '~plugins/router-option.js' },
    { src: '~plugins/contentful.js' },
    { src: '~plugins/markdown-it.js' },
  ],
  components: true,
  router: {
    middleware: [
      'redirect',
      'getContentful',
    ],
  },
  buildModules: [
    '@nuxtjs/stylelint-module',
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-5Q8M5KF' }],
    '@nuxtjs/sitemap',
    '~/modules/hook',
  ],
  publicRuntimeConfig: {},
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    exclude: [],
    routes () {
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        }),
        client.getEntries({
          content_type: 'tag',
        }),
      ]).then(([posts, tags]) => {
        const postsNumberPerPage = 10
        const tagPathList = tags.items.map((tag) => {
          const tagPosts = posts.items.filter(post => post.fields.tags.some(postTag => postTag.sys.id === tag.sys.id))
          const tagPostsNumber = tagPosts.length
          return Array(Math.floor(tagPostsNumber / postsNumberPerPage)).fill(null).map((_, i) => {
            return { route: `tags/${tag.fields.slug}/${i + 1}`, payload: tag }
          })
        })
        return [
          ...posts.items.map((post) => {
            return { route: post.fields.slug, payload: post }
          }),
          ...Array(Math.floor(posts.items.length / postsNumberPerPage)).fill(null).map((_, i) => {
            return { route: `page/${i + 1}` }
          }),
          ...tags.items.map((tag) => {
            return { route: `tags/${tag.fields.slug}`, payload: tag }
          }),
          ...[].concat(...tagPathList),
        ]
      })
    },
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        })
      }
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }
    },
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber,
        },
      },
    },
    analyze: false,
  },
  server: {
    host: 'localhost',
    port: '3000',
    https: process.env.NODE_ENV === 'production' ? {} : {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
  generate: {
    routes () {
      return Promise.all([
        client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        }),
        client.getEntries({
          content_type: 'tag',
        }),
      ]).then(([posts, tags]) => {
        const postsNumberPerPage = 10
        const tagPathList = tags.items.map((tag) => {
          const tagPosts = posts.items.filter(post => post.fields.tags.some(postTag => postTag.sys.id === tag.sys.id))
          const tagPostsNumber = tagPosts.length
          return Array(Math.floor(tagPostsNumber / postsNumberPerPage)).fill(null).map((_, i) => {
            return { route: `tags/${tag.fields.slug}/${i + 1}`, payload: tag }
          })
        })
        return [
          ...posts.items.map((post) => {
            return { route: post.fields.slug, payload: post }
          }),
          ...Array(Math.floor(posts.items.length / postsNumberPerPage)).fill(null).map((_, i) => {
            return { route: `page/${i + 1}` }
          }),
          ...tags.items.map((tag) => {
            return { route: `tags/${tag.fields.slug}`, payload: tag }
          }),
          ...[].concat(...tagPathList),
        ]
      })
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
