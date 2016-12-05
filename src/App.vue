<template>
  <div id="app">
    <headline></headline>
    <piano id="piano"></piano>
  </div>
</template>

<script>
import Piano from './components/Piano'
import Headline from './components/Headline'
export default {
  name: 'app',
  components: {
    Piano,
    Headline
  },
  methods: {
    test: function () {
      console.log('haha')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
  overflow-y:hidden;
}
#piano {
  position: fixed;
  margin: 0;
  left: 0;
  height: 100%;
  bottom: 0px;
  padding-top: 50px;
  overflow-y: hidden;
  height:100%;
}
</style>
