<script setup lang="ts">
import { reactive, ref } from 'vue'
import { chargeRecordApi } from '../api'
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()

const state = reactive({
  dialogVisible: false,
  loading: false
})

const dataList = ref([])
const halfMonth = ref(0)
const month = ref(0)
const threeMonth = ref(0)
const halfYear = ref(0)
const getDetailDate = async () => {
  state.loading = true
  try {
    const { data } = await chargeRecordApi()
    dataList.value = data.result.history
    const halfMonthDate = dayjs().subtract(15, 'day')
    const monthDate = dayjs().subtract(1, 'month')
    const threeMonthDate = dayjs().subtract(3, 'month')
    const halfYearDate = dayjs().subtract(6, 'month')

    data.result.history.forEach((item: any) => {
      isBefore(item, halfMonthDate, halfMonth)
      isBefore(item, monthDate, month)
      isBefore(item, threeMonthDate, threeMonth)
      isBefore(item, halfYearDate, halfYear)
    })
  } finally {
    state.loading = false
  }
}

const isBefore = (item: any, before: any, value: any) => {
  if (dayjs(before).isBefore(item.time, 'day')) value.value += item.fees
}

const openDialog = async () => {
  state.dialogVisible = true
  getDetailDate()
}

// 关闭弹窗
const closedChange = () => {
  state.loading = false
  dataList.value = []
}

defineExpose({ openDialog })
</script>

<template>
  <el-drawer
    v-model="state.dialogVisible"
    append-to-body
    :with-header="layoutStore.colsNum < 5"
    :size="layoutStore.colsNum < 5 ? '100%' : 500"
    @closed="closedChange"
  >
    <div class="content">
      <div
        style="
          border-bottom: 1px solid var(--el-border-color-lighter);
          margin-top: -10px;
          padding-bottom: 5px;
        "
      >
        <el-row :gutter="20" align="middle">
          <el-col :span="6">
            <el-statistic title="近半月电价" :value="halfMonth">
              <template #suffix>
                <span style="font-size: 12px">元</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="6">
            <el-statistic title="近一月电价" :value="month">
              <template #suffix>
                <span style="font-size: 12px">元</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="6">
            <el-statistic title="近三月电价" :value="threeMonth">
              <template #suffix>
                <span style="font-size: 12px">元</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="6">
            <el-statistic title="近半年电价" :value="halfYear">
              <template #suffix>
                <span style="font-size: 12px">元</span>
              </template>
            </el-statistic>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="state.loading" style="flex: 1" :data="dataList">
        <el-table-column prop="fees" label="充值金额(元)" />
        <el-table-column
          :formatter="(row: any) => row.amount + row.charge_pooling_amount"
          label="充值电量(度)"
        />
        <!-- <el-table-column prop="eleprice" label="电价(元/度)" /> -->
        <el-table-column
          prop="time"
          min-width="100px"
          :formatter="(row: any) => dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')"
          label="充值时间"
        />
      </el-table>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.el-row {
  text-align: center;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
