<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
// 新增：导入接口方法（根据项目实际api路径调整）
import { getNewArticleCount } from '@/api/dataView';

// 移除模拟数据，改为响应式数据存储接口返回值
const apiData = ref([]);
const chartRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  try {
    // 调用接口获取数据
    const res = await getNewArticleCount();
    apiData.value = res.data.data;

    // 初始化图表
    chartInstance = echarts.init(chartRef.value);

    // 处理数据
    const dates = apiData.value.map(item => item.date);
    const counts = apiData.value.map(item => item.count);

    // 配置项（与之前保持一致）
    const option = {
      title: {
        text: '周用户文章统计',
        left: 'center',
        textStyle: {
          color: 'white',
          fontSize: 14,
          fontWeight: 'normal',
        }
      },
      xAxis: {
        type: 'category',
        color: 'white',
        data: dates,
        axisLabel: { rotate: 45, color: 'white' },
        axisTick: { show: false }
      },
      yAxis: {
        color: 'white',
        type: 'value',
        axisLine: { show: true, lineStyle: { color: 'white' } },
        axisLabel: { show: true, color: 'white' },
        splitLine: { show: true, lineStyle: { type: 'solid', color: '#eee' } }
      },
      series: [{
        type: 'line',
        data: counts,
        label: { show: true },
        animation: true,
        animationDuration: 5000 // 动画持续时间（毫秒）
      }]
    };

    chartInstance.setOption(option);
  } catch (error) {
    console.error('获取周用户数据失败:', error);
  }
});

onUnmounted(() => {
  if (chartInstance) chartInstance.dispose();
});

</script>

<template>
  <div ref="chartRef" style="width: 50%; height: 400px; margin: 50px 0;"></div>
</template>

<style></style>