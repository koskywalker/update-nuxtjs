<template>
  <div>
    <the-header />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from '~/layouts/TheHeader'

export default {
  components: {
    TheHeader
  },
  /*
  ** Headers of the page
  */
  head () {
    return {
      titleTemplate: '%s - ' + this.$blogInfo.blogName,
      title: this.$blogInfo.baseTitle,
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: this.$blogInfo.baseDescription },
        { hid: 'og:url', property: 'og:url', content: this.$blogInfo.baseUrl },
        { hid: 'og:site_name', property: 'og:site_name', content: this.$blogInfo.baseName },
        { hid: 'og:title', property: 'og:title', content: this.$blogInfo.baseName },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$blogInfo.baseDescription
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$blogInfo.baseOgpImage
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@kosuke_upd' }
      // { property: 'article:publisher', content: 'FacebookURL' },
      // { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
}
</script>
