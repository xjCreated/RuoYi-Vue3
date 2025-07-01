<template>
  <div class="dashboard-container">
    <Header />

    <div class="dashboard-content">
      <div class="row">
        <div class="module module1">
          <Module :title="'综合气象站'" />
        </div>
        <div class="module module2">
          <Module :title="'雷达水位'" />
        </div>
        <div class="module module1">
          <Module :title="'雨量检测'" />
        </div>
      </div>

      <div class="row mt30">
        <div class="module module3">
          <Module :title="'风向风速'" :isShowPicture="true" />
        </div>
        <div class="module module4">
          <Module class="module-item" :gridRight="'13'" />
          <Module class="module-item" :gridRight="'13'" />
          <Module class="module-item" :gridRight="'13'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="LargeScreen">
import Header from "./components/Header.vue";
import Module from "./components/Module.vue";
const weather = ref({
  空气温度: "23℃",
  空气湿度: "50%",
  大气压力: "1013hPa",
});
const radar = ref({
  空高: "0.0m",
  水位: "0.0m",
});
const rain = ref({
  雨量: "0.0mm",
});
const wind = ref({
  风向: "东北",
  风速: "0.0m/s",
  风级: "0级",
  风向角度: "0°",
});
const soil = ref([
  {
    点位1温度: "23℃",
    点位1湿度: "50%RH",
  },
  {
    点位2温度: "23℃",
    点位2湿度: "50%RH",
  },
  {
    点位3温度: "23℃",
    点位3湿度: "50%RH",
  },
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
  background: rgba(16, 31, 63, 0.8);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .module-item {
    width: 32%;
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
