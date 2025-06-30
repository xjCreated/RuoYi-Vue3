import { defineStore } from "pinia";

//FIXME:注意事项，userStore是模块名，不要跟其他模块名重复，会影响pinia的模块化功能
const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [
      { id: 1, name: "Alice", age: 25, isActive: true },
      { id: 2, name: "Bob", age: 30, isActive: false },
      { id: 3, name: "Charlie", age: 35, isActive: true },
    ],
    loading: false,
  }),
  //getters - 计算派生状态，类似于计算属性
  getters: {
    activeUsers: (state) => state.users.filter((user) => user.isActive),
    userCount: (state) => state.users.length,
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
  //actions - 包含业务逻辑的方法
  actions: {
    async fetchUsers() {
      this.loading = true;
      // 模拟异步请求
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        //模拟数据
        const mockUsers = [
          { id: 4, name: "David", age: 28, isActive: true },
          { id: 5, name: "Eve", age: 32, isActive: false },
        ];
        this.users = [...this.users, ...mockUsers];
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    addUser(user) {
      if (!user.name || !user.age) {
        throw new Error("用户名和年龄不能为空");
      }

      // 添加新用户，生成新的id
      const newId = Math.max(...this.users.map((u) => u.id), 0) + 1;

      this.users.push({
        id: newId,
        name: user.name,
        age: user.age,
        isActive: user.isActive || true,
      });
    },
    //切换行状态
    toggleRowStatus(userId) {
      const user = this.users.find((user) => user.id === userId);
      if (user) {
        user.isActive = !user.isActive;
      }
    },
  },
});
export default useUserStore;
