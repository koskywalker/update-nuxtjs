import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItTableOfContents from 'markdown-it-table-of-contents'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'

export default ({ app }, inject) => {
  const md = new MarkdownIt({
    langPrefix: 'language-',
    preset: 'default',
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  })

  md.use(MarkdownItAnchor)
  md.use(MarkdownItTableOfContents, {
    includeLevel: [2, 3],
  })
  md.use(MarkdownItContainer, 'info')
  md.use(MarkdownItContainer, 'success')
  md.use(MarkdownItContainer, 'warning')
  md.use(MarkdownItContainer, 'danger')
  md.use(MarkdownItLinkAttributes, {
    pattern: /^https?:\/\//,
    attrs: {
      target: '_blank',
      rel: 'noopener',
    },
  })

  inject('md', md)
}
