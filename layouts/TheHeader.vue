<template>
  <header class="header">
    <div class="headerInner">
      <div class="logo">
        <h1
          v-if="isTopPage"
          class="logoText"
        >
          <nuxt-link
            class="logoLink"
            to="/"
          >
            {{ blogName }}
          </nuxt-link>
        </h1>
        <div
          v-else
          class="logoText"
        >
          <nuxt-link
            class="logoLink"
            to="/"
          >
            {{ blogName }}
          </nuxt-link>
        </div>
      </div>
      <nav class="globalNav">
        <nuxt-link
          v-for="(item, index) in globalNav"
          :key="index"
          :to="item.URL"
          class="globalNav__item"
        >
          <span class="globalNav__itemName">{{ item.NAME }}</span>
          <span class="globalNav__itemLabel">{{ item.LABEL }}</span>
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'

export default {
  data () {
    return {
      blogName: CONSTANTS.BLOG_INFO.BLOG_NAME,
      globalNav: CONSTANTS.HEADER_MENU,
    }
  },
  computed: {
    isTopPage () {
      return this.$route.path === '/'
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 1rem 0;

  @include mq($mq_pc) {
    padding: 2rem 0;
  }

  &Inner {
    align-content: center;
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    @include mq($mq_pc) {
      justify-content: space-between;
      margin: 0 auto;
      max-width: 1180px;
      width: 92%;
    }
  }
}

.logo {
  margin: 0 auto;
  padding: 0.5rem 0;

  @include mq($mq_pc) {
    margin: 0;
    padding: 0 1rem;
  }

  &Text {
    @extend %font_accent;

    display: inline-block;
    font-size: $fontSize_3l;
    font-weight: normal;
    line-height: 1;
    width: 100%;

    @include mq($mq_pc) {
      font-size: $fontSize_4l;
    }
  }

  &Link {
    color: $color_black;
    display: block;
  }
}

.globalNav {
  align-items: center;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding: 8px 0;
  white-space: nowrap;
  width: 100%;

  @include mq($mq_tablet) {
    justify-content: center;
    overflow-x: inherit;
    white-space: normal;
  }

  @include mq($mq_pc) {
    width: auto;
  }

  &__item {
    line-height: 1.5;
    margin: 0 5px;
    position: relative;

    &:first-child {
      display: none;

      @include mq($mq_tablet) {
        display: block;
      }
    }

    &::before {
      background-color: $color_gray;
      bottom: -8px;
      content: '';
      display: block;
      height: 3px;
      left: 0;
      position: absolute;
      right: 0;
      transform: scaleX(0);
      transition: 0.3s;
    }

    &:hover::before {
      transform: scaleX(1);
    }

    &Name {
      color: $color_white;
      display: block;
      font-size: $fontSize_xs;
      font-weight: bold;
      line-height: 1.5;
      padding: 0 5px;

      @include mq($mq_tablet) {
        color: $color_black;
        display: inline;
        font-size: $fontSize_base;
      }
    }

    @for $index from 1 through length($colors) {
      &:nth-of-type(#{$index}) &Name {
        background-color: #{nth($colors, $index)};

        @include mq($mq_tablet) {
          background-color: transparent;
        }
      }
    }

    &Label {
      @extend %font_accent;

      display: none;
      line-height: 1;

      @include mq($mq_tablet) {
        display: block;
      }
    }

    @for $index from 1 through length($colors) {
      &:nth-of-type(#{$index}) &Label {
        color: #{nth($colors, $index)};
      }
    }
  }
}
</style>
