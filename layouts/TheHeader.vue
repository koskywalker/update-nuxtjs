<template>
  <header class="header">
    <router-link
      class="logo"
      to="/"
    >
      <h1
        v-if="isTopPage"
        class="logo__text"
      >
        {{ blogName }}
      </h1>
      <div
        v-else
        class="logo__text"
      >
        {{ blogName }}
      </div>
    </router-link>
    <nav class="globalNav">
      <router-link
        v-for="(item, index) in globalNav"
        :key="index"
        :to="item.url"
        class="globalNav__item"
      >
        <span class="globalNav__itemName">{{ item.name }}</span>
        <span
          :class="item.class"
          class="globalNav__itemLabel"
        >{{ item.label }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      blogName: this.$blogInfo.blogName,
      globalNav: [
        {
          name: 'ホーム',
          label: 'HOME',
          url: '/',
          class: ''
        },
        {
          name: 'プログラミング',
          label: 'PROGRAMMING',
          url: '/category/programming',
          class: 'globalNav__itemLabel--blue'
        },
        {
          name: 'ブログ',
          label: 'BLOG',
          url: '/category/blog',
          class: 'globalNav__itemLabel--green'
        },
        {
          name: '便利ツール',
          label: 'TOOL',
          url: '/category/tool',
          class: 'globalNav__itemLabel--red'
        },
        {
          name: 'ポートフォリオ',
          label: 'PORTFOLIO',
          url: '/portfolio',
          class: 'globalNav__itemLabel--pink'
        },
        {
          name: 'お問い合わせ',
          label: 'CONTACT',
          url: '/contact',
          class: 'globalNav__itemLabel--orange'
        }
      ]
    }
  },
  computed: {
    isTopPage () {
      return this.$route.path === '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}

.logo {
  color: $color-black;
  font-family: $font_accent;
}

.globalNav {
  display: flex;
  justify-content: center;

  &__item {
    color: $color-black;
    display: flex;
    flex-direction: column;
    margin: 0 10px;

    &Name {
      font-weight: bold;
    }

    &Label {
      font-family: $font_accent;

      &--blue {
        color: $color-blue;
      }

      &--green {
        color: $color-green;
      }

      &--red {
        color: $color-red;
      }

      &--pink {
        color: $color-pink;
      }

      &--orange {
        color: $color-orange;
      }
    }
  }
}
</style>
