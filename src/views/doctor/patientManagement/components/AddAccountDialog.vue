<script setup lang="ts">
import { reactive,ref } from "vue"
import { getAddPatientAPI } from "@/api/patientManage";
import { ElMessage } from "element-plus";

const dialogVisible = defineModel()
interface PatientForm {
  userName: string;
  name: string;
  madicalRecord: string;
  idNumber: string;
  phoneNumber: string;
  sex: string;
  brithDate: string;
  // age: number | null;
  nation: string;
  martalStatus: string;
  vocationStatus: string;
  monthIncome: string;
  educationDegree: string;
  familyAddress: string;
  // treatmentPhase: string;
}
const ruleForm: PatientForm = reactive({
  userName: '',
  name: '',
  madicalRecord: '',
  idNumber: '',
  phoneNumber: '',
  sex: '',
  brithDate: '',
  // age: null,
  nation: '',
  martalStatus: '',
  vocationStatus: '',
  monthIncome: '',
  educationDegree: '',
  familyAddress: '',
  // treatmentPhase: ''
})
const form = ref()
const resetForm = () => {
  form.value.resetFields()
}
const emit = defineEmits(['added'])
const handleSave = async () => {
  dialogVisible.value = false
  const res:any = await getAddPatientAPI(ruleForm)
  if (res.code === 200) {
    ElMessage.success('添加成功！')
    resetForm()
    emit('added')
  }
  else {
    ElMessage.error(`${res.msg}`)
  }
}
</script>

<template>
  <!-- 新增患者 -->
  <el-dialog v-model="dialogVisible" title="新增患者" :align-center="true" destroy-on-close>
    <el-form :model="ruleForm" label-width="120px" ref="form">
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
        <!-- <el-input v-model="ruleForm.sex"></el-input> -->
        <el-select v-model="ruleForm.sex">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="brithDate">
        <el-date-picker v-model="ruleForm.brithDate" value-format="YYYY-MM-DD" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age"></el-input>
      </el-form-item> -->
      <el-form-item label="民族" prop="nation">
        <el-input v-model="ruleForm.nation"></el-input>
      </el-form-item>
      <el-form-item label="婚姻状况" prop="martalStatus">
        <el-select v-model="ruleForm.martalStatus">
          <el-option label="未婚" value="未婚"></el-option>
          <el-option label="已婚" value="已婚"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业状况" prop="vocationStatus">
        <el-input v-model="ruleForm.vocationStatus"></el-input>
      </el-form-item>
      <el-form-item label="家庭月均收入" prop="monthIncome">
        <el-input v-model="ruleForm.monthIncome"></el-input>
      </el-form-item>
      <el-form-item label="文化程度" prop="educationDegree">
        <el-input v-model="ruleForm.educationDegree"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" prop="familyAddress">
        <el-input v-model="ruleForm.familyAddress"></el-input>
      </el-form-item>
      <!-- <el-form-item label="治疗阶段" prop="treatmentPhase">
        <el-input v-model="ruleForm.treatmentPhase"></el-input>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave">
          新增患者
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
