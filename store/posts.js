import client from '@/plugins/contentful'

export const state = () => ({
  posts: [],
  tags: [],
})

export const getters = {
  linkTo: () => (name, obj) => {
    return {
      name: `${name}-slug`,
      params: { slug: obj.fields.slug },
    }
  },
  relatedPosts: state => (tag) => {
    return state.posts.filter(post => post.fields.tags.some(postTag => postTag.sys.id === tag.sys.id))
  },
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setTags (state, payload) {
    state.tags = payload
  },
}

export const actions = {
  async getPosts ({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate',
    }).then((response) => {
      commit('setPosts', response.items)
    }).catch(console.error)
  },
  async getTags ({ commit }) {
    await client.getEntries({
      content_type: 'tag',
      order: 'fields.sort',
    }).then((response) => {
      commit('setTags', response.items)
    }).catch(console.error)
  },
}
