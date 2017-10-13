import Common from '../components/common/'
import App from './app.vue'
//require('./style.scss')

/* 实例化一个vue */
console.log( Common );

/*const routes = [
  { path: '/', redirect: '/index/' },
  { path: '/index/hello', name: 'hello', component: hello }
]

const router = new common.Router({
	mode: 'history',
	routes: routes
})*/

new Common.Vue({
  el: '#app',
  //router,
  render: h => h(App)
})//.$mount('#example')