/* 引入vue和主页 */
import Common from '../components/common/'
import App from './app.vue'
//require('./style.scss')
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
 
/* 实例化一个vue */
new Common.Vue({
  el: '#app',
  render: h => h(App)
})