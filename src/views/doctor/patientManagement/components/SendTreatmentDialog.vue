<script setup lang="ts">
import { ref,defineEmits} from "vue"
import SvgIcon1 from '../../../../components/icons/main.svg'
import SvgIcon2 from '../../../../components/icons/email.svg'
import SvgIcon3 from '../../../../components/icons/account.svg'
import {useStore} from '@/stores/knowledge'
const usestore = useStore()
const { source1 } = usestore


const assignTreatmentDialogVisible = ref(false)
const selectedTreatments = ref([]);

const emit = defineEmits(['sended'])
const confirmAssignTreatment = () => {
  assignTreatmentDialogVisible.value = false;
  emit('sended')
};

</script>

<template>
    <el-dialog v-model="assignTreatmentDialogVisible" title="下发治疗" class="send" :align-center="true">
        <el-scrollbar height="80vh">
            <div class="box mx-4" v-for="(item, index) in source1" :key="index">
                <div class="title">
                    <div v-if="index == 0">
                        <svg-icon1 src="../../../../components/icons/main.svg" width="24" height='23' class="svg-icon" />
                    </div>
                    <div v-if="index == 1">
                        <svg-icon2 src="../../../../components/icons/email.svg" width="20" height="20" class="svg-icon" />
                    </div>
                    <div v-if="index == 2">
                        <svg-icon3 src="../../../../components/icons/account.svg" width="20" height="20"
                            class="svg-icon" />
                    </div>
                    <span style="margin-left: 10px;">{{ item.title }}</span>
                </div>
                <el-checkbox-group v-model="selectedTreatments">
                    <div class="select" v-for="(select, i) in item.tests" :key="i">
                        <el-checkbox>
                            {{ select }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
        </el-scrollbar>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="assignTreatmentDialogVisible = false">取消</el-button>
                <el-button @click="confirmAssignTreatment">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
.svg-icon:deep(.path) {
  fill: #49998F;
}

.title {
    display: flex;
    padding: 5px 10px;
    margin-top: 5px;
    width: 100%;
    color: #49998F;
    font-size: 18px;
    line-height: 20px;
}

.select {
    width: 100%;
    background-color: #f7f7f7;
    padding: 0px 30px;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    color: #415058;
}

.select:hover {
    color: #49998F;
    cursor: pointer;
    background-color: #e6f7ff;
    border-right: 3px solid #49998F;
}
</style>