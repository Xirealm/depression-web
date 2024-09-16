<script setup lang="ts">
import { ref, reactive,defineEmits} from "vue"
import { getQuestionnaireResultAPI,getExportTreatmentAPI } from '@/api/patientManage.js'

interface QuestionnaireResult {
    questionnaireName: string;
    questionResult: string;
}

interface Feedback {
    feedbackScore: number;
    feedbackEvaluate: string;
}

interface TreatmentRecord {
    treatment: string;
    finishTime: number;
    questionnaireResults: QuestionnaireResult[];
    feedback: Feedback;
    completeTime: string;
}
const patientName = ref("")
const patientId = ref("")
const arr = reactive<{ list1: TreatmentRecord[] }>({
    list1:[]
})
const emit=defineEmits(['update','getted']) 
const treatmentDialogVisible = ref(false)
const getQuestionnaireResult = async (madicalRecord: string, name: string,id:string) => {
    patientName.value = name
    patientId.value = id
    treatmentDialogVisible.value = true
    const res:any = await getQuestionnaireResultAPI(madicalRecord)
    console.log(res)
    arr.list1 = res.results
    emit('getted')
    emit('update',res.list1)
}
defineExpose({
    getQuestionnaireResult 
})
</script>

<template>
    <el-dialog v-model="treatmentDialogVisible" width="80%" align-center>
        <h2 class="text-center text-xl font-bold">{{ patientName }} - 治疗情况</h2>
        <div class="flex justify-end">
            <el-button type="primary" round size="large">
                <a 
                    :href="`http://47.100.198.147:4407/api/patients/exportAll?userId=${patientId}`" target="_blank">
                    导出全部
                </a>
            </el-button>
        </div>
        <el-table 
            :data="arr.list1" 
            border class="mt-4" height="70vh" size="large">
            <el-table-column label="治疗阶段" prop="treatment" align="center" width="150">
                <template #default="scope">
                    第{{ scope.row.treatment }}次治疗
                </template>
            </el-table-column>
            <el-table-column label="持续时间" prop="finishTime" align="center" width="100">
                <template #default="scope">
                    {{ scope.row.finishTime }}分钟
                </template>
            </el-table-column>
            <el-table-column label="完成时间" prop="completeTime" align="center" width="200"/>
            <el-table-column label="结果" prop="questionnaireResults" align="center" width="400">
                <template #default="scope">
                    <div v-for="(result, index) in scope.row.questionnaireResults" :key="index">
                        <h4>{{ result.questionnaireName }}：{{ result.questionResult }}</h4>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="反馈评分" prop="feedback" align="center">
                <template #default="scope">
                    {{ scope.row.feedback.feedbackScore }}
                </template>
            </el-table-column>
            <el-table-column label="反馈评价" prop="feedback" align="center">
                <template #default="scope">
                    {{ scope.row.feedback.feedbackEvaluate }}
                </template>
            </el-table-column>
            <el-table-column label="导出" align="center">
                <template #default="scope">
                    <el-button type="primary">
                        <a 
                            :href="`http://47.100.198.147:4407/api/patients/export?userId=${patientId}&treatmentPhase=${scope.row.treatment}`" target="_blank">
                            导出
                        </a>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>
