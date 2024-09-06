<script setup lang="ts">
import { ref } from "vue"
import { getEditUsernameAPI } from "@/api/accountManage";
import { ElMessage } from "element-plus";
const isShow = ref()
const data = ref({
    username: "",
    newUsername: ""
})
const editUsername = async () => {
    isShow.value = false
    const result = await getEditUsernameAPI(data.value.username, data.value.newUsername)
    if (result.code === 0) {
        ElMessage.success('修改用户名成功')
        emit('edited')
    } else {
        ElMessage.error('修改用户名失败')
    }
}
const emit = defineEmits(['edited'])
const openEditUsernameDialog = (username:string) => {
    isShow.value = true
    data.value.username = username
}
defineExpose({
    openEditUsernameDialog 
})
</script>

<template>
    <el-dialog v-model="isShow" title="修改用户名" width="500" :align-center="true">
        <el-form label-width="70">
            <el-form-item label="新用户名">
                <el-input v-model="data.newUsername" placeholder="请输入新用户名"/>
            </el-form-item>
            <div class="flex justify-center">
                <el-button 
                    type="primary"
                    :disabled="!data.newUsername"
                    @click="editUsername">
                    提交
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
