<template lang="jade">
 .out
  - start_note = 60
  - end_note = 91
  - keyboard = ['q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', 'i', '9', 'o', '0', 'p', '[','=', ']'] 
  loader.load
  .piano
    .staticpiano
      .wrapout
        .wrap.effect
          wave.wave
          .symbol
            .gwhite
              - for(var i = start_note; i <= end_note; i++)
                - if([1, 3, 6, 8, 10].indexOf(i%12) == -1)
                  .container.note.wnote(id='p'+i)
            .gblack
              - for(var i = start_note + 1; i <= end_note; i++)
                - if([0, 1, 3, 4, 6, 8, 10].indexOf(i%12) != -1)
                  .container.note.bnote(id='p'+i)
      .wrapout
        .wrap.keyboard
          .gwhite
            - for(var i = start_note; i <= end_note; i++)
              - if([1, 3, 6, 8, 10].indexOf(i%12) == -1)
                .container.key.wkey(id='p'+i, v-on:click='play(' + i + ')')
          .gblack
            - for(var i = start_note + 1; i <= end_note; i++)
              - if([1, 3, 6, 8, 10].indexOf(i%12) != -1)
                .container.key.bkey(id='p'+i, v-on:click='play(' + i + ')')
              - else
                - if([0, 4].indexOf(i%12) != -1)
                  .container.key.bkey(id='none')
      .wrapout
        .wrap(id='control').control
          .output
            button.btn-2.unavailable(id='basic') basic
            button.btn-2.unavailable(id='lookback') lookback
            button.btn-2.unavailable(id='attention') attention
            button.btn-2.unavailable(id='polyphonic') polyphonic
            button.btn-2(v-on:click="playmidi('sample1.mid')") rbm1
            button.btn-2(v-on:click="playmidi('sample2.mid')") rbm2
          button.btn-1(id='send', v-on:click="send", v-on:keyup.32="test") send
  </template>

