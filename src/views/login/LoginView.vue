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
        请选择您的角色
      </span>
    </div>
      <div style="height: 160px;width: 100vw; display: flex; align-items: center; justify-content: center;">
        <!-- 医生登录按钮 -->
        <el-button style="  margin-right: 120px;" color="#49998F" size="large" class="btn" plain>医生</el-button>
        <!-- 患者登录按钮 -->
        <el-button style="  margin-left: 120px;" color="#49998F" size="large" class="btn" plain>患者</el-button>
      </div>
  </div>
</template>
<style lang="scss" scoped>
.tip{
  margin: 20px;
}
.btn {
  width: 200px;
  height: 50px;
  border-radius: 15px;
  font-size: 22px;
}
</style>