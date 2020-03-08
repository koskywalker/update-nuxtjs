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
      <client-only>
        <form
          class="contactForm"
          name="contact"
          action="/thanks"
          method="POST"
          netlify
          data-netlify-recaptcha="true"
        >
          <input
            type="hidden"
            name="form-name"
            value="contact"
          >
          <p>
            <label class="contactForm__label">
              {{ name.label }}
              <ul
                v-show="name.errors"
                class="contactForm__errorList"
              >
                <li
                  v-for="(error, index) in name.errors"
                  :key="index"
                  class="contactForm__errorListItem"
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
                autocomplete="name"
                placeholder="例) 山田太郎"
              >
            </label>
          </p>
          <p>
            <label class="contactForm__label">
              {{ email.label }}
              <ul
                v-show="email.errors"
                class="contactForm__errorList"
              >
                <li
                  v-for="(error, index) in email.errors"
                  :key="index"
                  class="contactForm__errorListItem"
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
                autocomplete="email"
                placeholder="例) info@example.com"
              >
            </label>
          </p>
          <p>
            <label class="contactForm__label">
              {{ body.label }}
              <ul
                v-show="body.errors"
                class="contactForm__errorList"
              >
                <li
                  v-for="(error, index) in body.errors"
                  :key="index"
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
          <div data-netlify-recaptcha="true" />
          <p>
            <button class="contactForm__button">
              送信
            </button>
          </p>
        </form>
      </client-only>
    </div>
  </div>
</template>

<script>
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
        required: 'を入力してください.',
        format: 'の形式が正しくありません.',
      },
    }
  },
  methods: {
    /**
     * 必須バリデーション.
     *
     * @param {Object} item バリデーション対象オブジェクト
     * @return {Boolean} true: エラーあり, false: エラーなし
     */
    hasErrorRequired (item) {
      return item.inputText === ''
    },

    /**
     * メールアドレスの形式バリデーション.
     *
     * @param {Object} item バリデーション対象オブジェクト
     * @return {Boolean} true: エラーあり, false: エラーなし
     */
    hasErrorEmailFormat (item) {
      const emailRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return !emailRegex.test(item.inputText)
    },

    /**
     * エラーメッセージを非表示にする.
     *
     * @param {Object} item 対象オブジェクト
     */
    clearErrorMessage (item) {
      item.errors = []
      item.errorFlg = false
    },

    /**
     * バリデーションの基本処理.
     *
     * @param {Object} item バリデーション対象オブジェクト
     */
    validate (item) {
      // エラーメッセージを一旦クリアにする (エラーメッセージの重複防止)
      this.clearErrorMessage(item)

      // 必須バリデーションを実行
      if (this.hasErrorRequired(item)) {
        item.errors.push(item.label + this.errorMessageBase.required)
        item.errorFlg = true
      }

      // バリデート対象が email であり, 何かしらの文字が入力されている場合,
      // メールアドレスの形式バリデーションを実行
      if (item === this.email && item.inputText) {
        if (this.hasErrorEmailFormat(item)) {
          item.errors.push(item.label + this.errorMessageBase.format)
          item.errorFlg = true
        }
      }
    },

    /**
     * 単体項目に対してバリデーションを実行.
     *
     * @param {Object} item バリデーション対象オブジェクト
     * @param {Object} e イベント
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
        this.validate(item)
      }
    },

    /**
     * submit 時に全項目に対してバリデーションを実行.
     *
     * @param {Object} e イベント
     */
    validateSubmit (e) {
      // 各項目に対するバリデーションを実行
      this.validate(this.name)
      this.validate(this.email)
      this.validate(this.body)

      // エラーが一つでも存在すれば submit しない
      if (
        this.name.errorFlg ||
        this.email.errorFlg ||
        this.body.errorFlg
      ) {
        e.preventDefault()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.contact {
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
    border-radius: 2rem;
    box-shadow:
      -2px -2px 5px rgba(255, 255, 255, 1),
      3px 3px 5px rgba(0, 0, 0, 0.1);
    margin: 0 auto 0;
    max-width: $width_single_column;
    padding: 2rem 1rem;
    width: $width_base;

    @include mq($mq_tablet) {
      padding: 2rem;
    }
  }

  &Form {
    &__label {
      display: block;
      font-weight: bold;
      margin-bottom: 2rem;
      position: relative;
      width: 100%;
    }

    &__errorList {
      color: $color_red_dark;
      font-size: $fontSize_s;
      margin-bottom: .5rem !important;
      padding-left: 1rem;
    }

    &__input,
    &__button {
      border: 0;
      outline: 0;
      border-radius: 2rem;
      padding: .5rem 1.5rem;
      background-color: $color_background_base_dark;
      text-shadow: 1px 1px 0 $color_white;
    }

    &__input {
      appearance: none;
      -webkit-appearance: none;
      box-shadow:  inset 2px 2px 5px $color_shadow_light, inset -5px -5px 10px $color_white;
      box-sizing: border-box;
      margin-right: .5rem;
      transition: all 0.2s ease-in-out;
      width: 100%;

      &:focus {
        box-shadow:  inset 1px 1px 2px $color_shadow_light, inset -1px -1px 2px $color_white;
      }
    }

    &__button {
      display: block;
      font-weight: bold;
      box-shadow: -4px -4px 10px $color_white,  4px 4px 10px $color_shadow_light;
      margin: 0 auto;
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
}
</style>