<script>
import Loader from './Loader'
import Wave from './Wave'
const delay = 0 // play one note every quarter second
const velocity = 127 // how hard the note hits
let noteEvents = []
let time = 0
export default {
  name: 'piano',
  components: {
    Loader,
    Wave
  },
  data () {
    return {
      show: true,
      result: []
    }
  },
  mounted: function () {
    let keyboard = ['q', '2', 'w', '3', 'e', 'r', '5', 't', '6', 'y', '7', 'u', 'z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', 'i', '9', 'o', '0', 'p', '[', '=', ']']
    let keyboardfunc = (e) => {
      if (keyboard.indexOf(e.key) !== -1) {
        this.play(keyboard.indexOf(e.key) + 60)
      }
    }
    window.addEventListener('keydown', keyboardfunc)
  },
  methods: {
    send: function () {
      let loader = document.querySelector('.load')
      loader.style.display = 'block'
      let track = new MidiTrack({ events: noteEvents })
      let song = MidiWriter({ tracks: [track] })
      noteEvents = []
      let oldselect = document.querySelector('.available')
      if (oldselect == null) {
        let myHeaders = new Headers()
        myHeaders.append('Content-Type', 'text/plain')
        fetch('/generate_midi', {
          method: 'POST',
          body: song.b64,
          headers: myHeaders
        })
        .then(function (res) {
          return res.json()
        })
        .then(function (data) {
          loader.style.display = 'none'
          data.forEach(function (ele) {
            var button = document.querySelector('#' + ele.name)
            button.classList.remove('unavailable')
            button.classList.add('available')
            button.onclick = function () {
              MIDI.Player.stop()
              MIDI.Player.loadFile(ele.midi, MIDI.Player.start)
              let symbol = document.querySelector('.symbol')
              symbol.style.display = 'none'
              let wave = document.querySelector('.wave')
              wave.style.display = 'block'
            }
          })
        })
      }
    },
    play: function (noteid) {
      let symbol = document.querySelector('.symbol')
      symbol.style.display = 'block'
      let wave = document.querySelector('.wave')
      wave.style.display = 'none'
      let d = new Date()
      let duration = d.getTime() - time
      if (noteEvents.length === 0) duration = 0
      time = d.getTime()
      MIDI.Player.stop()
      // play MIDI
      MIDI.noteOn(0, noteid, velocity, delay)
      MIDI.noteOff(0, noteid, delay + 0.75)
      // record event
      let note = {}
      note.pitch = noteid
      note.duration = duration / 10
      Array.prototype.push.apply(noteEvents, [MidiEvent.noteOn(note)])
      note.duration = 128
      Array.prototype.push.apply(noteEvents, [MidiEvent.noteOff(note)])
      // delete output
      let select = document.querySelector('.available')
      if (select != null) {
        select.classList.add('unavailable')
        select.classList.remove('available')
        select.onclick = function () {
        }
      }
      // key down effect
      let key = document.querySelector('.key#p' + noteid)
      key.classList.add('press')
      setTimeout(function () {
        key.classList.remove('press')
      }, 500)
      // add effect
      let container = document.querySelector('.note#p' + noteid)
      let littlenote = document.createElement('div')
      let text = ['♬', '♪', '♩', '♭', '♪', '๑', '❀', '☃', '☂', '❤']
      littlenote.textContent = text[Math.floor(Math.random() * 10)]
      littlenote.textContent = text[1]
      littlenote.className = 'littlenote'
      // let flatcolor = ['#1abc9c', '#2ecc71', '#f1c40f', '#34495e', '#e74c3c', '#e67e22', '#3498db', '#9b59b6', '#f39c12', '#c0392b']
      littlenote.style['color'] = '#000'
      container.appendChild(littlenote)
      setTimeout(function () {
        littlenote.remove()
      }, 4000)
    },
    playmidi: function (file) {
      let symbol = document.querySelector('.symbol')
      symbol.style.display = 'none'
      let wave = document.querySelector('.wave')
      wave.style.display = 'block'
      MIDI.Player.stop()
      MIDI.Player.loadFile('static/' + file, MIDI.Player.start)
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

.staticpiano {
  position: static;
  padding-top: 60px;
}

.load {
  display: none;
}
.wave{
  display: none;
}

button {
  display: inline-block;
  border: none;
  padding:15px 20px;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;
  position: relative;
  width: 180px;
}

button:after{
  content: '';
  position:absolute;
  z-index: -1;
  transition: all 0.3s;
}

.btn-1 {
  background: #cb4e4e;
	color: #fff;
	box-shadow: 0 6px #ab3c3c;
	transition: none;
  border-radius: 0 0 5px 5px;
}

.btn-1:hover {
  box-shadow: 0 4px #ab3c3c;
  top: 2px;
}

.btn-1:active {
	box-shadow: 0 0 #ab3c3c;
	top: 6px;
}

.out {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 600px;
}

.btn-2 {
  color : #fff;
  font-size: 10px;
  width: 100px;
  background: #fcad26;
  padding: 15px 5px 15px 5px;
	overflow: hidden;
}

.btn-2.unavailable {
  background: #fcd04b;
  border: 2px dashed #f29e0d;
  color: #f29e0d;
}

.btn-2:hover {
  background: #f29e0d;
}
.btn-2.unavailable:hover {
  background: #fcd04b;
}

.btn-2:active {
	background: #f58500;
	top: 2px;
}
.btn-2.unavailable:active {
  background: #fcd04b;
}

.btn-2:before {
	position: absolute;
	height: 100%;
	top: 0;
	line-height: 3;
	font-size: 140%;
	width: 60px;
  left: auto;
	right: 10px;
	z-index: 2;
}
.btn-2:after {
  width: 30%;
	height: 200%;
	background: rgba(255,255,255,0.1);
	z-index: 1;
	right: 0;
	top: 0;
	margin: -5px 0 0 -5px;
	transform-origin: 0 0;
	transform: rotate(-20deg);
}

.btn-2:hover:after {
  width: 40%;
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
  border: solid 1px #eee;
  width: 50px;
  height: 120px;
  background: #fff;
  box-shadow: inset 0px -3px 0px 1px #eee;
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
  background: #eee;
}
.wkey.press {
  background: #e0e0e0;
  border: solid 1px #e0e0e0;
  box-shadow: inset 0px -3px 0px 1px #e0e0e0;
}
.bkey {
  background: #000;
  width: 40px;
  height: 80px;
  margin-left: 5px;
  margin-right: 5px;
  border-top: 0px;
}
.bkey:hover {
  background: #333;
}
.bkey.press {
  background: #444;
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
}
.wrap.keyboard {
  height: 140px;
}
.wrap.effect {
  height: 150px;
}
.wrap#control {
  height: 20px;
}

@keyframes dance {
  0% {top:0px; opacity:0;}
  30% {opacity:1;}
  100% {top:100px; opacity: 0;}
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
