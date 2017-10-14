import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import commomscss from './sass/common.scss'
import { Button, Select } from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Router)

export default{
	Vue,
	Axios,
	Router
}