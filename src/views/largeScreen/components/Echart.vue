<template>
  <div ref="chartContainer" class="echarts-container"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});
console.log(props.options);

const chartContainer = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return;

  // 如果已有实例则先销毁
  if (chartInstance) {
    chartInstance.dispose();
  }

  chartInstance = echarts.init(chartContainer.value);
  chartInstance.setOption(props.options);
  window.addEventListener("resize", resizeChart);
};

// 调整图表大小
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

// 监听容器变化
const resizeObserver = new ResizeObserver(resizeChart);

onMounted(() => {
  initChart();
  if (chartContainer.value) {
    resizeObserver.observe(chartContainer.value);
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    window.removeEventListener("resize", resizeChart);
    resizeObserver.disconnect();
    chartInstance.dispose();
  }
});

// 监听options变化
watch(
  () => props.options,
  (newOptions) => {
    if (chartInstance) {
      chartInstance.setOption(newOptions);
    }
  },
  { deep: true }
);
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 100%;
}
</style>
