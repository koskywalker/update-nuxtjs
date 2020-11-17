<template>
  <div class="articleList">
    <ArticleListItem
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      class="articleListItem"
    />
  </div>
</template>

<script>
export default {
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
  padding: 0 1rem;

  @include mq($mq_sp_wide) {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
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
