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
        <div class="select" v-for="(select, i) in item.tests" :key="i" @click="open(select, item.title,i)">{{ select }}
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" :title="testname" width="70%" destroy-on-close="true">
    <survey :infor="test" @sendanswer="getanswer" v-if="title==='评估'"></survey>
    <div v-if="title === '视频'">
      <video v-if="testname !== '愉快事件表具体表格.png'" style="width: 100%; height: 600px;" controls>
        <source :src="videosrc" type="video/quicktime" v-if="testname.slice(-3) === 'mov'">
        <source :src="videosrc" type="video/mp4" v-if="testname.slice(-3) === 'mp4'">
      </video>
      <img v-if="testname === '愉快事件表具体表格.png'" :src="videosrc" alt="">
    </div>
    <v-md-editor v-model="text" v-if="title === '理论学习'" mode="preview"></v-md-editor>
  </el-dialog>
</template>

<script setup lang="ts">
import SvgIcon1 from '../../../components/icons/main.svg'
import SvgIcon2 from '../../../components/icons/email.svg'
import SvgIcon3 from '../../../components/icons/account.svg'
import { ref, reactive, onMounted } from 'vue'
import survey from '../knowledgeManagement/components/survey.vue'
import { getkonwledgeAPI, getvideoAPI, gettestAPI } from '@/api/knowledge'
const dialogFormVisible = ref(false)
const testname = ref('')
let test = ref<Object[]>([{}])
const commitanswer = ref<string[]>([])
const getanswer = (answer:string[]) =>{
  commitanswer.value = answer
}
const title = ref('')
const text = ref('')
const knowledgeindex = ref<number>()
const videosrc = ref('')
const num = ref<number>(0)
type sou = {
  title:string,
  tests:string[]
}
let source = reactive<sou[]>([
  {
    title:'评估',
    tests:[
    '抑郁症筛查量表(PHQ-9)',
    '广泛焦虑自评量表(GAD-7)',
    '自我分化水平量表',
    '成年人健康自我管理能力测评量表',
    '成年人健康自我管理能力测评量表',
    '成年人健康自我管理能力测评量表'
    ]
  },
  {
    title: '视频',
    tests: [
      '八总结.mov',
      '第六次.mov',
      '第六次家庭作业.mov',
      '第四次家庭作业.mov',
      '第四次1.mov',
      '第四次2.mov',
      '腹式呼吸训练.mp4',
      '蝴蝶拍.mp4',
      '渐进式肌肉放松训练.mp4',
      '七1-矫正负性自动思维验证法.mp4',
      'D七2-矫正负性自动思维去灾难化重归因.mp4',
      '三1-行为改变的重要性.mp4',
      '三2-建立愉快事件表.mp4',
      '三3-每日活动安排制定表.mp4',
      '十1-新的核心信念形成.mp4 ',
      '挑战负性自动思维.mov',
      '挑战负性自动思维.mp4',
      '挑战负性自动思维技巧.mov',
      '挑战负性自动思维技巧.mp4',
      '五1-介绍认知模型.mp4',
      '五2-识别自动思维.mp4',
      '五3-识别负性自动思维.mp4',
      '一1介绍简化认知行为疗法.mp4 ',
      '一2-抑郁知识.mp4',
      '愉快事件表具体表格.png']
  },
  {
    title: '理论学习',
    tests: [
      '1.1 认知行为治疗',
      '1.2 抑郁是可以治疗',
      '2.1 动机激发',
      '2.2 成本效益分析',
      '3.1 行为改变的重要',
      '4.1 任务分级',
      '5.1 认知模型',
      '5.2 自动思维概念',
      '5.3 负性自动思维',
      '6.1 负性自动思维归',
      '6.2 挑战负性自动思',
      '6.3 挑战负性想法的',
      '7.1 矫正负性自动思',
      '8.1 认知演练和应对',
      '9.1 过去如何影响',
      '9.2 明确核心信念',
      '9.3 核心信念的三个',
      '9.4 发掘核心信念',
      '10.1 形成新的核心',
      '10.2 重新理解旧的核心信念',
      '11.1 处理疑虑和保留意见，享受自己的进步',
      '11.2 支持系统',
      '12.1 平衡心态，目标合理',
      '12.2 预防复发']
  }
])

onMounted(() => {
  // gettestAPI({ questionForm:1}).then((res:any)=>{
  //   console.log(res.questionnaires)
  // }).catch((err:any)=>{
  //   console.log(err)
  // })
})

const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}
const open = (select:string,itemtitle:string,index:number) => {
  dialogFormVisible.value = true
  testname.value = select
  if(itemtitle==='理论学习'){
    title.value = itemtitle
    knowledgeindex.value = index + 1
    getkonwledgeAPI(String(knowledgeindex.value)).then((res: any) => {
      text.value = res.data.context
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
      test.value = res.questionnaires
      num.value = res.questionnaires.length
    }).catch((err: any) => {
      console.log(err)
    })
  }
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
  font-size: 15px;
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