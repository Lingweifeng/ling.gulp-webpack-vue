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
import Common from '../components/common/'
import CompA from '../components/a/a.vue'
import CompB from '../components/b/b.vue'
export default {
    data () {
        return {
            msg: 'this is aother moudle'
        }
    },
  components: {
    CompA,
    CompB
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