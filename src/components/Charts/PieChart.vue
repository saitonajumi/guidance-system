<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    centerLabel: {
      type: String
    },
    centerValue: {
      type: String
    },
    values: {
      type: Array
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '370px'
    }
  },
  data() {
    return {
      pieChart: null,
      data: []
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.pieChart) {
      return
    }
    this.pieChart.dispose()
    this.pieChart = null
  },
  methods: {
    initChart() {
      this.pieChart = echarts.init(document.getElementById(this.id))
      this.pieChart.setOption({
        title: [
          {
            text: this.centerValue,
            left: '49.5%',
            top: '50%',
            textAlign: 'center',
            textStyle: {
              fontSize: 26
            }
          },
          {
            subtext: this.centerLabel,
            left: '49.5%',
            top: '38%',
            textAlign: 'center',
            textStyle: {
              fontSize: 22
            }
          }],
        series: [
          {
            type: 'pie',
            radius: ['30%', '80%'],
            center: ['50%', '50%'],
            data: this.values,
            animation: false,
            label: {
              position: 'outer',
              alignTo: 'edge',
              margin: '15%',
              formatter: '{b} \n {c} ({d}%)',
              textStyle: {
                fontSize: 18
              }
            },
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
