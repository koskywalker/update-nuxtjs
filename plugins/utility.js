import anime from 'animejs'

/**
 * ページトップへアニメーション遷移
 */
const scrollTopAnimation = () => {
  anime({
    targets: '#__nuxt',
    scrollTop: 0,
    easing: 'easeInOutQuart',
    duration: 800,
  })
}

/**
 * 画面をフェードアウトして引数に渡した関数を実行
 * @param callback
 */
const fadeoutPage = (callback) => {
  anime({
    targets: '.particles, .mainVisual, .gradationArea, .container, .post',
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 500,
    complete: () => callback(),
  })
}

/**
 * 画面をフェードイン
 */
const fadeinPage = () => {
  anime({
    targets: '.particles, .mainVisual, .gradationArea, .container, .post',
    opacity: [0, 1],
    easing: 'easeInOutQuart',
    duration: 500,
  })
}

export default ({ app }, inject) => {
  inject('scrollTopAnimation', scrollTopAnimation)
  inject('fadeoutPage', fadeoutPage)
  inject('fadeinPage', fadeinPage)
}
