<template>
  <div
    id="particles"
    class="particles"
  />
</template>

<script>
import particlesSmall from '~/assets/js/particles-small'
import particlesLarge from '~/assets/js/particles-large'

export default {
  mounted () {
    if (matchMedia('(max-width: 768px)').matches) {
      window.particlesJS('particles', particlesSmall.data)
    } else {
      window.particlesJS('particles', particlesLarge.data)
    }
  }
}
</script>

<style lang="scss">
.particles {
}
.particles-js-canvas-el {
  height: 55vh !important;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
