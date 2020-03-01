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
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    -ms-border-radius: 5px;
    background: rgb(226,226,226); /* Old browsers */
    background: linear-gradient(to right, rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* W3C */
    background: -moz-linear-gradient(left, rgba(226,226,226,1) 0%, rgba(219,219,219,1) 50%, rgba(209,209,209,1) 51%, rgba(254,254,254,1) 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(226,226,226,1)), color-stop(50%,rgba(219,219,219,1)), color-stop(51%,rgba(209,209,209,1)), color-stop(100%,rgba(254,254,254,1))); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left, rgba(226,226,226,1) 0%,rgba(219,219,219,1) 50%,rgba(209,209,209,1) 51%,rgba(254,254,254,1) 100%); /* IE10+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e2e2e2', endColorstr='#fefefe',GradientType=1 ); /* IE6-9 */
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
    -moz-transition: left 200ms;
    -webkit-transition: left 200ms;
    -o-transition: left 200ms;
    -ms-transition: left 200ms;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
}

.lightsaber input[type=checkbox] {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    -moz-opacity: 0;
    -webkit-opacity: 0;
    -o-opacity: 0;
    -ms-opacity: 0;
    z-index: 77;
}

.lightsaber .plasma {
    transition: height 300ms,;
    -moz-transition: height 300ms;
    -webkit-transition: height 300ms;
    -o-transition: height 300ms;
    -ms-transition: height 300ms;
    border-radius: 12px 12px 0 0;
    position: absolute;
    bottom: 25px;
    left: 0;
    width: 7px;
    display: block;
    filter: blur(1px);
    -moz-filter: blur(1px);
    -webkit-filter: blur(1px);
    -o-filter: blur(1px);
    -ms-filter: blur(1px);
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
    background: rgb(229,17,21); /* Old browsers */
    background: linear-gradient(to right, rgba(229,17,21,1) 0%,rgba(254,254,254,1) 30%,rgba(254,254,254,1) 47%,rgba(254,254,254,1) 71%,rgba(229,17,21,1) 100%); /* W3C */
    background: -moz-linear-gradient(left, rgba(229,17,21,1) 0%, rgba(254,254,254,1) 30%, rgba(254,254,254,1) 47%, rgba(254,254,254,1) 71%, rgba(229,17,21,1) 100%); /* FF3.6+ */
    background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(229,17,21,1)), color-stop(30%,rgba(254,254,254,1)), color-stop(47%,rgba(254,254,254,1)), color-stop(71%,rgba(254,254,254,1)), color-stop(100%,rgba(229,17,21,1))); /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(left, rgba(229,17,21,1) 0%,rgba(254,254,254,1) 30%,rgba(254,254,254,1) 47%,rgba(254,254,254,1) 71%,rgba(229,17,21,1) 100%); /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(left, rgba(229,17,21,1) 0%,rgba(254,254,254,1) 30%,rgba(254,254,254,1) 47%,rgba(254,254,254,1) 71%,rgba(229,17,21,1) 100%); /* Opera 11.10+ */
    background: -ms-linear-gradient(left, rgba(229,17,21,1) 0%,rgba(254,254,254,1) 30%,rgba(254,254,254,1) 47%,rgba(254,254,254,1) 71%,rgba(229,17,21,1) 100%); /* IE10+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e51115', endColorstr='#e51115',GradientType=1 ); /* IE6-9 */
    animation-name: vader;
    -moz-animation-name: vader;
    -webkit-animation-name: vader;
    -o-animation-name: vader;
    -ms-animation-name: vader;
    animation-duration: 2s;
    -moz-animation-duration: 2s;
    -webkit-animation-duration: 2s;
    -o-animation-duration: 2s;
    -ms-animation-duration: 2s;
    animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
}

/* Animations */
@keyframes vader {
    from { box-shadow: 0 0 10px #e51115; }
    50% { box-shadow: 0 0 16px #e51115; }
    to { box-shadow: 0 0 10px #e51115; }
}
@-moz-keyframes vader {
    from { box-shadow: 0 0 10px #e51115; }
    50% { box-shadow: 0 0 16px #e51115; }
    to { box-shadow: 0 0 10px #e51115; }
}
@-webkit-keyframes vader {
    from { box-shadow: 0 0 10px #e51115; }
    50% { box-shadow: 0 0 16px #e51115; }
    to { box-shadow: 0 0 10px #e51115; }
}
@-o-keyframes vader {
    from { box-shadow: 0 0 10px #e51115; }
    50% { box-shadow: 0 0 16px #e51115; }
    to { box-shadow: 0 0 10px #e51115; }
}
@-ms-keyframes vader {
    from { box-shadow: 0 0 10px #e51115; }
    50% { box-shadow: 0 0 16px #e51115; }
    to { box-shadow: 0 0 10px #e51115; }
}
</style>
