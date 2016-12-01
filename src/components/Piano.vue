<template lang="jade">
div
  div.wrapout
    div.wrap
      div.gwhite
        - for(var i = 0; i < 14; i++)
          div.container.note.wnote(id= 'wk-' + i)
      div.gblack
        - for(var i = 0; i < 13; i++)
          div.container.note.bnote(id= 'bk-' + i)
  div.wrapout
    div.wrap
      div.gwhite
        - for(var i = 0; i < 14; i++)
          div.container.key.wkey(id= 'wk-' + i, v-on:click="play($event)")
      div.gblack
        - for(var i = 0; i < 13; i++)
          div.container.key.bkey(id= 'bk-' + i, v-on:click="play($event)")
  </button>
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      show: true
    }
  },
  methods: {
    play: function (event) {
      var sound = document.createElement('audio')
      sound.setAttribute('src', '/static/' + event.target.id + '.mp3')
      event.target.appendChild(sound)
      event.target.classList.add('keydown')
      sound.play()
      var container = document.querySelector('.note#' + event.target.id)
      var note = document.createElement('div')
      var text = ['♬', '♪', '♩', '♭', '♪', '๑', '❀', '☃', '☂', '❤']
      // note.textContent = text[Math.floor(Math.random() * 10)]
      note.textContent = text[1]
      note.className = 'littlenote'
      note.style['color'] = '#' + Math.floor(Math.random() * 16777215).toString(16)
      container.appendChild(note)
      sound.onended = function () {
        this.remove()
        event.target.classList.remove('keydown')
        note.remove()
        // note.classList.remove('dance')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
.container {
  border: solid 1px #ffffff;
  display: inline;
  float: left;
}
.key {
  transition: all .5s ease;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.note {
  border: transparent;
  height: 200px;
}
.wkey {
  box-shadow:inset 0px 0px 0px 1px $keyBorder;
  width: 50px;
  height: 120px;
  background: #ffffff;
}
.wnote {
  width: 50px;
}
.bnote {
  width: 40px;
  margin-left: 5px;
  margin-right: 5px;
}
.wkey:hover {
  background: #eeeeee;
}
.bkey {
  background: #000000;
  width: 40px;
  height: 80px;
  margin-left: 5px;
  margin-right: 5px;
}
.bkey:hover {
  background: #555555;
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
.wrapout {
    float: left;
    position: relative;
    left: 50%;
}
.wrap {
    float: left;
    position: relative;
    left: -50%;
    width: 780px;
    height: 200px;
}

@keyframes dance {
  0% {top:0px; opacity:0;}
  30% {opacity:1;}
  100% {color:yellow; top:100px; opacity: 0;}
}

.littlenote {
  font-size: 2em;
  position: absolute;
  padding-left: 15px;
  animation-name: dance;
  animation-duration: 2.5s;
}

</style>
