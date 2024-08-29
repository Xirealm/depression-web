<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router';
import Button from './components/Button.vue';
import Header from './components/Header.vue';

const router = useRouter();
// 返回选择角色
const returnLogin = () => {
    router.push('/login'); // 路由配置中的路径
};

const loginData = ref({
    number:""
})
const login = () => {
    console.log(loginData.value);
    router.push('/patient'); // 路由配置中的路径
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
                病历号
            </label>
            <input 
                v-model="loginData.number" 
                class="w-full border-b-gray-600 border-b pb-1" 
                placeholder="请输入病历号"
            />
        </div>
        <div class="mt-8">
            <Button @click="login">
                确定
            </Button>
        </div>
    </div>
</template>

<style scoped>
</style>