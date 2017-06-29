<!-- 简单写个title和一个循环 -->
<template>
    <div id="example">
        <h1>{{ msg }}</h1>
        <ul>
            <li v-for="n in 5">{{ n }}</li>
        </ul>
    </div>
    
</template>

<script>
import CompA from '../components/a/a.vue'
import CompB from '../components/b/b.vue'
import logo from './static/logo.png'
export default {
    data () {
        return {
            msg: '我是模块index!',
            imgUrl: logo
        }
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