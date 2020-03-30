<template>
  <div>
    <main-visual />
    <div class="container">
      <div class="containerInner">
        <main class="main">
          <article-list
            ref="articleList"
            :posts="posts"
          />
        </main>
        <the-sidebar class="sidebar" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MainVisual from '@/components/MainVisual'
import ArticleList from '@/components/ArticleList'
import TheSidebar from '@/layouts/TheSidebar'

export default {
  components: {
    MainVisual,
    ArticleList,
    TheSidebar,
  },
  computed: {
    ...mapState('posts', ['posts']),
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  },
  mounted () {
    this.$fadeinPage()
  },
  beforeRouteLeave (to, from, next) {
    // 遷移先ページが記事詳細以外の場合はそのまま遷移
    if (to.name !== 'posts-slug') {
      next()
      return
    }

    // 選択した記事の情報を取得
    const articleList = this.$refs.articleList.$refs.articleListItems
    const selectedArticle = this.$getSelectedArticleInfo(to, articleList)

    // 遷移前の画像の情報を取得
    const image = selectedArticle.$refs.image
    const imageSrc = selectedArticle.post.fields.heroImage.fields.file.url
    const imageStyleObject = this.$getImageStyleObject(image)

    // ダミー画像に位置と画像のURLを渡す
    this.$nuxt.$emit('setImageInfoToDammyImage', {
      imageSrc,
      imageStyleObject,
    })

    // 記事一覧から遷移していることをフラグとして持たせる
    this.$store.dispatch('route/isFromArticleList')

    // ページを上部に移動
    this.$scrollTopAnimation()

    // 画面をフェードアウトしてページ遷移
    this.$fadeoutPage(next)
  },
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $color_background_base;
  padding-bottom: 3rem;
  width: 100%;

  &Inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 auto;
    max-width: $width_max;
    width: $width_base;
  }
}

.main {
  width: 100%;

  @include mq($mq_pc) {
    width: 65%;
  }
}

.sidebar {
  margin-bottom: 2rem;
  width: 100%;

  @include mq($mq_pc) {
    width: 30%;
  }
}
</style>
