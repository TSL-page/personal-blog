<script setup>
import { ViewCountSort10 } from "@/api/dataView"
import { onMounted, ref, onUnmounted } from "vue"
import * as echarts from 'echarts'  // 新增：导入ECharts

const chartRef = ref(null)  // 新增：图表容器引用
let chartInstance = null    // 新增：图表实例
const getViewCountSort10 = async () => {
  const res = await ViewCountSort10()
  if (res.data.code === "200") {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption({
      title: {
        text: '热门文章浏览量',
        left: 'center',
        textStyle: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'normal',
        }
      },
      xAxis: { 
        type: 'category', 
        data: res.data.data.map(item => item.title),
        axisLabel: {
          rotate: 45,
          interval: 0,
          formatter: value => value.length > 8 ? value.slice(0, 8) + '...' : value,
          color: 'white'
        },
      },
      yAxis: { 
        type: 'value',
        axisLine: { show: true },
        axisLabel: { show: true, color: 'white' },
        splitLine: { show: false }
      },
      series: [{
        type: 'bar',
        data: res.data.data.map(item => item.viewCount),
        color: [
          '#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', 
          '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC', '#FF6B6B', 
        ],
        label: {
          show: true,
          position: 'top',
          formatter: '{@value}'
        },
        animation: true,
        animationDuration: 5000,
        animationEasing: 'bounceOut',
        animationDelay: (idx) => idx * 500,
        animationUpdate: true,
        animationDurationUpdate: 800,
        animationEasingUpdate: 'linear'
      }]
    })
  }
}

onMounted(() => {
  getViewCountSort10()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
  }
})
</script>

<template>
  <div class="stable">
    <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<style lang="scss" scoped>
</style>