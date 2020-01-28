import Vue from 'vue'

Vue.prototype.$globalMenu = [
  {
    name: 'ホーム',
    label: 'HOME',
    url: '/'
  },
  {
    name: 'プログラミング',
    label: 'PROGRAMMING',
    url: '/category/programming'
  },
  {
    name: 'ブログ',
    label: 'BLOG',
    url: '/category/blog'
  },
  {
    name: '便利ツール',
    label: 'TOOL',
    url: '/category/tool'
  },
  {
    name: 'ポートフォリオ',
    label: 'PORTFOLIO',
    url: '/portfolio'
  },
  {
    name: 'お問い合わせ',
    label: 'CONTACT',
    url: '/contact'
  }
]
