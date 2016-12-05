<template lang="jade">
.outside
  .loader
    .loader__figure
    p.loader__label loading
</template>

<script>
export default {
  name: 'loader',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outside {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
}
.loader,
.loader__figure {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.loader {
  overflow: visible;
  padding-top: 5em;
  height: 0;
  width: 5em;
}

.loader__figure {
  height: 0;
  width: 0;
  box-sizing: border-box;
  border: 0 solid #fcd04b;
  border-radius: 50%;
  -webkit-animation: loader-figure 2.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  -moz-animation: loader-figure 2.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  animation: loader-figure 2.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}

.loader__label {
  float: left;
  margin-left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  transform: translateX(-50%);
  margin: 0.5em 0 0 50%;
  font-size: 1em;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  color: #8c7035;
  white-space: nowrap;
  -webkit-animation: loader-label 2.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  -moz-animation: loader-label 2.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  animation: loader-label 2.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}

@-webkit-keyframes loader-figure {
  0% {
    height: 0;
    width: 0;
    background-color: #fcd04b;
  }
  29% {
    background-color: #fcd04b;
  }
  30% {
    height: 5em;
    width: 5em;
    background-color: transparent;
    border-width: 2.5em;
    opacity: 1;
  }
  100% {
    height: 5em;
    width: 5em;
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
}
@-moz-keyframes loader-figure {
  0% {
    height: 0;
    width: 0;
    background-color: #fcd04b;
  }
  29% {
    background-color: #fcd04b;
  }
  30% {
    height: 5em;
    width: 5em;
    background-color: transparent;
    border-width: 2.5em;
    opacity: 1;
  }
  100% {
    height: 5em;
    width: 5em;
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
}
@keyframes loader-figure {
  0% {
    height: 0;
    width: 0;
    background-color: #fcd04b;
  }
  29% {
    background-color: #fcd04b;
  }
  30% {
    height: 5em;
    width: 5em;
    background-color: transparent;
    border-width: 2.5em;
    opacity: 1;
  }
  100% {
    height: 5em;
    width: 5em;
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
}
@-webkit-keyframes loader-label {
  0% {
    opacity: 0.25;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
}
@-moz-keyframes loader-label {
  0% {
    opacity: 0.25;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
}
@keyframes loader-label {
  0% {
    opacity: 0.25;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
}
</style>
