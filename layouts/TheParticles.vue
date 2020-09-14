<template>
  <div
    id="particles"
    class="particles"
  />
</template>

<script>
import particlesMobile from '~/assets/js/particles-mobile'
import particlesPc from '~/assets/js/particles-pc'

export default {
  mounted () {
    require('particles.js')
    if (matchMedia('(max-width: 768px)').matches) {
      window.particlesJS('particles', particlesMobile.data)
    } else {
      window.particlesJS('particles', particlesPc.data)
    }
  },
}
</script>

<style lang="scss">
.particles {
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100vw;
  will-change: transform;
  z-index: -1;
}
</style>
