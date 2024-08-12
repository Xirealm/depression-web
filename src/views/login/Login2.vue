<script>
import Button from './components/Button.vue';
import Header from './components/Header.vue';

export default {
    components: {
        Button,
        Header
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
            <Button class="doctor-button">
                医生
            </Button>
            <Button class="patient-button">
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