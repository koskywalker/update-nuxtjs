<template>
  <div class="share">
    <p class="shareTitle">
      \ この記事をシェアする！ /
    </p>
    <nav>
      <ul class="shareInner">
        <li class="shareInner__item">
          <button
            class="shareInner__itemLink shareInner__item--twitter"
            @click="windowOpen(twitterShareUrl)"
          >
            <fa
              :icon="faTwitter"
              class="shareInner__itemIcon"
            />
            <span class="shareInner__itemText">ツイート</span>
          </button>
        </li>
        <li class="shareInner__item">
          <button
            class="shareInner__itemLink shareInner__item--facebook"
            @click="windowOpen(facebookShareUrl)"
          >
            <fa
              :icon="faFacebookF"
              class="shareInner__itemIcon"
            />
            <span class="shareInner__itemText">シェア</span>
          </button>
        </li>
        <li class="shareInner__item">
          <button
            class="shareInner__itemLink shareInner__item--hatebu"
            @click="windowOpen(hatebuShareUrl)"
          >
            <b
              class="shareInner__itemIcon"
            >
              B!
            </b>
            <span class="shareInner__itemText">はてブ</span>
          </button>
        </li>
        <li class="shareInner__item">
          <button
            class="shareInner__itemLink shareInner__item--line"
            @click="windowOpen(pocketShareUrl)"
          >
            <fa
              :icon="faGetPocket"
              class="shareInner__itemIcon"
            />
            <span class="shareInner__itemText">LINE</span>
          </button>
        </li>
        <li class="shareInner__item">
          <button
            class="shareInner__itemLink shareInner__item--pocket"
            @click="windowOpen(lineShareUrl)"
          >
            <fa
              :icon="faLine"
              class="shareInner__itemIcon"
            />
            <span class="shareInner__itemText">Pocket</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
import { faTwitter, faFacebookF, faGetPocket, faLine } from '@fortawesome/free-brands-svg-icons'

export default {
  name: 'ShareButtons',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      twitterUrl: 'https://twitter.com/intent/tweet?url={0}&text={1}&related={2}&via={3}&lang=ja',
      facebookUrl: 'https://www.facebook.com/sharer/sharer.php?u={0}',
      hatebuUrl: 'https://b.hatena.ne.jp/add?mode=confirm&amp;url={0}&amp;title={1}',
      pocketUrl: 'https://getpocket.com/edit?url={0}',
      lineUrl: 'https://timeline.line.me/social-plugin/share?url={0}',
      faTwitter,
      faFacebookF,
      faGetPocket,
      faLine,
    }
  },
  computed: {
    url () {
      return process.env.BASE_URL + this.$route.path
    },
    twitterShareUrl () {
      return this.formatByArr(this.twitterUrl, this.url, this.title, CONSTANTS.MY_INFO.SNS.TWITTER.USER, CONSTANTS.MY_INFO.SNS.TWITTER.USER)
    },
    facebookShareUrl () {
      return this.formatByArr(this.facebookUrl, this.url)
    },
    hatebuShareUrl () {
      return this.formatByArr(this.hatebuUrl, this.url, this.title)
    },
    pocketShareUrl () {
      return this.formatByArr(this.pocketUrl, this.url)
    },
    lineShareUrl () {
      return this.formatByArr(this.lineUrl, this.url)
    },
  },
  methods: {
    /**
     * シェアリンクを生成して返す.
     */
    formatByArr (msg) {
      let args = []
      for (let i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i]
      }
      args = args.map(x => encodeURIComponent(x))
      return msg.replace(/\{(\d+)\}/g, (m, k) => {
        return args[k]
      })
    },
    /**
     * URL を ウィンドウとして開く.
     */
    windowOpen (url) {
      return window.open(url, '_blank', 'top=100, left=100, width=600, height=500')
    },
  },
}
</script>

<style lang="scss" scoped>
.share {
  margin-top: 3rem;
  width: 100%;

  &Title {
    color: $color_gray;
    font-size: $fontSize_m;
    font-weight: 700;
    text-align: center;
  }

  &Inner {
    display: flex;
    height: 100%;
    justify-content: center;

    &__item {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 20%;

      &--twitter {
        color: $color_twitter;
      }

      &--facebook {
        color: $color_facebook;
      }

      &--hatebu {
        color: $color_hatebu;
      }

      &--pocket {
        color: $color_pocket;
      }

      &--line {
        color: $color_line;
      }

      &Link {
        align-content: space-between;
        background-color: $color_white;
        border: 0;
        display: flex;
        flex-wrap: wrap;
        height: 45px;
        justify-content: center;
        outline: none;
        padding: 0;
      }

      &Text {
        font-size: $fontSize_xs;
        width: 100%;
      }

      &Icon {
        font-size: $fontSize_l;
        line-height: 1;
        width: 100%;
      }
    }
  }
}
</style>
