<script setup lang="ts">
import Button from './components/Button.vue';
import Header from './components/Header.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// 医生登录跳转
const goToDoctorLogin = () => {
    router.push('/doctorLogin'); // 路由配置中的路径
};
// 患者登录跳转
const goToPatientLogin = () => {
    router.push('/patientLogin'); // 路由配置中的路径
};
</script>

<template>
    <Header></Header>
    <div class="mt-32">
        <span class="ml-32 text-2xl font-bold">
            请选择您的角色
        </span>
        <div class="flex justify-between w-[48vw] mx-auto my-32">
            <Button @click="goToDoctorLogin">
                医生
            </Button>
            <Button @click="goToPatientLogin">
                患者
            </Button>
        </div>
    </div>
</template>

<style scoped>
</style>