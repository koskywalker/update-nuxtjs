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
      <div class="cta">
        <nuxt-link
          class="contactButton"
          to="/contact"
        >
          <span class="contactButton__text">お問い合わせ</span>
        </nuxt-link>
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
    margin: 0 auto;
    text-align: center;
    width: 92%;

    @include mq($mq_pc) {
      margin: 0 auto;
      max-width: 1180px;
    }
  }
}

.logo {
  padding: 0.5rem 0;

  @include mq($mq_pc) {
    order: 1;
  }

  &Text {
    @extend %font_accent;

    display: inline-block;
    font-size: $fontSize_4l;
    font-weight: normal;
    line-height: 1;
    width: 100%;

    @include mq($mq_tablet) {
      font-size: $fontSize_4l;
    }
  }

  &Link {
    color: $color_black;
    display: block;
  }
}

.cta {
  align-items: center;
  display: flex;
  margin-left: auto;

  @include mq($mq_pc) {
    margin-left: 1rem;
    order: 3;
  }
}

.contactButton {
  align-items: center;
  background-color: $color_navy;
  box-shadow: 0 5px 0 $color_navy_dark, 0 10px 0 rgba(0, 0, 0, 0.2);
  color: $color_white;
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 5px;
  padding: 0.5rem 1rem;
  position: relative;
  transition: 0.1s;

  &:hover {
    box-shadow: 0 3px 0 $color_navy_dark, 0 6px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(3px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(5px);
  }

  &::before {
    background-image: url(~assets/icon/icon_mail.svg);
    background-size: contain;
    content: '';
    display: inline-block;
    height: 1rem;
    width: 1rem;

    @include mq($mq_pc) {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
}

.contactButton__text {
  font-size: $fontSize_xs;
  margin-left: 0.5rem;

  @include mq($mq_tablet) {
    font-size: $fontSize_base;
  }
}

.globalNav {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  padding: 8px 0;

  @include mq($mq_pc) {
    margin: 0 0 0 auto;
    order: 2;
  }

  &__item {
    line-height: 1.5;
    margin: 0 5px 5px;
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
