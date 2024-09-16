<template>
  <Header />
  <el-card class="mx-8 py-4 mt-6">
    <el-scrollbar height="70vh">
      <div>
        <survey 
          v-if = "page <= allmes[0].length" 
          :questionFormid = "allmes[0][num].questionForm"
          :infor = "allmes[0][num].newQuestionsVO" 
          :testtitle = "testtitle[num]" 
          :choice = "choices[num]"
          :madicalRecord = "madicalRecord" 
          :treatmentPhase = "treatmentPhase"
        />
      </div>
      <div v-if="page > allmes[0].length && page <= (allmes[1].length + allmes[0].length)"
        class="h-[70vh] flex items-center justify-center">
        <video v-if="allmes[1][num].filename.slice(-3) === 'mp4'" class="h-full" controls>
          <source :src="allmes[1][num].url" type="video/mp4">
        </video>
        <video v-if="allmes[1][num].filename.slice(-3) === 'mov'" class="h-full" controls>
          <source :src="allmes[1][num].url" type="video/quicktime">
        </video>
        <img v-if="allmes[1][num].filename === '愉快事件表具体表格.png'" :src="allmes[1][num].url">
      </div>
      <v-md-editor v-if="page >= (allmes[0].length + allmes[1].length)" v-model="context" mode="preview"></v-md-editor>
    </el-scrollbar>
  </el-card>
  <!-- 翻页和评分按钮 -->
  <div class="flex justify-end px-9">
    <!-- <el-button type="warning" class="mt-7" round @click="centerDialogVisible = true">评分</el-button> -->
    <div class="mt-7">
      <el-button type="primary" size="large" @click="pageup"
        :disabled="page === 1">上一页</el-button>
      <el-button type="primary" size="large" @click="pagedown"
        :disabled="page === finalpage">下一页</el-button>
      <el-button type="primary" size="large" @click="finishTreatment" :disabled="page !== finalpage">完成治疗</el-button>  
    </div>
  </div>
  <!-- 评分弹框 -->
  <el-dialog v-model="centerDialogVisible" title="请按照您的真实意愿填写评价" width="500">
    <div class="demo-rate-block">
      <el-rate v-model="value" size="large" allow-half/>
    </div>
    <el-input v-model="input" placeholder="请输入您对我们的评价" class="w-full mb-4" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="feedback">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import survey from '@/views/doctor/knowledgeManagement/components/survey.vue'
