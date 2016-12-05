<template lang="jade">
.headline
  .headwrapout
    .headwrap
      img.title(src = 'static/singri.svg' )
  button.btn-2(v-on:click="troggleabout($event)") about
  div.aboutus
    h1 CMPT419 Final Project: A Survey of Neural Network Models for Music Generation
    p Comparison, Training, Evaluation, and Application
    p Ao Li, AprilWang, Hongpu Ma, Jingda Chen, Wenqian Chen @ SFU
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      aboutshow: false
    }
  },
  methods: {
    troggleabout: function (event) {
      this.aboutshow = !this.aboutshow
      console.log('233')
      let aboutus = document.querySelector('.aboutus')
      let title = document.querySelector('.title')
      let headline = document.querySelector('.headline')
      if (this.aboutshow) {
        event.target.textContent = 'close'
        aboutus.style.height = '85%'
        title.classList.add('sm')
        headline.classList.add('sm')
      } else {
        event.target.textContent = 'about'
        aboutus.style.height = '0%'
        title.classList.remove('sm')
        headline.classList.remove('sm')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1 {
  color: #000;
}
p {
  color: #000;
}
.headline {
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 20px;
  transition: all ease .3s;
  z-index: 10;
}
.headline.sm {
  padding-top: 10px;
}
.headwrapout {
    float: left;
    position: relative;
    left: 50%;
}
.headwrap {
    float: left;
    position: relative;
    left: -50%;
    width: 1000px;
    height: 130px;
}
.title{
  width: 150px;
  transition: all 0.3s;
}
.title.sm{
  width: 140px;
}
.aboutus{
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 0%;
  background: #fcad26;
  z-index: 999;
  transition: all ease 0.3s;
  overflow-y:hidden;
}
</style>
