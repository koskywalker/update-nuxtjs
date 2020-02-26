<template>
  <div class="articleList">
    <ArticleListItem
      ref="articleListItems"
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      class="articleListItem"
    />
  </div>
</template>

<script>
import ArticleListItem from '@/components/ArticleListItem'

export default {
  components: {
    ArticleListItem,
  },
  props: {
    posts: {
      type: Array,
      default () {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.articleList {
  @include mq($mq_sp_wide) {
    display: flex;
    flex-wrap: wrap;
  }

  &Item {
    margin-bottom: 2rem;

    @include mq($mq_sp_wide) {
      margin-right: 4%;
      width: 48%;
    }

    @include mq($mq_pc) {
      margin-right: 6%;
      width: 47%;
    }

    &:nth-child(2n) {
      @include mq($mq_sp_wide) {
        margin-right: 0;
      }
    }
  }
}
</style>
