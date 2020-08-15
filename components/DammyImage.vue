<template>
  <img
    :src="imageSrc"
    :style="imageStyleObject"
    v-if="imageStyleObject.width"
    @load="loaded"
    class="dammyImage"
    width="800"
    height="450"
    alt=""
  >
</template>

<script>
import anime from 'animejs'

export default {
  data () {
    return {
      imageSrc: '',
      imageStyleObject: {},
    }
  },
  mounted () {
    this.$nuxt.$on('setImageInfoToDammyImage', this.setImageInfoToDammyImage)
  },
  beforeDestroy () {
    this.$nuxt.$off('setImageInfoToDammyImage')
    this.$nuxt.$off('moveDammyImage')
  },
  methods: {
    loaded () {
      this.$nuxt.$on('moveDammyImage', this.moveDammyImage)
    },
    setImageInfoToDammyImage ({ imageSrc, imageStyleObject }) {
      this.imageSrc = imageSrc
      this.imageStyleObject = imageStyleObject
    },
    moveDammyImage ({ image, imageStyleObject }) {
      anime({
        targets: '.dammyImage',
        top: imageStyleObject.top,
        left: imageStyleObject.left,
        width: imageStyleObject.width,
        easing: 'easeInOutQuart',
        duration: 500,
        complete: () => {
          image.style.opacity = 1
          this.imageStyleObject = {
            top: '',
            left: '',
            width: '',
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.dammyImage {
  position: fixed;
}
</style>
