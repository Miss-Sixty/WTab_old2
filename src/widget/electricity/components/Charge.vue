<script setup lang="ts">
import { reactive, ref } from 'vue'
import { amountRecordApi } from '@/api/electricity'
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/layout'
import { Close } from '@/icons'
const layoutStore = useLayoutStore()

const props = defineProps({
  uuid: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  }
})
const state = reactive({
  dialogVisible: false,
  loading: false
})

const dataList = ref([])
const zero = ref(0)
const one = ref(0)
const two = ref(0)
const three = ref(0)
const getDetailDate = async () => {
  if (!props.uuid || !props.token) return
  state.loading = true
  try {
    const { data } = await amountRecordApi({ uuid: props.uuid, token: props.token })
    dataList.value = data.result.history
    const oneDate = dayjs().subtract(1, 'day')
    const halfMonthDate = dayjs().subtract(1, 'week')
    const monthDate = dayjs().subtract(15, 'day')
    const threeMonthDate = dayjs().subtract(1, 'month')

    data.result.history.forEach((item: any) => {
      isBefore(item, oneDate, zero)
      isBefore(item, halfMonthDate, one)
      isBefore(item, monthDate, two)
      isBefore(item, threeMonthDate, three)
    })
  } finally {
    state.loading = false
  }
}

const isBefore = (item: any, before: any, value: any) => {
  if (dayjs(before).isBefore(item.time, 'day')) value.value += item.total_consume
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
    :with-header="false"
    :size="layoutStore.colsNum < 5 ? '100%' : 500"
    @closed="closedChange"
  >
    <div class="content">
      <Icon class="close-icon" @click="state.dialogVisible = false"><Close /></Icon>
      <div
        style="
          border-bottom: 1px solid var(--el-border-color-lighter);
          margin-top: -10px;
          padding-bottom: 5px;
        "
      >
        <el-row :gutter="20" align="middle">
          <el-col :span="6">
            <el-statistic :precision="2" title="目前度数" :value="zero">
              <template #suffix>
                <span style="font-size: 12px">度</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="6">
            <el-statistic :precision="2" title="近一周度数" :value="one">
              <template #suffix>
                <span style="font-size: 12px">度</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="6">
            <el-statistic :precision="2" title="近半月度数" :value="two">
              <template #suffix>
                <span style="font-size: 12px">度</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="6">
            <el-statistic :precision="2" title="近一月度数" :value="three">
              <template #suffix>
                <span style="font-size: 12px">度</span>
              </template>
            </el-statistic>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="state.loading" style="flex: 1" :data="dataList">
        <el-table-column prop="date" label="日期" show-overflow-tooltip />
        <el-table-column
          label="房间用电"
          :formatter="(row: any) => `${row.room_consume}度`"
          show-overflow-tooltip
        />
        <el-table-column
          label="公摊用电"
          :formatter="(row: any) => `${row.pool_consume}度`"
          show-overflow-tooltip
        />
        <el-table-column
          label="总共用电"
          :formatter="(row: any) => `${row.total_consume}度`"
          show-overflow-tooltip
        />
        <el-table-column
          label="剩余电量"
          :formatter="(row: any) => `${row.left_amount}度`"
          show-overflow-tooltip
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
  position: relative;

  .close-icon {
    position: absolute;
    right: 0;
    top: 3px;
    z-index: 9999;
    font-size: 22px;
    color: #72767b;
    padding: 5px;
    box-sizing: content-box;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
