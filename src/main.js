import Vue from 'vue'
import App from './App'

MIDI.loadPlugin({
  soundfontUrl: 'static/midi/soundfont/',
  instrument: 'acoustic_grand_piano',
  onprogress: function (state, progress) {
    console.log(state, progress)
  },
  onsuccess: function () {
    MIDI.setVolume(0, 127)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
