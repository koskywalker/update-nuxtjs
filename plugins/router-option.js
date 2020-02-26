/**
 * ページに合わせて Particles.js の高さを変更
 */
const fixParticlesHeight = () => {
  const header = document.querySelector('.header')
  const mainVisual = document.querySelector('.mainVisual') || null
  const postHeader = document.querySelector('.postHeader') || null
  const particles = document.querySelector('.particlesWrap')

  if (mainVisual) {
    particles.style.height = header.clientHeight + mainVisual.clientHeight + 'px'
  } else if (postHeader) {
    particles.style.height = header.clientHeight + postHeader.clientHeight + 'px'
  }
}

/**
 * 選択した記事の情報を取得
 * @param to 遷移先ページ
 * @param articleList 記事一覧
 */
const getSelectedArticleInfo = (to, articleList) => {
  const selectedArticle = articleList.find((article) => {
    return article.post.fields.slug === to.params.slug
  })
  return selectedArticle
}

/**
 * 画像のスタイル情報を取得
 */
const getImageStyleObject = (element) => {
  const rect = element.getBoundingClientRect()
  const styleObject = {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${element.clientWidth}px`,
  }
  return styleObject
}

export default ({ app }, inject) => {
  inject('fixParticlesHeight', fixParticlesHeight)
  inject('getSelectedArticleInfo', getSelectedArticleInfo)
  inject('getImageStyleObject', getImageStyleObject)
}
