/**
 * ページに合わせて Particles.js の高さを変更
 */
const fixParticlesHeight = () => {
  const header = document.querySelector('.header')
  const mainVisual = document.querySelector('.mainVisual') || null
  const postHeader = document.querySelector('.postHeader') || null
  const particles = document.querySelector('.particlesa')

  if (mainVisual) {
    particles.style.height = header.clientHeight + mainVisual.clientHeight + 'px'
  } else if (postHeader) {
    particles.style.height = header.clientHeight + postHeader.clientHeight + 'px'
  }
}

export default ({ app }, inject) => {
  inject('fixParticlesHeight', fixParticlesHeight)
}
