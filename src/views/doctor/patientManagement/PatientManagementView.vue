<template>
  <el-card class="mx-8">
    <div class="box">
      <el-form :model="form" label-width="auto" class="w-full">
        <div class="flex justify-between w-[100%]">
          <el-form-item label="患者姓名">
              <el-input v-model="form.name" style="width: 250px" clearable/>
            </el-form-item>
            <el-form-item label="病例号">
              <el-input v-model="form.madicalRecord" style="width: 250px" clearable/>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" style="width: 250px" clearable>
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
            <el-form-item label="治疗阶段">
              <el-select v-model="form.treatmentPhase" style="width: 250px;" clearable>
                <el-option 
                  v-for="item in TreatmentPhases" 
                  :label="item" 
                  :value="item"
                  :key="item"/>
              </el-select> 
            </el-form-item>
            <el-button type="primary" @click="getPatientPage">查询</el-button>
        </div>
        <div class="flex justify-end mt-4">
          <el-button type="primary" @click="getAddPatient" round>新增患者</el-button>
          <el-button type="danger" @click="getDelete" round>批量删除</el-button>
        </div>
      </el-form>
    </div>
    <div class="mt-4">
      <el-table :data="dataTable.list" height="60vh" size="large" border @selection-change="handleSelectionChange">
        <el-table-column type=selection width="55" align="center"/>
        <el-table-column type="index" label="序号" width="70px" align="center"/>
        <el-table-column label="姓名" prop="name" align="center"/>
        <el-table-column label="病历号" prop="madicalRecord" align="center"/>
        <el-table-column label="性别" prop="sex" align="center"/>
        <el-table-column label="年龄" prop="age" align="center"/>
        <el-table-column label="民族" prop="nation" align="center"/>
        <el-table-column label="婚姻状况" prop="martalStatus" align="center"/>
        <el-table-column label="职业状况" prop="vocationStatus" align="center" />
        <el-table-column label="治疗阶段" prop="treatmentPhase" align="center">
          <template #default="scope">
            <!-- <div v-if="scope.row.phase?.isEnded">已结束</div> -->
            <el-tag v-if="scope.row.treatmentPhase == '已结束'" type="danger">{{ scope.row.treatmentPhase }}</el-tag>
            <el-tag v-else-if="scope.row.treatmentPhase == '未开始'" type="warning">{{ scope.row.treatmentPhase }}</el-tag>
            <el-tag v-else>{{ scope.row.treatmentPhase }}</el-tag>
            <!-- <el-button type="text" size="small" @click="PatientsExport(scope.row.id,scope.row.treatmentPhase)">导出</el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="治疗详情" prop="detail" align="center">
          <template #default="scope">
            <el-link type="primary" @click="handleGetted(scope.row.madicalRecord,scope.row.name,scope.row.id)">治疗情况</el-link>
          </template>
        </el-table-column>
        <el-table-column label="个人信息" prop="assignment" align="center">
          <template #default="scope">
            <el-link type="primary" class="link-space" @click="lookInfo(scope.row)">查看信息
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px" align="center">
          <template #default="scope">
            <el-button 
              type="primary" size="small" plain
              @click="distributeTreatment(scope.row.madicalRecord)">
              下发治疗
            </el-button>
            <el-button 
              type="warning" size="small" plain
              @click="endTreatment(scope.row.madicalRecord)">
              结束治疗
            </el-button>
            <el-button 
              type="danger" size="small" plain
              @click="getDeleteById(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        class="mt-6 justify-end"
        background 
        :page-size="page.pageSize" 
        :current-page="page.currentPage" 
        layout="total,prev, pager, next"
        :total="total" 
        @current-change="handlePageChange" 
      />
    </div>
  </el-card>
  <AddAccountDialog v-model="dialogVisible" @added="getPatientPage" />
  <LookInfoDialog v-model="viewDialogVisible" ref="LookInfoRef" @edited="getPatientPage" />
  <SendTreatmentDialog ref="SendTreatmentDialogRef" @sended="getPatientPage" />
  <TreatmentResultDialog v-model="treatmentDialogVisible" ref="QuestionnaireResultRef" @getted="handleUpdate"
    @update="handleUpdate" />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { getDeleteByIdAPI } from '@/api/patientManage.js'
