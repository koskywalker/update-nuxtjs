<template>
  <div>
    <the-particles />
    <the-header />
    <nuxt />
    <the-footer />
    <the-footer-menu-fixed />
    <dammy-image />
  </div>
</template>

<script>
import TheParticles from '@/layouts/TheParticles'
import TheHeader from '@/layouts/TheHeader'
import TheFooter from '@/layouts/TheFooter'
import TheFooterMenuFixed from '@/layouts/TheFooterMenuFixed'
import DammyImage from '@/components/DammyImage'

export default {
  components: {
    TheParticles,
    TheHeader,
    TheFooter,
    TheFooterMenuFixed,
    DammyImage,
  },
  head () {
    return {
      titleTemplate: '%s - ' + this.$blogInfo.blogName,
      title: this.$blogInfo.baseTitle,
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { hid: 'description', name: 'description', content: this.$blogInfo.baseDescription },
        { hid: 'og:url', property: 'og:url', content: process.env.DEPLOY_PRIME_URL },
        { hid: 'og:site_name', property: 'og:site_name', content: this.$blogInfo.baseName },
        { hid: 'og:title', property: 'og:title', content: this.$blogInfo.baseName },
        { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$blogInfo.baseDescription,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.$blogInfo.baseOgpImage,
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@kosuke_upd' },
      // { property: 'article:publisher', content: 'FacebookURL' },
      // { property: 'fb:app_id', content: process.env.FACEBOOK_APP_ID }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon_16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '/favicon_32.png', sizes: '32x32' },
      ],
    }
  },
}
</script>

<style lang="scss">
/*
** reset
*/

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default padding */
ul[class],
ol[class] {
  padding: 0;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Set core body defaults */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Remove list styles on ul, ol elements with a class attribute */
ul[class],
ol[class] {
  list-style: none;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img {
  max-width: 100%;
  display: block;
}

/* Natural flow and rhythm in articles by default */
article > * + * {
  margin-top: 1em;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/*
** base
*/

// 基本
html {
  font-size: $fontSize_base_sp;

  @include mq($mq_tablet) {
    font-size: $fontSize_base_pc;
  }
}

body {
  background-color: $color_white;
  color: $color_black;
  font-family: $font_main;
  line-height: 1.8;
  overflow-wrap: break-word;
  word-break: normal;
  width: 100%;
}

a {
  color: $color_link;
  text-decoration: none;
}

p {
  margin-bottom: 1rem;
  word-wrap: break-word;
}

// 文字
h1 {
  font-size: $fontSize_l;

  @include mq($mq_tablet) {
    font-size: $fontSize_xl;
  }
}

h2 {
  font-size: $fontSize_l;
}

h3,
h4 {
  font-size: $fontSize_m;
}

pre {
  margin: 0;
  white-space: pre-wrap;
}

code,
kbd,
pre,
samp {
  font-family: "Menlo", "Consolas", "monaco", "monospace", "ＭＳ ゴシック", sans-serif;
}

sub,
sup {
  font-size: $fontSize_xs;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25rem;
}

sup {
  top: -0.5rem;
}

// リスト
dl,
ol,
ul {
  margin: 1rem 0;
}

dd {
  margin: 0;
}

ol,
ul {
  list-style-type: none;
  padding: 0;
}

img {
  height: auto;
  vertical-align: middle;
}

iframe {
  max-width: 100%
}

// フォーム
button,
input,
select,
textarea {
  border: 0;
  margin: 0;
  padding: 0;
}

button,
input[type="button"],
input[type="reset"],
input[type="submit"] {
  cursor: pointer;
}

/*
** 汎用的なスタイル
*/

.br_sp {
  @include mq($mq_tablet) {
    display: none;
  }
}
</style>
