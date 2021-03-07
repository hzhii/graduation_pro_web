import Vue from "vue";
import store from "../store";
/**
 * @export 自定义指令
 */
export function directive() {
  Vue.directive("has", {
    bind(el, binding) {
      // 一行三目运算符就可
      let flag = store.state.permissions.includes(binding.value);
      if (flag) {
        el.style.display = "inline-block";
      } else {
        el.style.display = "none";
      }
    }
  });
}
