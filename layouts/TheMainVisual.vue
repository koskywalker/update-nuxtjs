<template>
  <div class="mainVisual">
    <div class="mainVisualInner">
      <p class="mainVisualInner__text">
        Hello, I am Kosuke.
      </p>
      <vue-typed-js
        :strings="typedStrings"
        :typeSpeed="100"
        :startDelay="1000"
        :backSpeed="20"
        :backDelay="1000"
        :loop="true"
      >
        <p class="mainVisualInner__typing">
          I'm <span class="typing" />
        </p>
      </vue-typed-js>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      typedStrings: [
        '<span style="color: #6bb6ff;">A Engineer</span>.',
        '<span style="color: #4e5cc4;">A Designer</span>.',
        '<span style="color: #40ce9a;">A Blogger</span>.',
        '<span style="color: #f28282;">An SEO Expert</span>.'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.mainVisual {
  align-items: center;
  display: flex;
  height: 37vh;
  line-height: 1.5;
  padding-bottom: 7vh;
  text-align: center;

  &Inner {
    width: 100%;

    &__text {
      font-family: $font_sub;

      @include mq($mq_tablet) {
        font-size: $fontSize_2l;
      }
    }

    &__typing {
      @extend %font_accent;
      font-size: $fontSize_l;
      margin: 0 auto;

      @include mq($mq_tablet) {
        font-size: $fontSize_4l;
      }
    }
  }

}
</style>
