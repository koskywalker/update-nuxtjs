<template>
  <div>
    <the-particles />
    <the-header />
    <main-visual v-if="$route.path === '/' || $route.path === '/portfolio'" />
    <div class="container">
      <div class="containerInner">
        <main class="main">
          <nuxt />
        </main>
        <the-sidebar
          v-if="$route.path === '/portfolio'"
          class="sidebar"
        />
      </div>
    </div>
    <the-footer />
    <the-footer-menu-fixed />
  </div>
</template>

<script>
import TheParticles from '@/layouts/TheParticles'
import TheHeader from '@/layouts/TheHeader'
import TheSidebar from '@/layouts/TheSidebar'
import TheFooter from '@/layouts/TheFooter'
import TheFooterMenuFixed from '@/layouts/TheFooterMenuFixed'

export default {
  components: {
    TheParticles,
    TheHeader,
    TheSidebar,
    TheFooter,
    TheFooterMenuFixed,
  },
  computed: {
    isShowMianVisual () {
      const isShowPathList = [
        '/',
        '/portfolio',
      ]
      return isShowPathList.includes(this.$route.path)
    },
    isShowSidebar () {
      const isHiddenPathList = [
        '/portfolio',
      ]
      return !isHiddenPathList.includes(this.$route.path)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 3rem;
  width: 100%;

  &Inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    max-width: $width_max;

    @include mq($mq_tablet) {
      width: $width_base;
    }
  }
}

.main {
  width: 100%;

  @include mq($mq_pc) {
    flex: 1;
    width: auto;
  }
}

.sidebar {
  margin-bottom: 2rem;
  width: 100%;

  @include mq($mq_pc) {
    margin-left: 5%;
    width: 30%;
  }
}
</style>
