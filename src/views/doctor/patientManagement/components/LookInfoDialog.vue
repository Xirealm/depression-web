<script setup lang="ts">
import { ref } from "vue"
import {getUpdateAPI} from '@/api/patientManage.js'
import { ElMessage } from "element-plus";

const viewDialogVisible = ref()
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

const emit = defineEmits(['edited'])
const handleUpdate = async  ()=>{
  const res:any= await getUpdateAPI(viewPatientForm.value)
  if(res.code ===200){
    ElMessage.success('修改成功');
    viewDialogVisible.value = false;
    emit('edited')
  //  await getPatientPage()
   
  }
}
//修改
const EditInfo=(row:any)=>{
  viewPatientForm.value=row
}
defineExpose({
  EditInfo
})
</script>

<template>
      <el-dialog v-model="viewDialogVisible" title="患者信息" @close="viewDialogVisible = false" :align-center="true">
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

<!-- 
      
  <el-config-provider :locale="zhCn">
    <app />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script> -->



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
</template>
