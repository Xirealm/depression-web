<template>
  <el-card class="mx-8">
    <div class="box">
      <!-- 查询 -->
      <el-form :model="form" label-width="auto" class="forms" :inline="true">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="患者姓名">
              <el-input v-model="form.name" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="病例号">
              <el-input v-model="form.madicalRecord" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right">
            <el-form-item label="性别">
              <el-input v-model="form.sex" style="width: 200px" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="治疗阶段" style="width: 300px">
              <el-select v-model="form.treatmentPhase" placeholder="未开始">
                <el-option v-for="n in 5" :label="`第${n}次`" :value="`time${n}`" :key="n" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="getPatientPage" >查询</el-button>
              <el-button type="primary" @click="getAddPatient">新增</el-button>
              <el-button type="primary" @click="getDelete">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <!-- 表格 -->
      <el-table :data="dataTable.list" height="70vh" size="large" @selection-change="handleSelectionChange">
        <el-table-column type=selection width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="病历号" prop="madicalRecord"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="民族" prop="nation"></el-table-column>
        <el-table-column label="婚姻状况" prop="martalStatus"></el-table-column>
        <el-table-column label="职业状况" prop="vocationStatus"></el-table-column>
        <el-table-column label="治疗阶段" prop="treatmentPhase">
          <template #default="scope" >
            <!-- <div v-if="scope.row.phase?.isEnded">已结束</div> -->
            <span >{{ scope.row.treatmentPhase }}</span>
            <!-- <el-button type="text" size="small" @click="PatientsExport(scope.row.id,scope.row.treatmentPhase)">导出</el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="治疗详情" prop="detail">
          <template #default="scope">
            <el-link type="primary" @click="handleGetted(scope.row.madicalRecord)">治疗情况</el-link>
          </template>
        </el-table-column>
        <el-table-column label="个人信息" prop="assignment">
          <template #default="scope">
            <el-link type="primary" class="link-space" @click="lookInfo(scope.row)"
              >查看信息
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px" class="caozuo">
          <template #default="scope">
            <el-link 
              type="primary" class="link-space" 
              @click="distributeTreatment(scope.row.madicalRecord,scope.row.questionnaireId,scope.row.articleId,scope.row.videoName)">
                下发治疗
              </el-link>
            <el-link type="primary" class="link-space" @click="endTreatment(scope.row.madicalRecord)">结束治疗</el-link>
            <el-link type="primary" class="link-space" @click="getDeleteById(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"/>  
    </div>
  </el-card>
  
 <!-- <el-dialog
    v-model="treatmentDialogVisible"
    title="治疗情况"
    width="40%">
    <div v-for="(item,index) in treatmentData" :key="index">
      <h3>治疗编号:{{ item.treatment }}</h3>
      <p>完成时间：{{ item.finishTime }}</p>
      <div v-for="(result,index) in item.questionnaireRecords" :key="index">
        <h4>{{ result.questionnaireName }}</h4>
        <p>结果:{{ result.questionnaireResult }}</p>
      </div>
      <p>反馈评分:{{ item.feedback.feedbackScore }}</p>
      <p>反馈评价:{{ item.feedback.feedbackEvaluate }}</p>
      <p>完成时间:{{ item.completeTime }}</p>
    </div>
  </el-dialog> -->

  <AddAccountDialog v-model="dialogVisible" @added="getPatientPage"/>
  <LookInfoDialog v-model="viewDialogVisible" ref="LookInfoRef" @edited="getPatientPage" />
  <SendTreatmentDialog ref="SendTreatmentDialogRef" @sended="getPatientPage"/>
  <TreatmentResultDialog v-model="treatmentDialogVisible" ref="QuestionnaireResultRef" @getted="handleUpdate " @update="handleUpdate" />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { getDeleteByIdAPI } from '@/api/patientManage.js'
import {getCountAPI} from '@/api/patientManage.js'
import { getDeleteAPI } from '@/api/patientManage.js'
import { getPatientPageAPI } from '@/api/patientManage.js'
import { getEndPatientAPI } from '@/api/patientManage.js'
import {getPatientsExportAPI} from '@/api/patientManage.js'
// import {getQuestionnaireResultAPI} from '@/api/patientManage.js'
import AddAccountDialog from './components/AddAccountDialog.vue'
import LookInfoDialog from './components/LookInfoDialog.vue'
import SendTreatmentDialog from './components/SendTreatmentDialog.vue'
import TreatmentResultDialog from './components/TreatmentResultDialog.vue'

//查询  
interface SearchForm{
  id?:number|null;
  name?:string|null;
  madicalRecord?:string|null;
  sex?:string|null
  treatmentPhase?:string|null
}
const form=reactive<SearchForm>({
  id:null,
  name:'',
  madicalRecord:'',
  sex:'',
  treatmentPhase: ''
})

