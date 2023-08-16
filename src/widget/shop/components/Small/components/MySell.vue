<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { operrankinginfoApi } from '../../../api'
import dayjs from 'dayjs'
import userList from '../../../userList'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()

const state = reactive({
  dialogVisible: false,
  loading: false,
  dateType: 'today',
  retdata: []
})

const date: any = {
  today: {
    begintime: dayjs().format('YYYY-MM-DD'),
    endtime: dayjs().format('YYYY-MM-DD')
  },
  month: {
    begintime: dayjs().startOf('month').format('YYYY-MM-DD'),
    endtime: dayjs().endOf('month').format('YYYY-MM-DD')
  },
  year: {
    begintime: dayjs().startOf('year').format('YYYY-MM-DD'),
    endtime: dayjs().endOf('year').format('YYYY-MM-DD')
  }
}

const tableRef = ref()
const getDetailDate = async (name: string) => {
  state.loading = true
  try {
    const { data } = await operrankinginfoApi({
      operaterid: userList[name].operaterid,
      ...date[state.dateType]
    })
    const { retdata } = data
    state.retdata = retdata
    const index = retdata.findIndex((item: any) => item.opername === '汪艳红') - 8

    await nextTick()
    tableRef.value.scrollTo({ top: index * 40, behavior: 'smooth' })
  } finally {
    state.loading = false
  }
}

const tableRowClassName = ({ row }: any) => {
  if (row.opername === '汪艳红') {
    return 'warning-row'
  } else if (row.deptname === '16店') {
    return 'info-row'
  }
}

const openDialog = async (row: { name: string; dateType: string }) => {
  state.dialogVisible = true
  state.dateType = row.dateType
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
    :with-header="layoutStore.colsNum < 5"
    :size="layoutStore.colsNum < 5 ? '100%' : 500"
    title="排名"
    @closed="closedChange"
    append-to-body
  >
    <div class="content">
      <el-table
        ref="tableRef"
        v-loading="state.loading"
        :row-class-name="tableRowClassName"
        style="flex: 1"
        :data="state.retdata"
      >
        <el-table-column prop="operrank" label="排名" />
        <el-table-column prop="opername" label="姓名" />
        <el-table-column prop="deptname" label="店铺" />
        <el-table-column prop="factmoney" label="金额" />
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

  :deep(.info-row) {
    --el-table-tr-bg-color: var(--el-color-info-light-5);
  }
}
</style>
