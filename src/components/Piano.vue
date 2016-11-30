<template lang="jade">
div
  div.piano
    div.wrap
      div.gwhite
        - for(var i = 0; i < 14; i++)
          div.key.white(id= 'wk-' + i, v-on:click="play($event)")
      div.gblack
        - for(var i = 0; i < 13; i++)
          div.key.black(id= 'bk-' + i, v-on:click="play($event)")
  div
      button(v-on:click="show = !show") Toggle
      transition(name="fade")
        h2(v-if="show") hello

  </button>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: true
    }
  },
  methods: {
    play: function (event) {
      var sound = document.createElement('audio')
      sound.setAttribute('src', '/static/' + event.target.id + '.mp3')
      event.target.appendChild(sound)
      sound.play()
      sound.onended = function () {
        this.remove()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$keyColor: #eeffcc;
$keyBorder: #cccccc;
p {
  font-size: 2em;
  text-align: center;
}

button {
  display: block;
}

h2 {
  display: block;
  text-align: left;
}
.key {
  border: solid 1px #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: inline;
  float: left;
}
.white {
  box-shadow:inset 0px 0px 0px 1px $keyBorder;
  width: 50px;
  height: 120px;
}
.black {
  background: #000000;
  width: 40px;
  height: 80px;
  margin-left: 5px;
  margin-right: 5px;
}
.gwhite {
  display: inline;
  position: absolute;
  left: 10px;
}
.gblack {
  display: inline;
  position: absolute;
  left: 36px;
}
#bk-2, #bk-6, #bk-9 {
  visibility:hidden;
}
.piano {
    float: left;
    position: relative;
    left: 50%;
}
.wrap {
    float: left;
    position: relative;
    left: -50%;
    width: 780px;
}
.fade-enter-active, .fade-leave-active{
  transition: all .8s ease;
}
.fade-enter, .fade-leave-active{
  opacity: .5;
}
.fade-enter-active {
  opacity: .8;
}
</style>
