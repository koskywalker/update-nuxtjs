<template>
  <nuxt-link
    :to="linkTo('', post)"
    class="articleCard"
  >
    <div class="articleCard__thumbnail">
      <img
        :src="post.fields.heroImage.fields.file.url + '?w=' + thumbnailSizeString"
        :alt="post.fields.heroImage.fields.description"
        height="169"
        width="300"
        loading="lazy"
      >
    </div>
    <p class="articleCard__title">
      {{ post.fields.title }}
    </p>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    post: {
      type: Object,
      default () {
        return {}
      },
    },
    thumbnailSize: {
      type: Number,
      default: 300,
    },
  },
  data () {
    return {
      thumbnailSizeString: this.thumbnailSize.toString(),
    }
  },
  computed: {
    ...mapGetters('posts', ['linkTo']),
  },
}
</script>

<style lang="scss" scoped>
.articleCard {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &:last-child {
    margin: 0;
  }

  &__thumbnail {
    @extend %shadow_base;

    height: 100%;
    width: 30%;

    &:hover {
      @extend %shadow_base_hover;
    }
  }

  &__title {
    color: $color_black;
    font-size: $fontSize_xs;
    line-height: 1.5;
    margin: 0;
    width: 65%;
  }
}
</style>
