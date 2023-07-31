import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router';
//三级联动组件----注册为全局组件
import TypeNav from '@/components/TypeNav';
Vue.component(TypeNav.name,TypeNav);
import Pagination from '@/components/Pagination';
import {Button,MessageBox} from 'element-ui';
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(Pagination.name,Pagination);
//引入路由
import router from './router';
// Vue.use(VueRouter);
// 引入仓库
import store from './store';
// 引入MockServer.js ----mock数据
import '@/mock/mockServe';
// 引入轮播图css
import "swiper/css/swiper.css"
// 测试：
// import {reqCategoryList} from '@/api';
// reqCategoryList();

// 引入所有api接口函数
import * as API from '@/api';
// console.log(API)

// 引入懒加载插件
import VueLazyload from 'vue-lazyload';
import picGif from '@/assets/1.gif'

// 引入表单验证
import '@/plugins/validate';
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:picGif
});

Vue.config.productionTip = false

new Vue({

  el:'#app',
  render: h => h(App),

  // 注册路由
  router:router,
  // 注册Store仓库:组件实例的身上会多一个属性$store属性
  store:store,
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  }
})
