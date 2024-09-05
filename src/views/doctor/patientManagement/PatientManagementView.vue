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
              <el-button type="primary" @click="searchPatients">查询</el-button>
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
            <el-link type="primary" class="link-space" @click="openAssignTreatmentDialog(scope.row)">下发治疗</el-link>
            <el-link type="primary" class="link-space" @click="handleEndTreatment(scope.row)">结束治疗
            </el-link>
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
        @size-change="handleSizeChange"
      />
      
    </div>
  </div>
  
  <!-- 修改患者信息 -->
  <el-dialog v-model="viewDialogVisible" title="患者信息" @close="viewDialogVisible = false">
    <el-form :model="viewPatientForm" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="viewPatientForm.name"></el-input>
      </el-form-item>
      <el-form-item label="病历号">
        <el-input v-model="viewPatientForm.id"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="viewPatientForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="viewPatientForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="viewPatientForm.sex">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="viewPatientForm.brithDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="viewPatientForm.nation"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="viewPatientForm.martalStatus">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业状况">
        <el-input v-model="viewPatientForm.vocationStatus"></el-input>
      </el-form-item>
      <el-form-item label="治疗阶段">
        <el-input v-model="viewPatientForm.treatmentPhase"></el-input>
      </el-form-item>
      <el-form-item label="家庭月均收入">
        <el-input v-model="viewPatientForm.monthIncome"></el-input>
      </el-form-item>
      <el-form-item label="文化程度">
        <el-input v-model="viewPatientForm.educationDegree"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input type="textarea" v-model="viewPatientForm.familyAddress"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="viewPatientForm.age"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button @click="viewDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdate">保存</el-button>
      </span>
    </template>
  </el-dialog>

 <el-dialog
    v-model="treatmentDialogVisible"
    title="治疗情况"
    width="40%"
    @close="closeTreatmentDialog"
  >
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
    <div style="text-align: center">
      <el-button type="primary" @click="showExportInfo">导出</el-button>
    </div>
  </el-dialog>
  <el-dialog v-model="exportInfoVisible" title="导出信息" @close="exportInfoVisible = false">
    <pre></pre>
  </el-dialog>

 <el-dialog
    v-model="assignTreatmentDialogVisible"
    title="下发治疗"
    class="send"
    @close="resetAssignTreatment"
  >
    <el-checkbox-group v-model="selectedTreatments">
      <el-checkbox
        v-model="selectedTreatments"
        v-for="item in treatmentOptions"
        :value="item"
        :key="item"
        @change="handleTreatmentChange($event, item)"
      >
        {{ item }}
      </el-checkbox>
    </el-checkbox-group>
   
 <template #footer>
      <div class="dialog-footer">
        <el-button @click="assignTreatmentDialogVisible = false">取消</el-button>
        <el-button @click="confirmAssignTreatment">确定</el-button>
      </div>
    </template>
  </el-dialog> 
   <el-dialog
    v-model="treatmentPlanDialogVisible"
    title="治疗计划"
    width="50%"
    @close="closeTreatmentPlanDialog"
  >
    <ol>
      <li v-for="(treatment, index) in assignedTreatments" :key="index">
        {{ treatment }}
      </li>
    </ol>
  </el-dialog> 
<!-- 新增患者 -->
  <el-dialog v-model="dialogVisible" title="新增患者" width="500">
    <el-form :model="ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="病历号" prop="madicalRecord">
        <el-input v-model="ruleForm.madicalRecord"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="ruleForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="ruleForm.sex"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="brithDate">
        <el-input v-model="ruleForm.brithDate"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input v-model="ruleForm.nation"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状态" prop="martalStatus">
        <el-input v-model="ruleForm.martalStatus"></el-input>
      </el-form-item>
      <el-form-item label="职业状态" prop="vocationStatus">
        <el-input v-model="ruleForm.vocationStatus"></el-input>
      </el-form-item>
      <el-form-item label="月收入" prop="monthIncome">
        <el-input v-model="ruleForm.monthIncome"></el-input>
      </el-form-item>
      <el-form-item label="文化程度" prop="educationDegree">
        <el-input v-model="ruleForm.educationDegree"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="familyAddress">
        <el-input v-model="ruleForm.familyAddress"></el-input>
      </el-form-item>
      <el-form-item label="治疗阶段" prop="treatmentPhase">
        <el-input v-model="ruleForm.treatmentPhase"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>


</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
// import dataTable1 from '../../../utils/dataTable1.js'
import { getDeleteByIdAPI } from '@/api/user.js'
import {getCountAPI} from '@/api/user.js'
import { getAddPatientAPI } from '@/api/user.js'
import { getDeleteAPI } from '@/api/user.js'
import {getUpdateAPI} from '@/api/user.js'
import {getPatientConditionAPI} from '@/api/user.js'
import { getPatientPageAPI } from '@/api/user.js'
// import {getPatientsExportAPI} from '@/api/user.js'
import {getPatientExportAllAPI} from '@/api/user.js'

interface PatientForm {
  userName: string;
  name: string;
  madicalRecord: string;
  idNumber: string;
  phoneNumber: string;
  sex: string;
  brithDate: string;
  age: number | null;
  nation: string;
  martalStatus: string;
  vocationStatus: string;
  monthIncome: string;
  educationDegree: string;
  familyAddress: string;
  treatmentPhase: string;
}

//查询  
interface SearchForm{
  id?:number|null;
  name?:string|null;
  madicalRecord?:string|null;
  sex?:string|null
  treatmentPhase?:string|null
}

interface viewForm{
  name:string,
  id:null,
  idNumber:string,
  phoneNumber:string,
  sex:string,
  brithDate:string,
  nation:string,
  vocationStatus:string,
  monthIncome:string,
  educationDegree:string,
  familyAddress:string,
  age:null,
  martalStatus:string,
  treatmentPhase:string
}

const ruleForm: PatientForm = reactive({
  userName: '',
  name: '',
  madicalRecord: '',
  idNumber: '',
  phoneNumber: '',
  sex: '',
  brithDate: '',
  age: null,
  nation: '',
  martalStatus: '',
  vocationStatus: '',
  monthIncome: '',
  educationDegree: '',
  familyAddress: '',
  treatmentPhase: ''
})

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
//新增患者  请求成功，添加失败
const dataTable = reactive({
  list: [],
  pageSize: 10,
  currentPage: 1
})

const dialogVisible = ref(false)
const getAddPatient = () => {
  dialogVisible.value = true
}

//新增保存
const handleSave = async () => {
  dialogVisible.value = false
  const res:any = await getAddPatientAPI(ruleForm)
  console.log("resres",res);

  if (res && res.code === 200) {
    ElMessage.success('添加成功！')
    getPatientPage()
  }
  else {
    ElMessage.error(`${res.msg}`)
  }

}
const viewPatientForm = ref<viewForm>({
  name: '',
  id: null,
  idNumber: '',
  phoneNumber: '',
  sex: '',
  brithDate: '',
  nation: '',
  vocationStatus: '',
  monthIncome: '',
  educationDegree: '',
  familyAddress: '',
  age: null,
  martalStatus: '',
  treatmentPhase:''
})

//查看信息（修改）
const lookInfo = async (row:any)=>{
  viewDialogVisible.value = true;
  viewPatientForm.value = row;
}

//修改
const handleUpdate = async  ()=>{
  const res:any= await getUpdateAPI(viewPatientForm.value)
  if(res.code ===200){
    ElMessage.success('修改成功');
   await getPatientPage()
   viewDialogVisible.value = false;
  }
}

//治疗情况
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

const form=reactive<SearchForm>({
  id:null,
  name:'',
  madicalRecord:'',
  sex:'',
  treatmentPhase: ''
})

//查询列表
const searchPatients=async()=>{
  const res:any=await getPatientConditionAPI({})
  console.log('res',res)
  
  if(res.code===200){
    ElMessage.success('查询成功')
    dataTable.list=res.data
  }
  else{
    ElMessage.error('查询失败')
  }
}

const viewDialogVisible = ref(false)


// const userInfo = ref({})




// const handleView=(patient)=>{
//   // console.log(patient)
//   for(const key in viewPatientForm){
//     if(patient[key]){
//       viewPatientForm[key]=patient[key]
//     }
//   }
//   viewDialogVisible.value=true
// }

// const resetViewForm=()=>{
//   for(const key in viewPatientForm){
//     viewPatientForm[key]=''
//   }
// }



//治疗情况
 const treatmentDialogVisible=ref(false)
