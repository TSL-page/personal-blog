<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { getArticleCategoryCount } from '@/api/dataView'
import * as echarts from 'echarts'

let chart = null

onMounted(async () => {
  const res = await getArticleCategoryCount()
  if (res.data.code === "200") {
    chart = echarts.init(document.getElementById('pieChart'))
    const option = {
      title: {
        text: '文章分类统计',
        left: 'center',
        textStyle: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'normal',
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        
        
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: '80px',
        data: res.data.data.map(item => item.categoryName),
        textStyle: {
          color: 'white'
        },
        itemGap: 15,
      },
      series: [
        {
          name: '文章数量',
          type: 'pie',
          radius: '70%',
          center: ['55%', '60%'],
          data: res.data.data.map(item => ({
            name: item.categoryName,
            value: item.articleCount
            }
            )), 
          animation: true,
          animationDuration: 5000,
          animationEasing: 'cubicOut',
          animationDelay: (idx) => idx * 500,
          animationUpdate: true,
          animationDurationUpdate: 5000,
          animationEasingUpdate: 'linear' ,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    chart.setOption(option)

    // 窗口 resize 时调整图表大小
    window.addEventListener('resize', () => {
      chart.resize()
    })
  }
})

// 组件卸载时销毁图表实例
onUnmounted(() => {
  if (chart) {
    window.removeEventListener('resize', () => chart.resize())
    chart.dispose()
  }
})
</script>

<template>
  <div id="pieChart" style="width: 100%; height: 400px; " ></div>
</template>