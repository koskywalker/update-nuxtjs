<template>
  <div>
    <main class="main">
      <article-list
        :posts="postsThisPage"
      />
      <pagination
        v-if="isPaginationShow"
        :path="'/page'"
        :postsNumber="posts.length"
      />
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'

export default {
  components: {
    ArticleList,
    Pagination,
  },
  computed: {
    ...mapState('posts', ['posts']),
    postsThisPage () {
      const pageNumber = parseInt(this.$route.params.id) || 1
      const postsCopy = [...this.posts]
      return postsCopy.splice((pageNumber - 1) * this.$constant.baseSettings.postsNumberPerPage, this.$constant.baseSettings.postsNumberPerPage)
    },
    isPaginationShow () {
      return this.posts.length > this.$constant.baseSettings.postsNumberPerPage
    },
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
}
</script>
