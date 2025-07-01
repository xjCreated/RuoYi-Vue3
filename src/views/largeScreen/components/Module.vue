<template>
  <div class="module-container">
    <div class="module-title">{{ title }}</div>
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
import { handleNumber, handleImg } from "../util";
//接收props
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  isShowPicture: {
    type: Boolean,
    default: false,
  },
  gridRight: {
    type: Number,
    default: 10,
  },
});
const { title, data, isShowPicture, gridRight } = toRefs(props);
const srcValue = 1; //TODO:图片数据，待接口传入
const chartOptions = ref({
  title: {
    show: false,
    text: title.value,
    left: "center",
    textStyle: {
      color: "#fff",
    },
  },
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "2%",
    right: `${gridRight.value}%`,
    bottom: "3%",
    containLabel: true,
  },
  // legend: {},

  xAxis: {
    type: "category",
    axisLine: {
      show: true,
      lineStyle: { color: "#6C9ED5" }, // 线的颜色
    },

    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: true,
      lineStyle: { color: "#6C9ED5" }, // 线的颜色
    },
    axisLabel: {
      formatter: "{value} °C",
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.2)", // 浅色网格线
      },
    },
  },
  series: [
    {
      name: "Highest",
      type: "line",
      smooth: true,
      data: [10, 11, 13, 11, 12, 12, 9],
      symbol: isShowPicture.value ? "image://" + handleImg(srcValue) : "",
      symbolSize: isShowPicture.value ? 20 : 6,
      markPoint: {
        data: [
          {
            type: "max",
            name: "Max",
            symbolSize: 36, // 设置图标大小
          },
          {
            type: "min",
            name: "Min",
            symbolSize: 36, // 设置图标大小
          },
        ],
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "Avg",
            label: {
              formatter: function (params) {
                return handleNumber(params.value);
              },
            },
          },
        ],
      },
      lineStyle: {
        color: "#64f0ff",
      },
      itemStyle: {
        color: "#64f0ff",
      },
    },

    {
      name: "Lowest",
      type: "line",
      smooth: true,
      data: [1, -2, 2, 5, 3, 2, 0],

      markPoint: {
        data: [
          {
            name: "周最低",
            value: -2,
            xAxis: 1,
            yAxis: -1.5,
            symbolSize: 36, // 设置图标大小
          },
        ],
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "Avg",
            label: {
              formatter: function (params) {
                return handleNumber(params.value);
              },
            },
          },
          // [
          //   {
          //     symbol: "none",
          //     x: "90%",
          //     yAxis: "max",
          //   },
          //   {
          //     symbol: "circle",
          //     label: {
          //       position: "start",
          //       formatter: "Max",
          //     },
          //     type: "max",
          //     name: "最高点",
          //   },
          // ],
        ],
      },
      lineStyle: {
        color: "#B6A2DE",
      },
      itemStyle: {
        color: "#B6A2DE",
      },
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
  width: 100%;
  height: 100%;
  background: rgba(16, 31, 63, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(100, 240, 255, 0.7);
}
</style>
