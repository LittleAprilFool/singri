<template lang="jade">
div
  button.test(v-on:click="buttonon")
  - start_note = 60
  - end_note = 91
  div.wrapout
    div.wrap
      div.gwhite
        - for(var i = start_note; i <= end_note; i++)
          - if([1, 3, 6, 8, 10].indexOf(i%12) == -1)
            div.container.note.wnote(id='p'+i)
      div.gblack
        - for(var i = start_note + 1; i <= end_note; i++)
          - if([0, 1, 3, 4, 6, 8, 10].indexOf(i%12) != -1)
            div.container.note.bnote(id='p'+i)
  div.wrapout
    div.wrap
      div.gwhite
        - for(var i = start_note; i <= end_note; i++)
          - if([1, 3, 6, 8, 10].indexOf(i%12) == -1)
            div.container.key.wkey(id='p'+i, v-on:click="play($event)")
      div.gblack
        - for(var i = start_note + 1; i <= end_note; i++)
          - if([1, 3, 6, 8, 10].indexOf(i%12) != -1)
            div.container.key.bkey(id='p'+i, v-on:click="play($event)")
          - else
            - if([0, 4].indexOf(i%12) != -1)
              div.container.key.bkey(id='none')
  </button>
</template>
<script>
let delay = 0 // play one note every quarter second
let velocity = 127 // how hard the note hits
export default {
  name: 'hello',
  data () {
    return {
      show: true
    }
  },
  methods: {
    buttonon: function () {
      var note = 50 // the MIDI note
      MIDI.noteOn(0, note, velocity, delay)
      MIDI.noteOff(0, note, delay + 0.75)
    },
    play: function (event) {
      var note = event.target.id.substring(1, event.target.id.length)
      MIDI.noteOn(0, note, velocity, delay)
      MIDI.noteOff(0, note, delay + 0.75)
      var container = document.querySelector('.note#' + event.target.id)
      var littlenote = document.createElement('div')
      var text = ['♬', '♪', '♩', '♭', '♪', '๑', '❀', '☃', '☂', '❤']
      littlenote.textContent = text[Math.floor(Math.random() * 10)]
      littlenote.textContent = text[1]
      littlenote.className = 'littlenote'
      littlenote.style['color'] = '#' + Math.floor(Math.random() * 16777215).toString(16)
      container.appendChild(littlenote)
      setTimeout(function () {
        littlenote.remove()
      }, 4000)
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
  border: solid 1px transparent;
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
#none{
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
    width: 1000px;
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
  opacity: 0;
  animation-name: dance;
  animation-duration: 2.5s;
}

</style>
