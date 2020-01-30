<template>
  <footer class="footer">
    <section class="footerItem footerItem--tags">
      <h3 class="footerItem__title">
        Tags
      </h3>
      <div class="footerItem__body tags">
        <router-link
          v-for="tag in tags"
          :key="tag.slug"
          :to="tag.slug"
          class="tags__item"
        >
          {{ tag.name }}
        </router-link>
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
      © {{ today }}
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      tags: this.$tags,
      blogDescription: this.$blogInfo.baseDescription,
      blogTechnology: this.$blogInfo.aboutBlogTechnology,
    }
  },
  computed: {
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
    padding: 1rem;

    &--tags {
      background-color: $color_navy;
    }

    &--about {
      background-color: $color_green;
    }

    &__title {
      @extend %font_accent;
      font-size: $fontSize_l;
      margin-bottom: 1.5rem;

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
      @include mq($mq_tablet) {
        margin: 0 auto;
        width: 800px;
      }
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
    font-size: $fontSize_s;
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
