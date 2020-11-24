<template>
  <div class="thanks">
    <div class="thanksInner">
      <h1 class="thanksTitle">
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
  @extend %shadow_base;

  background-color: $color_white;
  margin-bottom: 2rem;
  padding: 2rem 0;

  @include mq($mq_pc) {
    padding: 3rem 0;
  }
}

.thanksInner {
  margin: 0 1rem;

  @include mq($mq_tablet) {
    margin: 0 2rem;
  }

  @include mq($mq_pc) {
    margin: 0 3rem;
  }
}

.thanksTitle {
  font-size: $fontSize_xl;
  text-align: center;

  &::after {
    background-image: linear-gradient(to right, #4e5cc4 0%, #40ce9a 100%);
    content: '';
    display: block;
    height: 3px;
    margin: 1rem auto;
    width: 8rem;
  }
}

.thanksBody {
  margin-top: 3rem;
}

.thanksButton {
  align-items: center;
  background-color: $color_navy;
  box-shadow: 0 5px 0 $color_gray, 0 10px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 0 $color_navy_dark, 0 10px 0 rgba(0, 0, 0, 0.2);
  color: $color_white;
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin: 2rem auto 0;
  padding: 0.5rem 1rem;
  position: relative;
  transition: 0.1s;
  width: 100%;

  @include mq($mq_tablet) {
    width: 200px;
  }

  &:hover {
    box-shadow: 0 3px 0 $color_navy_dark, 0 6px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(3px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(5px);
  }

  &::after {
    background-image: url(~assets/icon/icon_arrow_right.svg);
    background-size: contain;
    content: '';
    display: inline-block;
    height: 1rem;
    margin-left: 5px;
    position: absolute;
    right: 1rem;
    width: 1rem;
  }
}
</style>
