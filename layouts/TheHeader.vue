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
          :to="item.url"
          class="globalNav__item"
        >
          <span class="globalNav__itemName">{{ item.name }}</span>
          <span class="globalNav__itemLabel">{{ item.label }}</span>
        </nuxt-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      blogName: this.$blogInfo.blogName,
      globalNav: this.$globalMenu,
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
  padding: .5rem 0;

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

    &:hover {
      transform: scale(1.1);
    }
  }

  &Link {
    color: $color_black;
  }
}

.globalNav {
  align-items: center;
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding-bottom: 7px;
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

    &:hover {
      &::after,
      &::before {
        width: 100%;
        left: 0;
      }
    }

    &::after,
    &::before {
      background-color: $color_gray;
      content: '';
      height: 3px;
      position: absolute;
      right: 0;
      top: calc(100% + 8px);
      width: 0;
    }

    &::before {
      transition: .4s cubic-bezier(0.51, 0.18, 0, 0.88) .1s;
    }

    &::after {
      transition: .2s cubic-bezier(0.29, 0.18, 0.26, 0.83);
    }

    &Name {
      border-radius: 10px;
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
