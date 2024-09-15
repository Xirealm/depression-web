<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
const router = useRouter()
const logout = () => {
    router.push("/login")
}
</script>
<template>
    <el-header class="header flex items-center justify-between">
        <div>
            <RouterLink :to="{
                name:'patientManagement',
            }" active-class="active-item">
                <span class="menu-item">患者管理</span>
            </RouterLink>
            <RouterLink :to="{
                name:'knowledgeManagement',
            }" active-class="active-item">
                <span class="menu-item">知识库管理</span>
            </RouterLink>
            <RouterLink :to="{
                name:'accountManagement',
            }" active-class="active-item">
                <span class="menu-item">账号管理</span>
            </RouterLink>
        </div>
        <el-button round type="warning" @click="logout" size="large">
            <span class="font-bold tracking-wide">退出登录</span>
        </el-button>
    </el-header>
</template>
<style lang="scss" scoped>
.header{
    background-color: #49998F;
    height: 10vh;
    color: white;
}
.menu-item{
    margin-right: 50px;
    color: rgb(198, 198, 198);
    font-size: 24px;
    font-weight: 600;
}
.active-item span{
    color: white;
}
</style>