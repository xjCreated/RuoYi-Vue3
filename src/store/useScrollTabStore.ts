 
import { defineStore } from 'pinia'
import { onMounted, reactive, toRefs } from 'vue'
 
export const useScrollTabStore = defineStore('Scroll', () => {
  interface iList {
    id: string,
    text: string
  }
 
  interface iState {
    List: iList[],
    tabParent: HTMLDivElement | null,
    contentSlide: HTMLDivElement | null,
    current: number,
    viewHeight: number,
    tabItemHeight: number,
    median: number,
    scrollTop: number,
    flag: boolean
  }
  const state = reactive<iState>({
    List: [
      {
        id: '1',
        text: '内容一'
      },
      {
        id: '2',
        text: '内容二'
      },
      {
        id: '3',
        text: '内容三'
      },
      {
        id: '4',
        text: '内容四'
      },
      {
        id: '5',
        text: '内容五'
      },
      {
        id: '6',
        text: '内容六'
      },
      {
        id: '7',
        text: '内容七'
      },
      {
        id: '8',
        text: '内容八'
      },
      {
        id: '9',
        text: '内容九'
      },
      {
        id: '10',
        text: '内容十'
      },
      {
        id: '11',
        text: '内容十一'
      },
      {
        id: '12',
        text: '内容十二'
      }
    ],
    tabParent: null,
    contentSlide: null,
    current: 0,
    viewHeight: 0,
    tabItemHeight: 0,
    median: 0,
    scrollTop: 0,
    flag: false
  })
 
 
  const onSwitch = (index: number) => {
    // 设置开关是为了解决点击选择时每次过渡要经过途经的格子
    state.flag = true;
 
    // 点击将下标值赋值给current，实现切换颜色
    state.current = index
 
    // 下标大于如果大于求出的中位数,让左侧每个item向上几个
    if (index > state.median) {
      state.tabParent?.scrollTo({
        top: state.tabItemHeight * (index - 3),
        behavior: 'smooth'
      })
    } else {
      state.tabParent?.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
 
    // 右侧的滚动
    // console.log(state.contentSlide,99999);
    // 下标乘以视口高度
    state.contentSlide?.scrollTo({
      top: index * state.viewHeight,
      behavior: 'smooth'
    })
    console.log(index * state.viewHeight, 888);
 
 
  }
  // 绑定滚动事件，如果开关为true，直接return不执行下面操作
  const onScroll = () => {
 
    if (state.flag) return;
    // 获取右侧滚动卷上去的高
    state.scrollTop = state.contentSlide!.scrollTop
    console.log(state.scrollTop, 99999);
 
    // 如果卷上去的高大于视口高乘下标
    state.List.forEach((_, index: number) => {
      if (state.scrollTop > index * state.viewHeight) {
        state.current = index
      }
    })
 
    // 实现左右侧联动，右侧滚动时，让左侧也跟着滚
    if (state.current > state.median) {
      state.tabParent?.scrollTo({
        top: state.tabItemHeight * (state.current - 3),
        behavior: 'smooth'
      })
    } else {
      state.tabParent?.scrollTo({
        top: 0,
        // behavior: 'smooth'
      })
    }
 
 
  }
  const onStart = () => {
    state.flag = false
  }
  onMounted(() => {
    // 屏幕可视区高
    state.viewHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(state.viewHeight);
 
    // 当前每个按钮高
    state.tabItemHeight = (state.tabParent?.children[0].children[0] as HTMLDivElement).offsetHeight
    // console.log(state.tabItemHeight);
 
    state.median = Math.floor(Math.floor(state.viewHeight / state.tabItemHeight) / 2)
 
    // 监听右侧页面的滚动
    state.contentSlide!.onscroll = onScroll
 
    state.contentSlide!.ontouchstart = onStart
 
 
  })
 
  return {
    ...toRefs(state),
    onSwitch
  }
})