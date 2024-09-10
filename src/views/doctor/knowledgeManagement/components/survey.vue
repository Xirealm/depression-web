<template>
    <div class="text-lg text-slate-800 w-full text-wrap">{{ $props.testtitle }}</div>
    <div v-for="(item, index) in $props.infor" :key="index" class="form">
        <div class="question">{{ index + 1 }}. {{ item.questionContext }}</div>
        <el-radio :value="$props.choice[0]" size="large" v-model="answer[index]">{{ $props.choice[0] }}</el-radio>
        <el-radio :value="$props.choice[1]" size="large" v-model="answer[index]">{{ $props.choice[1] }}</el-radio>
        <el-radio :value="$props.choice[2]" size="large" v-model="answer[index]">{{ $props.choice[2] }}</el-radio>
        <el-radio :value="$props.choice[3]" size="large" v-model="answer[index]">{{ $props.choice[3] }}</el-radio>
    </div>
</template>


<script setup lang="ts">
import { defineProps,ref} from 'vue';
type ifo = {
    id:number,
    questionOrder:string,
    questionContext:string
}
defineProps<{
    infor:ifo[],
    testtitle:string,
    choice:string[]
}>()
// const send = defineEmits(['sendanswer'])
let answer = ref<string[]>([])
// const changeanswer = () =>{
//    send('sendanswer',answer)
// }
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