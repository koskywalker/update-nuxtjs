<template>
  <div class="particlesWrap">
    <div
      id="particles"
      class="particles"
    />
  </div>
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
  },
}
</script>

<style lang="scss">
.particlesWrap {
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: -1;
}
.particles-js-canvas-el {
  height: 100vh !important;
  width: 100vw !important;
}
</style>
