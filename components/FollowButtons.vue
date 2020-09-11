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
          class="followInner__itemLink"
        >
          <fa
            :icon="item.icon"
            class="followInner__itemIcon"
          />
          <span class="followInner__itemName">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'

export default {
  data () {
    return {
      items: [
        {
          name: CONSTANTS.MY_INFO.SNS.TWITTER.NAME,
          url: CONSTANTS.MY_INFO.SNS.TWITTER.URL,
          icon: faTwitter,
          class: 'followInner__itemLink--twitter',
        },
        {
          name: CONSTANTS.MY_INFO.SNS.GITHUB.NAME,
          url: CONSTANTS.MY_INFO.SNS.GITHUB.URL,
          icon: faGithub,
          class: 'followInner__itemLink--github',
        },
        {
          name: CONSTANTS.MY_INFO.SNS.FEEDLY.NAME,
          url: CONSTANTS.MY_INFO.SNS.FEEDLY.URL,
          icon: faRss,
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
