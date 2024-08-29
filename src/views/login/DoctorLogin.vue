<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';
import Button from './components/Button.vue';
import Header from './components/Header.vue';
import { postDoctorLoginAPI } from '@/api/user';

const router = useRouter();
const returnLogin = () => {
    router.push('/login'); // 路由配置中的路径
};

const loginData = ref({
    username: '',
    password: '',
})
const login = async () => {
    // const res = await postDoctorLoginAPI(loginData.value.username, loginData.value.password)
    // if (res.code === 0) {
    //     router.push('/doctor/patientManagement');
    // }
    router.push('/doctor/patientManagement');
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
        <Button class="mt-8" @click="login">
            确定
        </Button>
    </div>
</template>

<style scoped lang="scss">

</style>