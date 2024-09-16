<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';
import Button from './components/Button.vue';
import Header from './components/Header.vue';
import { postDoctorLoginAPI } from '@/api/user';
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const router = useRouter();
const returnLogin = () => {
    router.push('/login'); // 路由配置中的路径
};

const loginData = ref({
    username: '',
    password: '',
})
const login = async () => {
    const res = await postDoctorLoginAPI(loginData.value.username, loginData.value.password)
    console.log(res);
    
    if (res.code === 0) {
        ElMessage.success("登录成功")
        if (loginData.value.username === "admin") {
            userStore.setUser(loginData.value.username,"admin")
        }else{
            userStore.setUser(loginData.value.username,"doctor")
        }
        router.push('/doctor/patientManagement');
    } else {
        ElMessage.error(res.msg)
    }
};
</script>

<template>
    <Header></Header>
    <Button class="mx-[15vw] mt-[10vh]" @click="returnLogin">
        返回
    </Button>
    <div class="flex w-1/4 flex-wrap mx-auto justify-center">
        <div class="flex flex-col w-full text-xl">
            <label class="my-4 font-bold text-xl">
                账户名
            </label>
            <input 
                v-model="loginData.username" 
                class="w-full border-b-gray-600 border-b pb-1" 
                placeholder="请输入账户名"
            />
        </div>
        <div class="flex flex-col w-full text-xl">
            <label class="my-4 font-bold text-xl">
                密码
            </label>
            <input 
                v-model="loginData.password" 
                class="w-full border-b-gray-600 border-b pb-1" 
                placeholder="请输入密码"
            />
        </div>
        <span class="w-full text-center tracking-wide mt-4 text-gray-600">忘记密码请联系管理员</span>
        <el-button 
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