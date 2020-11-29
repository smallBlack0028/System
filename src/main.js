//  导入element-ui插件
import ElementUI from 'element-ui'
// 导入element-ui的css文件
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//  导入全局样式表
import './assets/css/global.css'

// 导入markdown-css
// import 'github-markdown-css/github-markdown.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 导入axios包
import axios from 'axios'
 axios.defaults.withCredentials=true
// 配置请求的根路径
// axios.defaults.baseURL = ' http://47.111.8.12:8000/api/'
axios.defaults.baseURL ='http://123.56.157.173:8000/api/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization  = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios


axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mavonEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