import { getDeleteAPI } from '@/api/patientManage.js'
import { getPatientPageAPI } from '@/api/patientManage.js'
import { getEndPatientAPI } from '@/api/patientManage.js'
// import {getQuestionnaireResultAPI} from '@/api/patientManage.js'
import AddAccountDialog from './components/AddAccountDialog.vue'
import LookInfoDialog from './components/LookInfoDialog.vue'
import SendTreatmentDialog from './components/SendTreatmentDialog.vue'
import TreatmentResultDialog from './components/TreatmentResultDialog.vue'

//查询  
interface SearchForm {
  id?: string
  name?: string
  madicalRecord?: string
  sex?: string
  treatmentPhase?: string 
}
const form = reactive<SearchForm>({
  id: '',
  name: '',
  madicalRecord: '',
  sex: '',
  treatmentPhase: ''
})

const TreatmentPhases = ['未开始','已结束', '第一次','第二次','第三次','第四次','第五次','第六次','第七次','第八次','第九次']

//分页
const total = ref(0)
const handlePageChange = (val: any) => {
  page.currentPage = val
  getPatientPage()
}
//渲染列表
// const TreatmentPhases = ref([])
// const uniqueTreatmentPhases = ref<any[]>([]);
const page = reactive({
  currentPage: 1,
  pageSize: 10,
  name: '',
  madicalRecord: '',
  treatmentPhase: '',
  sex: ''
})
// const data = reactive({})
const getPatientPage = async () => {
  const res = await getPatientPageAPI(page.currentPage, page.pageSize, form.name, form.madicalRecord, form.treatmentPhase, form.sex)
  if(res.code === 200){
    dataTable.list = res.data
    total.value = res.total
  } else {
    ElMessage.error(`${res.msg}`)
    dataTable.list = []
  }
  // const treatmentPhasesSet = new Set();
  // res.data.forEach((item: any) => {
  //   treatmentPhasesSet.add(item.treatmentPhase);
  // });
  // uniqueTreatmentPhases.value = Array.from(treatmentPhasesSet);
}
onMounted(() => {
  getPatientPage()
  // getCount()
  // PatientsExport(page.id,page.treatmentPhase)
})
//新增患者
const dataTable: any = reactive({
  list: [],
  pageSize: 10,
  currentPage: 1
})
const dialogVisible = ref(false)
const getAddPatient = () => {
  dialogVisible.value = true
}

//查看信息（修改）
const LookInfoRef = ref()
const viewDialogVisible = ref(false)
const lookInfo = (row: any) => {
  viewDialogVisible.value = true;
  LookInfoRef.value.setEditInfo(row)
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
const QuestionnaireResultRef = ref()
const newArr = ref([])
const treatmentDialogVisible = ref(false)
const handleGetted = async (madicalRecord: string,name:string,id:string) => {
  console.log(madicalRecord);
  await QuestionnaireResultRef.value.getQuestionnaireResult(madicalRecord,name,id)
  // treatmentDialogVisible.value=false
  // QuestionnaireResultRef.value.getQuestionnaireResult(madicalRecord)

};
const handleUpdate = (data: any) => {
  newArr.value = data
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
const getDeleteById = async (id: number) => {
  try {
    const res = await getDeleteByIdAPI(id);
    console.log(res)
    if (res.code === 200) {
      ElMessage({
        message: '删除成功',
        type: 'success',
        plain: true,
      });
      dataTable.list.splice(id, 1)
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
const handleSelectionChange = (val: any) => {
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
    const res: any = await getDeleteAPI(ids)
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
// //导出治疗阶段
// const PatientsExport = async (id: any, treatmentPhase: any) => {
//   const res = await getPatientsExportAPI(id, treatmentPhase)
//   // TreatmentPhases.value=res.data
//   console.log(res)
//   getPatientPage()
// }

// 下发治疗
const assignTreatmentDialogVisible = ref(false)
const SendTreatmentDialogRef = ref()
const distributeTreatment = async (madicalRecord: string) => {
  // assignTreatmentDialogVisible.value = true;
  SendTreatmentDialogRef.value.open(madicalRecord)
}
//结束治疗
const endTreatment = async (madicalRecord: string) => {
  const res: any = await getEndPatientAPI(madicalRecord)
  console.log(res)
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  padding-top: 20px;
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

</style>