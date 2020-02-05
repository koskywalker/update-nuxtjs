<template>
  <div>
    <nav class="menu">
      <ul class="menuInner">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="menuInner__item"
        >
          <button
            :class="item.class"
            @click="buttonAction"
            class="menuInner__itemLink"
          >
            <font-awesome-icon
              :icon="item.icon"
              class="menuInner__itemIcon"
            />
            <span class="menuInner__itemName">{{ item.name }}</span>
          </button>
        </li>
      </ul>
      <transition name="slide">
        <share-buttons
          v-if="show"
          :title="title"
          class="shareButtons"
        />
      </transition>
    </nav>
  </div>
</template>

<script>
import ShareButtons from '~/components/ShareButtons'

export default {
  name: 'TheFooterMenuFixed',
  components: {
    ShareButtons,
  },
  data () {
    return {
      items: this.$footerMenuFixed,
      title: '',
      show: false,
    }
  },
  methods: {
    buttonAction (e) {
      if (e.target.classList.contains('js-buttonShare')) {
        this.clickShare()
      }
    },
    clickHome () {

    },
    clickShare (e) {
      this.show = !this.show
    },
    clickFollow () {

    },
    clickMenu () {

    },
    clickTop () {

    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  background-color: $color_white;
  bottom: 0;
  box-shadow: 0 -2px 3px rgba(100, 120, 130, 0.5);
  height: 54px;
  line-height: 1;
  margin: 0 auto;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  position: fixed;
  width: 100%;

  &Inner {
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    z-index: 1;

    &__item {
      max-width: calc(1180px / 5);
      width: 20%;

      &Link {
        align-items: center;
        background-color: $color_white;
        border: 0;
        color: $color_gray;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        padding: 0;
        width: 100%;
        transition: 0s;

        &:hover {
          background-color: $color_gray_light;
        }

        &--home:hover {
          color: $color_black;
        }

        &--share:hover {
          color: $color_red;
        }

        &--follow:hover {
          color: $color_pink;
        }

        &--menu:hover {
          color: $color_green;
        }

        &--top:hover {
          color: $color_blue;
        }
      }

      &Icon {
        margin-bottom: 7px;
        pointer-events: none;
      }

      &Name {
        font-size: $fontSize_s;
        font-weight: bold;
        pointer-events: none;
      }
    }
  }
}

.shareButtons {
  bottom: 54px;
  position: absolute;
}

.slide {
  &-enter-active,
  &-leave-active {
    transition: all .5s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
