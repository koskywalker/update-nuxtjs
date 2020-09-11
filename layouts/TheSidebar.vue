<template>
  <aside class="side">
    <div class="sideItem sideProfile">
      <h3
        ref="profileTitle"
        class="sideItem__title"
      >
        <fa
          :icon="faUser"
          class="followInner__itemIcon"
        />
        Profile
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
        @clickButtonColorful="easterEggLightSaber"
      />
      <div class="sideProfile__text">
        <p class="sideProfile__textSentence">
          {{ myInfo.INTRODUCTION.FIRST }}
        </p>
        <p class="sideProfile__textSentence">
          {{ myInfo.INTRODUCTION.STRONG_POINTS }}
        </p>
        <p class="sideProfile__textSentence">
          {{ myInfo.INTRODUCTION.OTHER }}
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
            class="sideProfile__snsListItem"
          >
            <fa
              :icon="item.icon"
            />
          </a>
          </li>
        </div>
      </div>
    </div>
    <recent-posts class="sideItem" />
  </aside>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
import { faUser, faRss } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'

export default {
  data () {
    return {
      faUser,
      myInfo: CONSTANTS.MY_INFO,
      items: [
        {
          url: CONSTANTS.MY_INFO.SNS.TWITTER.URL,
          icon: faTwitter,
          class: 'sideProfile__snsListItem--twitter',
        },
        {
          url: CONSTANTS.MY_INFO.SNS.INSTAGRAM.URL,
          icon: faInstagram,
          class: 'sideProfile__snsListItem--instagram',
        },
        {
          url: CONSTANTS.MY_INFO.SNS.GITHUB.URL,
          icon: faGithub,
          class: 'sideProfile__snsListItem--github',
        },
        {
          url: CONSTANTS.MY_INFO.SNS.FEEDLY.URL,
          icon: faRss,
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

      border-bottom: 0.3rem solid;
      border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
      border-image-slice: 1;
      font-size: $fontSize_l;
      letter-spacing: 0.1rem;
      margin-bottom: 2rem;
      padding-bottom: 0.3rem;
      text-align: center;
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
