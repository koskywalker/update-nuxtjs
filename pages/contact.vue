<template>
  <client-only>
    <form
      name="contact"
      method="POST"
      netlify
    >
      <!-- <input
        type="hidden"
        name="form-name"
        value="contact"
      > -->
      <p>
        <label>Your Name: <input
          type="text"
          name="name"
        ></label>
      </p>
      <p>
        <label>Your Email: <input
          type="email"
          name="email"
        ></label>
      </p>
      <p>
        <label>Message: <textarea name="message" /></label>
      </p>
      <p>
        <button type="submit">
          Send
        </button>
      </p>
    </form>
  </client-only>
  <!-- <div class="contact">
    <div class="contactBackground" />
    <div class="contactInner">
      <h1 class="contactTitle">
        <font-awesome-icon
          icon="paper-plane"
        />
        お問い合わせ
      </h1>
      <client-only>
        <form
          class="contactForm"
          name="contact"
          method="POST"
          data-netlify="true"
        >
          <p>
            <label class="contactForm__label">
              <font-awesome-icon
                icon="user"
              />
              {{ name.label }}
              <ul
                v-show="name.errors"
                class="errorList"
              >
                <li
                  v-for="(error, index) in name.errors"
                  :key="index"
                  class="errorListItem"
                >
                  {{ error }}
                </li>
              </ul>
              <input
                @input="validateItem(name, arguments[0])"
                @change="validateItem(name, arguments[0])"
                @focusout="validateItem(name, arguments[0])"
                v-model="name.inputText"
                class="contactForm__input"
                type="text"
                name="name"
                placeholder="例) 山田太郎"
              >
            </label>
          </p>
          <p>
            <label class="contactForm__label">
              <font-awesome-icon
                icon="envelope"
              />
              {{ email.label }}
              <ul
                v-show="email.errors"
                class="errorList"
              >
                <li
                  v-for="(error, index) in email.errors"
                  :key="index"
                  class="errorListItem"
                >
                  {{ error }}
                </li>
              </ul>
              <input
                @input="validateItem(email, arguments[0])"
                @change="validateItem(email, arguments[0])"
                @focusout="validateItem(email, arguments[0])"
                v-model="email.inputText"
                class="contactForm__input"
                type="email"
                name="email"
                placeholder="例) info@example.com"
              >
            </label>
          </p>
          <p>
            <label class="contactForm__label">
              <font-awesome-icon
                icon="pen"
              />
              {{ body.label }}
              <ul
                v-show="body.errors"
                class="errorList"
              >
                <li
                  v-for="(error, index) in body.errors"
                  :key="index"
                  class="errorListItem"
                >
                  {{ error }}
                </li>
              </ul>
              <textarea
                @input="validateItem(body, arguments[0])"
                @change="validateItem(body, arguments[0])"
                @focusout="validateItem(body, arguments[0])"
                v-model="body.inputText"
                class="contactForm__input"
                name="body"
                rows="6"
              />
            </label>
          </p>
          <p>
            <button class="contactForm__button">
              送信
            </button>
          </p>
        </form>
      </client-only>
    </div>
  </div> -->
</template>

<script>
import axios from '@nuxtjs/axios'
export default {
  data () {
    return {
      name: {
        label: 'お名前 / 会社名',
        inputText: '',
        errors: [],
        errorFlg: true,
      },
      email: {
        label: 'メールアドレス',
        inputText: '',
        errors: [],
        errorFlg: true,
      },
      body: {
        label: 'お問い合わせ内容',
        inputText: '',
        errors: [],
        errorFlg: true,
      },
      errorMessageBase: {
        required: 'を入力してください',
      },
    }
  },
  methods: {
    /**
     * エラーメッセージを非表示にする.
     * @param item
     */
    clearErrorMessage (item) {
      item.errors = []
      item.errorFlg = false
    },
    /**
     * バリデーションを実行.
     * @param item
     * @param e
     */
    validateItem (item, e) {
      // イベントが input でエラーメッセージが表示されているとき,
      // またはイベントが change でエラーメッセージが非表示のとき,
      // またはイベントが focusout でエラーメッセージが非表示のときのみ実行.
      if (
        (e.type === 'input' && item.errors.length) ||
        (e.type === 'change' && !item.errors.length) ||
        (e.type === 'focusout' && !item.errors.length)
      ) {
        // エラーメッセージを一旦クリアにする (エラーメッセージの重複防止)
        this.clearErrorMessage(item)

        // 必須バリデーションを実行
        if (this.hasErrorRequired(item)) {
          item.errors.push(item.label + this.errorMessageBase.required)
          item.errorFlg = true
        }
      }
    },
    /**
     * submit できるか判定する.
     * @param e
     */
    validateSubmit (e) {
      if (
        this.name.errorFlg ||
        this.email.errorFlg ||
        this.body.errorFlg
      ) {
        e.preventDefault()
      }
      const params = new URLSearchParams()

      params.append('form-name', 'contact') // Forms使うのに必要

      params.append('name', this.name)
      params.append('email', this.email)
      params.append('body', this.body)

      axios
        .post('/', params)
        .then(() => {
          // this.isSubmit = true
        })
    },
    /**
     * 必須バリデーション.
     * @param item
     */
    hasErrorRequired (item) {
      return item.inputText === ''
    },
  },
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
      margin-bottom: 2rem;
      position: relative;
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
      appearance: none;
      -webkit-appearance: none;
      box-shadow:  inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color_white;
      box-sizing: border-box;
      margin-right: .5rem;
      transition: all 0.2s ease-in-out;
      width: 100%;

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

.errorList {
  color: $color_red;
  font-size: $fontSize_s;
  margin-bottom: .5rem !important;
  padding-left: 1rem;
}
</style>
