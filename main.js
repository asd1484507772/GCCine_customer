
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 引入框架
import uView from '@/uni_modules/uview-ui'
import ajax from '@/utils/ajax'

Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false
/// 如果你在项目中有用到 nvue 页面，是无法通过 this.$ajax 调用
// 需要将请求方法添加到 uni 对象上，然后通过 uni.$ajax 调用
uni.$ajax = ajax

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif