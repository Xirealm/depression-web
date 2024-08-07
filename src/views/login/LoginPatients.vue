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
    <div
      style="width: 100vw; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; ">
      <div style=" height: 100px; ">
        <p>病历号</p>
      </div>
      <input style="width: 360px;border: none; outline: none; border-bottom: 2px solid rgba(0, 0, 0, 0.4) ; "
        placeholder="请输入病历号" clearable />
    </div>
    <div style="height: 140px;width: 100vw; display: flex; align-items: center; justify-content: center;">
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