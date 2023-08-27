<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import { salereportApi } from '@/api/shop'
import { useStyleTag } from '@vueuse/core'
import { Close } from '@/icons'
import useLayoutStore from '@/stores/layout'
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
  deptcode: {
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
  retdata: []
})

const tableRef = ref()
const getDetailDate = async () => {
  state.loading = true
  try {
    const { retdata, retmsg } = await salereportApi({
      operaterid: props.operaterid,
      examplecode: props.examplecode,
      clientcode: props.clientcode,
      deptcode: props.deptcode
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
const openDialog = async () => {
  state.dialogVisible = true
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
    append-to-body
    :with-header="false"
    :size="layoutStore.colsNum < 5 ? '100%' : 500"
    @closed="closedChange"
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
        <el-table-column prop="operName" label="姓名" show-overflow-tooltip />
        <el-table-column prop="type" label="属性" width="90">
          <template #default="{ row }">
            <el-tag :type="row.type === '销售单' ? 'success' : 'danger'" disable-transitions>
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="money" label="金额" width="90" />
        <el-table-column prop="inputDate" label="时间" show-overflow-tooltip />
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