const selectedTreatmentSession=reactive({
  count:'',
  data:'',
  duration:'',
  satisfaction:'',
  advice:''
})
// const handleTreatmentInfo=(patient:any,treatmentSession:any)=>{
//   // selectedPatient.value.name  =patient.name;
//   selectedTreatmentSession.count=treatmentSession.count
//   selectedTreatmentSession.data=treatmentSession.data
//   selectedTreatmentSession.duration=treatmentSession.duration
//   selectedTreatmentSession.satisfaction=treatmentSession.satisfaction
//   selectedTreatmentSession.advice=treatmentSession.advice
//   treatmentDialogVisible.value=true
// }
// const closeTreatmentDialog=()=>{
//   treatmentDialogVisible.value=false
// }
// const del = (row:any) => {
//   console.log(row); // 检查 row 对象的结构和内容
//   // 确保 row 对象具有 patient 和 treatmentSession 属性
//   if (row && row.patient && row.treatmentSession) {
//     handleTreatmentInfo(row.patient, row.treatmentSession);
//   } else {
//     console.error('Row object is missing expected properties');
//   }
// };
// //导出信息
const exportInfoVisible=ref(false)
const showExportInfo=()=>{
  const content=
  `姓名:${selectedPatient.value.name}
  病例号:${selectedPatient.value.id}
  导出时间:${new Date().toLocaleDateString()}
  治疗阶段:${selectedTreatmentSession.treatmentPhase}
  评价结果:
  您好！您前的评价结果如下：
  轻度焦虑；
  怀疑失眠；
  睡眠质量一般；
  生活质量很好；
  轻度抑郁；
  医生签字:
  日期:${new Date().toLocaleTimeString()}`;
  exportInfo(content)
}
const exportInfo=(content)=>{
  treatmentDialogVisible.value=false;
  exportInfoVisible.value=true
  exportContent.value=content
}

// //下发治疗
const treatmentOptions=ref([
  '广泛焦虑自评表GAD-7',
  '阿森斯失眠自评量表AIS',
  '匹兹堡睡眠质量指数PSQI',
  '生命质量测定量表FACT-G',
  '情绪调节自我效能感量表RESRES',
  '抑郁自评量表SDS',
  '介绍认知行为治疗方法',
  '介绍抑郁',
  '腹式呼吸训练',
  '圆环介绍',
  '欢迎界面',
  '介绍认知行为治疗方法',
  '介绍抑郁'
])

const selectedTreatments=ref([])
const assignTreatmentDialogVisible=ref(false)
const treatmentPlanDialogVisible=ref(false)

const assignedTreatments=ref([])
const exportContent=ref('')
const resetAssignTreatment = () => {
  selectedTreatments.value = [];
  assignedTreatments.value = [];
};

// 打开下发治疗选择弹窗
const openAssignTreatmentDialog = (patient:any) => {
  // 假设 selectedPatient.value 是当前选中的患者

  resetAssignTreatment();
  selectedPatient.value=patient
  assignTreatmentDialogVisible.value = true;
};
const confirmAssignTreatment = () => {
  assignedTreatments.value = selectedTreatments.value.slice()
  treatmentPlanDialogVisible.value = true;
  assignTreatmentDialogVisible.value = false;

};

const handleTreatmentChange=(event:any,treatment:any)=>{
  if (event) {
    // 如果选中，则添加到assignedTreatments中
    assignedTreatments.value.push(treatment);
  } else {
    // 如果取消选中，则从assignedTreatments中删除
    const index = assignedTreatments.value.indexOf(treatment);
    if (index > -1) {
      assignedTreatments.value.splice(index, 1);
    }
  }
}
// // 确认下发治疗，显示治疗计划对话框
// const confirmAssignTreatment = () => {
//   // 可以在这里添加其他逻辑，比如发送数据到服务器等
//   treatmentPlanDialogVisible.value = true;
// };
const closeTreatmentPlanDialog = () => {
  treatmentPlanDialogVisible.value = false;
};
//结束治疗
const treatmentPhaseText=computed(()=>{
  return dataTable.list.map(patient=>{
    const phaseText=patient.treatmentPhase.isEnded?'已结束'
    :patient.treatmentPhase.count>0? `第${patient.treatmentPhase.treatmentCount}次`:'未开始'
    return {...patient,phaseText}
  })
})

const handleEndTreatment=(patient:any)=>{
  patient.treatmentPhase.isEnded=true
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

.send .el-checkbox-group {
  display: flex;
  flex-wrap: wrap; // 弹性盒子包装
  gap: 10px; // 弹性盒子间距
}

.send .el-checkbox {
  width: calc(50% - 5px); // 弹性盒子宽度，可根据需要调整
}
</style>
