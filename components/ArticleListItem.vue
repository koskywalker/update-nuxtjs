<template>
  <article class="article">
    <nuxt-link
      :to="post.fields.slug"
      class="articleMain"
    >
      <div class="articleMainImage">
        <img
          :src="post.fields.heroImage.fields.file.url + '?w=480'"
          :alt="post.fields.heroImage.fields.description"
          class="articleMainImage__image"
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
          {{ post.fields.title }} てすとテストです. タイトルはこれですね.
        </h3>
      </div>
    </nuxt-link>
    <div class="articleTagList">
      <nuxt-link
        v-for="(tag, index) in post.fields.tags"
        :key="index"
        :to="post.fields.slug"
        class="articleTagListItem"
      >
        {{ tag }}
      </nuxt-link>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default () {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.article {
  border-radius: 3px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  line-height: 1;
  overflow: hidden;
  transition: all .5s ease;
  width: 100%;

  &:hover {
    box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
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
        font-size: $fontSize_s;
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
    font-size: $fontSize_s;
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
