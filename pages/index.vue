<template>
  <div>
    <article-list
      :posts="postsThisPage"
    />
    <pagination
      v-if="isPaginationShow"
      :path="'/page'"
      :posts-number="posts.length"
    />
  </div>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
import { mapState } from 'vuex'

export default {
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
  data () {
    return {
      postsNumberPerPage: CONSTANTS.BASE_SETTINGS.POSTS_NUMBER_PER_PAGE,
    }
  },
  computed: {
    ...mapState('posts', ['posts']),
    postsThisPage () {
      const pageNumber = parseInt(this.$route.params.id) || 1
      const postsCopy = [...this.posts]
      return postsCopy.splice((pageNumber - 1) * this.postsNumberPerPage, this.postsNumberPerPage)
    },
    isPaginationShow () {
      return this.posts.length > this.postsNumberPerPage
    },
  },
  head () {
    const hid = `jsonld-${this._uid}`
    return {
      __dangerouslyDisableSanitizers: ['script'],
      script: [{
        hid,
        innerHTML: `{
          "@context": "http://schema.org",
          "@type": "website",
          "name": "UPDATE",
          "inLanguage": "jp",
          "publisher": {
            "@type": "Organization",
            "name": "Kosuke Muraka",
            "logo": {
              "@type": "ImageObject",
              "url": "https://deploy-preview-132--updworld.netlify.app/favicon.svg"
            }
          },
          "copyrightYear": "2020-09-16T01:00:00+0900",
          "headline": "世界をアップデートするクリエイターこうすけのブログ",
          "description": "UPDATE は, エンジニア x デザイナー x ブロガーとして活動するこうすけのクリエイターブログです. 主にプログラミング, デザイン, SEO, 普段の活動などについて発信しています. 世界観を言語化し, 表現しよう！",
          "url": "https://deploy-preview-132--updworld.netlify.app"
        }`,
        type: 'application/ld+json',
      }],
    }
  },
}
</script>
