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

import CompA from '../components/A/A.vue'
import CompB from '../components/B/B.vue'
export default {
    data () {
        return {
            msg: 'this is aother moudle1234'
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