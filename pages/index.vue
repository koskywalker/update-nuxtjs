<template>
  <div class="container">
    <main class="main">
      <article-list :posts="posts" />
    </main>
    <the-sidebar class="sidebar" />
  </div>
</template>

<script>
import ArticleList from '@/components/ArticleList'
import TheSidebar from '@/layouts/TheSidebar'

export default {
  components: {
    ArticleList,
    TheSidebar,
  },
  computed: {
    posts () {
      return this.$store.state.posts.posts
    },
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
  mounted () {
    this.$fixParticlesHeight()
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: $width_max;
  width: $width_base;
}

.main {
  width: 100%;

  @include mq($mq_pc) {
    width: 65%;
  }
}

.sidebar {
  background-color: $color_gray_transparent;
  width: 100%;

  @include mq($mq_pc) {
    width: 30%;
  }
}
</style>
