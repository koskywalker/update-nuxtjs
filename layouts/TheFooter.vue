<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer-main">
        <div class="footer-header">
          <h2 class="footer-logo">
            <nuxt-link class="footer-logoLink" to="/">
              {{ constants.BLOG_INFO.BLOG_NAME }}
            </nuxt-link>
          </h2>
          <p>
            {{ constants.BLOG_INFO.BASE_TITLE }}
          </p>
          <div class="footer-contact">
            <nuxt-link
              class="footer-contactButton"
              to="/contact"
            >
              お問い合わせ
            </nuxt-link>
          </div>
        </div>
        <div class="footer-body">
          <div
            v-for="menu in menuList"
            :key="menu.title"
            class="footer-menu"
          >
            <h3 class="footer-menuTitle">{{ menu.title}}</h3>
            <ul class="footer-menuBody">
              <li
                class="footer-item"
                v-for="(item, index) in menu.body"
                :key="index"
              >
                <a
                  v-if="isInternalLink(item.url)"
                  class="footer-itemLink"
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ item.name }}
                </a>
                <nuxt-link
                  v-else
                  class="footer-itemLink"
                  :to="item.url"
                >
                  {{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-copy">
        <p class="footer-copyText">
          &copy; 2018 Kosuke Muraka
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'

export default {
  data() {
    return {
      constants: CONSTANTS,
    }
  },
  computed: {
    snsMenu() {
      const { HP, ...snsObject } = CONSTANTS.MY_INFO.SNS
      const snsList = []
      Object.values(snsObject).map((item) => {
        snsList.push({
          name: item.NAME,
          url: item.URL,
        })
      })
      return { title: 'SNS', body: snsList }
    },
    aboutMenu() {
      const aboutList = []
      CONSTANTS.MAIN_MENU.map((item) => {
        aboutList.push({
          name: item.NAME,
          url: item.URL,
        })
      })
      return { title: 'MENU', body: aboutList }
    },
    menuList() {
      return [ this.snsMenu, this.aboutMenu ]
    },
  },
  methods: {
    isInternalLink(url) {
      const regex = /^https?:\/\//
      return regex.test(url)
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  background-color: $color_black;
  color: $color_white;
  margin-bottom: calc(64px + env(safe-area-inset-bottom));
}

.wrapper {
  margin: 0 auto;
  width: min(92%, 1180px);
}

.footer-main {
  padding: 3rem 0 4rem;

  @include mq($mq_pc) {
    display: flex;
  }
}

.footer-header {
  @include mq($mq_pc) {
    width: 55%;
  }
}

.footer-body {
  @include mq($mq_tablet) {
    display: flex;
  }

  @include mq($mq_pc) {
    flex: 1;
  }
}

.footer-logo {
  @extend %font_accent;

  font-size: $fontSize_3l;
  font-weight: normal;
}

.footer-logoLink {
  color: $color_white;
}

.footer-contact {
  display: inline-block;
}

.footer-contactButton {
  align-items: center;
  background-color: $color_navy;
  box-shadow: 0 5px 0 $color_navy_dark, 0 10px 0 rgba(0, 0, 0, 0.2);
  color: $color_white;
  display: flex;
  font-weight: 700;
  justify-content: center;
  margin-bottom: 5px;
  padding: 0.5rem 1rem;
  position: relative;
  transition: 0.1s;

  &:hover {
    box-shadow: 0 3px 0 $color_navy_dark, 0 6px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(3px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(5px);
  }

  &::before {
    background-image: url(~assets/icon/icon_mail.svg);
    background-size: contain;
    content: '';
    display: block;
    height: 1.5rem;
    margin-right: 0.5rem;
    width: 1.5rem;
  }
}

.footer-menu {
  margin-top: 2rem;

  @include mq($mq_tablet) {
    width: 50%;
  }

  @include mq($mq_pc) {
    margin-top: 1rem;
  }
}

.footer-menuTitle {
  @extend %font_accent;

  font-weight: normal;
}

ul.footer-menuBody {
  margin-top: 1rem;
}

.footer-item {
  overflow: hidden;
}

.footer-itemLink {
  color: $color_gray_middle;
  position: relative;
  transition: all 0.3s ease-out;

  &::before {
    background-color: white;
    content: '';
    height: 3px;
    left: -12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease-out;
    width: 6px;
  }

  &:hover,
  &:active {
    padding-left: 12px;

    &::before {
      left: 0;
    }
  }
}

@for $index from 1 through length($colors) {
  .footer-item:nth-of-type(#{$index}) .footer-itemLink::before {
    background-color: #{nth($colors, $index)};
  }
}

.footer-copy {
  border-top: 1px solid $color_gray_middle;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.footer-copyText {
  margin: 0;
}
</style>
