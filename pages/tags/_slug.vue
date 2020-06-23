<template>
  <div>
    <main-visual />
    <div class="container">
      <div class="containerInner">
        <main class="main">
          <h1 class="tagTitle">
            <font-awesome-icon
              :icon="'list'"
              class="followInner__itemIcon"
            />
            {{ currentTag.fields.name }}に関する記事一覧
          </h1>
          <article-list
            ref="articleList"
            :posts="postsThisPage"
          />
          <pagination
            v-if="isPaginationShow"
            :path="path"
            :postsNumber="relatedPosts(currentTag).length"
          />
        </main>
        <the-sidebar class="sidebar" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MainVisual from '@/components/MainVisual'
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'
import TheSidebar from '@/layouts/TheSidebar'

export default {
  components: {
    MainVisual,
    ArticleList,
    Pagination,
    TheSidebar,
  },
  computed: {
    ...mapState('posts', ['currentTag']),
    ...mapGetters('posts', ['relatedPosts']),
    postsThisPage () {
      const pageNumber = parseInt(this.$route.params.id) || 1
      const postsCopy = [...this.relatedPosts(this.currentTag)]
      return postsCopy.splice((pageNumber - 1) * this.$constant.baseSettings.postsNumberPerPage, this.$constant.baseSettings.postsNumberPerPage)
    },
    path () {
      return `/tags/${this.$route.params.slug}`
    },
    isPaginationShow () {
      return this.relatedPosts(this.currentTag).length > this.$constant.baseSettings.postsNumberPerPage
    },
  },
  async asyncData ({ payload, store, params, error }) {
    await store.commit('posts/setCurrentTag', params.slug)
  },
  mounted () {
    this.$fadeinPage()
  },
  beforeRouteLeave (to, from, next) {
    // 遷移先ページが記事詳細以外の場合はそのまま遷移
    if (to.name !== 'slug') {
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

.tagTitle {
  border-bottom: .3rem solid;
  border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
  border-image-slice: 1;
  font-size: $fontSize_l;
  margin-bottom: 2rem;
  padding-bottom: .3rem;
}
</style>
