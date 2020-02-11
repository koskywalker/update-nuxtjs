<template>
  <div class="menu">
    <transition name="slide-bottom">
      <share-buttons
        :title="title"
        v-if="showShareButtons"
        class="shareButtons"
      />
      <follow-buttons
        v-if="showFollowButtons"
        class="followButtons"
      />
    </transition>
    <transition name="fade">
      <div
        v-if="showDrawerMenu"
        @click="closeDrawer"
        class="drawerBackground"
      />
    </transition>
    <transition name="slide-right">
      <drawer-menu
        v-if="showDrawerMenu"
        @closeDrawer="closeDrawer"
        class="drawerMenu"
      />
    </transition>
    <nav class="menuInner">
      <ul class="menuList">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="menuList__item"
        >
          <button
            :class="item.class"
            @click="buttonAction"
            class="menuList__itemLink js-button"
          >
            <font-awesome-icon
              :icon="item.icon"
              class="menuList__itemIcon"
            />
            <span class="menuList__itemName">{{ item.name }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import ShareButtons from '~/components/ShareButtons'
import FollowButtons from '~/components/FollowButtons'
import DrawerMenu from '~/components/DrawerMenu'

export default {
  name: 'TheFooterMenuFixed',
  components: {
    ShareButtons,
    FollowButtons,
    DrawerMenu,
  },
  data () {
    return {
      items: this.$footerMenuFixed,
      title: '',
      showShareButtons: false,
      showFollowButtons: false,
      showDrawerMenu: false,
    }
  },
  methods: {
    /**
     * フッターメニューボタン押下時のアクション処理
     */
    buttonAction (e) {
      this.buttonActionInitialize(e)

      if (e.target.classList.contains('js-buttonHome')) {
        this.clickHome(e)
      } else if (e.target.classList.contains('js-buttonShare')) {
        this.clickShare(e)
      } else if (e.target.classList.contains('js-buttonFollow')) {
        this.clickFollow(e)
      } else if (e.target.classList.contains('js-buttonMenu')) {
        this.clickMenu(e)
      } else if (e.target.classList.contains('js-buttonTop')) {
        this.clickTop(e)
      }
    },
    /**
     * フッターメニュー内のボタン押下時の共通処理
     */
    buttonActionInitialize (e) {
      const buttonList = document.querySelectorAll('.js-button')

      this.showShareButtons = false
      this.showFollowButtons = false
      this.showDrawerMenu = false

      if (e.target.classList.contains('active')) {
        Array.from(buttonList).map(button => button.classList.remove('active'))
      } else {
        Array.from(buttonList).map(button => button.classList.remove('active'))
        e.target.classList.add('active')
      }
    },
    /**
     * フッターメニュー内のホームボタン押下時の処理
     */
    clickHome (e) {
      if (this.$route.path === '/') {
        this.clickTop(e)
      } else {
        this.$router.push('/')
        e.target.classList.remove('active')
      }
    },
    /**
     * フッターメニュー内のシェアボタン押下時の処理
     */
    clickShare (e) {
      if (e.target.classList.contains('active')) {
        this.showShareButtons = true
      } else {
        this.showShareButtons = false
      }
    },
    /**
     * フッターメニュー内のフォローボタン押下時の処理
     */
    clickFollow (e) {
      if (e.target.classList.contains('active')) {
        this.showFollowButtons = true
      } else {
        this.showFollowButtons = false
      }
    },
    /**
     * フッターメニュー内のメニューボタン押下時の処理
     */
    clickMenu (e) {
      if (e.target.classList.contains('active')) {
        this.showDrawerMenu = true
      } else {
        this.showDrawerMenu = false
      }
    },
    /**
     * フッターメニュー内のトップボタン押下時の処理
     */
    clickTop (e) {
      if (window.scrollY === 0) {
        e.target.classList.remove('active')
        return
      }

      scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      let setTimeoutId = null

      const removeActiveClass = () => {
        if (setTimeoutId) {
          clearTimeout(setTimeoutId)
        }

        setTimeoutId = setTimeout(() => {
          e.target.classList.remove('active')
          window.removeEventListener('scroll', removeActiveClass)
        }, 500)
      }

      window.addEventListener('scroll', removeActiveClass)
    },
    /**
     * ドロワーメニューを閉じる
     */
    closeDrawer () {
      this.showDrawerMenu = false
      document.querySelector('.js-buttonMenu').classList.remove('active')
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  background-color: $color_white;
  bottom: 0;
  height: 54px;
  line-height: 1;
  margin: 0 auto;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  position: fixed;
  width: 100%;

  &Inner {
    background-color: $color_white;
    box-shadow: 0 -2px 3px rgba(100, 120, 130, 0.5);
    height: 100%;
    position: relative;
  }

  &List {
    display: flex;
    height: 100%;
    justify-content: center;

    &__item {
      max-width: calc(1180px / 5);
      width: 20%;

      &Link {
        align-items: center;
        background-color: $color_white;
        border: 0;
        color: $color_gray;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        outline: none;
        padding: 0;
        transition: 0s;
        width: 100%;

        @include mq($mq_pc) {
          &:hover {
            background-color: $color_gray_light;
          }
        }

        &.active {
          background-color: $color_gray_light;
        }

        &--home.active {
          color: $color_black;
        }

        &--share.active {
          color: $color_red;
        }

        &--follow.active {
          color: $color_pink;
        }

        &--menu.active {
          color: $color_green;
        }

        &--top.active {
          color: $color_blue;
        }
      }

      &Icon {
        margin-bottom: 7px;
        pointer-events: none;
      }

      &Name {
        font-size: $fontSize_s;
        font-weight: bold;
        pointer-events: none;
      }
    }
  }
}

.shareButtons,
.followButtons {
  bottom: 54px;
  position: absolute;
}

.drawerMenu {
  position: fixed;
  top: 0;
  right: 0;
}

.drawerBackground {
  background-color: $color_gray_transparent;
  height: 100vh;
  position: fixed;
  top: 0;
  width: 100vw;
}

.slide-bottom {
  &-enter-active,
  &-leave-active {
    transition: all .5s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity .5s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.slide-right {
  &-enter-active,
  &-leave-active {
    transition: all .5s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
