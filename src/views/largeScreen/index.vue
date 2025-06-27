<template>
  <div class="dashboard-container">
    <Header />

    <div class="dashboard-content">
      <div class="row">
        <div class="module module1">
          <Module />
        </div>
        <div class="module module2 mt30">
          <Module />
        </div>
      </div>

      <div class="row">
        <div class="module module3">
          <Module />
        </div>
      </div>

      <div class="row">
        <div class="module module4">
          <Module />
        </div>
        <div class="module module5 mt30">
          <Module />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="LargeScreen">
import Header from "./components/Header.vue";
import Module from "./components/Module.vue";
</script>

<style scoped lang="scss">
.dashboard-container {
  width: calc(100vw - 200px);
  height: 100vh;
  overflow: hidden;
  background-color: #0f1621;
  color: #fff;
  font-family: "Arial", sans-serif;
}

.dashboard-content {
  padding: 20px;
  display: flex;
  gap: 20px;
}

.row {
  height: 100%;
  width: 100%;
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
  flex: 1;
  height: 350px;
}

.module3 {
  width: 100%;
  height: 350px;
}

.module4,
.module5 {
  flex: 1;
  height: 350px;
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
