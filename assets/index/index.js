/* 引入vue和主页 */
import Vue from 'vue'
import App from './app.vue'
//require('./style.scss')

/* 实例化一个vue */

import { Button, Select } from 'element-ui'
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
	
new Vue({
  el: '#app',
  render: h => h(App)
})