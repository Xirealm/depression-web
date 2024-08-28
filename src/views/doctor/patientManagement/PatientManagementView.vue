<template>
  <div>
    <div class="box">
      <el-form :model="form" label-width="auto" class="forms" :inline="true">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="患者姓名">
              <el-input v-model="form.name" style="width: 200px;" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="病例号">
              <el-input v-model="form.num" style="width: 200px;" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="text-align: right;">
            <el-form-item label="性别">
              <el-input v-model="form.gender" style="width: 200px;" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="治疗阶段" style="width: 300px;">

              <el-select  v-model="form.phase" placeholder="未开始">
                <el-option v-for="n in 5" :label="`第${n}次`" :value="`time${n}`" :key="n" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="searchPatients">查询</el-button>
              <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
              <el-button type="primary" @click="handleBatchDelete">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="6" :offset="18">
            <el-form-item>
              <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
              <el-button type="primary" @click="handleBatchDelete">批量删除</el-button>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </div>
    <div>
      <el-table :data="paginateData">
        <el-table-column label="选择" width="50px">
          <template #default="scope">
            <el-checkbox v-model="selectedPatients[scope.$index]" 
            @change="handleSelectionChange($event,scope.$index)">
            </el-checkbox>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="100px"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="病历号" prop="num"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="民族" prop="nationality"></el-table-column>
        <el-table-column label="婚姻状况" prop="marriage"></el-table-column>
        <el-table-column label="职业状况" prop="occupation"></el-table-column>
        <el-table-column label="治疗阶段" prop="phaseText">
          <template #default="scope" >
            <div v-if="scope.row.phase?.isEnded">已结束</div>
            <span v-else-if="scope.row.phase?.treatmentCount>0">第{{ scope.row.phase.treatmentCount }}次</span>
            <span v-else>未开始</span>
          </template>
        </el-table-column>
        <el-table-column label="治疗详情" prop="detail">
          <template #default="scope">
            <el-link type="primary" @click="del(scope.row)">治疗情况</el-link>
          </template>

        </el-table-column>
        <el-table-column label="个人信息" prop="assignment">
          <template #default="scope">
            <el-link type="primary" class="link-space" @click="handleView(scope.row)">查看信息 </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px" class="caozuo">
          <template #default="scope">
            <el-link type="primary" class="link-space" @click="openAssignTreatmentDialog(scope.row)">下发治疗</el-link>
            <el-link type="primary" class="link-space" @click="handleEndTreatment(scope.row)">结束治疗 </el-link>
            <el-link type="primary" class="link-space" @click="deletePatient(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background :page-size="dataTable.pageSize" :current-page="dataTable.currentPage"
        layout="prev, pager, next" :total="total" @current-change="handlePageChange" />
    </div>

  </div>
  <el-dialog v-model="addDialogVisible" title="新增患者" @close="resetNewPatientForm">
    <el-form :model="newPatientForm" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="newPatientForm.name"></el-input>
      </el-form-item>
      <el-form-item label="病历号">
        <el-input v-model="newPatientForm.num"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="newPatientForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="newPatientForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="newPatientForm.gender">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="newPatientForm.birthDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="newPatientForm.nationality"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="newPatientForm.marriage">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业状况">
        <el-input v-model="newPatientForm.occupation"></el-input>
      </el-form-item>
      <el-form-item label="家庭月均收入">
        <el-input v-model="newPatientForm.monthlyIncome"></el-input>
      </el-form-item>
      <el-form-item label="文化程度">
        <el-input v-model="newPatientForm.education"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input type="textarea" v-model="newPatientForm.address"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="newPatientForm.age"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button @click="newPatientForm.id?updatePatient():addNewPatient()" type="primary">确定</el-button>
        </span>
      </template>
  </el-dialog>
  <el-dialog v-model="viewDialogVisible" title="患者信息" @close="resetViewForm">
    <el-form :model="viewPatientForm" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="viewPatientForm.name"></el-input>
      </el-form-item>
      <el-form-item label="病历号">
        <el-input v-model="viewPatientForm.num"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="viewPatientForm.idNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="viewPatientForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="viewPatientForm.gender">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-model="viewPatientForm.birthDate" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="民族">
        <el-input v-model="viewPatientForm.nationality"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况">
        <el-select v-model="viewPatientForm.marriage">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业状况">
        <el-input v-model="viewPatientForm.occupation"></el-input>
      </el-form-item>
      <el-form-item label="家庭月均收入">
        <el-input v-model="viewPatientForm.monthlyIncome"></el-input>
      </el-form-item>
      <el-form-item label="文化程度">
        <el-input v-model="viewPatientForm.education"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input type="textarea" v-model="viewPatientForm.address"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="viewPatientForm.age"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="viewDialogVisible= false">关闭</el-button>
          <el-button type="primary" @click="saveEdit">保存修改</el-button>
        </span>
      </template>
  </el-dialog>
  <el-dialog 
  v-model="treatmentDialogVisible"
  title="治疗情况"
  width="40%"
  @close="closeTreatmentDialog">
    <div>
      <p>患者姓名：{{ selectedPatient.name }}</p>
      <p>治疗次数：{{ selectedTreatmentSession.count }}</p>
      <p>治疗完成时间：{{ selectedTreatmentSession.data }}</p>
      <p>持续时间：{{ selectedTreatmentSession.duration }}min</p>
      <p>评估结果：</p>
      <ul>
        <li>GAD-7:轻度焦虑</li>
        <li>AIS:怀疑失眠</li>
      </ul>
      <p>PSQI:睡眠质量一般</p>
      <p>满意指数:{{ selectedTreatmentSession.satisfaction }}</p>
      <p>FACT-G:生活质量良好</p>
      <p>建议:{{ selectedTreatmentSession.advice }}</p>
      <p>RES:</p>
      <p>SDS:轻度抑郁</p>
    </div>
    <div style="text-align: center;">
      <el-button type="primary" @click="showExportInfo">导出</el-button>
    </div>
    
  </el-dialog>
  <el-dialog
  v-model="exportInfoVisible"
  title="导出信息"
  @close="exportInfoVisible=false">
  <pre>{{ exportContent }}</pre>
  </el-dialog>

  <el-dialog
  v-model="assignTreatmentDialogVisible"
  title="下发治疗"
  class="send"
  @close="resetAssignTreatment">
    <el-checkbox-group v-model="selectedTreatments">
      <el-checkbox 
      v-model="selectedTreatments"
      v-for="item in treatmentOptions"
      :value="item"
      :key="item"
      @change="handleTreatmentChange($event, item)">
      {{ item }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="assignTreatmentDialogVisible=false">取消</el-button>
      <el-button @click="confirmAssignTreatment">确定</el-button>
    </span> -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="assignTreatmentDialogVisible=false">取消</el-button>
        <el-button @click="confirmAssignTreatment">确定</el-button>
      </div>
    </template>
  </el-dialog>
  
  <el-dialog
  v-model="treatmentPlanDialogVisible"
  title="治疗计划"
  width="50%"
  @close="closeTreatmentPlanDialog">
    <ol>
      <li v-for="(treatment,index) in assignedTreatments" :key="index">
        {{ treatment }}
      </li>
    </ol>
  </el-dialog>
  
</template>



<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue"
import dataTable1 from '../../../utils/dataTable1.js'
import { useRouter } from "vue-router";


const router = useRouter()
const form = reactive({
  name: '',
  num: '',
  gender: '',
  phase: ''
})
const dataTable = reactive({
  list: dataTable1,
  pageSize: 9,
  currentPage: 1
})

//分页
const paginateData = computed(() => {
  const start = (dataTable.currentPage - 1) * dataTable.pageSize
  const end = start + dataTable.pageSize
  return dataTable.list.slice(start, end)
})
const total = computed(() => {
  return dataTable.list.length
})
const handlePageChange = (page) => {
  dataTable.currentPage = page
}
//查询
const searchPatients = () => {
  dataTable.list = dataTable.list.filter(patient => {
    return (
      (!form.name || patient.name.includes(form.name)) && (!form.num
        || patient.num.includes(form.num)) && (!form.gender || patient.
          gender.toLowerCase() === form.gender.toLowerCase()) && (!form.phase
            || patient.phase.includes(form.phase))
    )
  })
  dataTable.currentPage = 1
}
watchEffect(() => {
  paginateData.value
})
//新增
const newPatientForm = reactive({
  name: '',
  num: '',
  idNumber: '',
  phone: '',
  gender: '',
  birthDate: '',
  nationality: '',
  occupation: '',
  monthlyIncome: '',
  education: '',
  address: '',
  age:'',
  marriage:''
  
})
//控制新增对话框
const addDialogVisible = ref(false)
//新增患者
const addNewPatient = () => {
  console.log(111)
  const newPatient = {
    ...newPatientForm,
    birthDate: newPatientForm.birthDate.toString()
  };
  dataTable.list.push(newPatient)
  addDialogVisible.value = false
  resetNewPatientForm()
}
//重置新增患者表单
const resetNewPatientForm = () => {
  for (const key in newPatientForm) {
    newPatientForm[key] = ''
  }
}
watchEffect(() => {
  paginateData.value
})
//删除
const deletePatient=(patientId)=>{
  dataTable.list=dataTable.list.filter(patient=>
    patient.id!==patientId
  )
}
//批量删除
const selectedPatients=ref([])
const handleBatchDelete=()=>{
  const selectedPatientsId=selectedPatients.value.reduce((acc,selected,index)=>{
    if(selected){
      acc.push(dataTable.list[index].id)
    }
    return acc
  },[])
  
  dataTable.list=dataTable.list.filter(patient=>!selectedPatientsId.includes(patient.id))
  initializeSelecteddPatients()
}
const initializeSelecteddPatients=()=>{
  selectedPatients.value=new Array(dataTable.list.length).fill(false)
}
watchEffect(()=>{
  initializeSelecteddPatients()
})
//查看信息
const viewDialogVisible=ref(false)
const viewPatientForm=reactive({
  name: '',
  num: '',
  idNumber: '',
  phone: '',
  gender: '',
  birthDate: '',
  nationality: '',
  occupation: '',
  monthlyIncome: '',
  education: '',
  address: '',
  age:'',
  marriage:''
})
const handleView=(patient)=>{
  // console.log(patient)
  for(const key in viewPatientForm){
    if(patient[key]){
      viewPatientForm[key]=patient[key]
    }
  }
  viewDialogVisible.value=true
}
const resetViewForm=()=>{
  for(const key in viewPatientForm){
    viewPatientForm[key]=''
  }
}
//保存修改
const saveEdit=()=>{
  if(viewPatientForm.id)
  {
    console.log(111)
    const patientIndex=dataTable.list.findIndex(patient=>patient.id===viewPatientForm.id)
    if(patientIndex!==-1){
    dataTable.list[patientIndex]={
      ...dataTable.list[patientIndex],...viewPatientForm
    }
    viewDialogVisible.value=false
    resetViewForm()
  }
 
  
  }
}
//治疗情况
const treatmentDialogVisible=ref(false)
const selectedPatient=reactive({
  name: '',
})
const selectedTreatmentSession=reactive({
  count:'',
  data:'',
  duration:'',
  satisfaction:'',
  advice:''
})
const handleTreatmentInfo=(patient,treatmentSession)=>{
  selectedPatient.name=patient.name
  selectedTreatmentSession.count=treatmentSession.count
  selectedTreatmentSession.data=treatmentSession.data
  selectedTreatmentSession.duration=treatmentSession.duration
  selectedTreatmentSession.satisfaction=treatmentSession.satisfaction
  selectedTreatmentSession.advice=treatmentSession.advice
  treatmentDialogVisible.value=true
}
const closeTreatmentDialog=()=>{
  treatmentDialogVisible.value=false
}
const del = (row) => {
  console.log(row); // 检查 row 对象的结构和内容
  // 确保 row 对象具有 patient 和 treatmentSession 属性
  if (row && row.patient && row.treatmentSession) {
    handleTreatmentInfo(row.patient, row.treatmentSession);
  } else {
    console.error('Row object is missing expected properties');
  }
};
//导出信息
const exportInfoVisible=ref(false)
const showExportInfo=()=>{
  const content=
  `姓名:${selectedPatient.name}
  病例号:${selectedPatient.num}
  导出时间:${new Date().toLocaleDateString()}
  治疗阶段:${selectedTreatmentSession.phase}
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



//下发治疗
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
const openAssignTreatmentDialog = (patient) => {
  // 假设 selectedPatient.value 是当前选中的患者
  
  resetAssignTreatment();
  selectedPatient.value=patient
  assignTreatmentDialogVisible.value = true;
};
// const confirmAssignTreatment = () => {
//   assignedTreatments.value = selectedTreatments.value.slice()
//   treatmentPlanDialogVisible.value = true;
//   assignTreatmentDialogVisible.value = false;
 
// };

const handleTreatmentChange=(event,treatment)=>{
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
// 确认下发治疗，显示治疗计划对话框
const confirmAssignTreatment = () => {
  // 可以在这里添加其他逻辑，比如发送数据到服务器等
  treatmentPlanDialogVisible.value = true;
};
const closeTreatmentPlanDialog = () => {
  treatmentPlanDialogVisible.value = false;
};
//结束治疗
const treatmentPhaseText=computed(()=>{
  return dataTable.list.map(patient=>{
    const phaseText=patient.phase.isEnded?'已结束'
    :patient.phase.count>0? `第${patient.phase.treatmentCount}次`:'未开始'
    return {...patient,phaseText}
  })
})

const handleEndTreatment=(patient)=>{
  patient.phase.isEnded=true
}
</script>



<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.forms {
  max-width: 7000px;
  margin-right: 20px
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