<template>
  <article class="article">
    <nuxt-link
      :to="linkTo('', post)"
      class="articleMain"
    >
      <div class="articleMainImage">
        <img
          :src="post.fields.heroImage.fields.file.url + '?w=480'"
          :alt="post.fields.heroImage.fields.description"
          class="articleMainImage__image"
          height="270"
          width="480"
          loading="lazy"
        >
      </div>
      <div class="articleMainBody">
        <p class="articleMainBody__date">
          <span class="articleMainBody__datePublished">
            {{ (new Date(post.fields.publishDate)).toLocaleDateString() }}
          </span>
          <span class="articleMainBody__dateUpdated">
            {{ (new Date(post.sys.updatedAt)).toLocaleDateString() }}
          </span>
        </p>
        <h2 class="articleMainBody__title">
          {{ post.fields.title }}
        </h2>
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
      padding: 1rem 1rem 0.8rem;

      &__date {
        color: $color_gray;
        display: flex;
        flex-wrap: wrap;
        font-size: $fontSize_xs;
        margin-bottom: 0.5rem;

        &Published {
          margin-right: 0.5rem;

          &::before {
            background-image: url(~assets/icon/icon_clock.svg);
            background-repeat: no-repeat;
            background-size: contain;
            content: '';
            display: inline-block;
            height: 0.8rem;
            vertical-align: bottom;
            width: 0.8rem;
          }
        }

        &Updated {
          margin-right: 0.5rem;

          &::before {
            background-image: url(~assets/icon/icon_reload.svg);
            background-repeat: no-repeat;
            background-size: contain;
            content: '';
            display: inline-block;
            height: 0.8rem;
            vertical-align: bottom;
            width: 0.8rem;
          }
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
    padding: 0 1rem 0.5rem;

    &Item {
      background-color: $color_navy;
      color: $color_white;
      display: inline-block;
      margin: 0 5px 8px 0;
      padding: 0.4rem 0.5rem;
    }
  }
}
</style>
