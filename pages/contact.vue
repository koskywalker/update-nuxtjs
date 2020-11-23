<template>
  <div class="contact">
    <div class="contactInner">
      <h1 class="contactTitle">
        {{ title }}
      </h1>
      <client-only>
        <form
          class="contactForm"
          name="contact"
          method="POST"
          netlify
          data-netlify-recaptcha="true"
          @submit.prevent="validateSubmit"
        >
          <input
            type="hidden"
            name="form-name"
            value="contact"
          >
          <div class="contactForm__item">
            <label
              for="name"
              class="contactForm__label"
            >
              {{ name.label }}
            </label>
            <ul
              v-show="name.errors"
              :class="{ contactForm__errorList: name.errors.length }"
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
              id="name"
              v-model="name.inputText"
              class="contactForm__input"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="例) 山田太郎"
              @input="validateItem(name, arguments[0])"
              @change="validateItem(name, arguments[0])"
              @focusout="validateItem(name, arguments[0])"
            >
          </div>
          <div class="contactForm__item">
            <label
              for="email"
              class="contactForm__label"
            >
              {{ email.label }}
            </label>
            <ul
              v-show="email.errors"
              :class="{ contactForm__errorList: email.errors.length }"
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
              id="email"
              v-model="email.inputText"
              class="contactForm__input"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="例) info@example.com"
              @input="validateItem(email, arguments[0])"
              @change="validateItem(email, arguments[0])"
              @focusout="validateItem(email, arguments[0])"
            >
          </div>
          <div class="contactForm__item">
            <label
              for="message"
              class="contactForm__label"
            >
              {{ message.label }}
            </label>
            <ul
              v-show="message.errors"
              :class="{ contactForm__errorList: message.errors.length }"
            >
              <li
                v-for="(error, index) in message.errors"
                :key="index"
              >
                {{ error }}
              </li>
            </ul>
            <textarea
              id="message"
              v-model="message.inputText"
              class="contactForm__input"
              name="message"
              rows="6"
              @input="validateItem(message, arguments[0])"
              @change="validateItem(message, arguments[0])"
              @focusout="validateItem(message, arguments[0])"
            />
          </div>
          <div data-netlify-recaptcha="true" />
          <div>
            <button class="contactForm__button">
              送信
            </button>
          </div>
        </form>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'お問い合わせ',
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
      message: {
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
     * Ajax による Form 送信
     *
     * @param {Object} e イベント
     */
    async submitForm (e) {
      const form = e.target
      const body = new URLSearchParams(new FormData(form))
      try {
        const res = await fetch(form.action, { method: 'POST', body })
        if (res.ok) {
          this.$router.push({ name: 'thanks' })
        } else {
          throw res
        }
      } catch (err) {
        console.error(err)
      }
    },

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
      this.validate(this.message)

      // エラーが一つでも存在すれば submit しない
      if (
        this.name.errorFlg ||
        this.email.errorFlg ||
        this.message.errorFlg
      ) {
        e.preventDefault()
        return
      }
      this.submitForm(e)
    },
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL + this.$route.path },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.contact {
  @extend %shadow_base;

  background-color: $color_white;
  margin-bottom: 2rem;
  padding: 2rem 0;

  @include mq($mq_pc) {
    padding: 3rem 0;
  }
}

.contactInner {
  margin: 0 1rem;

  @include mq($mq_tablet) {
    margin: 0 2rem;
  }

  @include mq($mq_pc) {
    margin: 0 3rem;
  }
}

.contactTitle {
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

.contactForm {
  margin-top: 3rem;
}

.contactForm__item {
  margin-bottom: 1.5rem;
}

.contactForm__label {
  display: block;
  font-weight: 700;
}

ul.contactForm__errorList {
  color: $color_red_dark;
}

.contactForm__input {
  border: 1px solid $color_gray_middle;
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 100%;
}

.contactForm__button {
  align-items: center;
  background-color: $color_navy;
  box-shadow: 0 5px 0 $color_gray, 0 10px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 0 $color_navy_dark, 0 10px 0 rgba(0, 0, 0, 0.2);
  color: $color_white;
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin: 2rem 0;
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
