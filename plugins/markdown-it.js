import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'

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

  md.use(require('markdown-it-table-of-contents'))
  md.use(container, 'info')
  md.use(container, 'success')
  md.use(container, 'warning')
  md.use(container, 'danger')

  inject('md', md)
}
