<template>
  <div>
    <h1 class="tagTitle">
      <font-awesome-icon
        :icon="'list'"
        class="followInner__itemIcon"
      />
      {{ title }}
    </h1>
    <article-list
      :posts="postsThisPage"
    />
    <pagination
      v-if="isPaginationShow"
      :path="path"
      :posts-number="relatedPosts(currentTag).length"
    />
  </div>
</template>

<script>
import { CONSTANTS } from '@/assets/js/constants'
import { mapGetters } from 'vuex'
import ArticleList from '@/components/ArticleList'
import Pagination from '@/components/Pagination'

export default {
  components: {
    ArticleList,
    Pagination,
  },
  data () {
    return {
      postsNumberPerPage: CONSTANTS.BASE_SETTINGS.POSTS_NUMBER_PER_PAGE,
    }
  },
  computed: {
    ...mapGetters('posts', ['relatedPosts']),
    title () {
      return `${this.currentTag.fields.name}に関する記事一覧`
    },
    postsThisPage () {
      const pageNumber = parseInt(this.$route.params.id) || 1
      const postsCopy = [...this.relatedPosts(this.currentTag)]
      return postsCopy.splice((pageNumber - 1) * this.postsNumberPerPage, this.postsNumberPerPage)
    },
    path () {
      return `/tags/${this.$route.params.slug}`
    },
    isPaginationShow () {
      return this.relatedPosts(this.currentTag).length > this.postsNumberPerPage
    },
  },
  async asyncData ({ payload, store, params, error }) {
    const tags = await store.state.posts.tags
    const currentTag = tags.find(tag => tag.fields.slug === params.slug)

    if (currentTag) {
      return { currentTag }
    } else {
      return error({ statusCode: 404 })
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL + this.$route.path },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:type', property: 'og:type', content: 'article' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.tagTitle {
  border-bottom: 0.3rem solid;
  border-image: linear-gradient(to right, $color_navy, $color_blue 50%, $color_green);
  border-image-slice: 1;
  font-size: $fontSize_l;
  margin-bottom: 2rem;
  padding-bottom: 0.3rem;
}
</style>
