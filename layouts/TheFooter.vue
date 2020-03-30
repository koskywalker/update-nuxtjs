<template>
  <footer class="footer">
    <section class="footerItem footerItem--tags">
      <h3 class="footerItem__title">
        Tags
      </h3>
      <div class="footerItem__body tags">
        <nuxt-link
          v-for="(tag, index) in tags"
          :key="index"
          :to="linkTo('tags', tag)"
          class="tags__item"
        >
          {{ tag.fields.name }}
        </nuxt-link>
      </div>
    </section>
    <section class="footerItem footerItem--about">
      <h3 class="footerItem__title">
        About
      </h3>
      <div class="footerItem__body">
        <p>{{ blogDescription }}</p>
        <p>{{ blogTechnology }}</p>
      </div>
    </section>
    <div class="footerCopyright">
      © {{ today }} {{ blogName }} All rights reserved.
    </div>
  </footer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      blogName: this.$blogInfo.blogName,
      blogDescription: this.$blogInfo.baseDescription,
      blogTechnology: this.$blogInfo.aboutBlogTechnology,
    }
  },
  computed: {
    ...mapState('posts', ['tags']),
    ...mapGetters('posts', ['linkTo']),
    today () {
      return this.$moment().year()
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  color: $color_white;
  text-align: center;

  &Item {
    min-height: 300px;
    padding: 1rem 0 2rem;

    &--tags {
      background-color: $color_navy;
    }

    &--about {
      background: linear-gradient(135deg, $color_green_transparent 10%, $color_navy_transparent), url(~assets/image/cover-image_1500x500.png);
      background-position: right 20% bottom 50%;
      background-size: cover;

      @include mq($mq_tablet) {
        background-position: right 40% bottom 50%;
      }

      @include mq($mq_pc) {
        background-position: right 60% bottom 50%;
      }

      @include mq($mq_wide) {
        background-position: right 60% bottom 30%;
      }
    }

    &__title {
      @extend %font_accent;
      font-size: $fontSize_l;
      margin: 0 auto 1.5rem;
      max-width: $width_max;
      width: $width_base;

      @include mq($mq_tablet) {
        font-size: $fontSize_2l;
      }

      &::after {
        background-color: rgba(255, 255, 255, .5);
        content: "";
        display: block;
        height: 2px;
        margin: 1rem auto;
        width: 3rem;
      }
    }

    &__body {
      margin: 0 auto;
      max-width: $width_max;
      width: $width_base;
    }
  }
  &Copyright {
    background-color: $color_gray;
    font-size: $fontSize_xs;
    margin-bottom: 54px;
    padding: .8rem 0;

    @include mq($mq_tablet) {
      font-size: $fontSize_base;
      padding: 1rem 0;
    }
  }
}

.tags {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &__item {
    border: 1px solid $color_white;
    color: $color_white;
    font-size: $fontSize_xs;
    margin: .3rem;
    padding: .1rem .2rem;

    @include mq($mq_tablet) {
      font-size: $fontSize_base;
    }

    &:hover {
      background-color: $color_white;
      color: $color_navy;
    }
  }
}
</style>
