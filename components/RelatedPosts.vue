<template>
  <div
    v-if="relatedPostsThisPage.length"
    class="relatedPosts"
  >
    <h2 class="relatedPosts__title">
      あわせて読みたい記事一覧
    </h2>
    <ul class="relatedPosts__postList">
      <li
        v-for="(post, index) in relatedPostsThisPage"
        :key="index"
        class="relatedPosts__postItem"
      >
        <nuxt-link
          :to="linkTo('', post)"
          class="relatedPosts__postLink"
        >
          <img
            :src="post.fields.heroImage.fields.file.url + '?w=500'"
            :alt="post.fields.heroImage.fields.description"
            class="relatedPosts__postImage"
            loading="lazy"
          >
          <p class="relatedPosts__postTitle">
            {{ post.fields.title }}
          </p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    currentPost: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters('posts', ['relatedPosts', 'linkTo']),
    relatedPostsThisPage () {
      const tags = this.currentPost.fields.tags
      let tempPostList = []
      tags.map((tag) => {
        tempPostList = tempPostList.concat(this.relatedPosts(tag))
      })
      const postSet = new Set(tempPostList)
      const postList = [...postSet].filter(post => post !== this.currentPost)
      return postList.slice(0, 6)
    },
  },
}
</script>

<style lang="scss" scoped>
.relatedPosts {
  overflow: hidden;

  &__postList {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0 auto !important;
    width: $width_base;
  }

  &__postItem {
    margin: 0 0 1rem 4%;
    width: 48%;

    &:nth-child(2n-1) {
      margin-left: 0;
    }

    @include mq($mq_tablet) {
      margin-left: 5%;
      width: 30%;

      &:nth-child(2n-1) {
        margin-left: 5%;
      }

      &:nth-child(3n-2) {
        margin-left: 0;
      }
    }
  }

  &__postLink {
    display: block;

    &:hover .relatedPosts__postImage {
      @extend %shadow_base_hover;
    }
  }

  &__postImage {
    @extend %shadow_base;
  }

  &__postTitle {
    color: $color_black;
    margin: .8rem 0 0;
    width: 100%;
  }
}
</style>
