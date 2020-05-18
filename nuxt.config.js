require('dotenv').config()
const client = require('./plugins/contentful').default

export default {
  mode: 'universal',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  styleResources: {
    scss: [
      '~/assets/scss/settings/variables.scss',
      '~/assets/scss/tools/tools.scss',
      '~/assets/scss/tools/animation.scss',
      '~/assets/scss/generic/reset.scss',
      '~/assets/scss/base/base.scss',
      '~/assets/scss/app.scss',
    ],
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/contentful.js' },
    { src: '~/plugins/blog-info.js' },
    { src: '~/plugins/my-info.js' },
    { src: '~/plugins/global-menu.js' },
    { src: '~/plugins/footer-menu-fixed.js' },
    { src: '~/plugins/post-list.js' },
    { src: '~/plugins/vue-library.js' },
    { src: '~/plugins/vuejs-paginate.js', mode: 'client' },
    { src: '~/plugins/particles.js' },
    { src: '~/plugins/utility.js' },
    { src: '~/plugins/router-option.js' },
    { src: '~/plugins/markdown-it.js' },
    { src: '~/plugins/prism.js' },
  ],
  /*
  ** Middleware
  */
  router: {
    middleware: [
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
      config.devtool = 'inline-cheap-module-source-map'
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
      ]).then(([ posts, tags ]) => {
        const postsNumberPerPage = 1
        return [
          ...posts.items.map((post) => {
            return { route: `posts/${post.fields.slug}`, payload: post }
          }),
          ...Array(Math.floor(posts.items.length / postsNumberPerPage)).fill(null).map((_, i) => {
            return `page/${i + 2}`
          }),
          ...tags.items.map((tag) => {
            return { route: `tags/${tag.fields.slug}`, payload: tag }
          }),
          ...tags.items.map((tag) => {
            Array(Math.floor(tags.items.length / postsNumberPerPage)).fill(null).map((_, i) => {
              return `tags/${tag.fields.slug}/${i + 2}`
          })
        ]
      })
    },
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
}
