<template lang="jade">
div
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
            div.container.key.wkey(id='p'+i, v-on:click="play($event)", v-on:keyup.12="play($event)")
      div.gblack
        - for(var i = start_note + 1; i <= end_note; i++)
          - if([1, 3, 6, 8, 10].indexOf(i%12) != -1)
            div.container.key.bkey(id='p'+i, v-on:click="play($event)", v-on:keyup.12="play($event)")
          - else
            - if([0, 4].indexOf(i%12) != -1)
              div.container.key.bkey(id='none')
   div.wrapout
     div.wrap(id='control')
       button.btn-1(id='send', v-on:click="send") send
  </button>
</template>
<script>
const delay = 0 // play one note every quarter second
const velocity = 127 // how hard the note hits
let noteEvents = []
let time = 0
export default {
  name: 'hello',
  data () {
    return {
      show: true,
      result: []
    }
  },
  methods: {
    send: function () {
      let track = new MidiTrack({ events: noteEvents })
      let song = MidiWriter({ tracks: [track] })
      noteEvents = []
      console.log(song.b64)
      let oldselect = document.querySelector('.output')
      if (oldselect == null) {
        $.post('/generate_midi', song.b64, function (data, status) {
          this.resul = JSON.parse(data)
          let control = document.querySelector('#control')
          let select = document.createElement('div')
          select.className = 'output'
          this.result.forEach(function (ele) {
            var opt = document.createElement('button')
            opt.textContent = ele.name
            opt.className = 'btn-2'
            opt.onclick = function () {
              MIDI.Player.stop()
              console.log(ele.midi)
              MIDI.Player.loadFile('base64,' + ele.midi, MIDI.Player.start)
            }
            select.appendChild(opt)
          })
          control.appendChild(select)
        })
        // var testdata = '[{"name":"Basic", "midi": "TVRoZAAAAAYAAAABAIBNVHJrAAAAHwCQSFqBAIBIWk6QSlqBAIBKWjKQTFqBAIBMWgD/LwA="}, {"name": "Lookback", "midi": "TVRoZAAAAAYAAAABAIBNVHJrAAAAHwCQSFqBAIBIWk6QSlqBAIBKWjKQTFqBAIBMWgD/LwA="}, {"name": "Attention", "midi": "TVRoZAAAAAYAAAABAIBNVHJrAAAABAD/LwA="}, {"name": "Polyphonic", "midi": "TVRoZAAAAAYAAAABAIBNVHJrAAAABAD/LwA="}]'
        // this.result = JSON.parse(testdata)
        // let control = document.querySelector('#control')
        // let select = document.createElement('div')
        // select.className = 'output'
        // this.result.forEach(function (ele) {
        //   var opt = document.createElement('button')
        //   opt.textContent = ele.name
        //   opt.className = 'btn-2'
        //   opt.onclick = function () {
        //     MIDI.Player.stop()
        //     console.log(ele.midi)
        //     MIDI.Player.loadFile('base64,' + ele.midi, MIDI.Player.start)
        //   }
        //   select.appendChild(opt)
        // })
        // control.appendChild(select)
      }
      MIDI.Player.loadFile('base64,' + song.b64, MIDI.Player.start)
    },
    play: function (event) {
      let d = new Date()
      let duration = d.getTime() - time
      if (noteEvents.length === 0) duration = 0
      time = d.getTime()
      MIDI.Player.stop()
      let noteid = event.target.id.substring(1, event.target.id.length)
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
      let select = document.querySelector('.output')
      if (select != null) select.remove()
      // add effect
      let container = document.querySelector('.note#' + event.target.id)
      let littlenote = document.createElement('div')
      let text = ['♬', '♪', '♩', '♭', '♪', '๑', '❀', '☃', '☂', '❤']
      littlenote.textContent = text[Math.floor(Math.random() * 10)]
      littlenote.textContent = text[1]
      littlenote.className = 'littlenote'
      let flatcolor = ['#1abc9c', '#2ecc71', '#f1c40f', '#34495e', '#e74c3c', '#e67e22', '#3498db', '#9b59b6', '#f39c12', '#c0392b']
      littlenote.style['color'] = flatcolor[Math.floor(Math.random() * 10)]
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
  display: inline-block;
  border: none;
  padding:20px 20px;
  margin: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 20px;
  outline: none;
  transition: all 0.3s;
  position: relative;
  width: 200px;
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

.btn-2 {
  color : #fff;
  font-size: 15px;
  width: 150px;
  background: #fcad26;
  padding: 25px 20px 25px 20px;
	overflow: hidden;
}

.btn-2:hover {
  background: #f29e0d;
}

.btn-2:active {
	background: #f58500;
	top: 2px;
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
  background: #eeeeee;
}
.bkey {
  background: #000000;
  width: 40px;
  height: 80px;
  margin-left: 5px;
  margin-right: 5px;
  border-top: 0px;
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
