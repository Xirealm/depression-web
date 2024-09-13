<script setup lang="ts">
import { ref, reactive,defineEmits} from "vue"
import { getQuestionnaireResultAPI } from '@/api/patientManage.js'

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
const arr = reactive<{ list1: TreatmentRecord[] }>({
    list1:[]
})
const emit=defineEmits(['update','getted']) 
const treatmentDialogVisible = ref(false)
const getQuestionnaireResult = async (madicalRecord: string) => {
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
    <el-dialog v-model="treatmentDialogVisible" title="治疗情况" width="40%">
        <div v-for="(item, index) in arr.list1" :key="index">
            <h3>治疗编号:{{ item.treatment }}</h3>
            <p>完成时间：{{ item.finishTime }}</p>
            <div v-for="(result, index) in item.questionnaireResults" :key="index">
                <h4>{{ result.questionnaireName }}</h4>
                <p>结果:{{ result.questionResult }}</p>
            </div>
            <p>反馈评分:{{ item.feedback.feedbackScore }}</p>
            <p>反馈评价:{{ item.feedback.feedbackEvaluate }}</p>
            <p>完成时间:{{ item.completeTime }}</p>
        </div>
    </el-dialog>

</template>
