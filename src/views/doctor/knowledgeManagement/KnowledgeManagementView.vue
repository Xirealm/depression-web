<template>
  <div class="mainbody" :style="{boxShadow: `var(${getCssVarName('lighter')})`}">
    <div style="border-right: 2px solid #f9f9f9;">
      <div class="box" v-for="(item, index) in source" :key="index">
        <div class="title">
          <div v-if="index == 0">
            <svg-icon1 src="../../../components/icons/main.svg" width="24" height='23' class="svg-icon" />
          </div>
          <div v-if="index == 1">
            <svg-icon2 src="../../../components/icons/email.svg" width="20" height="20" class="svg-icon" />
          </div>
          <div v-if="index == 2">
            <svg-icon3 src="../../../components/icons/account.svg" width="20" height="20" class="svg-icon" />
          </div>
          <span style="margin-left: 10px;">{{ item.title }}</span>
        </div>
        <div class="select" v-for="(select, i) in item.tests" :key="i" @click="open(select)">{{ select }}
        </div>
      </div>
    </div>
  </div>
            <el-dialog v-model="dialogFormVisible" :title="testname" width="70%" destroy-on-close="true">
            <survey :infor="test" @sendanswer="getanswer"></survey>
            <!-- <video v-else src="" /> -->
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="commit">
                  提交
                </el-button>
              </div>
            </template>
          </el-dialog>
</template>

<script setup lang="ts">
import SvgIcon1 from '../../../components/icons/main.svg'
import SvgIcon2 from '../../../components/icons/email.svg'
import SvgIcon3 from '../../../components/icons/account.svg'
import { ref, reactive } from 'vue'
import survey from '../knowledgeManagement/components/survey.vue'
const dialogFormVisible = ref(false)
const testname = ref('')
const test = reactive<Object[]>([{}])
const commitanswer = ref<string[]>([])
const getanswer = (answer:string[]) =>{
  commitanswer.value = answer
}
type sou = {
  title:string,
  tests:string[]
}
let source = reactive<sou[]>([
  {
    title:'首页',
    tests:['1','这是一个测试']
  },
  {
    title: '标题',
    tests: ['1']
  },
  {
    title: '测试',
    tests: ['1']
  }
])
const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}
const open = (select:string) => {
  dialogFormVisible.value = true
  testname.value = select
}
const commit = () =>{
  console.log(commitanswer.value)
  // if(commitanswer.value.length<111111)
  dialogFormVisible.value = false
}
const cancel = () =>{
  dialogFormVisible.value = false
}
</script>

<style scoped>
.mainbody{
  width: 92%;
  margin: 30px auto;
  padding: 60px 50px 80px;
  border-radius: 15px;
}

.svg-icon::v-deep path{
   fill:#49998F
}

.title{
  display: flex;
  padding: 5px 10px;
  margin-top: 5px;
  width: 100%;
  color: #49998F;
  font-size: 18px;
  line-height: 20px;
}

.select{
  width: 100%;
  background-color: #f7f7f7;
  padding: 0px 30px;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  color: #415058;
}

.select:hover{
  color: #49998F;
  cursor: pointer;
  background-color: #e6f7ff;
  border-right: 3px solid #49998F;
}

.form{
  width: 100%;
  padding: 10px 15px;
}

.form::v-deep .el-radio-group{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.question{
  font-size: 16px;
  line-height: 20px;
  color: #303133;
}
</style>