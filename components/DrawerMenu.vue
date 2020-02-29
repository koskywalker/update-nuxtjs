<template>
  <div class="drawer">
    <div class="drawerInner">
      <h3 class="drawerInner__title">
        MENU
        <button
          @click="closeDrawer()"
          class="drawerInner__titleClose"
        >
          <font-awesome-icon
            :icon="['fas', 'times']"
            class="drawerInner__titleCloseIcon"
          />
        </button>
      </h3>
      <div class="drawerInner__search">
        <div class="search">
          <input
            type="text"
            class="search__input"
          >
          <button class="search__button">
            <font-awesome-icon
              :icon="['fas', 'search']"
            />
          </button>
        </div>
      </div>
      <div class="drawerInner__item">
        <div class="item">
          <h4 class="item__title">
            RECENT POSTS
          </h4>
          <div class="item__body">
            <nuxt-link
              v-for="(post, index) in posts"
              :key="index"
              :to="post.fields.slug"
              class="post"
            >
              <div class="postThumbnail">
                <img
                  :src="post.fields.heroImage.fields.file.url + '?w=150'"
                  :alt="post.fields.heroImage.fields.description"
                  class="postThumbnail__image"
                >
              </div>
              <div class="postBody">
                <p class="postBody__publishDate">
                  {{ (new Date(post.fields.publishDate)).toLocaleDateString() }}
                </p>
                <h5 class="postBody__title">
                  {{ post.fields.title }}
                </h5>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts () {
      return this.$store.state.posts.posts.slice(0, 3)
    },
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
  methods: {
    closeDrawer () {
      this.$emit('closeDrawer')
    },
  },
}
</script>

<style lang="scss" scoped>
.drawer {

  &Inner {
    background-color: $color_white;
    height: 100vh;
    margin-left: auto;
    max-width: 400px;
    width: 80vw;

    &__title {
      @extend %font_accent;
      background-color: $color_navy;
      color: $color_white;
      line-height: 2.5rem;
      position: relative;
      text-align: center;

      &Close {
        background-color: $color_navy;
        height: 2.5rem;
        position: absolute;
        right: 0;
        width: 2.5rem;

        &Icon {
          color: $color_white;
          height: 2.5rem;
        }
      }
    }

    &__search {
      padding: 1rem 0;
    }
  }
}

.search {
  display: flex;
  justify-content: center;

  &__input {
    width: 70%;
  }

  &__button {
    background-color: $color_navy;
    color: $color_white;
    width: 15%;
  }
}

.item {
  &__title {
    @extend %font_accent;
    background-color: $color_blue;
    color: $color_white;
    line-height: 2rem;
    text-align: center;
  }

  &__body {
    padding: 1rem;
  }
}

.post {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  &Thumbnail {
    @extend %shadow_base;
    width: 30%;

    &:hover {
      @extend %shadow_base_hover;
    }
  }

  &Body {
    color: $color_black;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    font-size: $fontSize_xs;
    width: 65%;

    &__publishDate,
    &__title {
      font-size: $fontSize_xs;
      font-weight: 400;
      margin: 0 0 .3rem;
      width: 100%;
    }
  }
}
</style>
