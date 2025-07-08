<template>
  <div class="dashboard-container">
    <Header />

    <div class="dashboard-content">
      <div class="row">
        <div class="module module1">
          <Module
            :title="'综合气象站'"
            :latestData="weather"
            :echartsData="weatherData"
          />
        </div>
        <div class="module module2">
          <Module
            :title="'雷达水位'"
            :latestData="radar"
            :echartsData="radarData"
          />
        </div>
        <div class="module module1">
          <Module
            :title="'雨量监测'"
            :latestData="rain"
            :echartsData="rainData"
          />
        </div>
      </div>

      <div class="row mt30">
        <div class="module module3">
          <Module
            :title="'风向风速'"
            :isShowPicture="true"
            :latestData="wind"
            :echartsData="windData"
          />
        </div>
        <div class="module module4">
          <div class="module-title">{{ soilTitle }}</div>
          <div class="module-item-wrap">
            <Module
              class="module-item"
              :gridRight="'13'"
              :latestData="soilA"
              :echartsData="soilAData"
            />
            <Module
              class="module-item"
              :gridRight="'13'"
              :latestData="soilB"
              :echartsData="soilBData"
            />
            <Module
              class="module-item"
              :gridRight="'13'"
              :latestData="soilC"
              :echartsData="soilCData"
            />
          </div>
        </div>
      </div>
    </div>
    <svg-icon icon-class="bg" />
  </div>
</template>

<script setup name="LargeScreen">
import Header from "./components/Header.vue";
import Module from "./components/Module.vue";
// import backgroundSvg from "@\views\largeScreen\img\img2\background.svg";
const res = [
  {
    samplingTime: "2025-07-07 09:05:20 ",
    trwsd1: 23.5,
    trwsd2: 59.7,
    trwsd3: 26.2,
    trwsd4: 0,
    trwsd5: 25.1,
    trwsd6: 26.4,
    kqwd: 29.7,
    kqsd: 54.7,
    dqyl: 1011.5,
    kg: 337,
    sw: 243,
    yl: 0,
    fs: 1.3,
    fj: 1,
    fxjd: 280.9,
    fx: '"东东北"',
  },
  {
    samplingTime: "2025-07-07 11:01:30 ",
    trwsd1: 24.5,
    trwsd2: 59.7,
    trwsd3: 26.2,
    trwsd4: 0,
    trwsd5: 25.1,
    trwsd6: 26.4,
    kqwd: 29.7,
    kqsd: 54.7,
    dqyl: 1011.5,
    kg: 337,
    sw: 243,
    yl: 0,
    fs: 1.3,
    fj: 1,
    fxjd: 120.9,
    fx: '"东东北"',
  },
  {
    samplingTime: "2025-07-07 12:01:09 ",
    trwsd1: 28.5,
    trwsd2: 59.7,
    trwsd3: 26.2,
    trwsd4: 0,
    trwsd5: 25.1,
    trwsd6: 26.4,
    kqwd: 29.7,
    kqsd: 54.7,
    dqyl: 1011.5,
    kg: 337,
    sw: 243,
    yl: 0,
    fs: 1.3,
    fj: 1,
    fxjd: 170.9,
    fx: '"东东北"',
  },
];
const soilTitle = ref("土壤墒情");
const weather = ref([
  { type: "空气温度", value: "23", unit: "℃" },
  { type: "空气湿度", value: "50", unit: "%" },
  { type: "大气压力", value: "1013", unit: "hPa" },
]);
const radar = ref([
  {
    type: "空高",
    value: "0.0",
    unit: "m",
  },
]);

const rain = ref([
  {
    type: "雨量",
    value: "0.0",
    unit: "mm",
  },
]);
const wind = ref([
  {
    type: "风向",
    value: "东北",
    unit: "",
  },
  {
    type: "风速",
    value: "0.0",
    unit: "m/s",
  },
  {
    type: "风级",
    value: "0",
    unit: "级",
  },
  {
    type: "风向角度",
    value: "0",
    unit: "°",
  },
]);

const soilA = ref([
  { type: "点位1温度", value: "23", unit: "℃" },
  { type: "点位1湿度", value: "50", unit: "%RH" },
]);
const soilB = ref([
  { type: "点位2温度", value: "23", unit: "℃" },
  { type: "点位2湿度", value: "50", unit: "%RH" },
]);
const soilC = ref([
  { type: "点位3温度", value: "23", unit: "℃" },
  { type: "点位3湿度", value: "50", unit: "%RH" },
]);
</script>

<style scoped lang="scss">
.dashboard-container {
  width: calc(100vw - 200px);
  height: 100vh;
  overflow: auto;
  background-color: #0f1621;
  color: #fff;
  font-family: "Arial", sans-serif;
}

.dashboard-content {
  padding: 20px;
  gap: 20px;
}

.row {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.module {
  // background: rgba(16, 31, 63, 0.8);
  background-image: url("./img/moduleBG.png");
  background-size: 100% 100%; /* 或者使用 100% 100% 来覆盖整个元素 */
  // background-position: center; /* 确保图片居中 */
  // background-repeat: no-repeat; /* 防止图片重复 */

  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.3);
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
}

.module1,
.module2 {
  // flex: 1;
  width: 32%;
  height: 350px;
}

.module3 {
  width: 32%;
  height: 350px;
}

.module4 {
  width: 66%;
  height: 350px;
  .module-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #64f0ff;
    padding-bottom: 5px;
  }
  .module-item-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 40px);
    .module-item {
      width: 32%;
    }
  }
}

.mt30 {
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .row {
    flex-direction: column;
  }

  .module {
    width: 100% !important;
  }
}
</style>
