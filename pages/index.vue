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
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'

export default {
  components: {
    ArticleList,
    Pagination,
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
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
}
</script>
