<template>
  <div class="homeWrapper">
    <div @click="handleClick()">click</div>
  </div>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <p>Computed with Setter: {{ computedWithSetter }}</p>
    <button @click="increment">Increment</button>
    <button @click="computedWithSetter = 10">Set to 10</button>
  </div>
</template>

<script setup name="Home">
const router = useRouter();
const count = ref(0);

watch(
  //监听count变化
  () => count.value,
  (newVal, oldVal) => {
    console.log(`count changed from ${oldVal} to ${newVal}`);
  }
);
//TODO:需要做什么
//FIXME:注意事项，文字描述
// const count = ref(0);
//FIXED: 修复了count的初始值为0的问题
/**
 * let 、const 和 var 的区别
 * let 和 const 是 ES6 中新增的变量声明方式，而 var 是 ES5 中引入的。
 * let 和 const 声明的变量具有块级作用域，而 var 声明的变量具有函数作用域。
 * let 和 const 声明的变量不能重复声明，而 var 可以重复声明。
 * let 和 const 声明的变量在声明之前不能使用，而 var 声明的变量在声明之前可以使用，但值为 undefined。
 * let 和 const 声明的变量在声明之后必须初始化，而 var 声明的变量在声明之后可以不初始化。
 *
 ** let 和 const 声明的变量存在一个暂时性死区，虽然创建了变量，但是并没有初始化，不能在声明之前使用。
 *
 * let 和 const 声明的变量在块级作用域内有效，而 var 声明的变量在函数作用域内有效。
 * let 和 const 声明的变量在全局作用域内有效，而 var 声明的变量在全局作用域内也有效。
 * let 和 const 声明的变量在循环中有效，而 var 声明的变量在循环中无效。
 * let 和 const 声明的变量在函数中有效，而 var 声明的变量在函数中无效。
 * let 和 const 声明的变量在模块中有效，而 var 声明的变量在模块中无效。
 * let 和 const 声明的变量在异步函数中有效，而 var 声明的变量在异步函数中无效。
 * let 和 const 声明的变量在箭头函数中有效，而 var 声明的变量在箭头函数中无效。
 * let 和 const 声明的变量在类中有效，而 var 声明的变量在类中无效。
 * let 和 const 声明的变量在对象中有效，而 var 声明的变量在对象中无效。
 * let 和 const 声明的变量在数组中有效，而 var 声明的变量在数组中无效。
 * let 和 const 声明的变量在模板字符串中有效，而 var 声明的变量在模板字符串中无效。
 * let 和 const 声明的变量在正则表达式中有效，而 var 声明的变量在正则表达式中无效。
 * let 和 const 声明的变量在 JSON 对象中有效，而 var 声明的变量在 JSON 对象中无效。
 * let 和 const 声明的变量在 Promise 对象中有效，而 var 声明的变量在 Promise 对象中无效。
 * let 和 const 声明的变量在 async 函数中有效，而 var 声明的变量在 async 函数中无效。
 * let 和 const 声明的变量在 Generator 函数中有效，而 var 声明的变量在 Generator 函数中无效。
 * let 和 const 声明的变量在 Proxy 对象中有效，而 var 声明的变量在 Proxy 对象中无效。
 * let 和 const 声明的变量在 Reflect 对象中有效，而 var 声明的变量在 Reflect 对象中无效。
 * let 和 const 声明的变量在 WeakMap 对象中有效，而 var 声明的变量在 WeakMap 对象中无效。
 */

//写一个计算属性
// 计算属性示例
const doubleCount = computed(() => count.value * 2);

// 带 getter 和 setter 的计算属性
const computedWithSetter = computed({
  get: () => {
    console.log("get", count.value);
    return count.value + 1;
  },
  set: (val) => {
    console.log(val, "setOld");
    count.value = val - 1;
    console.log(count.value, "setNew");
  },
});

function increment() {
  count.value++;
}
//写一个方法
const handleClick = () => {
  console.log("click");
};

//使用方法
handleClick();
</script>

<style lang="scss" scoped>
.homeWrapper {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
