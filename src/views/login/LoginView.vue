<script setup lang="ts">
import { useRouter } from 'vue-router';
import Button from './components/Button.vue';
import Header from './components/Header.vue';

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
    <div class="container">
        <div class="role-selection">
            <span class="span1">
                请选择您的角色
            </span>
        </div>
        <!-- 按钮 -->
        <div class="button-container">
            <!-- 使用 Button 组件 -->
            <Button class="doctor-button" @click="goToDoctorLogin">
                医生
            </Button>
            <Button class="patient-button" @click="goToPatientLogin">
                患者
            </Button>
        </div>
    </div>
</template>

<style scoped>
.container{
    margin-top: 100px;
}
.span1 {
    color: black;
    font-size: 140%;
    padding-left: 13%;
}

.role-selection {
    margin-top: 3rem;
    margin-bottom: 3rem;
    /* Adjusted for spacing */
}

.button-container {
    height: 320px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.doctor-button {
    margin-right: 15vw;
}

.patient-button {
    margin-left: 15vw;
}
</style>