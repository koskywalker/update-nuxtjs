<template>
  <div class="container">
    <div>
      <logo />
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
      <div v-for="(post, index) in posts" :key="index">
        <h1>タイトル: {{ post.fields.title }}</h1>
        <p>slug: {{ post.fields.slug }}</p>
        <p>publishDate: {{ post.fields.publishDate }}</p>
        <p>
          tags:
          <span v-for="(tag, tagIndex) in post.fields.tags" :key="tagIndex">
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
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
