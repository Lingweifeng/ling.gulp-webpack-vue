/* 引入vue和主页 */
import Vue from 'vue'
import App from './app.vue'
//require('./style.scss')

import { Button, Select } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
 
/* 实例化一个vue */
new Vue({
  el: '#app',
  render: h => h(App)
})