<script setup lang="ts">
import { ref } from 'vue'
import { elemeterInfoApi } from '../api'
import dayjs from 'dayjs'
import Consumption from './Consumption.vue'
import Charge from './Charge.vue'
import { Refresh } from '@/icons'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  dragging: Boolean
})

const loading = ref(false)
const data = ref({
  consume_amount: 0,
  consume_amount_time: '',
  consume_amount_ranking: 0,
  total_amount: 0,
  total_amount_ranking: 0,
  pooling_amount: 0,
  charge_pooling_amount: 0,
  month_amount: 0
})
// 个人排名信息
const init = async () => {
  loading.value = true
  try {
    const res = await elemeterInfoApi()
    data.value = res.data.result
  } finally {
    loading.value = false
  }
}
init()

const update = computed(() => dayjs(data.value.consume_amount_time).format('MM-DD HH:mm'))
// 电费
const elePrice = computed(() => {
  const { pooling_amount, charge_pooling_amount, consume_amount, total_amount } = data.value
  return total_amount - +consume_amount - pooling_amount + charge_pooling_amount
})

// 弹窗
const consumptionRef = ref()
const chargeRef = ref()
const openDialog = (domRef: any) => {
  if (props.dragging) return
  domRef.openDialog()
}
</script>

<template>
  <div class="medium">
    <el-row style="height: 100%" align="middle">
      <el-col class="left" v-loading="loading" style="height: 100%" :span="17">
        <el-row style="height: 100%" align="middle">
          <el-col :span="24">
            <el-statistic
              :precision="3"
              :value="elePrice"
              :value-style="{
                color: elePrice <= 15 ? '#F56C6C' : ''
              }"
            >
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  剩余电量 {{ update }}
                  <Icon style="margin-left: 4px; cursor: pointer" @click="init">
                    <Refresh />
                  </Icon>
                </div>
              </template>
              <template #suffix>
                <span style="font-size: 12px">度</span>
              </template>
            </el-statistic>
          </el-col>
          <el-col :span="12">
            <el-statistic title="本月用电(元)" :value="data.month_amount" />
          </el-col>
          <el-col :span="12">
            <el-statistic title="总计充值(元)" :value="data.total_amount" />
          </el-col>
        </el-row>
      </el-col>
      <el-col style="height: 100%" :span="7">
        <div class="right">
          <div @click="openDialog(chargeRef)">用电记录</div>
          <div @click="openDialog(consumptionRef)">充值记录</div>
        </div>
      </el-col>
    </el-row>

    <Consumption ref="consumptionRef" />
    <Charge ref="chargeRef" />
  </div>
</template>

<style lang="scss" scoped>
.medium {
  text-align: center;
  height: 100%;
}
.left {
  padding: 10px 0;
}
.right {
  height: 100%;
  border-left: 1px solid var(--el-border-color);
  > div {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.3s,
      color 0.3s;
    cursor: pointer;
    &:first-child {
      border-bottom: 1px solid var(--el-border-color);
    }
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>
