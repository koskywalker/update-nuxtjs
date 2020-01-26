<template>
  <div class="container">
    <div>
      <the-main-visual />
      <h1 class="title">
        update
      </h1>
      <h2 class="subtitle">
        JAMstack Blog
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <div
        v-for="(post, index) in posts"
        :key="index"
      >
        <h1>タイトル: {{ post.fields.title }}</h1>
        <p>slug: {{ post.fields.slug }}</p>
        <p>publishDate: {{ post.fields.publishDate }}</p>
        <p>
          tags:
          <span
            v-for="(tag, tagIndex) in post.fields.tags"
            :key="tagIndex"
          >
            {{ tag }}
          </span>
        </p>
        <p>author: {{ post.fields.author.fields.name }}</p>
        <div>
          <img
            :src="post.fields.heroImage.fields.file.url"
            alt=""
            width="600"
          >
        </div>
        <div>
          <p>description: {{ post.fields.description }}</p>
        </div>
        <div>
          <p>
            {{ post.fields.body }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheMainVisual from '~/layouts/TheMainVisual'

export default {
  components: {
    TheMainVisual
  },
  computed: {
    posts () {
      return this.$store.state.posts.posts
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  }
}
</script>
