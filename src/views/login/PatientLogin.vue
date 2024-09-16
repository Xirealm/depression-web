<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';
import Button from './components/Button.vue';
import Header from './components/Header.vue';
import { getPatientLoginAPI } from "@/api/user"
const router = useRouter();
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore()
// 返回选择角色
const returnLogin = () => {
    router.push('/login');
};

const loginData = ref({
    medicalRecord:""
})

const login = async () => {
    const res = await getPatientLoginAPI(loginData.value.medicalRecord)
    if (res.code === 0) {
        ElMessage.success("登录成功")
        userStore.setUser(loginData.value.medicalRecord,"patient")
        router.push('/patient');
    } else {
        ElMessage.error(res.msg)
    }
};
</script>

<template>
    <Header />
    <Button class="mx-[15vw] mt-[10vh]" @click="returnLogin">
        返回
    </Button>
    <div class="flex w-1/4 flex-wrap mx-auto justify-center">
        <div class="flex flex-col w-full text-xl">
            <label class="my-4 font-bold text-xl">
                病历号
            </label>
            <input 
                v-model="loginData.medicalRecord" 
                class="w-full border-b-gray-600 border-b pb-1" 
                placeholder="请输入病历号"
            />
        </div>
        <el-button 
            type="primary"
            @click="login" 
            color="#49998F" size="large" class="btn mt-8">
            确定
        </el-button>
    </div>
</template>

<style scoped lang="scss">
.btn{
  width:200px;
  height:60px;
  border-radius: 15px;
  font-size: 24px;
  letter-spacing: 3px;
}
</style>