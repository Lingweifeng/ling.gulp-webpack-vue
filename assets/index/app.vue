<!-- 简单写个title和一个循环 -->
<template>
    <div id="example">
        <img v-bind:src=img.logo>
        <img v-bind:src=img.banner>
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="n in 5">{{ n }}</li>
        </ul><!-- 
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="text">文字按钮</el-button> -->
    </div>
</template>

<script>
import CompA from '../components/a/a.vue'
//import CompB from '../components/b/b.vue'
import logo from './static/logo.png'
import banner from './static/banner.jpg'

export default {
    data () {
        return {
            msg: '我是模块index!',
            img: {
                logo: logo,
                banner: banner
            }
        }
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