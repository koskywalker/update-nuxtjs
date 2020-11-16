<template>
  <div class="portfolio">
    <div class="portfolioInner">
      <div>
        <h1 class="portfolioTitle">
          ポートフォリオ
        </h1>
        <div
          v-for="product in productList"
          :key="product.name"
          class="product"
        >
          <h2 class="product__title">
            {{ product.name }}
          </h2>
          <p class="product__label">
            {{ product.label }}
          </p>
          <div class="product__body">
            <div class="product__image">
              <img
                :src="product.image.src"
                :alt="product.image.name"
                :weight="product.image.weight"
                :height="product.image.height"
              >
            </div>
            <div class="product__text">
              <ul class="product__meta">
                <li>制作期間 : {{ product.meta.period }}</li>
                <li>主な使用技術 : {{ product.meta.technologies }}</li>
              </ul>
              <div class="product__description">
                <p
                  v-for="(paragraph, index) in product.description"
                  :key="index"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      productList: [
        {
          name: 'UPDATE',
          label: 'Nuxt.js x Contentful x Netlify で作成した Jamstack 構成のブログ',
          image: {
            src: require('@/assets/image/portfolio-update.png'),
            alt: 'UPDATE',
            weight: 500,
            height: 282,
          },
          meta: {
            period: '2020/01 - 2020/09',
            technologies: 'Nuxt.js, Contentful, Netlify, GitHub',
          },
          description: [
            'Nuxt.js の SSG を使用して構築した Jamstack 構成のブログです. コンテンツ管理に Contentful を, ホスティングに Netlify を, ソースコード管理に GitHub を使用しています.',
            'もともと WordPress で運用していたブログをモダンな技術を用いて作りかえました.',
            'Nuxt.js に加え上記技術を使用することで, 高い DX を保ちやすく, UX を高めやすい環境を構築しました.',
          ],
        },
        {
          name: 'コピリン',
          label: 'Vue.js x Filebase で作成した SPA (Chrome 拡張機能)',
          image: {
            src: require('@/assets/image/portfolio-copilin.png'),
            alt: 'コピリン',
            weight: 500,
            height: 312,
          },
          meta: {
            period: '2018/11 - 2019/04',
            technologies: 'Vue.js, Cloud Firestore, GitHub',
          },
          description: [
            '頻繁に使用するリンクを管理し, ほしいリンクをわずか3アクションでコピーしたり開いたりできる Chrome 拡張機能です.',
            'Vue.js をベース技術として使用し, データの保管には Cloud Firestore, ソースコード管理に GitHub を使用しています.',
            'エンジニアになると同時に「何かしらのプロダクトを作りたい！せっかく作るなら SPA (Single Page Application) を作りたい！」という思いから学習も兼ねて作成したツールです.',
          ],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.portfolio {
  @extend %shadow_base;

  background-color: $color_white;
  padding: 2rem 0;

  @include mq($mq_pc) {
    padding: 3rem 0;
  }
}

.portfolioInner {
  margin: 0 1rem;

  @include mq($mq_tablet) {
    margin: 0 2rem;
  }

  @include mq($mq_pc) {
    margin: 0 3rem;
  }
}

.portfolioTitle {
  font-size: $fontSize_xl;
  text-align: center;

  &::after {
    background-image: linear-gradient(to right, #4e5cc4 0%, #40ce9a 100%);
    content: '';
    display: block;
    height: 3px;
    margin: 1rem auto;
    width: 8rem;
  }
}

.product {
  margin-top: 3rem;
}

.product__body {
  @include mq($mq_pc) {
    display: flex;
    flex-wrap: wrap;
  }
}

.product__image {
  margin-bottom: 1rem;

  @include mq($mq_pc) {
    margin-right: 3%;
    width: 47%;
  }

  img {
    border: 3px solid $color_gray_middle;
  }
}

.product__text {
  @include mq($mq_pc) {
    width: 50%;
  }
}

.product__meta {
  list-style-type: disc !important;
  margin: 0 1rem 1rem !important;
}
</style>
