/* 引入vue和主页 */
import Vue from 'vue'
import App from './app.vue'
//require('./style.scss')

/* 实例化一个vue */
new Vue({
  el: '#app',
  render: h => h(App)
})