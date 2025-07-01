<template>
  <div class="dashboard-header">
    <div class="title">天门市张家湖湿地公园水文科普数据监测系统</div>
    <div class="time">{{ currentTime }}</div>
  </div>
</template>

<script setup name="Header">
import { ref, onMounted, onBeforeUnmount } from "vue";

const currentTime = ref("");

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

onMounted(() => {
  updateTime();
  const timer = setInterval(updateTime, 1000);
  onBeforeUnmount(() => clearInterval(timer));
});
</script>

<style scoped lang="scss">
.dashboard-header {
  height: 60px;
  background: linear-gradient(90deg, #0a1d3a, #11468a);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.title {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  background: linear-gradient(to right, #fff, #64f0ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.time {
  font-size: 18px;
  color: #64f0ff;
}
</style>
