<template>
    <div style="font-size: 18px; color: #303133;">请根据您最近两周的实际情况，选择对应的选项:</div>
    <div v-for="(item, index) in $props.infor" :key="index" class="form">
        <div class="question">{{ index + 1 }}.提问这是什么？</div>
        <el-radio-group v-model="radio1" class="el-radio-group" size="large">
            <el-radio value="1" size="large">完全不会</el-radio>
            <el-radio value="2" size="large">好几天</el-radio>
            <el-radio value="3" size="large">一半以上</el-radio>
            <el-radio value="4" size="large">几乎每天</el-radio>
        </el-radio-group>
    </div>
</template>


<script setup lang="ts">
import { defineProps, ref } from 'vue';
const radio1 = ref('2')
const props = defineProps<{
    infor:string[]
}>()
</script>

<style scoped>
.form {
    width: 100%;
    padding: 10px 15px;
}

.form::v-deep .el-radio-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.question {
    font-size: 16px;
    line-height: 20px;
    color: #303133;
}
</style>