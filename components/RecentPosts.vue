<template>
  <div class="recentPosts">
    <h3 class="recentPosts__title">
      <font-awesome-icon
        :icon="'list'"
        class="followInner__itemIcon"
      />
      Recent Posts
    </h3>
    <div class="recentPosts__list">
      <article-card
        v-for="(post, index) in displayPosts"
        :key="index"
        :post="post"
        :thumbnailSize="300"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleCard from '@/components/ArticleCard'

export default {
  components: {
    ArticleCard,
  },
  computed: {
    ...mapState('posts', ['posts']),
    displayPosts () {
      return this.posts.slice(0, 5)
    },
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
}
</script>

<style lang="scss" scoped>
.recentPosts {
  &__title {
    @extend %font_accent;
    border-bottom: .3rem solid;
    border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
    border-image-slice: 1;
    font-size: $fontSize_l;
    letter-spacing: .1rem;
    margin-bottom: 2rem;
    padding-bottom: .3rem;
    text-align: center;
  }
}
</style>
