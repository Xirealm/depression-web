<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
    <el-header class="header">
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
    </el-header>
</template>
<style lang="scss" scoped>
.header{
    background-color: #49998F;
    height: 7vh;
    line-height: 10vh;
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