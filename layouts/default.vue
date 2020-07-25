<template>
  <div>
    <the-particles />
    <the-header />
    <main-visual />
    <div class="container">
      <div class="containerInner">
        <nuxt class="main" />
        <the-sidebar class="sidebar" />
      </div>
    </div>
    <the-footer />
    <the-footer-menu-fixed />
  </div>
</template>

<script>
import TheParticles from '@/layouts/TheParticles'
import TheHeader from '@/layouts/TheHeader'
import MainVisual from '@/components/MainVisual'
import TheSidebar from '@/layouts/TheSidebar'
import TheFooter from '@/layouts/TheFooter'
import TheFooterMenuFixed from '@/layouts/TheFooterMenuFixed'

export default {
  components: {
    TheParticles,
    TheHeader,
    MainVisual,
    TheSidebar,
    TheFooter,
    TheFooterMenuFixed,
  },
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $color_background_base;
  padding-bottom: 3rem;
  width: 100%;

  &Inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    max-width: $width_max;
    width: $width_base;
  }
}

.main {
  width: 100%;

  @include mq($mq_pc) {
    width: 65%;
  }
}

.sidebar {
  margin-bottom: 2rem;
  width: 100%;

  @include mq($mq_pc) {
    width: 30%;
  }
}
</style>
