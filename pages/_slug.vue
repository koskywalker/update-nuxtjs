<template>
  <div class="post">
    <div class="postInner">
      <article>
        <div
          class="postHeader"
        >
          <h1 class="postHeader__title">
            {{ currentPost.fields.title }}
          </h1>
          <p class="postHeader__date">
            <span class="postHeader__datePublished">
              投稿日: {{ (new Date(currentPost.fields.publishDate)).toLocaleDateString() }}
            </span>
            <span
              v-if="currentPost.sys.updatedAt"
              class="postHeader__dateUpdated"
            >
              更新日: {{ (new Date(currentPost.sys.updatedAt)).toLocaleDateString() }}
            </span>
          </p>
          <div class="postHeader__tagList">
            <nuxt-link
              v-for="(tag, index) in currentPost.fields.tags"
              :key="index"
              :to="linkTo('tags', tag)"
              class="postHeader__tagListItem"
            >
              {{ tag.fields.name }}
            </nuxt-link>
          </div>
          <p class="postHeader__thumbnail">
            <img
              :src="currentPost.fields.heroImage.fields.file.url + '?w=800'"
              :alt="currentPost.fields.heroImage.fields.description"
              class="postHeader__thumbnailImage"
              width="800"
              height="450"
              loading="lazy"
            >
          </p>
        </div>
        <div class="postBody">
          <div class="postBodyInner">
            <div
              class="postBodyInnerContent line-numbers"
              v-html="$md.render(currentPost.fields.body)"
            />
          </div>
        </div>
        <share-buttons-article />
      </article>
      <div class="postFooter">
        <div class="postFooterInner">
          <related-posts
            :current-post="currentPost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
import { mapGetters } from 'vuex'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

