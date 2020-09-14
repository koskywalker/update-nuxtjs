<template>
  <div class="thanks">
    <div class="thanksBackground" />
    <div class="thanksInner">
      <h1 class="thanksTitle">
        <font-awesome-icon
          icon="paper-plane"
        />
        お問い合わせ<br class="br_sp">ありがとうございます
      </h1>
      <div class="thanksBody">
        <p>頂きましたお問い合わせにつきましては, 基本的には24時間以内にお返事いたします.</p>
        <p>どうぞよろしくお願いいたします.</p>
        <p>
          <nuxt-link
            to="/"
            class="thanksButton"
          >
            <font-awesome-icon
              icon="home"
            />
            HOMEへ
          </nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.thanks {
  padding: 2rem 0 4rem;
  position: relative;

  &Title {
    margin-bottom: 1rem;
    text-align: center;
  }

  &Background {
    background: linear-gradient($color_white, $color_background_base_dark 10%);
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  &Inner {
    background: $color_background_base_dark;
    border-radius: 1rem;
    box-shadow:
      -2px -2px 5px rgba(255, 255, 255, 1),
      3px 3px 5px rgba(0, 0, 0, 0.1);
    margin: 0 auto 0;
    max-width: $width_single_column;
    padding: 2rem;
    width: $width_base;
  }

  &Button {
    background-color: $color_background_base_dark;
    border-radius: 2rem;
    box-shadow: -4px -4px 10px $color_white, 4px 4px 10px $color_shadow_light;
    color: $color_black;
    display: block;
    font-weight: bold;
    margin: 0 auto;
    outline: 0;
    padding: 0.5rem 1.5rem;
    text-align: center;
    text-shadow: 1px 1px 0 $color_white;
    transition: all 0.2s ease-in-out;
    width: 100%;

    &:hover,
    &:focus {
      box-shadow: -2px -2px 5px $color_white, 2px 2px 5px $color_shadow_light;
    }

    &:active {
      box-shadow: inset 1px 1px 2px $color_shadow_light, inset -1px -1px 2px $color_white;
    }
  }
}
</style>
