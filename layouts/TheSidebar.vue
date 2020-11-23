<template>
  <aside class="side">
    <div class="sideItem sideProfile">
      <h3
        ref="profileTitle"
        class="sideItem__title"
      >
        <span class="sideItem__titleText">
          Profile
        </span>
      </h3>
      <div
        class="sideProfile__image"
      >
        <div
          class="sideProfile__imageInner"
        >
          <img
            src="https://images.ctfassets.net/cehw3wy3j8jc/4CzR18vKdFrmnNI8ihxevU/380ec9d71bac06a22dd2d4bdab248d6e/profile3.jpg?h=250"
            alt="プロフィール写真"
            height="250"
            width="250"
            loading="lazy"
          >
        </div>
        <transition name="fade">
          <light-saber
            v-show="isLightSaberShow"
            :switch-status="switchStatus"
            class="sideProfile__imageLightSaber"
          />
        </transition>
      </div>
      <div class="sideProfile__name">
        <p class="sideProfile__nameText">
          {{ myInfo.NICKNAME }} ({{ myInfo.NAME }})
        </p>
        <p class="sideProfile__nameLabel">
          {{ myInfo.LABEL_MAIN }}
        </p>
      </div>
      <button-colorful
        :disabled="isDisabledLightSaber"
        class="sideProfile__button"
        @click-button-colorful="easterEggLightSaber"
      />
      <div class="sideProfile__text">
        <p
          v-for="(sentence, index) in myInfo.INTRODUCTION"
          :key="index"
          class="sideProfile__textSentence"
        >
          {{ sentence }}
        </p>
      </div>
      <div class="sideProfile__sns">
        <p class="sideProfile__snsTitle">
          ＼ Follow Me !! ／
        </p>
        <div class="sideProfile__snsList">
          <a
            v-for="(item, index) in items"
            :key="index"
            :href="item.url"
            :class="item.class"
            target="_blank"
            rel="noopener"
            class="sideProfile__snsListItem"
          >
            <img
              :src="item.src"
              :alt="item.name"
              width="24"
              height="24"
            >
          </a>
        </div>
      </div>
    </div>
    <recent-posts class="sideItem" />
  </aside>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'

export default {
  data () {
    return {
      myInfo: CONSTANTS.MY_INFO,
      items: [
        {
          name: 'Twitter',
          url: CONSTANTS.MY_INFO.SNS.TWITTER.URL,
          src: require('@/assets/icon/icon_twitter.svg'),
          class: 'sideProfile__snsListItem--twitter',
        },
        {
          name: 'Instagram',
          url: CONSTANTS.MY_INFO.SNS.INSTAGRAM.URL,
          src: require('@/assets/icon/icon_instagram.svg'),
          class: 'sideProfile__snsListItem--instagram',
        },
        {
          name: 'GitHub',
          url: CONSTANTS.MY_INFO.SNS.GITHUB.URL,
          src: require('@/assets/icon/icon_github.svg'),
          class: 'sideProfile__snsListItem--github',
        },
        {
          name: 'Feedly',
          url: CONSTANTS.MY_INFO.SNS.FEEDLY.URL,
          src: require('@/assets/icon/icon_feedly.svg'),
          class: 'sideProfile__snsListItem--feedly',
        },
      ],
      isDisabledLightSaber: false,
      isLightSaberShow: false,
      switchStatus: false,
      tempProfileTitleInnerElement: '',
    }
  },
  methods: {
    /**
     * 引数に指定したミリ秒処理を止める
     * @param ms ミリ秒
     */
    wait (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    /**
     * イースターエッグ (ライトセーバー)
     */
    async easterEggLightSaber () {
      if (this.isLightSaberShow) {
        // ライトセーバーを出している場合, 元に戻してにしてプロフィール見出しを復元
        this.isDisabledLightSaber = !this.isDisabledLightSaber
        this.isLightSaberShow = false
        this.switchStatus = false
        await this.wait(500)
        this.$refs.profileTitle.innerHTML = this.tempProfileTitleInnerElement
        this.isDisabledLightSaber = !this.isDisabledLightSaber
      } else {
        // ライトセーバーを出していない場合,
        // ライトセーバーを出現させてプロフィール見出しを破壊
        this.isDisabledLightSaber = !this.isDisabledLightSaber
        this.tempProfileTitleInnerElement = this.$refs.profileTitle.innerHTML
        this.isLightSaberShow = !this.isLightSaberShow
        await this.wait(1000)
        this.switchStatus = !this.switchStatus
        await this.wait(300)

        for (let i = 0; i < 10; i++) {
          this.$refs.profileTitle.innerHTML = '　'
          await this.wait(100)
          this.$refs.profileTitle.innerHTML = this.tempProfileTitleInnerElement
          await this.wait(100)
        }

        await this.wait(500)
        this.$refs.profileTitle.innerHTML = '　'
        this.isDisabledLightSaber = !this.isDisabledLightSaber
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.side {
  &Item {
    @extend %shadow_base;

    background-color: $color_white;
    border-radius: 3px;
    margin-bottom: 2rem;
    overflow: hidden;
    padding: 1rem 1rem 2rem;

    &__title {
      @extend %font_accent;

      font-size: $fontSize_l;
      letter-spacing: 0.1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      position: relative;
      text-align: center;

      &::before {
        background-image: -webkit-gradient(linear, left top, right top, from($color_navy), to($color_green));
        background-image: -webkit-linear-gradient(left, $color_navy 0%, $color_green 100%);
        background-image: linear-gradient(to right, $color_navy 0%, $color_green 100%);
        bottom: 0;
        content: '';
        height: 5px;
        left: 0;
        position: absolute;
        width: 100%;
      }

      &Text::before {
        background-image: url(~assets/icon/icon_human.svg);
        background-repeat: no-repeat;
        background-size: contain;
        content: '';
        display: inline-block;
        height: $fontSize_l;
        line-height: 1.8;
        margin-bottom: 0.3rem;
        vertical-align: middle;
        width: $fontSize_l;
      }
    }
  }

  &Profile {
    &__image {
      border-radius: 10px;
      margin: 0 auto 1rem;
      position: relative;
      width: 150px;

      &Inner {
        @extend %shadow_base;

        border-radius: 10px;
        overflow: hidden;
      }

      &LightSaber {
        left: 65%;
        position: absolute;
        top: 50px;
      }
    }

    &__name {
      font-weight: bold;
      text-align: center;

      &Text {
        margin: 0;
      }

      &Label {
        color: $color_gray;
      }
    }

    &__button {
      margin-bottom: 2rem;
    }

    &__textSentence {
      font-size: $fontSize_s;
    }

    &__sns {
      font-weight: bold;
      text-align: center;

      &Title {
        @extend %font_accent;

        margin-bottom: 0.5rem;
      }

      &List {
        display: flex;
        justify-content: center;

        &Item {
          @extend %shadow_base;

          border-radius: 15%;
          color: $color_white;
          font-size: $fontSize_l;
          line-height: 1;
          margin: 0 0.5rem;
          padding: 0.5rem;

          &:hover {
            @extend %shadow_base_hover;
          }

          &--twitter {
            background-color: $color_twitter;
          }

          &--instagram {
            background: $color_instagram;
          }

          &--github {
            background-color: $color_github;
          }

          &--feedly {
            background-color: $color_feedly;
          }
        }
      }
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}
</style>
