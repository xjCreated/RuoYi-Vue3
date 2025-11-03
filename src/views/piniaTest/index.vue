<template>
  <div>
    <h2>用户列表</h2>
    <div v-if="loading">加载中。。。</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}({{ user.age }}岁)-{{
          user.isActive ? "活跃" : "不活跃"
        }}
        <button @click="toggleStatus(user.id)">切换状态</button>
      </li>
    </ul>
    <div>
      <h3>活跃用户({{ activeUsersCount }})</h3>
      <ul>
        <li v-for="user in _activeUsers" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
    <button @click="fetchMoreUsers">加载更多用户</button>

    <div>
      <h3>添加新用户</h3>
      <input type="text" v-model="newUser.name" placeholder="姓名" />
      <input type="text" v-model="newUser.age" placeholder="年龄" />
      <button @click="addNewUser">添加</button>
    </div>
  </div>
</template>
<script setup name="PiniaTest">
import { ref, computed } from "vue";
import useUserStore from "@/store/modules/useStore";

const userStore = useUserStore();
console.log(userStore, "userStore2");
const newUser = ref({ name: "", age: "" });
const _activeUsers = ref([]);
_activeUsers.value = userStore.activeUsers;

//从store中获取state
const loading = computed(() => userStore.loading);
const users = computed(() => userStore.users);

//使用getters
const activeUsersCount = computed(() => _activeUsers.value.length);

//使用actions
const fetchMoreUsers = () => userStore.fetchUsers();
const toggleStatus = (userId) => userStore.toggleRowStatus(userId);
const addNewUser = () => {
  if (newUser.value.name && newUser.value.age) {
    userStore.addUser(newUser.value);
    newUser.value = { name: "", age: "" };
  }
};
</script>
