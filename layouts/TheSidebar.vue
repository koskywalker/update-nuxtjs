<template>
  <aside class="side">
    <div class="sideInner">
      <div class="sideItem sideProfile">
        <div class="sideItemInner sideProfileInner">
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
      </div>
    </div>
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
        this.isDisabledLightSaber = !this.isDisabledLightSaber
        this.isLightSaberShow = false
        this.switchStatus = false
        await this.wait(500)
        this.isDisabledLightSaber = !this.isDisabledLightSaber
      } else {
        this.isDisabledLightSaber = !this.isDisabledLightSaber
        this.isLightSaberShow = !this.isLightSaberShow
        await this.wait(1000)
        this.switchStatus = !this.switchStatus
        await this.wait(300)
        this.isDisabledLightSaber = !this.isDisabledLightSaber
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sideInner {
  @include mq($mq_pc) {
    position: sticky;
    top: 2rem;
  }
}

.sideItem {
  @extend %shadow_base;

  background-color: $color_white;
  border-radius: 3px;
  overflow: hidden;
}

.sideItemInner {
  margin: 0 1rem 2rem;
}

.sideProfileInner {
  &::before {
    background-color: $color_navy;
    content: '';
    display: block;
    height: 10rem;
    margin: 0 -1rem;
    width: calc(100% + 2rem);
  }
}

.sideProfile__image {
  border-radius: 50%;
  margin: -100px auto 1rem;
  position: relative;
  width: 160px;
}

.sideProfile__imageInner {
  border: 5px solid $color_white;
  border-radius: 50%;
  overflow: hidden;
}

.sideProfile__imageLightSaber {
  left: 65%;
  position: absolute;
  top: 50px;
}

.sideProfile__name {
  font-weight: bold;
  text-align: center;
}

.sideProfile__nameText {
  margin: 0;
}

.sideProfile__nameLabel {
  color: $color_gray;
}

.sideProfile__button {
  margin-bottom: 2rem;
}

.sideProfile__textSentence {
  font-size: $fontSize_s;
}

.sideProfile__sns {
  font-weight: bold;
  text-align: center;
}

.sideProfile__snsTitle {
  @extend %font_accent;

  margin-bottom: 0.5rem;
}

.sideProfile__snsList {
  display: flex;
  justify-content: center;
}

.sideProfile__snsListItem {
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
}

.sideProfile__snsListItem--twitter {
  background-color: $color_twitter;
}

.sideProfile__snsListItem--instagram {
  background: $color_instagram;
}

.sideProfile__snsListItem--github {
  background-color: $color_github;
}

.sideProfile__snsListItem--feedly {
  background-color: $color_feedly;
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
