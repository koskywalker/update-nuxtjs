const contentful = require('contentful')

const config = {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
}

const client = contentful.createClient(config)

export const state = () => ({
  posts: [],
  tags: [],
  currentPost: {},
  currentTag: {},
})

export const getters = {
  linkTo: () => (name, obj) => {
    if (name) {
      return {
        name: `${name}-slug`,
        params: { slug: obj.fields.slug },
      }
    } else {
      return {
        name: 'slug',
        params: { slug: obj.fields.slug },
      }
    }
  },
  relatedPosts: state => (currentTag) => {
    return state.posts.filter(post => post.fields.tags.some(postTag => postTag.sys.id === currentTag.sys.id))
  },
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  },
  setTags (state, entries) {
    state.tags = []
    entries.map((entry) => {
      if (entry.sys.contentType.sys.id === 'tag') {
        state.tags.push(entry)
      }
    })
  },
  setCurrentPost (state, slug) {
    state.currentPost = state.posts.find(post => post.fields.slug === slug)
  },
  setCurrentTag (state, slug) {
    state.currentTag = state.tags.find(tag => tag.fields.slug === slug)
  },
}

export const actions = {
  async getPosts ({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate',
      include: 1,
    }).then((response) => {
      commit('setTags', response.includes.Entry)
      commit('setPosts', response.items)
    }).catch(console.error)
  },
}
