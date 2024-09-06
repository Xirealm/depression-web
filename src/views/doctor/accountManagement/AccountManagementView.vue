<script lang="ts" setup>
import { computed, ref,onMounted } from 'vue'
import { getAllAccountAPI } from '@/api/accountManage';

interface User {
  userName: string
  userType: string
}

const search = ref('')
const filterTableData = computed(() => 
  tableData.value.filter(
    (data) => !search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const getAllAccount = async ()=>{
  const result = await getAllAccountAPI()
  //将admin置顶
  const data = result.newUserVOList
  const index = data.findIndex((item:any) => item.userType === '超级管理员')
  const admin = data.splice(index, 1);
  data.unshift(...admin)
  tableData.value = data
}

onMounted(() => {
  getAllAccount()
})

const tableData = ref<User[]>([])
</script>
<template>
  <el-card class="mx-4 card">
    <div class="flex justify-end">
    <el-button 
      type="primary">
      新增
    </el-button>
    <el-button 
      type="danger" >
      批量删除
    </el-button>
    </div>
    <el-table 
    :data="filterTableData" 
    border class="mt-4" height="70vh">
    <el-table-column label="用户名" prop="userName" align="center"/>
    <el-table-column label="角色" prop="userType" align="center"/>
    <el-table-column align="center">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">
          重置密码
        </el-button>
        <template v-if="scope.row.userType !=='超级管理员'">
          <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">
          修改
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </template>
    </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped>

</style>
