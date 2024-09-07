<template>
  <div>
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
              <el-button type="primary" >查询</el-button>
              <el-button type="primary" @click="getAddPatient">新增</el-button>
              <el-button type="primary" @click="getDelete">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <!-- 表格 -->
      <el-table :data="dataTable.list" @selection-change="handleSelectionChange">
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
            <!-- <span v-else>未开始</span> -->
          </template>
        </el-table-column>
        <el-table-column label="治疗详情" prop="detail">
          <template #default="scope">
            <el-link type="primary" @click="test(scope.row)">治疗情况</el-link>
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
            <el-link type="primary" class="link-space" @click="openAssignTreatmentDialog()">下发治疗</el-link>
            <el-link type="primary" class="link-space" >结束治疗</el-link>
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
  </div>
  
 <el-dialog
    v-model="treatmentDialogVisible"
    title="治疗情况"
    width="40%">
    <div>
      <p>患者姓名：</p>
      <p>治疗次数：</p>
      <p>治疗完成时间：</p>
      <p>持续时间:min</p>
      <p>评估结果：</p>
      <ul>
        <li>GAD-7:轻度焦虑</li>
        <li>AIS:怀疑失眠</li>
      </ul>
      <p>PSQI:睡眠质量一般</p>
      <p>满意指数:</p>
      <p>FACT-G:生活质量良好</p>
      <p>建议:</p>
      <p>RES:</p>
      <p>SDS:轻度抑郁</p>
    </div>
  </el-dialog>

  <AddAccountDialog v-model="dialogVisible" @added="getPatientPage"/>
  <LookInfoDialog v-model="viewDialogVisible" ref="LookInfoRef" @edited="getPatientPage" />
  <SendTreatmentDialog v-model="assignTreatmentDialogVisible" @sended="getPatientPage"/>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { getDeleteByIdAPI } from '@/api/patientManage.js'
import {getCountAPI} from '@/api/patientManage.js'
import { getDeleteAPI } from '@/api/patientManage.js'
import { getPatientPageAPI } from '@/api/patientManage.js'
import AddAccountDialog from './components/AddAccountDialog.vue'
import LookInfoDialog from './components/LookInfoDialog.vue'
import SendTreatmentDialog from './components/SendTreatmentDialog.vue'


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
  pageSize: 5
})
const getPatientPage = async () => {
  const res = await getPatientPageAPI(page.currentPage, page.pageSize)
  dataTable.list = res.data
  console.log(res)
}
onMounted(() => {
  getPatientPage()
  getCount()
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
}

//治疗情况
const treatmentDialogVisible=ref(false)
function test (row:any){
  console.log("row",row);
  treatmentDialogVisible.value = true;
}
  
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

// 下发治疗
const assignTreatmentDialogVisible=ref(false)
const openAssignTreatmentDialog = () => {
  assignTreatmentDialogVisible.value = true;
};

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
