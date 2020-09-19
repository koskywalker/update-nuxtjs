<template>
  <div class="drawer">
    <div class="drawerInner">
      <h3 class="drawerInner__title">
        MENU
        <button
          type="button"
          class="drawerInner__titleClose"
          @click="closeDrawer()"
        >
          <img
            src="@/assets/icon/icon_close.svg"
            width="24"
            height="24"
            alt="close icon"
          >
        </button>
      </h3>
      <!-- <div class="drawerInner__search">
        <div class="search">
          <input
            type="text"
            class="search__input"
          >
          <button
            type="button"
            class="search__button"
          >
            <img
              src="@/assets/icon/icon_search.svg"
              width="20"
              height="20"
              alt="close icon"
            >
          </button>
        </div>
      </div> -->
      <div class="drawerInner__item">
        <div class="item">
          <h4 class="item__title">
            RECENT POSTS
          </h4>
          <div class="item__body">
            <article-card
              v-for="(post, index) in displayPosts"
              :key="index"
              :post="post"
              :thumbnail-size="150"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('posts', ['posts']),
    displayPosts () {
      return this.posts.slice(0, 3)
    },
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
        height: 2.4rem;
        position: absolute;
        right: 0;
        width: 2.4rem;
      }
    }

    &__search {
      padding: 1rem 0;
    }
  }
}

.search {
  display: flex;
  height: 2rem;
  justify-content: center;

  &__input {
    background-color: $color_gray_light;
    padding: 0.3rem;
    width: 70%;
  }

  &__button {
    align-items: center;
    background-color: $color_navy;
    color: $color_white;
    display: flex;
    justify-content: center;
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
