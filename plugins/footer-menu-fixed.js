import Vue from 'vue'

Vue.prototype.$footerMenuFixed = [
  {
    name: 'ホーム',
    icon: 'home',
    class: 'menuList__itemLink--home js-buttonHome',
  },
  {
    name: 'シェア',
    icon: 'share-alt',
    class: 'menuList__itemLink--share js-buttonShare',
  },
  {
    name: 'フォロー',
    icon: 'user-plus',
    class: 'menuList__itemLink--follow js-buttonFollow',
  },
  {
    name: 'メニュー',
    icon: 'list',
    class: 'menuList__itemLink--menu js-buttonMenu',
  },
  {
    name: 'トップ',
    icon: 'level-up-alt',
    class: 'menuList__itemLink--top js-buttonTop',
  },
]
