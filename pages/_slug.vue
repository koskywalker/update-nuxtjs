<template>
  <div class="post">
    <div
      class="postHeader"
    >
      <div
        class="postHeaderInner"
      >
        <div class="postHeaderInner__body">
          <div class="postHeaderInner__bodyItem postHeaderInner__bodyThumbnail">
            <img
              ref="image"
              :src="currentPost.fields.heroImage.fields.file.url + '?w=500'"
              :alt="currentPost.fields.heroImage.fields.description"
              @load="afterLoadedImage"
              class="postHeaderInner__bodyThumbnailImage"
              height="282"
              width="500"
              loading="lazy"
            >
          </div>
          <h1 class="postHeaderInner__bodyItem postHeaderInner__bodyTitle">
            {{ currentPost.fields.title }}
          </h1>
          <p class="postHeaderInner__item postHeaderInner__bodyDescription">
            {{ currentPost.fields.description }}
          </p>
          <p class="postHeaderInner__bodyItem postHeaderInner__bodyDate">
            <span class="postHeaderInner__bodyDatePublished">
              投稿日: {{ (new Date(currentPost.fields.publishDate)).toLocaleDateString() }}
            </span>
            <span
              v-if="currentPost.sys.updatedAt"
              class="postHeaderInner__bodyDateUpdated"
            >
              更新日: {{ (new Date(currentPost.sys.updatedAt)).toLocaleDateString() }}
            </span>
          </p>
          <div class="postHeaderInner__bodyItem postHeaderInner__bodyTagList">
            <nuxt-link
              v-for="(tag, index) in currentPost.fields.tags"
              :key="index"
              :to="tag"
              class="postHeaderInner__bodyTagListItem"
            >
              {{ tag.fields.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="postBody">
      <div class="postBodyInner">
        <div
          v-html="$md.render(currentPost.fields.body)"
          class="postBodyInnerContent line-numbers"
        />
      </div>
    </div>
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
import Prism from '~/plugins/prism'
import RelatedPosts from '@/components/RelatedPosts'

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
  beforeRouteLeave (to, from, next) {
    // 遷移先ページがトップページ以外の場合はそのまま遷移
    if (to.name !== 'index') {
      next()
      return
    }

    // フェードアウトして次の画面に遷移
    this.$fadeoutPage(next)
  },
  methods: {
    afterLoadedImage () {
      this.$el.style.opacity = 1

      if (this.$store.state.route.fromArticleListFlug) {
        this.setImageData()
      }
    },
    setImageData () {
      // 記事のサムネイル画像の情報を取得
      const image = this.$refs.image
      const imageStyleObject = this.$getImageStyleObject(image)

      // 記事のサムネイル画像を非表示にする
      image.style.opacity = 0

      // ダミー画像に情報を渡す
      this.$nuxt.$emit('moveDammyImage', {
        image,
        imageStyleObject,
      })

      // 画面をフェードインする
      this.$fadeinPage()
    },
  },
}
</script>

<style lang="scss" scoped>
.post {
  opacity: 0;

  &Header {
    background-color: $color_black_transparent;
    color: $color_white;

    &Inner {
      align-content: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin: 0 auto;
      max-width: $width_single_column;
      padding: 2rem 0;

      &__body {
        margin: 0 auto;

        &Item {
          margin-bottom: 1rem;
        }

        &Thumbnail {
          margin: 0 auto 1.5rem;
          max-width: 500px;
        }

        &Title {
          line-height: 1.3;
        }

        &Description {
          font-size: $fontSize_base;
          line-height: 1.5;
        }

        &Date {
          font-size: $fontSize_base;
          line-height: 1.5;

          &Updated {
            margin-left: .5rem;
          }
        }

        &TagList {
          line-height: 1;
          margin: 0 auto;
          width: $width_base;

          &Item {
            border: 1px solid $color_white;
            border-radius: .8rem;
            color: $color_white;
            display: inline-block;
            font-size: $fontSize_base;
            line-height: 1;
            margin-right: .4rem;
            padding: .2rem .4rem;

            &:hover {
              background-color: $color_white;
              color: $color_black_transparent;
            }
          }
        }
      }
    }
  }
  &Body {
    background-color: $color_background_base;

    &Inner {
      background-color: $color_white;
      margin: 0 auto;
      max-width: $width_single_column;

      &Content {
        padding: 2rem 0;
      }
    }
  }
  &Footer {
    background-color: $color_background_base;

    &Inner {
      background-color: $color_white;
      margin: 0 auto;
      max-width: $width_single_column;
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
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul {
    line-height: 1.3;
    margin: 0 auto 1.5rem;
    width: $width_base;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 3rem auto 2rem;
  }

  h2 {
    border-bottom: .3rem solid;
    border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
    border-image-slice: 1;
    padding-bottom: .5rem;
  }

  h3 {
    border-bottom: 1px solid $color_gray_middle;
    padding-bottom: .5rem;
  }

  ul {
    list-style-type: disc;
  }

  li {
    margin: 0 0 .5rem 1.5rem;
  }

  pre {
    border-radius: 0;
    margin: 0 auto 1.5rem;
    padding: 1rem 4%;

    code {
      font-size: .9rem;
    }
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
  }

  @mixin mdItContainer_base {
    margin-bottom: 1.5rem;
    padding: 1.5rem 0;
  }

  .success {
    @include mdItContainer_base();
    background-color: #DAEDD2;
    color: #3A6F3A;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .info {
    @include mdItContainer_base();
    background-color: #D3EAF6;
    color: #2B6584;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .warning {
    @include mdItContainer_base();
    background-color: #FCF7DF;
    color: #AF9C75;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .danger {
    @include mdItContainer_base();
    background-color: #F0D9D9;
    color: #9F3B3A;

    p:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
