<template>
  <div class="lightsaber">
    <label for="darth-vader-example" />
    <input
      id="darth-vader-example"
      :checked="switchStatus"
      type="checkbox"
    >
    <div class="switch" />
    <div class="plasma vader" />
  </div>
</template>

<script>
export default {
  props: {
    switchStatus: {
      type: Boolean,
      default () {
        return false
      },
    },
  },
}
</script>

<style>
.lightsaber { position: relative; }

.lightsaber label {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 88;
    text-indent: -9999px;
    width: 7px;
    height: 25px;
    border-bottom: solid 4px grey;
    border-top: solid 5px grey;
    border-radius: 5px;
    background: linear-gradient(to right, rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%);
}

.lightsaber .switch {
    background: #B94A37;
    width: 5px;
    height: 6px;
    display: block;
    position: absolute;
    bottom: 10px;
    left: 5px;
    transition: left 200ms;
    border-radius: 10px;
}

.lightsaber input[type=checkbox] {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 77;
}

.lightsaber .plasma {
    transition: height 300ms,;
    border-radius: 12px 12px 0 0;
    position: absolute;
    bottom: 25px;
    left: 0;
    width: 7px;
    display: block;
    filter: blur(1px);
    height: 0;
}

.lightsaber input[type=checkbox]:checked ~ div.plasma {
    height: 111px;
}

.lightsaber input[type=checkbox]:hover ~ div.switch {
    background: #c09853;
    left: 4px;
}

.lightsaber input[type=checkbox]:checked ~ div.switch {
    background: #468847;
}

.vader {
    background: linear-gradient(to right, rgba(229,17,21,1) 0%,rgba(254,254,254,1) 30%,rgba(254,254,254,1) 47%,rgba(254,254,254,1) 71%,rgba(229,17,21,1) 100%); /* W3C */
    animation-name: vader;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

/* Animations */
@keyframes vader {
    from { box-shadow: 0 0 10px #e51115; }
    50% { box-shadow: 0 0 16px #e51115; }
    to { box-shadow: 0 0 10px #e51115; }
}
</style>
