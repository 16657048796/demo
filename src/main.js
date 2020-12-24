import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueCompositionApi from '@vue/composition-api';
//挂载路由守卫
import "@/router/guard.js"
 Vue.use(VueCompositionApi);
 //全局图标组件
import "./icons/"

Vue.use(ElementUI);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
