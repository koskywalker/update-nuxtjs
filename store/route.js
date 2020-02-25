export const state = () => ({
  fromArticleListFlug: false,
})

export const mutations = {
  setFromArticleListFlug (state, fromArticleListFlug) {
    state.fromArticleListFlug = fromArticleListFlug
  },
}

export const actions = {
  isFromArticleList ({ commit }) {
    commit('setFromArticleListFlug', true)
  },
}
