import Vue from 'vue'

Vue.prototype.$footerMenuFixed = [
  {
    name: 'ホーム',
    icon: 'home',
    class: 'menuInner__itemLink--home js-buttonHome',
  },
  {
    name: 'シェア',
    icon: 'share-alt',
    class: 'menuInner__itemLink--share js-buttonShare',
  },
  {
    name: 'フォロー',
    icon: 'user-plus',
    class: 'menuInner__itemLink--follow js-buttonFollow',
  },
  {
    name: 'メニュー',
    icon: 'list',
    class: 'menuInner__itemLink--menu js-buttonMenu',
  },
  {
    name: 'トップ',
    icon: 'level-up-alt',
    class: 'menuInner__itemLink--top js-buttonTop',
  },
]
