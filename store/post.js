import { createClient } from '@/plugins/contentful'

const client = createClient()

export const state = () => ({
  currentPost: {},
  isLoading: true,
})

export const mutations = {
  setCurrentPost (state, payload) {
    state.currentPost = payload
  },
  setLoading (state, payload) {
    state.isLoading = payload
  },
}

export const actions = {
  async getPostBySlug ({ commit }, slug) {
    commit('setLoading', true)
    const response = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': slug,
    })
    commit('setCurrentPost', response.items[0])
    commit('setLoading', false)
  },
}
