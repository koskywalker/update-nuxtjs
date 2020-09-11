<template>
  <div class="recentPosts">
    <h3 class="recentPosts__title">
      <fa
        :icon="faList"
        class="followInner__itemIcon"
      />
      Recent Posts
    </h3>
    <div class="recentPosts__list">
      <article-card
        v-for="(post, index) in displayPosts"
        :key="index"
        :post="post"
        :thumbnail-size="300"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faList } from '@fortawesome/free-solid-svg-icons'

export default {
  data () {
    return {
      faList,
    }
  },
  computed: {
    ...mapState('posts', ['posts']),
    displayPosts () {
      return this.posts.slice(0, 5)
    },
  },
}
</script>

<style lang="scss" scoped>
.recentPosts {
  &__title {
    @extend %font_accent;

    border-bottom: 0.3rem solid;
    border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
    border-image-slice: 1;
    font-size: $fontSize_l;
    letter-spacing: 0.1rem;
    margin-bottom: 2rem;
    padding-bottom: 0.3rem;
    text-align: center;
  }
}
</style>
