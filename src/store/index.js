import Vue from "vue";
import Vuex from "vuex";
import { getInfo } from "@/api/manage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username:
      window.localStorage.getItem("username") == null
        ? ""
        : JSON.parse(window.localStorage.getItem("username" || "[]")),
    id:
      window.localStorage.getItem("id") == null
        ? ""
        : JSON.parse(window.localStorage.getItem("id" || "[]")),
    token:
      window.localStorage.getItem("token") == null
        ? ""
        : JSON.parse(window.localStorage.getItem("token" || "[]")),
    user:
      window.localStorage.getItem("user") == null
        ? ""
        : JSON.parse(window.localStorage.getItem("user" || "[]")),
    userMenus: [],
    permissions: []
  },
  mutations: {
    initMenu(state, menus) {
      state.userMenus = menus;
    },
    login(state, data) {
      state.username = data;
      window.localStorage.setItem("username", JSON.stringify(data));
    },
    intiUserPermissions(state, perms) {
      state.permissions = perms;
    },
    logout(state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.username = "";
      state.id = "";
      state.token = "";
      state.user = "";
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      state.userMenus = [];
      state.permissions = [];
    },
    setId(state, data) {
      state.id = data;
      window.localStorage.setItem("id", JSON.stringify(data));
    },
    setToken(state, data) {
      state.token = data;
      window.localStorage.setItem("token", JSON.stringify(data));
    },
    setUser(state, data) {
      state.user = data;
      window.localStorage.setItem("user", JSON.stringify(data));
    }
  },
  actions: {
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            commit("setUser", res.result);
            resolve(res);
            console.log("GetInfo成功");
          })
          .catch(error => {
            console.log("GetInfo失败");
            reject(error);
          });
      });
    }
  }
});
