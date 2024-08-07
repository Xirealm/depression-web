<script setup lang="ts">
import Header from './components/Header.vue';
import Button from "./components/Button.vue"
</script>
<template>
  <div style="height: 130px; width: 100vw; background-color:#49998F;  line-height: 130px;">
    <span style="color: aliceblue; font-size: 180%; padding-left: 10%;">
      心理康复治疗平台
    </span>
    <div style="padding-top: 0;">
      <span style="color: black; font-size: 140%; padding-left: 13%;">
        <el-button color="#49998F" size="large" class="btn" plain>返回</el-button>
      </span>
    </div>
    <!-- 按钮 -->
    <div style="text-align: center; height: 100px;">账户名</div>
    <div style="height: 0;width: 100vw; display: flex; align-items: center; justify-content: center;">
      <input style="width: 360px;border: none; outline: none; border-bottom: 2px solid rgba(0, 0, 0, 0.4) ; "
        placeholder="请输入账户名" clearable />
    </div>
    <div style="text-align: center; height: 100px;">密码</div>
    <div style="height: 0;width: 100vw; display: flex; align-items: center; justify-content: center;">
      <input style="width: 360px;border: none; outline: none; border-bottom: 2px solid rgba(0, 0, 0, 0.4) ; "
        placeholder="请输入密码" clearable />
    </div>
    <div style="text-align: center; height: 100px; color: rgba(0, 0, 0, 0.4); font-size: 10px;">忘记密码请联系管理员</div>
    <div style="height: 0;width: 100vw; display: flex; align-items: center; justify-content: center;">
      <el-button color="#49998F" size="large" class="btn" plain>确定</el-button>
    </div>
  </div>
</template>

<style>
.btn {
  width: 200px;
  height: 50px;
  border-radius: 15px;
  font-size: 22px;
}
</style>
