<template>
  <div class="app-mai">
    <!-- https://blog.csdn.net/weixin_74773902/article/details/131706017  Vue3左右联动 -->
    <div class="top-banben-banner">
      <div class="banner-info-w">
        <div class="banner-info">版本记录</div>
      </div>
    </div>
    <div class="content-w">
      <el-button link @click="goBack()" icon="el-icon-arrow-left">
        返 回</el-button
      >
      <div class="sys_emp_detail">
        <div class="container_wrap">
          <div class="left-w">
            <div class="step_box" v-for="(item, idx) in stepsList" :key="idx">
              <div
                class="text"
                @click="handleClick(idx)"
                :class="idx == index ? 'current-text' : ''"
              >
                {{ item }}
              </div>
              <template v-if="idx <= stepsList.length - 1">
                <div
                  class="circle"
                  :class="idx == index ? 'current-back' : ''"
                ></div>
              </template>
            </div>
          </div>
          <div class="right-w" ref="itemList">
            <div
              class="head_title"
              :style="
                index > 0
                  ? 'box-shadow: 0px 3px 2px 0px rgba(84, 151, 215,.2);'
                  : ''
              "
            ></div>
            <div class="content_big_right" @scroll="handleScroll" ref="rigth">
              <!-- 基本信息 -->
              <div class="content_box">
                <div class="item-wrap">
                  <ul class="wrap" id="myElement">
                    <li
                      class="item1"
                      v-for="(child, indey) in data"
                      :key="indey"
                    >
                      <div class="item-name">{{ child.noticeTitle }}</div>
                      <div class="item-info">{{ child.noticeContent }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup name="Edition">
import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import { reactive, computed, createApp, ref } from "vue";
const router = useRouter();
const app = createApp({}); // 创建一个空的Vue实例
app.directive("scroll", {
  mounted(el) {
    el.addEventListener("scroll", this.value);
  },
  unmounted(el) {
    el.removeEventListener("scroll", this.value);
  },
});
function goBack() {
  // window.history.go(-1);
  router.push({ path: "/" });
}
function handleScroll(event) {
  console.log("触发了滚动事件");
  // 在此处添加你想要执行的代码
  scrollY = event.target.scrollTop;
}
// app.mount("#myElement");
function handleClick(idx) {
  console.log("idx:", idx);
  index.value = idx;
  //点击事件标识非滚动事件
  scorllEvent = false;
  initRightBoxHeight();
  let rigth = ref();
  rigth.scrollTop = rightLiTops[idx];
  console.log(rightLiTops[idx], "aaa");
}
let rightLiTops = ref([]);
/*计算每个小盒子高度*/
function initRightBoxHeight() {
  console.log(scorllEvent);
  let itemArray = [];
  let top = 0;
  itemArray.push(top);
  //获取右边所有子盒子高度集合
  let allList = document.getElementsByClassName("item1");
  //allList伪数组转化成真数组
  Array.prototype.slice.call(allList).forEach((li) => {
    //获取每个li的高度
    // console.log(li.clientHeight, 12333);
    top += li.clientHeight; //获取所有li的每一个高度
    itemArray.push(top);
  });
  rightLiTops = itemArray;
  rightLiTops.forEach((item, index) => {
    if (item < scrollY) {
      //当为鼠标滚动时重新赋值
      if (scorllEvent) {
        index = index;
      }
    }
  });
  console.log(index);
}
const { proxy } = getCurrentInstance();
let stepsList = ref([]);
let scrollY = ref(0); //左侧列表滑动的y轴坐标
const rightBscroll = ref(-1);
let index = ref(0);
let data = ref({});
let scorllEvent = ref(false);
const clickCount = ref(0);
const response = ref({
  data: [
    {
      id: 4,
      noticeTitle: "办公桌面1",
      noticeContent: "aaa",
    },
    {
      id: 7,
      noticeTitle: "办公桌面2",
      noticeContent: "fff",
    },
    {
      id: 10,
      noticeTitle: "办公桌面3",
      noticeContent: "test3fff",
    },
    {
      id: 11,
      noticeTitle: "办公桌面4",
      noticeContent: "test4",
    },
    {
      id: 41,
      noticeTitle: "办公桌面11",
      noticeContent: "aaa",
    },
    {
      id: 71,
      noticeTitle: "办公桌面21",
      noticeContent: "fff",
    },
    {
      id: 101,
      noticeTitle: "办公桌面31",
      noticeContent: "test3fff",
    },
    {
      id: 111,
      noticeTitle: "办公桌面41",
      noticeContent: "test4",
    },
  ],
});
watch(
  () => scrollY.value,
  (newVal, oldVal) => {
    initRightBoxHeight();
  }
);
function getList() {
  data = response.value.data;
  stepsList = response.value.data.map((item) => item.noticeTitle);
}
getList();
</script>

<style lang="scss" scoped>
.app-mai {
  width: 100%;
  min-height: calc(100% - 156px);
  overflow: auto;
  .top-banben-banner {
    height: 300px;
    width: 100%;
    background-color: #d3cece;
    position: relative;
    top: 0px;
    left: 0px;
    .banner-info-w {
      padding: 100px 146px;
      .banner-info {
        font-size: 30px;
        margin-bottom: 20px;
      }
    }
  }
  .content-w {
    margin: 40px 200px;
    background-color: #fff;
    border-radius: 10px;
    padding: 50px 50px;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f3f3f3;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #aaa;
    border-radius: 2px;
  }
}
.sys_emp_detail {
  margin-top: 20px;
  // height: 100vh;
  overflow: auto;
  .container_wrap {
    display: flex;
    .left-w {
      min-width: 200px;
      .step_box {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 122px;
        height: 44px;
        .current-text {
          color: #5497d6 !important;
        }
        .current-back {
          background-color: #5497d6 !important;
        }
        .text {
          padding-right: 5px;
          font-size: 9px;
          width: 65px;
          color: #333333;
          text-align: right;
          cursor: pointer;
        }
        .circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(204, 204, 204, 1);
          position: relative;
        }
        .circle::after {
          content: "";
          height: 45px;
          width: 1px;
          display: inline-block;
          border-right: 1px solid #cccccc;
          position: relative;
          left: 4px;
          top: 8px;
        }
        .end::after {
          content: "";
          display: none;
        }
      }
    }
    .right-w {
      flex: 1;
      //width: 800px;
      color: #666;
      .head_title {
        position: relative;
      }
      .content_big_right {
        max-height: 689px;
        overflow-x: hidden;
        padding: 0 25px;
        border: 1px solid #eee;
        border-radius: 10px;
      }
      .content_box {
        // .label_box1 {
        //   width: 100%;
        //   line-height: 26px;
        //   .title {
        //     border-bottom: 1px solid #ccc;
        //     width: 100%;
        //   }
        .item-wrap {
          width: 100%;
          // line-height: 26px;
          .wrap {
            .item1 {
              list-style: none;
              margin-bottom: 30px;
              .item-name {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 6px;
              }
              .item-info {
                font-size: 12px;
              }
            }
          }
          // }
        }
      }
    }
  }
}
</style>
