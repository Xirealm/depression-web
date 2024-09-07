<script setup lang="ts">
import { ref,reactive } from "vue"
import { getAddPatientAPI } from "@/api/patientManage";
import { ElMessage } from "element-plus";
const dialogVisible = ref()

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
const emit = defineEmits(['added'])
const handleSave = async () => {
    dialogVisible.value=false
    const res:any = await getAddPatientAPI(ruleForm)
   console.log("resres",res);
    // dataTable.list=res.data
  if (res && res.code === 200) {
     ElMessage.success('添加成功！')
     emit('added')
    //  getPatientPage()
   }
   else {
    ElMessage.error(`${res.msg}`)
}
}
</script>

<template>
    <!-- 新增患者 -->
  <el-dialog v-model="dialogVisible" title="新增患者" width="500" :align-center="true">
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
