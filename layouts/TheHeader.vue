<template>
  <header class="header">
    <h1
      v-if="isTopPage"
      class="logo"
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
      class="logo"
    >
      <nuxt-link
        class="logoLink"
        to="/"
      >
        {{ blogName }}
      </nuxt-link>
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
// .header
.header {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  height: 20vh;
  text-align: center;

  @include mq($mq_tablet) {
    height: 17vh;
  }
}

// .logo
.logo {
  @extend %font_accent;
  display: inline-block;
  font-size: $fontSize_3l;
  font-weight: normal;
  line-height: 1;
  margin-bottom: 1rem;
  width: 100%;

  @include mq($mq_tablet) {
    font-size: $fontSize_4l;
  }

  &:hover {
    transform: scale(1.1);
  }

  &Link {
    color: $color_black;
  }
}

// .globalNav
.globalNav {
  display: flex;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  padding-bottom: 5px;
  white-space: nowrap;
  width: 100%;

  @include mq($mq_tablet) {
    justify-content: center;
    margin-bottom: 1rem;
    overflow-x: inherit;
    white-space: normal;
  }

  // .globalNav__item
  &__item {
    line-height: 1.5;
    margin: 0 5px;

    // .globalNav__item:first-child
    &:first-child {
      display: none;

      @include mq($mq_tablet) {
        display: block;
      }
    }

    &:hover {
      transform: scale(1.1);
    }

    // .globalNav__itemName
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
      // .globalNav__item:nth-of-type($index) .globalNav__itemName
      &:nth-of-type(#{$index}) &Name {
        background-color: #{nth($colors, $index)};

        @include mq($mq_tablet) {
          background-color: transparent;
        }
      }
    }

    // .globalNav__itemLabel
    &Label {
      @extend %font_accent;
      display: none;
      line-height: 1;

      @include mq($mq_tablet) {
        display: block;
      }
    }

    @for $index from 1 through length($colors) {
      // .globalNav__item:nth-of-type($index) .globalNav__itemLabel
      &:nth-of-type(#{$index}) &Label {
        color: #{nth($colors, $index)};
      }
    }
  }
}
</style>
