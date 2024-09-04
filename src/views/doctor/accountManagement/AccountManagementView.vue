<style lang="scss" scoped>
.custom-button {
  margin: 30px;
  width: 100px;
}
</style>

<template>
  <el-button type="primary" class="custom-button">
    返回
  </el-button>
  <el-form-item style="display: flex; justify-content: flex-end;">
    <el-button type="primary" class="custom-button">新增</el-button>
    <el-button type="primary" class="custom-button">批量删除</el-button>
  </el-form-item>
  <el-table :data="filterTableData" border style="width: 100%; border: 200px;">
    <el-table-column label="用户名" prop="name" />
    <el-table-column label="角色" prop="role" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          重置密码
        </el-button>
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          修改
        </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface User {
  name: string
  role: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.role.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [

  {
    name: 'admin',
    role: '超级管理员',
  },
  {
    name: 'wangyiyi',
    role: '医生',
  },
  {
    name: 'liqian',
    role: '医生',
  },
]
</script>
