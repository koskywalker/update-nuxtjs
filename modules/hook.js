module.exports = function () {
  this.nuxt.hook('build:extendRoutes', (routes) => {
    const blogPages = {
      path: '/page/:id',
      component: 'pages/index.vue',
      name: 'blog-page-id',
    }
    routes.unshift(blogPages)
  })
}
