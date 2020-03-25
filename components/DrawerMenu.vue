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
            <article-card
              v-for="(post, index) in posts"
              :key="index"
              :post="post"
              :thumbnailSize="150"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'

export default {
  components: {
    ArticleCard,
  },
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
    background-color: $color_gray_light;
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
</style>