import { onMounted,reactive,ref,watch } from 'vue'
import { getTreatmentPlan, userfeedback, postSaveTimeAPI } from "@/api/patientFunction"
import { formatTime } from '@/utils/time';
import { useStore } from '@/stores/knowledge'
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus'
type ifo = {
  id: number,
  questionOrder: string,
  questionContext: string
}
type oneNaire = {
  questionForm: number,
  questionName: string,
  newQuestionsVO: ifo[]
}
type ved = {
  filename:string,
  url:string
}
type arti = {
  id:string,
  title:string,
  context:string,
  htmlContext:string
}
type plan = {
  code: number,
  msg: string,
  questionnaire: oneNaire[],
  article: arti[],
  video: ved[],
  treatmentPhase:string
}
const userStore = useUserStore()
// const commitanswer = ref<string[]>([])
const usestore = useStore()
const { answers } = usestore
const time = ref({
  begin: new Date(),
  end: new Date()
})
let allmes: any[][] = reactive([[],[],[]])
let choices: any[] = reactive([])
let testtitle: any[] = reactive([])
const context = ref('')
const centerDialogVisible  = ref(false)
//上下页切换
const page = ref<number>(1)
watch(page, () => {
  console.log(page.value);
}, {
  immediate:true
})
const finalpage = ref(0)
const num = ref<number>(0)
//病历号
const madicalRecord = ref<string>("") 
//治疗阶段
const treatmentPhase = ref<string>("")
//评分
const value = ref(0)
const input = ref('')
onMounted(() => {
  time.value!.begin = new Date()
  madicalRecord.value = userStore.user.account
  getTreatmentPlan(madicalRecord.value).then((res: plan) => {
    console.log(res)
    treatmentPhase.value = res.treatmentPhase
    if (res.questionnaire !== undefined) {
      res.questionnaire.forEach((item) => {
        item.newQuestionsVO.forEach((item: ifo) => {
          if (item.questionOrder === '0') {
            testtitle.push(item.questionContext)
          }
        })
        if (item.questionForm === 3) {
          choices.push(answers[1])
        }
        else if (item.questionForm === 4) {
          choices.push(answers[2])
        }
        else {
          choices.push(answers[0])
        }
      })
    }
    allmes[0] = res.questionnaire === undefined ? [] : res.questionnaire
    allmes[1] = res.video === undefined ? [] : res.video
    allmes[2] = res.article === undefined ? [] : res.article
    finalpage.value = allmes[0].length + allmes[1].length + allmes[2].length
    if (page.value > allmes[0].length + allmes[1].length) {
      context.value = allmes[2][num.value].context
    }
  })
})
//切换页码
const pageup = () =>{
  page.value--
  if (page.value <= allmes[0].length) {
    if (page.value === allmes[0].length) {
      num.value = allmes[0].length - 1
    } else {
      num.value--
    }
  }
  if (page.value > allmes[0].length && page.value <= allmes[1].length + allmes[0].length) {
    if (page.value === allmes[1].length + allmes[0].length) {
      num.value = allmes[1].length -1
    } else {
      num.value--
    }
  }
  if (page.value > allmes[0].length + allmes[1].length) {
    if (page.value === finalpage.value) {
      num.value = allmes[2].length - 1
    } else {
      num.value--
    }
    context.value = allmes[2][num.value].context
  }
}
const pagedown = () => {
  page.value++
  if (page.value <= allmes[0].length) {
    if (page.value===1){
      num.value = 0
    }else{
      num.value++
    }
  }
  if (page.value > allmes[0].length && page.value <= allmes[1].length + allmes[0].length) {
    if (page.value === allmes[0].length + 1) {
      num.value = 0
    } else {
      num.value++
    }
    console.log(allmes[1][num.value], allmes[1][num.value].filename.slice(-3) === 'mov')
  }
  if (page.value > allmes[0].length + allmes[1].length) {
    if (page.value === allmes[0].length + allmes[1].length + 1) {
      num.value = 0
    } else {
      num.value++
    }
    context.value = allmes[2][num.value].context
  }
}
// const getanswer = (answer: string[]) => {
//   commitanswer.value = answer
//   console.log(answer)
// }
const feedback = () =>{
  centerDialogVisible.value = true
  userfeedback({
    "madicalRecord": madicalRecord.value,
    "feedbackScore": value.value,
    "feedbackEvaluate": input.value
  }).then((res:any)=>{
    ElMessage({
      message: '感谢您的评价!',
      type: 'success',
    })
    centerDialogVisible.value = false
    value.value = 0
    input.value =''
  }).catch((err:any)=>{
    ElMessage({
      message: '评价失败.',
      type: 'warning',
    })
  })
}
const finishTreatment = async () => {
  time.value!.end = new Date()
  const completeTime = formatTime(time.value.end)
  const finishTime = Math.ceil(((Number(time.value.end) - Number(time.value.begin)) / 1000 / 60))
  const res = await postSaveTimeAPI({
    madicalRecord: madicalRecord.value,
    completeTime: completeTime,
    finishTime: finishTime,
    treatment: treatmentPhase.value
  })
  if (res.code === 0) {
    ElMessage({
      message: '恭喜你，已完成全部治疗！',
      type: 'success',
    })
    centerDialogVisible.value = true
  }
}
</script>


<style lang="scss" scoped>
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}

.demo-rate-block:last-child {
  border-right: none;
}

.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 30px;
  margin-bottom: 10px;
}
</style>