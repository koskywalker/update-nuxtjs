export default ({ params, route, redirect }) => {
  if (route.name === 'blog-page-id' && params.id === '1') {
    redirect(301, '/')
  }

  if (route.name === 'tag-page-id' && params.id === '1') {
    redirect(301, `/tags/${params.slug}`)
  }
}
