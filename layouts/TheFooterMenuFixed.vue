<template>
  <nav class="menu">
    <ul class="menuInner">
      <li class="menuInner__item">
        <nuxt-link
          to="/"
          class="menuInner__itemLink menuInner__itemLink--home"
        >
          <font-awesome-icon
            icon="home"
            class="menuInner__itemIcon"
          />
          <span class="menuInner__itemName">ホーム</span>
        </nuxt-link>
      </li>
      <li class="menuInner__item">
        <button
          type="button"
          class="menuInner__itemLink menuInner__itemLink--share"
        >
          <font-awesome-icon
            icon="share-alt"
            class="menuInner__itemIcon"
          />
          <span class="menuInner__itemName">シェア</span>
        </button>
      </li>
      <li class="menuInner__item">
        <button
          type="button"
          class="menuInner__itemLink menuInner__itemLink--follow"
        >
          <font-awesome-icon
            icon="user-plus"
            class="menuInner__itemIcon"
          />
          <span class="menuInner__itemName">フォロー</span>
        </button>
      </li>
      <li class="menuInner__item">
        <button
          type="button"
          class="menuInner__itemLink menuInner__itemLink--menu"
        >
          <font-awesome-icon
            icon="list"
            class="menuInner__itemIcon"
          />
          <span class="menuInner__itemName">メニュー</span>
        </button>
      </li>
      <li class="menuInner__item">
        <button
          type="button"
          class="menuInner__itemLink menuInner__itemLink--top"
        >
          <font-awesome-icon
            icon="level-up-alt"
            class="menuInner__itemIcon"
          />
          <span class="menuInner__itemName">トップ</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.menu {
  margin-bottom: 54px;

  &Inner {
    background-color: $color_white;
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
      max-width: calc(1180px / 5);
      width: 20%;

      &Link {
        align-items: center;
        background-color: $color_white;
        border: 0;
        color: $color_gray;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        padding: 0;
        width: 100%;
        transition: 0s;

        &:hover {
          background-color: $color_gray_light;
        }

        &--home:hover {
          color: $color_black;
        }

        &--share:hover {
          color: $color_red;
        }

        &--follow:hover {
          color: $color_pink;
        }

        &--menu:hover {
          color: $color_green;
        }

        &--top:hover {
          color: $color_blue;
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
