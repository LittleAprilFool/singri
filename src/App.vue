<template>
  <div id="app">
    <piano></piano>
  </div>
</template>

<script>
import Piano from './components/Piano'
export default {
  name: 'app',
  components: {
    Piano
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
  margin-top: 60px;
}
</style>
