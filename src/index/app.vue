<template>
    <div id="example">
        <img v-bind:src="img.logo">
        <h1>{{ msg }}</h1>
        <h3>路由示例：</h3>
        <!-- <router-link to="/index/hello">Go to hello world!</router-link> -->
        <h3>饿了吗控件示例（按需引入）</h3>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="text">文字按钮</el-button>
        <h3>跨域请求数据示例</h3>
        <p>{{ajaxData}}</p>
        <h3>css sprites引入示例</h3>
        <p class="icon-book"></p>
        <h3>大图引入示例</h3>
        <img v-bind:src="img.banner">
    </div>
</template>

<script>
import Common from '../components/common/'
import CompA from '../components/a/a.vue'
import CompB from '../components/b/b.vue'
import logo from './static/logo.png'
import banner from './static/banner.jpg'
import user from './user.vue'

export default {
    data () {
        return {
            msg: '我是模块index!',
            img: {
                logo: logo,
                banner: banner
            },
            ajaxData: ''
        }
    },
    created: function(){
        const self = this;
        // axios 请求数据示例
        Common.Axios.post('/open/app/appList', {
            nowPage: 1,
            access_token: ''
        }).then(function (response) {
            console.log(response.data.data);
            self.ajaxData = response.data.data.list[0];
        }).catch(function (error) {
            console.log(error);
        });
    },
    mounted: function(){
        console.log( '视图都渲染完毕!' );
    }
}
</script>

<style scoped lang="scss">
#example {
    background: #eee;
    height: 100vh;
    h1{
        font-size: 16px;
        color: #666;
    }
}
</style>  