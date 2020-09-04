<template>
  <div class="post">
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
            v-html="$md.render(currentPost.fields.body)"
            class="postBodyInnerContent line-numbers"
          />
        </div>
      </div>
    </article>
    <div class="postFooter">
      <div class="postFooterInner">
        <related-posts
          :currentPost="currentPost"
        />
        <div class="postFooter__comment">
          <h2>この記事にコメントする</h2>
          <vue-disqus
            :identifier="currentPost.fields.slug"
            :url="`${baseUrl}/${currentPost.fields.slug}`"
            :shortname="disqusShortName"
            class="postFooter__item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RelatedPosts from '@/components/RelatedPosts'
import Prism from '~/plugins/prism'

export default {
  components: {
    RelatedPosts,
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL,
      disqusShortName: process.env.DISQUS_SHORTNAME,
    }
  },
  computed: {
    ...mapGetters('posts', ['linkTo']),
  },
  async asyncData ({ payload, store, params, error }) {
    const currentPost = payload || await store.state.posts.posts.find(post => post.fields.slug === params.slug)

    if (currentPost) {
      return { currentPost }
    } else {
      return error({ statusCode: 404 })
    }
  },
  mounted () {
    Prism.highlightAll()
  },
}
</script>

<style lang="scss" scoped>
.post {
  @extend %shadow_base;

  background-color: $color_white;
  transition: all 0.5s ease;

  &Header {
    padding: 2rem 0 0;

    &__title {
      line-height: 1.3;
      margin: 0 auto 1rem;
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
      width: $width_base;

      &Item {
        background-color: $color_navy;
        color: $color_white;
        font-size: $fontSize_s;
        line-height: 1;
        margin: 0 0.4rem 0.5rem 0;
        padding: 0.3rem 0.4rem;
      }
    }

    &__thumbnail {
      margin: 1rem auto;
      width: $width_base;
    }
  }

  &Body {
    background-color: $color_background_base;

    &Inner {
      background-color: $color_white;
      margin: 0 auto;

      &Content {
        padding: 2rem 0 0;
      }
    }
  }

  &Footer {
    background-color: $color_background_base;

    &Inner {
      background-color: $color_white;
      margin: 0 auto;
      padding-bottom: 3rem;
    }

    &__item {
      margin: 0 auto;
      width: $width_base;
    }

    &__comment {
      overflow: hidden;
    }
  }
}
</style>

<style lang="scss">
.post {
  p {
    line-height: 1.8;
    margin: 0 auto 1.5rem;
    width: $width_base;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.3;
    margin: 3rem auto 2rem;
    width: $width_base;
  }

  h2 {
    border-bottom: 0.3rem solid;
    border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
    border-image-slice: 1;
    padding-bottom: 0.5rem;
  }

  h3 {
    border-bottom: 1px solid $color_gray_middle;
    padding-bottom: 0.5rem;
  }

  ul {
    line-height: 1.3;
    list-style-type: disc;
    margin: 0 auto 1.5rem;
    width: $width_base;
  }

  li {
    margin: 0 0 0.5rem 1.5rem;
  }

  pre {
    border-radius: 0;
    margin: 0 auto 1.5rem;
    padding: 1rem 4%;

    code {
      font-size: 0.9rem;
    }
  }

  hr {
    border: 2px dotted $color_gray_middle;
    border-width: 2px 0 0 0;
    margin: 2rem auto;
    width: $width_base;
  }

  table {
    border: 2px solid $color_gray_middle;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 0 auto 1.5rem;
    width: $width_base;
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
    border: 2px solid $color_gray_middle;
    display: block;
    margin: 0 auto 1.5rem;
    width: $width_base;
  }

  .postBody img {
    border: 2px solid $color_gray_middle;
  }

  .table-of-contents {
    background-color: #d6e0f0;
    margin: 3rem 0;
    padding: 2rem 0;

    &::before {
      content: '目次';
      display: block;
      font-size: 1.3rem;
      font-weight: bold;
      line-height: 1;
      margin: 0 auto 1rem;
      width: $width_base;
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
    width: 70%;

    @include mq($mq_tablet) {
      width: 50%;
    }
  }

  .screenshot-mobile-double {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    img {
      width: 48%;
    }
  }

  .cardInternalLink {
    margin: 0 auto 2rem;
    width: $width_base;
  }

  .warning p:last-of-type + .cardInternalLink {
    margin-top: 1.5rem;
  }

  .cardInternalLinkInner {
    @extend %shadow_base;

    background-color: $color_white;
    color: $color_black;
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    max-width: 550px;
    padding: 8px;
    width: 100%;

    &:hover {
      @extend %shadow_base_hover;
    }
  }

  .cardInternalLinkImage {
    height: 80px;
    width: 80px;

    @include mq($mq_tablet) {
      height: 100px;
      width: 100px;
    }
  }

  .cardInternalLinkTitle {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    line-height: 1.3;
    padding-left: 8px;
    width: calc(100% - 100px);
  }

  .cardReference {
    margin: 0 auto 2rem;
    width: $width_base;
  }

  .cardReferenceInner {
    @extend %shadow_base;

    background-color: $color_gray_light;
    color: $color_black;
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    max-width: 450px;
    padding: 8px 8px 8px 0;
    width: 100%;

    &:hover {
      @extend %shadow_base_hover;
    }
  }

  .cardReferenceIcon {
    text-align: center;
    width: 70px;

    &::before {
      background-image: url(~assets/icon/bookmark.svg);
      background-size: contain;
      content: '';
      display: block;
      height: 32px;
      margin: 4px auto 0;
      width: 32px;
    }
  }

  .cardReferenceTitle {
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
    margin: 0 auto 1.5rem;
    padding: 0.5rem;
    width: $width_base;

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
    margin-right: 5px;
    width: 134px;
  }

  .appreach__gplink {
    display: inline-block;
    width: 134px;
  }

  @mixin mdItContainer_base {
    margin-bottom: 1.5rem;
    padding: 1.5rem 0;
  }

  .success {
    @include mdItContainer_base();

    background-color: #daedd2;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .info {
    @include mdItContainer_base();

    background-color: #d3eaf6;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .warning {
    @include mdItContainer_base();

    background-color: #fcf7df;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .danger {
    @include mdItContainer_base();

    background-color: #f0d9d9;

    p:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
