<template>
  <article class="article">
    <nuxt-link
      :to="linkTo('', post)"
      class="articleMain"
    >
      <div class="articleMainImage">
        <img
          ref="image"
          :src="post.fields.heroImage.fields.file.url + '?w=480'"
          :alt="post.fields.heroImage.fields.description"
          class="articleMainImage__image"
          loading="lazy"
        >
      </div>
      <div class="articleMainBody">
        <p class="articleMainBody__date">
          <span class="articleMainBody__datePublished">
            <font-awesome-icon
              :icon="['fas', 'clock']"
            />
            {{ (new Date(post.fields.publishDate)).toLocaleDateString() }}
          </span>
          <span class="articleMainBody__dateUpdated">
            <font-awesome-icon
              :icon="['fas', 'redo']"
            />
            {{ (new Date(post.sys.updatedAt)).toLocaleDateString() }}
          </span>
        </p>
        <h3 class="articleMainBody__title">
          {{ post.fields.title }}
        </h3>
      </div>
    </nuxt-link>
    <div class="articleTagList">
      <nuxt-link
        v-for="(tag, index) in post.fields.tags"
        :key="index"
        :to="linkTo('tags', tag)"
        class="articleTagListItem"
      >
        {{ tag.fields.name }}
      </nuxt-link>
    </div>
  </article>
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
  },
  computed: {
    ...mapGetters('posts', ['linkTo']),
  },
}
</script>

<style lang="scss" scoped>
.article {
  @extend %shadow_base;
  background-color: $color_white;
  border-radius: 3px;
  line-height: 1;
  overflow: hidden;

  &:hover {
    @extend %shadow_base_hover;
  }

  &Main {
    display: block;

    &Image {
      overflow: hidden;
      padding-top: 56.25%;
      position: relative;
      width: 100%;

      &__image {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    &Body {
      color: $color_black;
      padding: 1rem 1rem .8rem;

      &__date {
        color: $color_gray;
        font-size: $fontSize_xs;
        margin-bottom: .5rem;

        &Published {
          margin-right: .5rem;
        }
      }

      &__title {
        font-size: $fontSize_base;
        line-height: 1.5;
      }
    }
  }

  &TagList {
    font-size: $fontSize_xs;
    margin: 0;
    padding: 0 1rem .5rem;

    &Item {
      background-color: $color_navy;
      border-radius: 10px;
      color: $color_white;
      display: inline-block;
      margin: 0 5px 8px 0;
      padding: .3rem .5rem;
    }
  }
}
</style>
