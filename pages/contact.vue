<template>
  <div class="contact">
    <div class="contactBackground" />
    <div class="contactInner">
      <h1 class="contactTitle">
        <font-awesome-icon
          icon="paper-plane"
        />
        お問い合わせ
      </h1>
      <form
        class="contactForm"
        name="contact"
        method="POST"
        netlify
      >
        <p>
          <label class="contactForm__label">
            お名前 / 会社名
            <input
              class="contactForm__input"
              type="text"
              name="name"
            >
          </label>
        </p>
        <p>
          <label class="contactForm__label">
            メールアドレス
            <input
              class="contactForm__input"
              type="email"
              name="email"
            >
          </label>
        </p>
        <p>
          <label class="contactForm__label">
            お問い合わせ内容
            <textarea
              class="contactForm__input"
              name="message"
              rows="6"
            />
          </label>
        </p>
        <p>
          <button
            type="submit"
            class="contactForm__button"
          >
            送信
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$color-red: #AE1100;
$color-bg: $color_background_base_dark;
$color-bg: #f5f6f7;
$color-shadow: #BABECC;

$light-grey: #E7EEF7;

$color: $light-grey;
$lighter-5: lighten($color, 5%);
$darker-5: darken($color, 5%);
$darker-10: darken($color, 10%);
$darker-15: darken($color, 15%);
$darker-20: darken($color, 20%);
$darker-25: darken($color, 25%);
$darker-30: darken($color, 30%);

$flat: rgba(white, 1);
$flat-24: transparentize($flat, 0.76);
$flat-70: transparentize($flat, 0.30);

.contact {
  padding: 2rem 0 4rem;
  position: relative;

  &Title {
    margin-bottom: 1rem;
    text-align: center;
  }

  &Background {
    background: linear-gradient(#fff , $color_bg 10%);
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -2;
  }

  &Inner {
    background: $color-bg;
    border-radius: 20px;
    box-shadow:
      -2px -2px 5px rgba(255, 255, 255, 1),
      3px 3px 5px rgba(0, 0, 0, 0.1);
    margin: 0 auto 0;
    max-width: $width_single_column;
    padding: 2rem;
    width: $width_base;
  }

  &Form {

    &__label {
      display: block;
      font-weight: bold;
      margin-bottom: 1.5rem;
      width: 100%;
    }

    &__input,
    &__button {
      border: 0;
      outline: 0;
      border-radius: 2rem;
      padding: .5rem 1.5rem;
      background-color: $color-bg;
      text-shadow: 1px 1px 0 $color_white;
    }

    &__input {
      margin-right: .5rem;
      box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color_white;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      appearance: none;
      -webkit-appearance: none;

      &:focus {
        box-shadow:  inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color_white;
      }
    }

    &__button {
      display: block;
      font-weight: bold;
      box-shadow: -4px -4px 10px $color_white,  4px 4px 10px $color-shadow;
      margin: 0 auto;
      transition: all 0.2s ease-in-out;
      width: 100%;

      &:hover {
        box-shadow: -2px -2px 5px $color_white, 2px 2px 5px $color-shadow;
      }

      &:active {
        box-shadow: inset 1px 1px 2px $color-shadow, inset -1px -1px 2px $color_white;
      }

      .icon {
        margin-right: .5rem;
      }

      &.unit {
        border-radius: .5rem;
        line-height: 0;
        width: 3rem;
        height: 3rem;
        display:inline-flex;
        justify-content: center;
        align-items:center;
        margin: 0 .5rem;
        font-size: 1.2rem;

        .icon {
          margin-right: 0;
        }
      }

      &.red {
        display: block;
        width: 100%;
        color:$color-red;
      }
    }
  }
}
</style>
