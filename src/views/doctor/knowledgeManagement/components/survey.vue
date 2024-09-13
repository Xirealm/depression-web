<template>
    <div v-if="$props.questionFormid !== 4">
        <div class="text-lg text-slate-800 w-full text-wrap">{{ $props.testtitle }}</div>
        <div v-for="(item, index) in $props.infor" :key="index" class="form">
            <div class="question">{{ index + 1 }}. {{ item.questionContext }}</div>
            <el-radio :value="$props.choice[0]" size="large" v-model="answer[index]">{{ $props.choice[0] }}</el-radio>
            <el-radio :value="$props.choice[1]" size="large" v-model="answer[index]">{{ $props.choice[1] }}</el-radio>
            <el-radio :value="$props.choice[2]" size="large" v-model="answer[index]">{{ $props.choice[2] }}</el-radio>
            <el-radio :value="$props.choice[3]" size="large" v-model="answer[index]">{{ $props.choice[3] }}</el-radio>
        </div>
    </div>
    <div v-if="$props.questionFormid === 4">
        <div class="text-lg text-slate-800 w-full text-wrap my-2.5">1.{{ $props.testtitle }}</div>
        <div class="table">
            <div class="row flex flex-nowrap">
                <div class="onerow"></div>
                <div class="onerow" v-for="(c, i) in $props.choice[0]" :key="i">{{ c }}</div>
            </div>
        </div>
        <div class="table" v-for="(item, index) in $props.infor" :key="index">
            <div class="choice flex flex-nowrap" v-if="index < 24">
                <div class="onechoice" style="width: 16%;">C{{index+1+' ' + item.questionContext }}</div>
                <div class="flex flex-nowrap" style="width: 80%;">
                    <div class="onechoice"><el-radio :value="$props.choice[0][0]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[0][1]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[0][2]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[0][3]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[0][4]" v-model="answer[index]"></el-radio>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-lg text-slate-800 w-full text-wrap my-2.5">2.{{ $props.testtitle }}</div>
        <div class="table">
            <div class="row flex flex-nowrap">
                <div class="onerow"></div>
                <div class="onerow" v-for="(c, i) in $props.choice[1]" :key="i">{{ c }}</div>
            </div>
        </div>
        <div class="table" v-for="(item, index) in $props.infor" :key="index">
            <div class="choice flex flex-nowrap" v-if="index > 23 && index <33">
                <div class="onechoice" style="width: 16%;">C{{ index + 1 + ' ' + item.questionContext }}</div>
                <div class="flex flex-nowrap" style="width: 80%;">
                    <div class="onechoice"><el-radio :value="$props.choice[1][0]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[1][1]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[1][2]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[1][3]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[1][4]" v-model="answer[index]"></el-radio>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-lg text-slate-800 w-full text-wrap my-2.5">3.{{ $props.testtitle }}</div>
        <div class="table">
            <div class="row flex flex-nowrap">
                <div class="onerow"></div>
                <div class="onerow" v-for="(c, i) in $props.choice[2]" :key="i">{{ c }}</div>
            </div>
        </div>
        <div class="table" v-for="(item, index) in $props.infor" :key="index">
            <div class="choice flex flex-nowrap" v-if="index > 32">
                <div class="onechoice" style="width: 16%;">C{{ index + 1 + ' ' + item.questionContext }}</div>
                <div class="flex flex-nowrap" style="width: 80%;">
                    <div class="onechoice"><el-radio :value="$props.choice[2][0]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[2][1]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[2][2]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[2][3]" v-model="answer[index]"></el-radio>
                    </div>
                    <div class="onechoice"><el-radio :value="$props.choice[2][4]" v-model="answer[index]"></el-radio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { defineProps,onMounted,reactive,ref} from 'vue';
type ifo = {
    id:number,
    questionOrder:string,
    questionContext:string
}
const props = defineProps<{
    infor:ifo[],
    testtitle:string,
    choice:string[] | string[][],
    questionFormid:number
}>()
onMounted(()=>{
    props.infor.forEach((item)=>{
        tableData.push({
            questionContext:item.questionContext
        })
    })
    console.log(tableData)
})
// const send = defineEmits(['sendanswer'])
let answer = ref<string[]>([])
type table = {
    questionContext:string
}
let tableData = reactive<table[]>([])
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

.table{
    /* border: 2px solid #e9e9eb; */
    width: 100%;
}

.table .onerow{
    width: 16%;
    background-color: rgb(241 245 249);
    border: 1px solid rgb(226 232 240);
    color: black;
    height: 30px;
    line-height: 30px;
    text-align: center;
}

.choice {
    /* border: 2px solid #e9e9eb; */
    width: 100%;
}

.table .onechoice {
    width: 25%;
    border: 1px solid rgb(226 232 240);
    color: black;
    /* height: 30px; */
    line-height: 30px;
    text-align: center;
    word-break: break-all;
}
</style>