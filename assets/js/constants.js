export const CONSTANTS = {
  BASE_SETTINGS: {
    POSTS_NUMBER_PER_PAGE: 10,
  },
  HEADER_MENU: [
    {
      NAME: 'ホーム',
      LABEL: 'HOME',
      URL: '/',
    },
    {
      NAME: 'プログラミング',
      LABEL: 'PROGRAMMING',
      URL: '/tags/programming',
    },
    {
      NAME: 'ブログ',
      LABEL: 'BLOG',
      URL: '/tags/blog',
    },
    {
      NAME: '便利ツール',
      LABEL: 'TOOL',
      URL: '/tags/tool',
    },
    {
      NAME: 'ポートフォリオ',
      LABEL: 'PORTFOLIO',
      URL: '/portfolio',
    },
    {
      NAME: 'お問い合わせ',
      LABEL: 'CONTACT',
      URL: '/contact',
    },
  ],
  FOOTER_MENU_FIXED: [
    {
      NAME: 'ホーム',
      ICON: 'home',
      CLASS: 'menuList__itemLink--home js-buttonHome',
    },
    {
      NAME: 'シェア',
      ICON: 'share-alt',
      CLASS: 'menuList__itemLink--share js-buttonShare',
    },
    {
      NAME: 'フォロー',
      ICON: 'user-plus',
      CLASS: 'menuList__itemLink--follow js-buttonFollow',
    },
    {
      NAME: 'メニュー',
      ICON: 'list',
      CLASS: 'menuList__itemLink--menu js-buttonMenu',
    },
    {
      NAME: 'トップ',
      ICON: 'level-up-alt',
      CLASS: 'menuList__itemLink--top js-buttonTop',
    },
  ],
  BLOG_INFO: {
    BLOG_NAME: 'UPDATE',
    BASE_TITLE: '世界をアップデートするクリエイターこうすけのブログ',
    BASE_DESCRIPTION: 'UPDATE は, エンジニア x デザイナー x ブロガーとして活動するこうすけのクリエイターブログです. 主にプログラミング, デザイン, SEO, 普段の活動などについて発信しています. 世界観を言語化し, 表現しよう！',
    ABOUT_BLOG_TECHNOLOGY: '当ブログは, Nuxt.js x Contentful x Netlify で構築した JAMstack ブログです.',
    BASE_OGP_IMAGE: '/static/icon.svg',
  },
  MY_INFO: {
    NICKNAME: 'こうすけ',
    NAME: 'Kosuke Muraka',
    LABEL_MAIN: 'いろんなクリエイター',
    LABEL: ['エンジニア', 'デザイナー', 'ブロガー'],
    BIRTHDAY: '1991/08/29',
    SKILLS: [
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
    INTRODUCTION: {
      FIRST: '😆 フロントエンドメインの Web 系エンジニア, JAMstack エンジニア.',
      HISTORY: '📘 青山学院大学在学中にブログ開始 → SEO コンサル → エンジニア & デザイナー.',
      STRONG_POINTS: '✅ HTML / CSS / JavaScript / Vue.js / Nuxt.js / Java / PHP / SEO / WordPress / デザイン.',
      OTHER: '🌈 当ブログでは, 主にフロントエンドに関するプログラミング情報について楽しく発信します！',
    },
    SNS: {
      HP: {
        NAME: 'HP',
        USER: 'UPDATE',
        URL: 'https://upd.world',
      },
      TWITTER: {
        NAME: 'Twitter',
        USER: 'kosuke_upd',
        URL: 'https://twitter.com/kosuke_upd',
      },
      INSTAGRAM: {
        NAME: 'Instagram',
        USER: 'kosuke_upd',
        URL: 'https://instagram.com/kosuke_upd',
      },
      GITHUB: {
        NAME: 'GitHub',
        USER: 'koskywalker',
        URL: 'https://github.com/koskywalker',
      },
      FEEDLY: {
        NAME: 'Feedly',
        USER: '',
        URL: 'https://feedly.com/i/subscription/feed/https://upd.world/feed',
      },
    },
  },
}
