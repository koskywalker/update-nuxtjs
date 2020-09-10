<template>
  <nav class="share">
    <ul class="shareInner">
      <li class="shareInner__item">
        <button
          @click="windowOpen(twitterShareUrl)"
          class="shareInner__itemLink"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="shareInner__itemIcon shareInner__itemIcon--twitter"
          />
        </button>
      </li>
      <li class="shareInner__item">
        <button
          @click="windowOpen(facebookShareUrl)"
          class="shareInner__itemLink"
        >
          <font-awesome-icon
            :icon="['fab', 'facebook-f']"
            class="shareInner__itemIcon shareInner__itemIcon--facebook"
          />
        </button>
      </li>
      <li class="shareInner__item">
        <button
          @click="windowOpen(hatebuShareUrl)"
          class="shareInner__itemLink"
        >
          <b
            class="shareInner__itemIcon shareInner__itemIcon--hatebu"
          >
            B!
          </b>
        </button>
      </li>
      <li class="shareInner__item">
        <button
          @click="windowOpen(pocketShareUrl)"
          class="shareInner__itemLink"
        >
          <font-awesome-icon
            :icon="['fab', 'get-pocket']"
            class="shareInner__itemIcon shareInner__itemIcon--pocket"
          />
        </button>
      </li>
      <li class="shareInner__item">
        <button
          @click="windowOpen(lineShareUrl)"
          class="shareInner__itemLink"
        >
          <font-awesome-icon
            :icon="['fab', 'line']"
            class="shareInner__itemIcon shareInner__itemIcon--line"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'

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
  background-color: $color_gray_transparent;
  height: 70px;
  width: 100%;

  &Inner {
    display: flex;
    height: 100%;
    justify-content: center;

    &__item {
      align-items: center;
      display: flex;
      justify-content: center;
      max-width: calc(1180px / 5);
      width: 20%;

      &Link {
        align-items: center;
        background-color: $color_white;
        border: 0;
        border-radius: 5px;
        display: flex;
        height: 40px;
        justify-content: center;
        outline: none;
        padding: 0;
        width: 80%;
      }

      &Icon {
        font-size: $fontSize_l;

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
      }
    }
  }
}
</style>
