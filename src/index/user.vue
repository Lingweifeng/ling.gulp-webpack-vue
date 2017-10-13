<template>
    <div class="content">
        <ul class="search-panel">
            <div class="block">
                <span class="demonstration">周</span>
                <el-date-picker v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">月</span>
                <el-date-picker v-model="value4" type="month" placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">年</span>
                <el-date-picker v-model="value5" align="right" type="year" placeholder="选择年">
                </el-date-picker>
            </div>
            <!-- <el-form-item label="查询" style="width:25%;">
                        <el-select v-model="formInline.region" >
                            <el-option label="登录名" value="01"></el-option>
                            <el-option label="员工编号" value="02"></el-option>
                            <el-option label="真实姓名" value="01"></el-option>
                            <el-option label="邮箱" value="02"></el-option>
                            <el-option label="手机号码" value="02"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否可用">
                        <el-select v-model="formInline.region">
                            <el-option label="全部" value="01"></el-option>
                            <el-option label="否" value="02"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item> -->

        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value3: '',
            value4: '',
            value5: '',
            formInline: {
                user: '',
                region: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style>
.search-panel li {
    list-style: none;
}
</style>
