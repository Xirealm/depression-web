<template>
  <el-button color="#49998F" size="large" class="btn">
    <slot />
  </el-button>
</template>
<style lang="scss" scoped>
.btn{
  width:200px;
  height:60px;
  border-radius: 15px;
  font-size: 24px;
  letter-spacing: 3px;
}
</style>