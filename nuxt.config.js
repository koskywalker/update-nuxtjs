require('dotenv').config()
const client = require('./plugins/contentful').default

export default {
  mode: 'universal',
  /*
  ** Global CSS
  */
  styleResources: {
    scss: [
      '~/assets/scss/settings/variables.scss',
      '~/assets/scss/tools/tools.scss',
      '~/assets/scss/tools/animation.scss',
    ],
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/constant.js' },
    { src: '~/plugins/contentful.js' },
    { src: '~/plugins/vue-typed-js.js' },
    { src: '~/plugins/vuejs-paginate.js', mode: 'client' },
    { src: '~/plugins/particles.js' },
    { src: '~/plugins/utility.js' },
    { src: '~/plugins/router-option.js' },
    { src: '~/plugins/markdown-it.js' },
    { src: '~/plugins/prism.js' },
    { src: '~/plugins/vue-disqus.js' },
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
    'nuxt-basic-auth-module',
    '~/modules/hook',
  ],
  /*
  ** Basic Auth
  */
  basic: {
    name: 'admin',
    pass: 'password',
  },
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
    DISQUS_SHORTNAME: process.env.DISQUS_SHORTNAME,
    BASIC_AUTH_USER_ID: process.env.BASIC_AUTH_USER_ID,
    BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,
  },
}
