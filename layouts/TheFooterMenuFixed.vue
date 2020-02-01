<template>
  <nav class="menu">
    <ul class="menuInner">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        class="menuInner__item"
      >
        <nuxt-link
          :to="item.url"
          class="menuInner__itemLink"
        >
          <font-awesome-icon
            :icon="item.icon"
            class="menuInner__itemIcon"
          />
          <span class="menuInner__itemName">{{ item.name }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menuItems: this.$footerMenuFixed,
    }
  },
}
</script>

<style lang="scss" scoped>
.menu {
  margin-bottom: 54px;

  &Inner {
    background: $color_navy;
    bottom: 0;
    box-shadow: 0 -2px 3px rgba(100, 120, 130, 0.5);
    display: flex;
    height: 54px;
    justify-content: center;
    line-height: 1;
    margin: 0 auto;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    width: 100%;

    &__item {
      max-width: calc(1024px / 5);
      width: 20%;

      &Link {
        align-items: center;
        color: $color_white;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;

        &:hover,
        &:active {
          background-color: $color_blue;
        }
      }

      &Icon {
        margin-bottom: 7px;
      }

      &Name {
        font-size: $fontSize_s;
        font-weight: bold;
      }
    }
  }
}
</style>
