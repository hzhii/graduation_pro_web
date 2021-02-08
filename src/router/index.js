import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/components/Login")
    },
    {
      path: "/login",
      component: () => import("@/components/Login")
    },
    {
      path: "/index",
      name: "Index",
      meta: {
        requireAuth: true
      },
      component: () => import("@/components/system/Index"),
      redirect: "/system/welcome",
      children: [
        {
          path: "/system/welcome",
          name: "welcome",
          meta: {
            requireAuth: true
          },
          component: () => import("@/components/Welcome")
        },
        {
          path: "/system/info",
          meta: {
            requireAuth: true
          },
          component: () => import("@/components/MyInfo")
        }
      ]
    }
  ]
});

export default router;
