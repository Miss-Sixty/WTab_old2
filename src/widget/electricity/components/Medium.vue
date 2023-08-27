<script setup lang="ts">
import { ref } from 'vue'
import { elemeterInfoApi } from '@/api/electricity'
import dayjs from 'dayjs'
import Consumption from './Consumption.vue'
import Charge from './Charge.vue'
import { Refresh } from '@/icons'
import Icon from '@/components/Icon.vue'
import { useElementVisibility } from '@vueuse/core'
import eventBus from '@/utils/evevtBus'

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
const update = computed(() => props.widgetData?.update)

const loading = ref(false)

// 个人排名信息
const getDate = async () => {
  if (!uuid.value || !token.value) return
  loading.value = true

  try {
    const { data } = await elemeterInfoApi({ uuid: uuid.value, token: token.value })
    const { consume_amount, total_amount, charge_pooling_amount, month_amount, pooling_amount } =
      data.result

    props.widgetData.update = dayjs(data.consume_amount_time).format('MM-DD HH:mm')
    props.widgetData.total_amount = total_amount
    props.widgetData.month_amount = month_amount
    props.widgetData.elePrice =
      total_amount - +consume_amount - pooling_amount + charge_pooling_amount
  } finally {
    loading.value = false
  }
}

// 弹窗
const consumptionRef = ref()
const chargeRef = ref()
const openDialog = (domRef: any) => {
  if (props.dragging) return
  domRef.openDialog()
}

const widgetRef = ref()
const targetIsVisible = useElementVisibility(widgetRef)
watch(targetIsVisible, (val) => {
  if (val && !props.widgetData.update) getDate()
})

if (props.type !== 'addWidget') {
  eventBus.on('onResetHour', () => targetIsVisible.value && getDate())
}
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
                  <Icon style="margin-left: 4px; cursor: pointer" @click="getDate">
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
