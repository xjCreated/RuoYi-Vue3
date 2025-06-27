<template>
  <div class="module-container">
    <div class="module-title">实时数据监控</div>
    <div class="module-content">
      <!-- 这里可以放置图表或其他内容 -->
      <div class="chart-placeholder">
        <Echart :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup name="Module">
import Echart from "./Echart.vue";
const chartOptions = ref({
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.2)", // 浅色网格线
      },
    },
  },
  series: [
    {
      name: "访问量",
      type: "line",
      data: [150, 230, 224, 218, 135, 147, 260],
      smooth: true,

      areaStyle: {},
      showSymbol: false, // 不显示数据点
    },
  ],
});
</script>

<style scoped>
.module-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.module-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #64f0ff;
  border-bottom: 1px solid rgba(100, 240, 255, 0.3);
  padding-bottom: 5px;
  /* 依次添加传入的img小图标 */
}

.module-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-placeholder {
  width: 90%;
  height: 90%;
  background: rgba(16, 31, 63, 0.5);
  border: 1px dashed rgba(100, 240, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(100, 240, 255, 0.7);
}
</style>
