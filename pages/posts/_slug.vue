<template>
  <div class="post">
    <template v-if="isLoading">
      <div>
        Loading
      </div>
    </template>
    <template v-else>
      <div
        class="header postHeader"
      >
        <div
          class="headerInner"
        >
          <div class="headerInner__body">
            <div class="headerInner__bodyItem headerInner__bodyThumbnail">
              <img
                ref="image"
                :src="currentPost.fields.heroImage.fields.file.url + '?w=500'"
                :alt="currentPost.fields.heroImage.fields.description"
                @load="afterLoadedImage"
                class="headerInner__bodyThumbnailImage"
              >
            </div>
            <h1 class="headerInner__bodyItem headerInner__bodyTitle">
              {{ currentPost.fields.title }}
            </h1>
            <p class="headerInner__item headerInner__bodyDescription">
              {{ currentPost.fields.description }}
            </p>
            <p class="headerInner__bodyItem headerInner__bodyDate">
              <span class="headerInner__bodyDatePublished">
                投稿日: {{ (new Date(currentPost.fields.publishDate)).toLocaleDateString() }}
              </span>
              <span
                v-if="currentPost.sys.updatedAt"
                class="headerInner__bodyDateUpdated"
              >
                更新日: {{ (new Date(currentPost.sys.updatedAt)).toLocaleDateString() }}
              </span>
            </p>
            <div class="headerInner__bodyItem headerInner__bodyTagList">
              <nuxt-link
                v-for="(tag, index) in currentPost.fields.tags"
                :key="index"
                :to="tag"
                class="headerInner__bodyTagListItem"
              >
                {{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="body postBody">
        <div class="bodyInner">
          <div
            v-html="$md.render(currentPost.fields.body)"
            class="bodyInnerContent line-numbers"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Prism from '~/plugins/prism'

export default {
  computed: {
    currentPost () {
      return this.$store.state.post.currentPost
    },
    isLoading () {
      return this.$store.state.post.isLoading
    },
  },
  async fetch ({ store, params }) {
    await store.dispatch('post/getPostBySlug', params.slug)
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
}
.header {
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
      width: $width_base;

      &Item {
        margin-bottom: 1rem;
      }

      &Thumbnail {
        margin: 0 auto 1.5rem;
        max-width: 500px;
      }

      &Title {
        font-size: $fontSize_l;
        line-height: 1.3;

        @include mq($mq_tablet) {
          font-size: $fontSize_xl;
        }
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
        margin: 0;

        &Item {
          border: 1px solid $color_white;
          border-radius: .8rem;
          color: $color_white;
          display: inline-block;
          font-size: $fontSize_base;
          line-height: 1;
          margin-right: .4rem;
          padding: .2rem .4rem;
        }
      }
    }
  }
}
.body {
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
</style>

<style lang="scss">
.postBody {
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
    font-size: 1.2rem;
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
