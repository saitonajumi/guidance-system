<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    values: {
      type: Array
    },
    labels: {
      type: Array
    },
    colors: {
      type: String
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
      default: '400px'
    }
  },
  data() {
    return {
      barChart: null,
      component: ''
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.barChart) {
      return
    }
    this.barChart.dispose()
    this.barChart = null
  },
  methods: {
    initChart() {
      this.barChart = echarts.init(document.getElementById(this.id))
      this.barChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          data: this.labels,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            data: this.values,
            itemStyle: {
              color: this.colors
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
