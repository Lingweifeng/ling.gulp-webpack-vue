import Common from '../components/common/'
import App from './app.vue'
import Hello from './HelloWorld.vue'
//require('./style.scss')

/* 实例化一个vue */
console.log( Common );

/*const routes = [
	//{ path: '/', redirect: '/index/' },
	{ path: '/hello', name: 'hello', component: Hello }
]*/
const routes = [
	{ path: '/', component: App },
	{ path: '/index/hello', name: 'hello', component: Hello }
]

const router = new Common.Router({
	//mode: 'history',
	routes
})

const app = new Common.Vue({
  router
}).$mount('#app')