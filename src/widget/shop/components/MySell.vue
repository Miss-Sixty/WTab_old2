<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { operrankinginfoApi } from '@/api/shop'
import dayjs from 'dayjs'
import useLayoutStore from '@/stores/layout'
import { useStyleTag } from '@vueuse/core'
import { Close } from '@/icons'
const layoutStore = useLayoutStore()

const props = defineProps({
  operaterid: {
    type: String,
    default: ''
  },
  examplecode: {
    type: String,
    default: ''
  },
  clientcode: {
    type: String,
    default: ''
  },
  highlight: {
    type: Array,
    default: () => []
  }
})

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
  }
}

const tableRef = ref()
const getDetailDate = async () => {
  state.loading = true
  try {
    const { retdata, retmsg } = await operrankinginfoApi({
      operaterid: props.operaterid,
      examplecode: props.examplecode,
      clientcode: props.clientcode,
      ...date[state.dateType]
    })
    if (retmsg !== 'ok') return ElMessage.error(retmsg)
    state.retdata = retdata
    const [firstData]: any = props.highlight
    const index = retdata.findIndex((item: any) => item[firstData.key] === firstData.value) - 6

    await nextTick()
    tableRef.value.scrollTo({ top: index * 40, behavior: 'smooth' })
  } finally {
    state.loading = false
  }
}

const color = computed(() => {
  let css = ''
  props.highlight.forEach((item: any, i) => {
    css += `.color${i} { --el-table-tr-bg-color: ${item.color} }`
  })
  return css
})

watch(
  () => state.dialogVisible,
  (bl) => {
    const { load, unload, isLoaded } = useStyleTag(color.value)
    if (!bl) return unload()
    if (!isLoaded) load()
  }
)

const tableRowClassName = ({ row }: any) => {
  for (let i = 0; i < props.highlight.length; i++) {
    const item: any = props.highlight[i]
    if (row[item.key] === item.value) {
      return 'color' + i
    }
  }
}

const openDialog = async (dateType: string) => {
  state.dialogVisible = true
  state.dateType = dateType
  getDetailDate()
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
    :size="layoutStore.colsNum < 5 ? '100%' : 500"
    @closed="closedChange"
    append-to-body
    :with-header="false"
  >
    <div class="content">
      <Icon class="close-icon" @click="state.dialogVisible = false"><Close /></Icon>
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
  position: relative;

  .close-icon {
    position: absolute;
    right: 0;
    top: 2px;
    z-index: 9999;
    font-size: 24px;
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
