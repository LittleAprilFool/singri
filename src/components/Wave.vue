<template>
  <div>
  <svg>
    <defs>
      <linearGradient id="loaderGradient">
        <stop offset="0%" stop-color="#000" />
        <stop offset="33%" stop-color="#000" />
        <stop offset="66%" stop-color="#000" />
        <stop offset="100%" stop-color="#000" />
      </linearGradient>
    </defs>
  </svg>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {
    const $ = d3.select.bind(d3)
    const WIDTH = document.body.clientWidth
    const HEIGHT = 20
    const WAVES = 3
    const SMOOTH_DISTANCE = 75
    // generate the loader
    const svg = $('svg').attr('width', WIDTH).attr('height', HEIGHT)
    // Wave class
    class Wave {
      constructor (wavelength, amplitude, offset, opacity) {
        this.piScaled = Math.PI * 2 / wavelength
        this.amplitude = amplitude
        this.offset = offset
        this.opacity = opacity
        this.path = svg.append('path')
        .attr('stroke', 'url(#loaderGradient)')
        .attr('fill', 'none')
        .attr('stroke-opacity', opacity)
        .attr('stroke-width', 1)
        this.line = d3.svg.line()
        .x(v => v.index)
        .y(v => {
          // scale it off if it exceeds the progress
          let scale = 1
          let exceedingAmount = Math.abs(WIDTH / 2 - v.index) - (WIDTH / 2 * progress - SMOOTH_DISTANCE / 2)
          scale = Math.cos(
            Math.PI * Math.max(0, Math.min(SMOOTH_DISTANCE, exceedingAmount)) / SMOOTH_DISTANCE
          ) / 2 + 0.5
          return HEIGHT / 2 + v.value * scale
        })
      }
      draw () {
        this.path.attr('d', this.generatePath())
      }
      generatePath () {
        const points = []
        for (let i = 0; i < WIDTH; ++i) {
          points.push({
            value: Math.sin((i + this.offset) * this.piScaled) * this.amplitude,
            index: i
          })
        }
        return this.line(points)
      }
    }
    // generate waves
    const waves = []
    for (let i = 0; i < WAVES; ++i) {
      var w = new Wave(
        2.5 * HEIGHT + Math.random() * HEIGHT * 8, // wavelength
        HEIGHT / 2 - Math.random() * HEIGHT / 4, // amplitude
        25 / WAVES * i + Math.random() * 5, // offset
        0.25 + Math.random() * 0.75 // opacity
      )
      w.draw()
      waves.push(w)
      console.log('afterpaint')
    }
    // draw & animate
    let progress = 0
    let direction = 1
    function draw (dT) {
      if (progress > 1 && direction > 0) {
        direction = -5
      } else if (progress < 0 && direction < 0) {
        direction = 1
      }
      progress += 0.003 * direction
      for (let i = 0; i < waves.length; ++i) {
        waves[i].offset += ((i + 1) % 2 * 2 - 1) * (Math.random() * 0.2 + 0.9)
        waves[i].draw()
      }
      requestAnimationFrame(draw)
    }
    draw()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  
  path {
    stroke-width: 2px;
  }
</style>