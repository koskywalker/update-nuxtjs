<template>
  <div class="recentPosts">
    <h3 class="recentPosts__title">
      <span class="recentPosts__titleText">
        Recent Posts
      </span>
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

export default {
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

    font-size: $fontSize_l;
    letter-spacing: 0.1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    position: relative;
    text-align: center;

    &::before {
      background-image: -webkit-gradient(linear, left top, right top, from($color_navy), to($color_green));
      background-image: -webkit-linear-gradient(left, $color_navy 0%, $color_green 100%);
      background-image: linear-gradient(to right, $color_navy 0%, $color_green 100%);
      bottom: 0;
      content: '';
      height: 5px;
      left: 0;
      position: absolute;
      width: 100%;
    }

    &Text::before {
      background-image: url(~assets/icon/icon_list.svg);
      background-repeat: no-repeat;
      background-size: contain;
      content: '';
      display: inline-block;
      height: $fontSize_l;
      line-height: 1.8;
      margin-bottom: 0.3rem;
      vertical-align: middle;
      width: $fontSize_l;
    }
  }
}
</style>
