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
          <font-awesome-icon
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
export default {
  data () {
    return {
      items: [
        {
          name: this.$myInfo.sns.twitter.name,
          url: this.$myInfo.sns.twitter.url,
          icon: ['fab', 'twitter'],
          class: 'followInner__itemLink--twitter',
        },
        {
          name: this.$myInfo.sns.github.name,
          url: this.$myInfo.sns.github.url,
          icon: ['fab', 'github'],
          class: 'followInner__itemLink--github',
        },
        {
          name: this.$myInfo.sns.feedly.name,
          url: this.$myInfo.sns.feedly.url,
          icon: ['fas', 'rss'],
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
