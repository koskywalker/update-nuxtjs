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
  inject('getSelectedArticleInfo', getSelectedArticleInfo)
  inject('getImageStyleObject', getImageStyleObject)
}
