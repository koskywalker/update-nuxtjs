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
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: -1;
  height: 100vh;
  width: 100vw;
}
</style>
