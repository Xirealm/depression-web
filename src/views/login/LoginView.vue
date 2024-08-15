<script>
import { useRouter } from 'vue-router';
import Button from './components/Button.vue';
import Header from './components/Header.vue';

export default {
    components: {
        Button,
        Header
    },
    setup() {
        const router = useRouter();

        // 医生登录跳转
        const goToDoctorLogin = () => {
            router.push('/DoctorLogin'); // 路由配置中的路径
        };

        // 患者登录跳转
        const goToPatientLogin = () => {
            router.push('/PatientLogin'); // 路由配置中的路径
        };

        return {
            goToDoctorLogin,
            goToPatientLogin // 返回登录跳转函数
        };
    }
}
</script>

<template>
    <form action="">
        <Header></Header>
        <br>
        <br>
        <br>
        <br>
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
    </form>
</template>

<style>
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