<script setup lang="ts">
import { ref } from 'vue'
import { elemeterInfoApi } from '@/api/electricity'
import dayjs from 'dayjs'
import Consumption from './Consumption.vue'
import Charge from './Charge.vue'
import { Refresh } from '@/icons'
import Icon from '@/components/Icon.vue'
import useInterval from '@/hooks/useInterval'

const props = defineProps({
  dragging: Boolean,
  type: {
    type: String,
    default: 'addWidget'
  },
  widgetData: {
    type: Object,
    required: true
  }
})

const uuid = computed(() => props.widgetData?.uuid)
const token = computed(() => props.widgetData?.token)
const total_amount = computed(() => props.widgetData?.total_amount)
const month_amount = computed(() => props.widgetData?.month_amount)
const elePrice = computed(() => props.widgetData?.elePrice)
const update = computed(() => dayjs(props.widgetData?.update).format('MM-DD HH:mm'))
const loading = ref(false)

// 获取信息
const getDate = async (message?: string) => {
  if (!uuid.value || !token.value) return message && ElMessage.error(message)
  loading.value = true

  try {
    const { data } = await elemeterInfoApi({ uuid: uuid.value, token: token.value })
    const { consume_amount, total_amount, charge_pooling_amount, month_amount, pooling_amount } =
      data.result

    props.widgetData.update = dayjs().valueOf()
    props.widgetData.total_amount = total_amount
    props.widgetData.month_amount = month_amount
    props.widgetData.elePrice =
      total_amount - +consume_amount - pooling_amount + charge_pooling_amount
  } finally {
    loading.value = false
  }
}

const widgetRef = ref()
const init = async () => {
  if (props.type === 'addWidget') return
  if (!total_amount.value) return getDate()

  useInterval({
    date: props.widgetData.update,
    dateType: 'hour',
    callback: getDate,
    elementVisibilityRef: widgetRef,
    loading: loading
  })
}
init()

// 弹窗
const consumptionRef = ref()
const chargeRef = ref()
const openDialog = (domRef: any) => {
  if (props.dragging) return
  domRef.openDialog()
}

defineExpose({ getDate })
</script>

<template>
  <div class="medium" ref="widgetRef">
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
                  <Icon
                    style="margin-left: 4px; cursor: pointer"
                    @click="getDate('请先配置设备信息')"
                  >
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
            <el-statistic title="本月用电(元)" :value="month_amount" />
          </el-col>
          <el-col :span="12">
            <el-statistic title="总计充值(元)" :value="total_amount" />
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

    <Consumption ref="consumptionRef" :uuid="uuid" :token="token" />
    <Charge ref="chargeRef" :uuid="uuid" :token="token" />
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
    &:not(:last-child) {
      border-bottom: 1px solid var(--el-border-color);
    }
    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>
