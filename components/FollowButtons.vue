<template>
  <nav class="follow">
    <ul class="followInner">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="followInner__item"
      >
        <a
          :href="item.url"
          :class="item.class"
          target="_blank"
          rel="noopener"
          class="followInner__itemLink"
        >
          <img
            :src="item.src"
            :alt="item.name"
            width="24"
            height="24"
          >
          <span class="followInner__itemName">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'

export default {
  data () {
    return {
      items: [
        {
          name: CONSTANTS.MY_INFO.SNS.TWITTER.NAME,
          url: CONSTANTS.MY_INFO.SNS.TWITTER.URL,
          src: require('@/assets/icon/icon_twitter.svg'),
          class: 'followInner__itemLink--twitter',
        },
        {
          name: CONSTANTS.MY_INFO.SNS.GITHUB.NAME,
          url: CONSTANTS.MY_INFO.SNS.GITHUB.URL,
          src: require('@/assets/icon/icon_github.svg'),
          class: 'followInner__itemLink--github',
        },
        {
          name: CONSTANTS.MY_INFO.SNS.FEEDLY.NAME,
          url: CONSTANTS.MY_INFO.SNS.FEEDLY.URL,
          src: require('@/assets/icon/icon_feedly.svg'),
          class: 'followInner__itemLink--feedly',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.follow {
  height: 60px;
  width: 100%;

  &Inner {
    display: flex;
    height: 100%;
    justify-content: center;

    &__item {
      align-items: center;
      display: flex;
      justify-content: center;
      width: calc(100% / 3);

      &Link {
        align-items: center;
        color: $color_white;
        display: flex;
        height: 100%;
        justify-content: center;
        width: 100%;

        &--twitter {
          background-color: $color_twitter;
        }

        &--github {
          background-color: $color_gray;
        }

        &--feedly {
          background-color: $color_feedly;
        }
      }

      &Name {
        @extend %font_accent;

        margin-left: 5px;
      }
    }
  }
}
</style>
