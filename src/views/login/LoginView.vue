<script setup lang="ts">
import Header from './components/Header.vue';
import Button from "./components/Button.vue"
</script>
<template>
  <Header />
  <h2 class="tip">请选择你的角色</h2>
  <div class="btnGroup">
    <Button>医生</Button>
    <Button>患者</Button>
  </div>
</template>
<style lang="scss" scoped>
.tip{
  margin: 20px;
}
.btnGroup {
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 50%;
  margin-top: 30vh;
}
</style>