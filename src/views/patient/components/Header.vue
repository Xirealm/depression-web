<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const logout = () => {
    router.push("/login")
}
</script>
<template>
    <el-header class="header flex items-center justify-between">
        <h1 class="font-bold text-3xl tracking-wider">欢迎您~</h1>
        <el-button round type="warning" @click="logout">
            退出登录
        </el-button>
    </el-header>
</template>
<style lang="scss" scoped>
.header{
    background-color: #49998F;
    height: 10vh;
    line-height: 10vh;
    color: white;
}
</style>