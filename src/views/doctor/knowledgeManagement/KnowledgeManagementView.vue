<template>
  <el-card class="mx-8 py-4">
    <el-scrollbar height="78vh">
      <div class="border-r-2 border-slate-100 mx-8">
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
            <span class="ml-2">{{ item.title }}</span>
          </div>
          <div class="select" v-for="(select, i) in item.tests" :key="i" @click="open(select, item.title,i)">{{ select
            }}
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-card>
  <el-dialog v-model="dialogFormVisible" :title="testname" width="70%" :align-center="true" :destroy-on-close="true">
    <el-scrollbar height="80vh">
      <survey 
        v-if="title==='评估'" 
        :questionFormid="questionFormid" 
        :infor="test" :testtitle="testtitle" :choice="choice"
        :madicalRecord="''" 
        v-model="answer"
      />
      <div v-if="title === '视频'" class="h-[80vh] flex items-center">
        <video v-if="testname !== '愉快事件表具体表格.png'" class="w-full" controls>
          <source :src="videosrc" type="video/quicktime" v-if="testname.slice(-3) === 'mov'">
          <source :src="videosrc" type="video/mp4" v-if="testname.slice(-3) === 'mp4'">
        </video>
        <img v-if="testname === '愉快事件表具体表格.png'" :src="videosrc">
      </div>
      <v-md-editor v-model="text" v-if="title === '理论学习'" mode="preview"></v-md-editor>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import SvgIcon1 from '../../../components/icons/main.svg'
import SvgIcon2 from '../../../components/icons/email.svg'
import SvgIcon3 from '../../../components/icons/account.svg'
import { ref } from 'vue'
import survey from '../knowledgeManagement/components/survey.vue'
import { getkonwledgeAPI, getvideoAPI, gettestAPI } from '@/api/knowledge'
import {useStore} from '@/stores/knowledge'
const usestore = useStore()
const { source1,answers } = usestore
const dialogFormVisible = ref(false)
const testname = ref('')
const choice = ref<string[] | string[][]>([])
const answer = ref([])
type ifo = {
  id: number,
  questionOrder: string,
  questionContext: string
}
let test = ref<ifo[]>([])
const testtitle = ref('')
const questionFormid = ref<number>(0)
const commitanswer = ref<string[]>([])
const getanswer = (answer:string[]) =>{
  commitanswer.value = answer
}
const title = ref('')
const text = ref('')
const knowledgeindex = ref<number>()
const videosrc = ref('')
let source = source1

const open = (select:string,itemtitle:string,index:number) => {
  dialogFormVisible.value = true
  testname.value = select
  if(itemtitle==='理论学习'){
    title.value = itemtitle
    knowledgeindex.value = index + 1
    getkonwledgeAPI(String(knowledgeindex.value)).then((res: any) => {
      text.value = res.article.context
    }).catch((err: any) => {
      console.log(err)
    })
  }
  if (itemtitle === '视频'){
    title.value = itemtitle
    getvideoAPI({ fileName: select }).then((res: any) => {
      videosrc.value = res.data
    }).catch((err: any) => {
      console.log(err)
    })
  }
  if(itemtitle === '评估'){
    title.value = itemtitle
    gettestAPI({ questionForm: index + 1 }).then((res: any) => {
      res['问卷'].newQuestionsVO.forEach((item:ifo)=>{
        if(item.questionOrder === '0'){
          testtitle.value = item.questionContext
        }
      })
      let infor = res['问卷'].newQuestionsVO.filter((item:ifo)=> item.questionOrder !== '0')
      if (res['问卷'].questionForm === 3){
        choice.value = answers[1]
      }
      else if (res['问卷'].questionForm === 4){
        choice.value = answers[2]
      }
      else{
        choice.value = answers[0]
      }
      test.value = infor 
      questionFormid.value = res['问卷'].questionForm
    }).catch((err: any) => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.svg-icon:deep path{
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
  font-size: 15px;
  height: 35px;
  line-height: 35px;
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

.form:deep .el-radio-group{
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