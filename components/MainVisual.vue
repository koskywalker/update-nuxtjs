<template>
  <div>
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
          :backDelay="1500"
          :loop="true"
        >
          <p class="mainVisualInner__typing">
            I'm <span class="typing" />
          </p>
        </vue-typed-js>
      </div>
    </div>
    <div class="gradationArea" />
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
        '<span style="color: #f28282;">An SEO Expert</span>.',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.mainVisual {
  align-items: center;
  display: flex;
  height: 40vh;
  line-height: 1.5;
  text-align: center;

  @include mq($mq_tablet) {
    padding-bottom: 4vh;
  }

  @include mq($mq_pc) {
    padding-bottom: 6vh;
  }

  &Inner {
    width: 100%;

    &__text {
      font-family: $font_sub;
      font-weight: bold;

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

.gradationArea {
  background: linear-gradient(transparent, $color_background_base);
  height: 4rem;
  width: 100%;
}
</style>
