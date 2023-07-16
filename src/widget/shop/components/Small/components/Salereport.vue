<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { salereportApi } from '../../../api'
import userList from '../../../userList'

const state = reactive({
  dialogVisible: false,
  loading: false,
  retdata: []
})

const tableRef = ref()
const getDetailDate = async (name: string) => {
  state.loading = true
  try {
    const { data } = await salereportApi(userList[name].operaterid)
    const { retdata } = data
    state.retdata = retdata

    const index = retdata.findIndex((item: any) => item.opername === '汪艳红') - 8

    await nextTick()
    tableRef.value.scrollTo({ top: index * 40, behavior: 'smooth' })
  } finally {
    state.loading = false
  }
}

const tableRowClassName = ({ row }: any) =>
  row.operName.indexOf('汪艳红') !== -1 ? 'warning-row' : ''

const openDialog = async (row: { name: string }) => {
  state.dialogVisible = true
  getDetailDate(row.name)
}

// 关闭弹窗
const closedChange = () => {
  state.loading = false
  state.retdata = []
}

defineExpose({ openDialog })
</script>

<template>
  <el-drawer
    v-model="state.dialogVisible"
    append-to-body
    :with-header="false"
    :size="500"
    @closed="closedChange"
  >
    <div class="content">
      <el-table
        ref="tableRef"
        v-loading="state.loading"
        :row-class-name="tableRowClassName"
        style="flex: 1"
        :data="state.retdata"
      >
        <el-table-column prop="operName" label="姓名" width="150" />
        <el-table-column prop="type" label="属性" width="110">
          <template #default="{ row }">
            <el-tag :type="row.type === '销售单' ? 'success' : 'danger'" disable-transitions>
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额" width="110" />
        <el-table-column prop="inputDate" label="时间" />
      </el-table>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.content {
  height: 100%;
  display: flex;
  flex-direction: column;

  :deep(.warning-row) {
    --el-table-tr-bg-color: var(--el-color-warning-light-5);
  }
}
</style>
