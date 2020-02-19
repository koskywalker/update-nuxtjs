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
          <div class="headerInner__thumbnail">
            <img
              :src="currentPost.fields.heroImage.fields.file.url + '?w=480'"
              :alt="currentPost.fields.heroImage.fields.description"
            >
          </div>
          <div class="headerInner__body">
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
        <div
          v-html="$md.render(currentPost.fields.body)"
          class="bodyInner line-numbers"
        />
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
    this.$fixParticlesHeight()
  },
}
</script>

<style lang="scss" scoped>
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
    width: $width_base;

    &__thumbnail {
      display: none;

      @include mq($mq_pc) {
        display: flex;
        align-items: center;
        width: 45%;
      }
    }

    &__body {
      @include mq($mq_pc) {
        width: 50%;
      }

      &Item {
        margin-bottom: 1rem;
        width: 100%;
      }

      &Thumbnail {
        display: none;

        @include mq($mq_pc) {
          display: block;
        }
      }

      &Title {
        font-size: $fontSize_m;
        line-height: 1.3;
      }

      &Description {
        font-size: $fontSize_s;
        line-height: 1.5;
      }

      &Date {
        font-size: $fontSize_s;
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
          font-size: $fontSize_s;
          line-height: 1;
          margin-right: .4rem;
          padding: .2rem .4rem;
        }
      }
    }
  }
}
.body {
  margin: 2rem auto;
  max-width: $width_single_column;
}
</style>

<style lang="scss">
@mixin mdItContainer_base {
  margin-bottom: 1rem;
  padding: 1rem 0;
}

.postBody {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0 auto 1rem;
    width: $width_base;
  }

  .success {
    @include mdItContainer_base();
    color: #3A6F3A;
    background-color: #DAEDD2;
  }

  .info {
    @include mdItContainer_base();
    color: #2B6584;
    background-color: #D3EAF6;
  }

  .warning {
    @include mdItContainer_base();
    color: #AF9C75;
    background-color: #FCF7DF;
  }

  .danger {
    @include mdItContainer_base();
    color: #9F3B3A;
    background-color: #F0D9D9;
  }
}
</style>
