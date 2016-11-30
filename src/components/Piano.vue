<template lang="jade">
div
  div.piano
    audio(v-bind:src= "key" type= "audio/mpeg" autoplay= true)
    div.wrap
      div.gwhite
        - for(var i = 0; i < 14; i++)
          div.key.white(id= 'wk-' + i, v-on:click="play($event)")
      div.gblack
        - for(var i = 0; i < 13; i++)
          div.key.black(id= 'bk-' + i, v-on:click="play($event)")
</template>
<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      key: '/static/none.mp3'
    }
  },
  methods: {
    play: function (event) {
      // `this` 在方法里指当前 Vue 实例
      this.key = '/static/' + event.target.id + '.mp3'
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

.key{
  border: solid 1px #ffffff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: inline;
  float: left;
}

.white{
  box-shadow:inset 0px 0px 0px 1px $keyBorder;
  width: 50px;
  height: 120px;
}

.black{
  background: #000000;
  width: 40px;
  height: 80px;
  margin-left: 5px;
  margin-right: 5px;
}
.gwhite{
  display: inline;
  position: absolute;
  left: 10px;
}
.gblack{
  display: inline;
  position: absolute;
  left: 36px;
}

#bk-2, #bk-6, #bk-9{
  visibility:hidden;
}

.piano{
    float: left;
    position: relative;
    left: 50%;
}
.wrap{
    float: left;
    position: relative;
    left: -50%;
    width: 780px;
}
</style>
