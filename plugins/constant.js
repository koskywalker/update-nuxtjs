import Vue from 'vue'

Vue.prototype.$constant = {
  baseSettings: {
    postsNumberPerPage: 10,
  },
  headerMenu: [
    {
      name: 'ホーム',
      label: 'HOME',
      url: '/',
    },
    {
      name: 'プログラミング',
      label: 'PROGRAMMING',
      url: '/tags/programming',
    },
    {
      name: 'ブログ',
      label: 'BLOG',
      url: '/tags/blog',
    },
    {
      name: '便利ツール',
      label: 'TOOL',
      url: '/tags/tool',
    },
    {
      name: 'ポートフォリオ',
      label: 'PORTFOLIO',
      url: '/portfolio',
    },
    {
      name: 'お問い合わせ',
      label: 'CONTACT',
      url: '/contact',
    },
  ],
  footerMenuFixed: [
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
  ],
  blogInfo: {
    blogName: 'UPDATE',
    baseTitle: '世界をアップデートするクリエイターこうすけのブログ',
    baseDescription: 'UPDATE は, エンジニア x デザイナー x ブロガーとして活動するこうすけのクリエイターブログです. 主にプログラミング, デザイン, SEO, 普段の活動などについて発信しています. 世界観を言語化し, 表現しよう！',
    aboutBlogTechnology: '当ブログは, Nuxt.js x Contentful x Netlify で構築した JAMstack ブログです.',
    baseOgpImage: '/static/icon.png',
  },
  myInfo: {
    nickname: 'こうすけ',
    name: 'Kosuke Muraka',
    labelMain: 'いろんなクリエイター',
    label: ['エンジニア', 'デザイナー', 'ブロガー'],
    birthday: '1991/08/29',
    skills: [
      'HTML',
      'CSS',
      'Sass',
      'JavaScript',
      'jQuery',
      'Vue.js',
      'Nuxt.js',
      'Angular',
      'React',
      'PHP',
      'Java',
      'Python',
      'Shell Script',
      'Google Apps Script',
      'Git',
      'WordPress',
      'SEO',
      'Web デザイン',
    ],
    introduction: {
      first: '😆 フロントエンドメインの Web 系エンジニア, JAMstack エンジニア.',
      history: '📘 青山学院大学在学中にブログ開始 → SEO コンサル → エンジニア & デザイナー.',
      strongPoints: '✅ HTML / CSS / JavaScript / Vue.js / Nuxt.js / Java / PHP / SEO / WordPress / デザイン.',
      other: '🌈 当ブログでは, 主にフロントエンドに関するプログラミング情報について楽しく発信します！',
    },
    sns: {
      hp: {
        name: 'HP',
        user: 'UPDATE',
        url: 'https://upd.world',
      },
      twitter: {
        name: 'Twitter',
        user: 'kosuke_upd',
        url: 'https://twitter.com/kosuke_upd',
      },
      instagram: {
        name: 'Instagram',
        user: 'kosuke_upd',
        url: 'https://instagram.com/kosuke_upd',
      },
      github: {
        name: 'GitHub',
        user: 'koskywalker',
        url: 'https://github.com/koskywalker',
      },
      feedly: {
        name: 'Feedly',
        user: '',
        url: 'https://feedly.com/i/subscription/feed/https://upd.world/feed',
      },
    },
  },
}
