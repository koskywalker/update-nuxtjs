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
    '@nuxtjs/markdownit',
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
  /*
  ** markdownit configuration
  */
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
}
