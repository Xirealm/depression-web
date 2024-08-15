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

        // 返回选择角色
        const goToLogin = () => {
            router.push('/Login'); // 路由配置中的路径
        };

        // 登录成功
        const goToDoctorView = () => {
            router.push('../views/doctor/DoctorView.vue'); // 路由配置中的路径
        };

        return {
            goToLogin,
            goToDoctorView // 返回登录跳转函数
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
        <div style="padding-top: 0;">
            <Button class="return-button" @click="goToLogin">
                返回
            </Button>
        </div>
        <!-- 按钮 -->
        <div class="bingli">
            <div class="bingli-label">
                <p>账户名</p>
            </div>
            <input class="input-field" placeholder="请输入账户名" clearable />
        </div>
        <div class="bingli">
            <div class="bingli-label">
                <p>病历号</p>
            </div>
            <input class="input-field" placeholder="请输入病历号" clearable />
        </div>
        <div style="text-align: center; height: 10px; color: rgba(0, 0, 0, 0.4); font-size: 14px;">忘记密码请联系管理员</div>
        <div class="button-container">
            <Button @click="goToDoctorView">
                确定
            </Button>
        </div>
    </form>
</template>

<style>
.button-container {
    height: 100px;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}
.return-button{
    margin-left: 15vw;
}
.bingli {
    width: 100vw;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.bingli-label p {
    font-size: 160%;
    height: 50px;
    margin: 0;
    /* 去掉默认的上下边距 */
    position: relative;
    left: -145px;
    /* 向左移动20px */
}
.input-field {
    width: 360px;
    border: none;
    outline: none;
    font-size: 120%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}
</style>