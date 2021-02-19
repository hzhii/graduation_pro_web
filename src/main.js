// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import store from "./store";
import Blob from "./excel/Blob.js";
import Export2Excel from "./excel/Export2Excel.js";
import { getMenu, getAuth } from "@/api/manage";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
import "./assets/css/global.css";

Vue.config.productionTip = false;
// 路由守航
router.beforeEach((to, from, next) => {
  if (store.state.username) {
    initMenu(router, store);
  }
  if (store.state.username && to.path.startsWith("/login")) {
    next({
      name: "Welcome"
    });
  }
  // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
  if (to.meta.requireAuth) {
    if (store.state.username) {
      getAuth().then(resp => {
        if (resp) {
          next();
        }
      });
    } else {
      next({
        path: "login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

const initMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.userMenus.length > 0) {
    return;
  }
  getMenu().then(resp => {
    let fmtRoute2 = {
      path: "*",
      component: () => import("@/components/ErrorPage/404Page"),
      name: "404",
      nameZh: "错误页",
      hidden: false
    };
    if (resp && resp.code === 200) {
      var fmtRoutes = formatRoutes(resp.result);
      fmtRoutes.push(fmtRoute2);
      router.addRoutes(fmtRoutes);
      store.commit("initMenu", fmtRoutes);
      console.log("mainjs", store.state.userMenus);
    }
  });
};

// 后端传过来的导航菜单信息转换成被路由识别的形式,参数 routes 代表我们从后端获取的菜单列表
const formatRoutes = routes => {
  let fmtRoutes = [];
  routes.forEach(route => {
    if (route.children) {
      // 遍历这个列表，首先判断一条菜单项是否含子项，如果含则进行递归处理。添加到子项中
      route.children = formatRoutes(route.children);
    }
    let fmtRoute = {
      path: route.path, // admin
      component: resolve => {
        require(["./components/" + route.component + ".vue"], resolve);
      }, // 组件名
      name: route.name, // User  路由名
      nameZh: route.nameZh, // 菜单中文名
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children, // 子节点
      hidden: true
    };
    console.log("maincomponent", fmtRoute.path);
    fmtRoutes.push(fmtRoute);
  });
  return fmtRoutes;
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
  components: { App },
  template: "<App/>"
});
