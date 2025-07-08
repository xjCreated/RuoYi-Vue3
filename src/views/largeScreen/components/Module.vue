<template>
  <div class="module-container">
    <div class="module-title" v-if="title">{{ title }}</div>
    <div class="module-content">
      <div class="chart-placeholder">
        <div class="latest-data">
          <div
            v-for="item in latestData"
            :key="item.value"
            class="latest-data-item"
            :class="latestData.length > 2 ? 'wrap' : 'noWrap'"
          >
            <span class="span-key">
              {{ item.type }}
            </span>
            {{ item.value }}
            <span class="span-unit">{{ item.unit }}</span>
          </div>
        </div>
        <Echart :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup name="Module">
import Echart from "./Echart.vue";
import {
  handleNumber,
  handleImg,
  handleData,
  handleYAxis,
  formatTime,
} from "../util";
import { onMounted } from "vue";
//接收props
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  echartsData: {
    type: Object,
    default: () => [],
  },
  latestData: {
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
const { title, echartsData, isShowPicture, gridRight } = toRefs(props);
// 定义颜色数组,用于设置图表中不同数据系列的颜色
const colors = ["#e1c951", "#44cbb1", "#307ee2"];
let chartOptionsData = ref([]);
let chartOptions = ref({});
onBeforeMount(() => {
  chartOptionsData.value = handleData(echartsData.value, title.value);
  console.log(
    chartOptionsData.value.map((item) =>
      formatTime(item.samplingTime, "HH-mm")
    ),
    "xiejing"
  );
});
onMounted(() => {
  const srcValue = 1;

  chartOptions.value = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "4%",
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
      // boundaryGap: false, // 不留白,贴着Y轴
      data: chartOptionsData.value.map((item) => {
        return formatTime(item.samplingTime, "HH:mm");
      }),
    },
    yAxis:
      title.value === "综合气象站"
        ? handleYAxis(title.value, colors)
        : [
            {
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
          ],
    series: [
      {
        name: "Highest",
        type: "line",
        smooth: true,
        data: [10, 11, 13],
        symbol: isShowPicture.value ? "image://" + handleImg(srcValue) : "",
        symbolSize: isShowPicture.value ? 20 : 6,

        //动态设置角度，data的值做遍历，每一个增加20

        symbolRotate: isShowPicture.value
          ? function (params) {
              return ((params / 0.3) * 15) / 0.4;
            }
          : "",

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
        yAxisIndex: 0,
      },

      {
        name: "Lowest",
        type: "line",
        smooth: true,
        data: [5, 3, 2],

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
          ],
        },
        lineStyle: {
          color: "#B6A2DE",
        },
        itemStyle: {
          color: "#B6A2DE",
        },

        yAxisIndex: 1, //TODO:设置y轴索引
      },
      {
        name: "Lowest1",
        type: "line",
        smooth: true,
        data: [12, 5, 2],

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
          ],
        },
        lineStyle: {
          color: "#B6A2DE",
        },
        itemStyle: {
          color: "#B6A2DE",
        },

        yAxisIndex: 2, //TODO:设置y轴索引
      },
    ],
  };
});
</script>

<style scoped lang="scss">
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
  flex-direction: column;
  .latest-data {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 16px;
    .latest-data-item {
      &:nth-child(1),
      &:nth-child(2) {
        margin-bottom: 10px;
      }
      .span-key {
        display: inline-block;
        width: 100px;
      }
      .span-unit {
        font-size: 12px;
      }
    }
    .wrap {
      width: 45%;
    }
    .noWrap {
      width: 100%;
    }
  }
}
</style>
