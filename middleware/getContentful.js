export default async ({ store }) => {
  if (!store.state.posts.length) {
    await store.dispatch('posts/getPosts')
  }
  if (!store.state.posts.length) {
    await store.dispatch('posts/getTags')
  }
}
