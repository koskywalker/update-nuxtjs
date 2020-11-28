<template>
  <div>
    <the-particles />
    <the-header />
    <main-visual v-show="isShowMianVisual" />
    <div class="container">
      <div class="containerInner">
        <main class="main">
          <nuxt />
        </main>
        <the-sidebar
          v-show="isShowSidebar"
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
      const isShowRouteList = [
        'index',
        'portfolio',
      ]
      return isShowRouteList.includes(this.$route.name)
    },
    isShowSidebar () {
      const isHiddenRouteList = [
        'portfolio',
      ]
      return !isHiddenRouteList.includes(this.$route.name)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  &Inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto 5rem;
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
  margin: 0 auto;
  width: $width_base;

  @include mq($mq_tablet) {
    width: 100%;
  }

  @include mq($mq_pc) {
    margin: 0 0 0 5%;
    width: 30%;
  }
}
</style>
