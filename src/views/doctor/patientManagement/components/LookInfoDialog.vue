<script setup lang="ts">
import { ref } from "vue"
import { putUpdateAPI } from '@/api/patientManage.js'
import { ElMessage } from "element-plus";

const viewDialogVisible = defineModel()

interface viewForm {
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
  // treatmentPhase:string
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
  // treatmentPhase:''
})

const emit = defineEmits(['edited'])
const handleUpdate = async  ()=>{
  viewDialogVisible.value = false;
  const res:any= await putUpdateAPI(viewPatientForm.value)
  console.log(res)
  if(res.code ===200){
    ElMessage.success('修改成功');
    emit('edited')
  }
}
//传入修改信息
const setEditInfo=(row:any)=>{
  viewPatientForm.value = row
}
defineExpose({
  setEditInfo
})
</script>

<template>
  <el-dialog v-model="viewDialogVisible" title="患者信息" @close="viewDialogVisible =false" :align-center="true">
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
        <el-date-picker v-model="viewPatientForm.brithDate" value-format="YYYY-MM-DD" type="date" placeholder="选择日期" />
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
      <!-- <el-form-item label="治疗阶段">
        <el-input v-model="viewPatientForm.treatmentPhase"></el-input>
      </el-form-item> -->
      <el-form-item label="家庭月均收入">
        <el-input v-model="viewPatientForm.monthIncome"></el-input>
      </el-form-item>
      <el-form-item label="文化程度">
        <el-input v-model="viewPatientForm.educationDegree"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="viewPatientForm.familyAddress"></el-input>
      </el-form-item>
      <!-- <el-form-item label="年龄">
        <el-input v-model="viewPatientForm.age"></el-input>
      </el-form-item> -->
    </el-form>
    <template v-slot:footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleUpdate">保存修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>