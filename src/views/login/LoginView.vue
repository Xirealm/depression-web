<template>
  <div style="height: 130px; width: 100vw; background-color:#49998F;  line-height: 130px;">
    <span style="color: aliceblue; font-size: 180%; padding-left: 10%;">
      心理康复治疗平台
    </span>
    <div style="padding-top: 0;">
      <span style="color: black; font-size: 140%; padding-left: 13%;">
        请选择您的角色
      </span>
    </div>
    <div style="height: 160px;width: 100vw; display: flex; align-items: center; justify-content: center;">
      <!-- 医生登录按钮 -->
      <el-button style="margin-right: 120px;" color="#49998F" size="large" class="btn"
        plain>医生</el-button>
      <!-- 患者登录按钮 -->
      <el-button style="  margin-left: 120px;" color="#49998F" size="large" class="btn" plain>患者</el-button>
    </div>
  </div>
</template>

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