export default {
  async asyncData ({ store, params, error }) {
    const posts = await store.state.posts.posts
    const currentPost = posts.find(post => post.fields.slug === params.slug)

    if (currentPost) {
      return { currentPost }
    } else {
      return error({ statusCode: 404 })
    }
  },
  computed: {
    ...mapGetters('posts', ['linkTo']),
  },
  mounted () {
    Prism.highlightAll()
  },
  head () {
    const hid = `jsonld-${this._uid}`
    return {
      title: this.currentPost.fields.title,
      meta: [
        { hid: 'description', name: 'description', content: this.currentPost.fields.description },
        { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL + this.$route.path },
        { hid: 'og:title', property: 'og:title', content: this.currentPost.fields.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:description', property: 'og:description', content: this.currentPost.fields.description },
        { hid: 'og:image', property: 'og:image', content: `https:${this.currentPost.fields.heroImage.fields.file.url}` },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{
        hid,
        innerHTML: `{
          "@context": "http://schema.org",
          "@type": "Article",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${process.env.BASE_URL + this.$route.path}"
          },
          "headline": "${this.currentPost.fields.title}",
          "description": "${this.currentPost.fields.description}",
          "image": [
            "${this.currentPost.fields.heroImage.fields.file.url}"
          ],
          "datePublished": "${this.currentPost.fields.publishDate}",
          "dateModified": "${this.currentPost.sys.updatedAt}",
          "publisher": {
            "@type": "Organization",
            "name": "${CONSTANTS.BLOG_INFO.BLOG_NAME}",
            "logo": {
              "@type": "ImageObject",
              "url": "${process.env.BASE_URL}/icon.png"
            }
          },
          "author": {
            "@type": "Person",
            "name": "${CONSTANTS.MY_INFO.NAME}"
          }
        }`,
        type: 'application/ld+json',
      }],
    }
  },
}
</script>

<style lang="scss">
@mixin fullWith {
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  @include mq($mq_tablet) {
    margin-left: -2rem;
    margin-right: -2rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.post {
  p {
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.3;
    margin: 3rem 0 2rem;
  }

  h2 {
    padding-bottom: 1rem;
    position: relative;

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
  }

  h3 {
    border-bottom: 1px solid $color_gray_middle;
    padding-bottom: 0.5rem;
  }

  h4 {
    &::before {
      background-image: url(~assets/icon/icon_star.svg);
      background-size: contain;
      content: '';
      display: inline-block;
      height: 24px;
      margin-right: 3px;
      position: relative;
      top: 3px;
      width: 24px;
    }
  }

  ul {
    line-height: 1.3;
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0 0 0.5rem 1.5rem;
  }

  dl {
    margin: 0 auto 1.5rem;
    width: $width_base;
  }

  dt {
    font-weight: 700;
  }

  dd {
    margin: 0 0 1.5rem 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  pre {
    @include fullWith();

    border-radius: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    padding-top: 1rem;

    code {
      font-size: 0.9rem;
    }
  }

  hr {
    border: 2px dotted $color_gray_middle;
    border-width: 2px 0 0 0;
    margin-bottom: 2rem;
    margin-top: 2rem;
  }

  table {
    border: 2px solid $color_gray_middle;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  tr {
    border: 2px solid $color_gray_middle;
  }

  th {
    background-color: $color_gray_light;
    border: 2px solid $color_gray_middle;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0.8rem;
  }

  td {
    border: 2px solid $color_gray_middle;
    padding: 0.8rem;
  }

  iframe {
    display: block;
    margin: 1.5rem 0;
    width: 100%;
  }

  .postBody img {
    border: 2px solid $color_gray_middle;
  }

  .table-of-contents {
    @include fullWith();

    background-color: #d6e0f0;
    margin-bottom: 3rem;
    margin-top: 3rem;
    padding-bottom: 2rem;
    padding-top: 2rem;

    &::before {
      content: '目次';
      display: block;
      font-size: 1.3rem;
      font-weight: bold;
      line-height: 1;
      margin-bottom: 1rem;
    }

    ul,
    li:last-of-type {
      margin-bottom: 0;
    }

    ul ul {
      margin: 0.5rem 0 0 0;
    }
  }

  .screenshot-mobile-single {
    margin: 0 auto 1.5rem;
    width: 70%;

    @include mq($mq_tablet) {
      width: 50%;
    }
  }

  .screenshot-mobile-double {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    img {
      width: 48%;
    }
  }

  .button {
    align-items: center;
    background-color: $color_gray_middle;
    box-shadow: 0 5px 0 $color_gray, 0 10px 0 rgba(0, 0, 0, 0.2);
    color: $color_white;
    display: flex;
    font-weight: 700;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    position: relative;
    transition: 0.1s;
    width: 100%;

    @include mq($mq_tablet) {
      width: 70%;
    }

    &:hover {
      box-shadow: 0 3px 0 $color_gray, 0 6px 0 rgba(0, 0, 0, 0.2);
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

    img {
      border: 0;
    }
  }

  .button--accent {
    background-color: $color_red;
    box-shadow: 0 5px 0 $color_red_dark, 0 10px 0 rgba(0, 0, 0, 0.2);

    &:hover {
      box-shadow: 0 3px 0 $color_red_dark, 0 6px 0 rgba(0, 0, 0, 0.2);
    }

    &:active {
      box-shadow: none;
    }
  }

  .buttonDouble {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .button {
      width: 48%;
    }
  }

  .cardReferenceInternal {
    @extend %shadow_base;

    background-color: $color_white;
    color: $color_black;
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    margin-bottom: 2rem;
    max-width: 550px;
    padding: 8px;
    width: 100%;

    &:hover {
      @extend %shadow_base_hover;
    }
  }

  .cardReferenceInternal__image {
    height: 80px;
    width: 80px;

    @include mq($mq_tablet) {
      height: 100px;
      width: 100px;
    }
  }

  .cardReferenceInternal__title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    line-height: 1.3;
    margin: 0;
    padding-left: 8px;
    width: calc(100% - 100px);
  }

  .cardReferenceExternal {
    @extend %shadow_base;

    background-color: $color_gray_light;
    color: $color_black;
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    margin-bottom: 2rem;
    max-width: 450px;
    padding: 8px 8px 8px 0;
    width: 100%;

    &:hover {
      @extend %shadow_base_hover;
    }
  }

  .cardReferenceExternal__icon {
    text-align: center;
    width: 70px;

    &::before {
      background-image: url(~assets/icon/icon_bookmark.svg);
      background-size: contain;
      content: '';
      display: block;
      height: 32px;
      margin: 4px auto 0;
      width: 32px;
    }
  }

  .cardReferenceExternal__title {
    align-items: center;
    border-left: 2px solid $color_gray_middle;
    display: flex;
    flex-wrap: wrap;
    line-height: 1.3;
    padding-left: 8px;
    width: calc(100% - 70px);
  }

  .appreach {
    border: solid 3px $color_gray_middle;
    margin-bottom: 1.5rem;
    padding: 0.4rem;

    @include mq($mq_tablet) {
      padding: 1rem;
    }
  }

  .appreach img {
    border: 0;
  }

  .appreach::after {
    clear: both;
    content: '';
    display: block;
  }

  .appreach__icon {
    border-radius: 10%;
    float: left;
    height: auto;
    width: 25%;

    @include mq($mq_tablet) {
      width: 20%;
    }
  }

  .appreach__detail {
    display: inline-block;
    margin-left: 3%;
    width: 72%;
  }

  .appreach__detail::after {
    clear: both;
    content: '';
    display: block;
  }

  .appreach__name {
    line-height: 1.3;
    margin-bottom: 0.5rem;

    @include mq($mq_tablet) {
      font-size: 1.2rem;
    }
  }

  .appreach__info {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;

    @include mq($mq_tablet) {
      font-size: 0.9rem;
    }
  }

  .appreach__developper,
  .appreach__price {
    margin-right: 0.5em;
  }

  .appreach__links {
    display: inline-block;
    width: 100%;

    @include mq($mq_tablet) {
      margin-left: 3%;
      width: 72%;
    }
  }

  .appreach__aslink {
    display: inline-block;
    margin-right: 4px;
    width: 134px;
  }

  .appreach__gplink {
    display: inline-block;
    width: 134px;
  }

  .success,
  .info,
  .warning,
  .danger {
    @include fullWith();

    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
  }

  .success {
    background-color: #daedd2;

    > p:last-of-type {
      margin-bottom: 0;
    }
  }

  .info {
    background-color: #d3eaf6;

    > p:last-of-type {
      margin-bottom: 0;
    }
  }

  .warning {
    background-color: #fcf7df;

    > p:last-of-type {
      margin-bottom: 0;
    }
  }

  .danger {
    background-color: #f0d9d9;

    > p:last-of-type {
      margin-bottom: 0;
    }
  }

  .info > p:last-of-type + .cardReferenceInternal,
  .info > p:last-of-type + .cardReferenceExternal,
  .success > p:last-of-type + .cardReferenceInternal,
  .success > p:last-of-type + .cardReferenceExternal,
  .warning > p:last-of-type + .cardReferenceInternal,
  .warning > p:last-of-type + .cardReferenceExternal,
  .danger > p:last-of-type + .cardReferenceInternal,
  .danger > p:last-of-type + .cardReferenceExternal {
    margin: 1.5rem 0 0.5rem;
  }

  .info > p:last-of-type + pre,
  .info > p:last-of-type + .buttonDouble,
  .success > p:last-of-type + pre,
  .success > p:last-of-type + .buttonDouble,
  .warning > p:last-of-type + pre,
  .warning > p:last-of-type + .buttonDouble,
  .danger > p:last-of-type + pre,
  .danger > p:last-of-type + .buttonDouble {
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
  }
}
</style>

<style lang="scss" scoped>
.post {
  @extend %shadow_base;

  background-color: $color_white;
  padding: 2rem 0;
}

.postInner {
  margin: 0 1rem;

  @include mq($mq_tablet) {
    margin: 0 2rem;
  }
}

.postHeader {
  &__title {
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  &__date {
    font-size: $fontSize_base;
    line-height: 1.5;
    margin-bottom: 1rem;

    &Updated {
      margin-left: 0.5rem;
    }
  }

  &__tagList {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto 1rem;

    &Item {
      background-color: $color_navy;
      color: $color_white;
      font-size: $fontSize_s;
      line-height: 1;
      margin: 0 0.4rem 0.5rem 0;
      padding: 0.3rem 0.4rem;
    }
  }
}

.postBody {
  background-color: $color_background_base;

  &Inner {
    background-color: $color_white;

    &Content {
      padding: 2rem 0 0;
    }
  }
}

.postFooter {
  background-color: $color_background_base;

  &Inner {
    background-color: $color_white;
  }
}
</style>