//分页
const total=ref(0)
const getCount=async ()=>{
  const res=await getCountAPI()
  console.log(res)
}
const handleSizeChange=(val:any)=>{
  page.pageSize=val
  getPatientPage()
}
const handlePageChange=(val:any)=>{
  page.currentPage=val
  getPatientPage()
}
//渲染列表
const page = reactive({
  currentPage: 1,
  pageSize: 10,
  name:'',
  madicalRecord:'',
  treatmentPhase: '',
  sex: ''
})
// const data = reactive({})
const getPatientPage = async () => {
  const res = await getPatientPageAPI(page.currentPage, page.pageSize,page.name,page.madicalRecord,page.treatmentPhase,page.sex)
  console.log(res)
  if(form.name){
    dataTable.list=res.data.filter((item:any)=>{
      return item.name==form.name
    })
  }else{
      dataTable.list=res.data
    }
  // getPatientPage()
  // dataTable.list = res.data
  // console.log(res.data[0].madicalRecord)
}
onMounted(() => {
  getPatientPage()
  getCount()
  PatientsExport(page.madicalRecord,page.treatmentPhase)
})
//新增患者
const dataTable:any = reactive({
  list: [],
  pageSize: 10,
  currentPage: 1
})
const dialogVisible = ref(false)
const getAddPatient = () => {
  dialogVisible.value = true
}

//查看信息（修改）
const LookInfoRef=ref()
const viewDialogVisible = ref(false)
const lookInfo =  (row:any)=>{
  viewDialogVisible.value = true;
  // console.log('chakan')
  LookInfoRef.value.EditInfo(row)
  // viewDialogVisible.value = false;
}

//治疗情况
// let arr=reactive({
//   list1:[
//   results[],
//   treatment,
//   ],
//   feedback
// })
// const treatmentData = ref([])
const QuestionnaireResultRef=ref()
const newArr=ref([])
const treatmentDialogVisible=ref(false)
const medicalRecord = ref('')
const handleGetted = async () => {
  await QuestionnaireResultRef.value.getQuestionnaireResult(medicalRecord.value)
  
  // console.log(madicalRecord)
  // await QuestionnaireResultRef.value.getQuestionnaireResult(madicalRecord)
  // treatmentDialogVisible.value=false
  // QuestionnaireResultRef.value.getQuestionnaireResult(madicalRecord)
  
};
const handleUpdate=(data:any)=>{
  newArr.value=data
  treatmentDialogVisible.value = true;
}
// const handleUpdate=(data:any)=>{
//   treatmentData.value=data
// }
// // function test (row:any){
// //   console.log("row",row);
// //   treatmentDialogVisible.value = true;
// // }
// const getQuestionnaireResult=async (madicalRecord:string)=>{
//   treatmentDialogVisible.value = true
//   const res=await getQuestionnaireResultAPI(madicalRecord)
//   console.log(res)
//   arr.list1=res.results
  
// }
//单条删除 
const getDeleteById = async (id:number) => {
  try {
    const res = await getDeleteByIdAPI(id);
    console.log(res)
    if (res.code === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
        plain: true,
      });
        dataTable.list.splice(id,1)
        getPatientPage();
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
        plain: true,
      });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ElMessage({
      message: '删除过程中发生错误',
      type: 'error',
      plain: true,
    });
  }
};

// //批量删除 
const selectedPatient = ref([])
const handleSelectionChange = (val:any) => {
  selectedPatient.value = val
}
const getDelete = async () => {
  if (selectedPatient.value.length === 0) {
    ElMessage({
      message: '请选择要删除的患者',
      type: 'warning',
      plain: true
    })
    return
  }
  try {
    const ids = selectedPatient.value.map(patient => patient.id).join(',')
    const res:any = await getDeleteAPI(ids)
    console.log(res)
    if (res.code === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
        plain: true
      })
      getPatientPage()
    } else {
      ElMessage({
        message: '删除失败',
        type: 'error',
        plain: true
      })
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ElMessage({
      message: '删除过程中发生错误',
      type: 'error',
      plain: true,
    });
  }
}
//导出治疗阶段
const PatientsExport=async(madicalRecord:any,treatmentPhase:any)=>{
  const res=await getPatientsExportAPI(madicalRecord,treatmentPhase)
  console.log(res)
  getPatientPage()
}

// 下发治疗
const assignTreatmentDialogVisible=ref(false)
const SendTreatmentDialogRef = ref()
const distributeTreatment=async (madicalRecord:string,questionnaireId:string,articleId:string,videoName:string)=>{
  // assignTreatmentDialogVisible.value = true;
  SendTreatmentDialogRef.value.open(madicalRecord)
}
//结束治疗
const endTreatment=async (madicalRecord:string)=>{
  const res:any=await getEndPatientAPI(madicalRecord)
  console.log(res)
}


</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  padding-top: 20px;
}

.forms {
  max-width: 7000px;
  margin-right: 20px;
}

.menu {
  display: flex;
  align-items: center;
}

label {
  display: inline-block;
  margin-right: 10px;
  width: 90px;
}

.link-space {
  margin-right: 10px;
}

</style>
