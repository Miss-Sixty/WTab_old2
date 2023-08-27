<script setup lang="ts">
import { GroupLine, UserLine, Refresh } from '@/icons'
import MySell from './MySell.vue'
import Salereport from './Salereport.vue'
import { useElementVisibility } from '@vueuse/core'
import eventBus from '@/utils/evevtBus'
import { operinfoApi } from '@/api/shop'
import dayjs from 'dayjs'

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

watch(
  [
    () => props.widgetData?.operaterid,
    () => props.widgetData?.examplecode,
    () => props.widgetData?.clientcode,
    () => props.widgetData?.deptcode
  ],
  ([operaterid, examplecode, clientcode, deptcode]) => {
    if (!operaterid || !examplecode || !clientcode || !deptcode) return
    getDate()
  }
)

const loading = ref(false)
const operaterid = computed(() => props.widgetData?.operaterid)
const examplecode = computed(() => props.widgetData?.examplecode)
const clientcode = computed(() => props.widgetData?.clientcode)
const deptcode = computed(() => props.widgetData?.deptcode)
const ranking = computed(() => props.widgetData?.ranking)
const offlinesalenum = computed(() => props.widgetData?.offlinesalenum)
const factmoney = computed(() => props.widgetData?.factmoney)
const selfsalenum = computed(() => props.widgetData?.selfsalenum)
const selfasfactmoney = computed(() => props.widgetData?.selfasfactmoney)
const sharasfactmoney = computed(() => props.widgetData?.sharasfactmoney)
const highlight = computed(() => props.widgetData?.highlight)
const update = computed(() => dayjs(props.widgetData?.update).format('HH:mm'))

// 获取信息
const getDate = async (message?: string) => {
  if (!operaterid.value) return message && ElMessage.error(message)
  loading.value = true

  try {
    const { retdata, retmsg } = await operinfoApi(
      operaterid.value,
      examplecode.value,
      clientcode.value
    )
    const [firstData] = retdata
    if (!firstData) return
    if (retmsg !== 'ok') return ElMessage.error(retmsg)
    props.widgetData.update = dayjs().valueOf()
    props.widgetData.ranking = firstData.ranking
    props.widgetData.offlinesalenum = firstData.offlinesalenum
    const [operSaleInfolist] = firstData.operSaleInfolist
    props.widgetData.factmoney = operSaleInfolist.factmoney
    props.widgetData.selfsalenum = operSaleInfolist.selfsalenum
    props.widgetData.selfasfactmoney = operSaleInfolist.selfasfactmoney
    props.widgetData.sharasfactmoney = operSaleInfolist.sharasfactmoney
  } finally {
    loading.value = false
  }
}

// 弹窗
const mySellRef = ref()
const salereportRef = ref()
const openDialog = (domRef: any, row: string) => {
  if (props.dragging) return
  domRef.openDialog(row)
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
    <el-row class="content" align="middle">
      <el-col class="left" v-loading="loading" :span="17">
        <el-row align="middle">
          <el-col :span="12">
            <p class="title">
              今日排名 {{ update }}
              <Icon class="refresh" @click="getDate('请先配置设备信息')"><Refresh /></Icon>
            </p>
            <p class="text">{{ ranking }}</p>
          </el-col>
          <el-col :span="12">
            <p class="title">销售总额</p>
            <p class="text">{{ factmoney }}</p>
          </el-col>
          <el-col :span="12">
            <p class="title">销售数量</p>
            <div class="small">
              <p>
                <Icon><UserLine /></Icon> {{ selfsalenum }}
              </p>
              <p>
                <Icon><GroupLine /></Icon> {{ offlinesalenum }}
              </p>
            </div>
          </el-col>
          <el-col :span="12">
            <p class="title">销售额</p>
            <div class="small">
              <p>
                <Icon><UserLine /></Icon> {{ selfasfactmoney }}
              </p>
              <p>
                <Icon><GroupLine /></Icon> {{ sharasfactmoney }}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="right" :span="7">
        <div @click="openDialog(mySellRef, 'today')">今日排名</div>
        <div @click="openDialog(mySellRef, 'month')">本月排名</div>
        <div @click="openDialog(salereportRef, 'salereportRef')">销售详情</div>
      </el-col>
    </el-row>

    <MySell
      ref="mySellRef"
      :operaterid="operaterid"
      :examplecode="examplecode"
      :clientcode="clientcode"
      :highlight="highlight"
    />
    <Salereport
      ref="salereportRef"
      :operaterid="operaterid"
      :examplecode="examplecode"
      :clientcode="clientcode"
      :deptcode="deptcode"
      :highlight="highlight"
    />
  </div>
</template>

<style lang="scss" scoped>
.medium {
  height: 100%;
  .content,
  .left,
  .right {
    height: 100%;
  }
  p {
    margin: 0;
  }
  .left {
    padding: 10px 0;
    text-align: center;
    .el-row {
      height: 100%;
      .title {
        font-size: 12px;
        color: var(--el-text-color-regular);
        display: flex;
        align-items: center;
        justify-content: center;
        .refresh {
          cursor: pointer;
          padding: 5px;
          box-sizing: content-box;
          margin-right: -22px;
        }
      }
      .text {
        font-size: 20px;
        color: var(--el-text-color-primary);
      }
      .small {
        color: var(--el-text-color-primary);
        font-size: 12px;
        margin: 0 3px;
        display: inline-flex;
        flex-direction: column;
        line-height: 1.2;
        text-align: left;
        p:first-child {
          margin-top: 2px;
        }
        .icon {
          margin-right: 4px;
        }
      }
    }
  }
  .right {
    height: 100%;
    border-left: 1px solid var(--el-border-color);
    > div {
      height: 33.333%;
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
  // display: flex;
  // .left {
  //   flex: 1;
  //   display: flex;
  //   flex-direction: column;
  //   height: 100%;
  //   .el-row {
  //     height: 50%;
  //     text-align: center;
  //     overflow: hidden;
  //   }
  // }
}
// .medium {
//   padding: 10px 16px;
//   height: 100%;
//   position: relative;

//   .icon {
//     cursor: pointer;
//     position: absolute;
//     padding: 6px;
//     right: 0;
//     top: 0;
//     box-sizing: content-box;
//     z-index: 1;
//   }
// }

// .el-row {
//   height: 50%;
//   text-align: center;
// }
</style>
