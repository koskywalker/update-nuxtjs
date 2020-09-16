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
          "name": "${CONSTANTS.BLOG_INFO.BLOG_NAME}",
          "inLanguage": "jp",
          "publisher": {
            "@type": "Organization",
            "name": "${CONSTANTS.MY_INFO.NAME}",
            "logo": {
              "@type": "ImageObject",
              "url": "${process.env.BASE_URL}/favicon.svg"
            }
          },
          "copyrightYear": "2020-09-16T01:00:00+0900",
          "headline": "${CONSTANTS.BLOG_INFO.BASE_TITLE}",
          "description": "${CONSTANTS.BLOG_INFO.BASE_DESCRIPTION}",
          "url": "${process.env.BASE_URL}"
        }`,
        type: 'application/ld+json',
      }],
    }
  },
}
</script>
