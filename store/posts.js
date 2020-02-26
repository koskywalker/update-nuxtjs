import client from '@/plugins/contentful'

export const state = () => ({
  posts: [],
})

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
}

export const actions = {
  async getPosts ({ commit }) {
    const response = await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate',
    })
    if (response.items.length) {
      commit('setPosts', response.items)
    }
  },
}
