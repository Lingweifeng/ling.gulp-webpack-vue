import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import commomscss from './sass/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(Router)

export default{
	Vue,
	Axios,
	Router
}