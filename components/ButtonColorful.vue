<template>
  <div class="button-colorful">
    <div class="button-colorful__inner">
      <button
        @click="click"
        type="button"
        class="button-colorful__button"
      >
        <span class="button-colorful__button-text">？？？</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    click () {
      this.$emit('clickButtonColorful')
    },
  },
}
</script>

<style lang="scss" scoped>
.button-colorful {
  animation: background_colorful 10s infinite;
  padding: 2px;
  width: 100%;

  &:active {
    opacity: 0.7;
  }

  &__inner {
    overflow: hidden;
    position: relative;

    &::before {
      animation: line_loop_left 2s linear 0s infinite;
      bottom: 0;
      height: 1px;
      left: 100%;
      width: 100%;
    }

    &::after {
      animation: line_loop_bottom 2s linear 1s infinite;
      bottom: 100%;
      height: 100%;
      right: 0;
      width: 1px;
    }
  }

  &__button {
    animation: background_colorful 10s infinite;
    color: #fff;
    display: inline-block;
    font-size: 1rem;
    height: 100%;
    outline: none;
    padding: 8px;
    text-align: center;
    text-decoration: none;
    width: 100%;

    &:hover {
      opacity: 0.8;
      transition: 0.3s;
    }

    &::before {
      animation: line_loop_right 2s linear 0s infinite;
      height: 1px;
      right: 100%;
      top: 0;
      width: 100%;
    }

    &::after {
      animation: line_loop_top 2s linear 1s infinite;
      height: 100%;
      left: 0;
      top: 100%;
      width: 1px;
    }
  }

  &__button-text {
    display: block;
    position: relative;

    &::before {
      background-color: currentColor;
      border-radius: 50%;
      content: '';
      height: 20px;
      position: absolute;
      right: 12px;
      top: calc(50% - 10px);
      width: 20px;
    }

    &::after {
      animation: arrow_colorful 10s infinite;
      border-style: solid;
      border-width: 6px 0 6px 9px;
      content: '';
      height: 0;
      position: absolute;
      right: 16px;
      top: calc(50% - 6px);
      width: 0;
    }
  }

  &__inner::before,
  &__inner::after,
  &__button::before,
  &__button::after {
    background: rgba(255, 255, 255, 0.63);
    content: '';
    position: absolute;
  }
}

@keyframes arrow_colorful {
  0% {
    border-color: transparent transparent transparent #009337;
  }

  25% {
    border-color: transparent transparent transparent #f1961b;
  }

  50% {
    border-color: transparent transparent transparent #e40038;
  }

  75% {
    border-color: transparent transparent transparent #00a5da;
  }

  100% {
    border-color: transparent transparent transparent #009337;
  }
}

@keyframes background_colorful {
  0% {
    background: #009337;
    box-shadow: 0 5px 0 #00561f, 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  25% {
    background: #f1961b;
    box-shadow: 0 5px 0 #9d6111, 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  50% {
    background: #e40038;
    box-shadow: 0 5px 0 #8c0023, 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  75% {
    background: #00a5da;
    box-shadow: 0 5px 0 #005876, 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  100% {
    background: #009337;
    box-shadow: 0 5px 0 #00561f, 0 10px 0 rgba(0, 0, 0, 0.2);
  }
}

@keyframes opacity_loop {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

@keyframes line_loop_top {
  0% {
    top: -100%;
  }

  100% {
    top: 100%;
  }
}

@keyframes line_loop_bottom {
  0% {
    bottom: -100%;
  }

  100% {
    bottom: 100%;
  }
}

@keyframes line_loop_right {
  0% {
    right: -100%;
  }

  100% {
    right: 100%;
  }
}

@keyframes line_loop_left {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}
</style>
