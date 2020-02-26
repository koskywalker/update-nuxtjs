import * as contentful from 'contentful'
import config from './.contentful.json'

const client = contentful.createClient({
  space: config.CTF_SPACE_ID,
  accessToken: config.CTF_CDA_ACCESS_TOKEN,
})

export default {
  mode: 'universal',
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/app.scss', lang: 'scss' },
  ],
  /*
  ** Global Sub CSS
  */
  styleResources: {
    scss: [
      '~/assets/scss/settings/variables.scss',
      '~/assets/scss/tools/tools.scss',
      '~/assets/scss/tools/animation.scss',
      '~/assets/scss/generic/reset.scss',
      '~/assets/scss/base/base.scss',
    ],
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/blog-info.js' },
    { src: '~/plugins/my-info.js' },
    { src: '~/plugins/global-menu.js' },
    { src: '~/plugins/footer-menu-fixed.js' },
    { src: '~/plugins/tags.js' },
    { src: '~/plugins/vue-library.js' },
    { src: '~/plugins/particles.js' },
    { src: '~/plugins/utility.js' },
    { src: '~/plugins/router-option.js' },
    { src: '~/plugins/markdown-it.js' },
    { src: '~/plugins/prism.js' },
  ],
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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-fontawesome',
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
  ** Axios module configuration
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
      config.devtool = 'inline-cheap-module-source-map'
    },
  },
  generate: {
    routes () {
      return client.getEntries({
        'content_type': config.CTF_BLOG_POST_TYPE_ID,
      }).then((posts) => {
        return posts.items.map((post) => {
          return {
            route: `posts/${post.fields.slug}`,
            payload: post,
          }
        })
      })
    },
  },
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
}
