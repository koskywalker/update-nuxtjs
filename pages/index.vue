<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
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
              />
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
          <hr class="my-3" />
          <a href="https://nuxtjs.org/" target="_blank">
            Nuxt Documentation
          </a>
          <br />
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('posts/getPosts', params.slug)
  }
}
</script>
