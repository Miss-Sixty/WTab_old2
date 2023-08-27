<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { Delete } from '@/icons'
const layoutStore = useLayoutStore()
defineOptions({
  name: 'electricitySettings'
})
const emit = defineEmits(['update'])

const dialogVisible = ref(false)
const formRef = ref()
const formData = reactive({
  operaterid: '',
  examplecode: '',
  clientcode: '',
  deptcode: '',
  highlight: [{ key: '', value: '', color: '' }]
})
const id = ref('')
const openDialog = async (data: any) => {
  id.value = data.id

  const { operaterid, examplecode, clientcode, deptcode, highlight } = data.widgetData
  formData.operaterid = operaterid
  formData.examplecode = examplecode
  formData.clientcode = clientcode
  formData.deptcode = deptcode
  formData.highlight = JSON.parse(JSON.stringify(highlight))
  dialogVisible.value = true
}

const submit = async () => {
  try {
    await formRef.value.validate()
    const find = layoutStore.data.find((item: any) => item.id === id.value)
    if (!find) return ElMessage.error('未找到该组件')
    find.widgetData = JSON.parse(
      JSON.stringify({
        ...find.widgetData,
        ...formData,
        updateDate: new Date().getTime()
      })
    )
    dialogVisible.value = false
    ElMessage.success('修改成功！')
    emit('update')
  } catch (e) {}
}

const clearData = () => {
  formRef.value.resetFields()
}

defineExpose({ openDialog })
</script>
<template>
  <Dialog v-model="dialogVisible" :width="650" title="图标设置" @closed="clearData">
    <template #header-right>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
    <el-form ref="formRef" :model="formData" label-width="90px" style="margin-top: 20px">
      <el-form-item
        label="operaterid"
        prop="operaterid"
        :rules="{ required: true, message: 'operaterid 不能为空', trigger: 'blur' }"
      >
        <el-input type="text" v-model="formData.operaterid" placeholder="请输入 operaterid" />
      </el-form-item>
      <el-form-item
        label="examplecode"
        prop="examplecode"
        :rules="{ required: true, message: 'examplecode 不能为空', trigger: 'blur' }"
      >
        <el-input type="text" v-model="formData.examplecode" placeholder="请输入 examplecode" />
      </el-form-item>
      <el-form-item
        label="clientcode"
        prop="clientcode"
        :rules="{ required: true, message: 'clientcode 不能为空', trigger: 'blur' }"
      >
        <el-input type="text" v-model="formData.clientcode" placeholder="请输入 clientcode" />
      </el-form-item>
      <el-form-item
        label="deptcode"
        prop="deptcode"
        :rules="{ required: true, message: 'deptcode 不能为空', trigger: 'blur' }"
      >
        <el-input type="text" v-model="formData.deptcode" placeholder="请输入 deptcode" />
      </el-form-item>
      <el-row class="highlight" v-for="(item, i) in formData.highlight" :key="i">
        <el-form-item label="高亮表格" :prop="`highlight.${i}.color`">
          <el-color-picker v-model="item.color" />
        </el-form-item>
        <el-form-item label-width="0" :prop="`highlight.${i}.key`" class="highlight__key">
          <el-input type="text" v-model="item.key" placeholder="请输入高亮表格 key" />
        </el-form-item>
        <el-form-item label-width="0" :prop="`highlight.${i}.value`" class="highlight__value">
          <el-input type="text" v-model="item.value" placeholder="请输入高亮表格 value" />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="danger" :icon="Delete" @click="formData.highlight.splice(i, 1)" />
        </el-form-item>
      </el-row>

      <el-form-item>
        <el-button @click="formData.highlight.push({ key: '', value: '', color: '' })">
          新增一行高亮配置
        </el-button>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<style lang="scss" scoped>
.highlight {
  display: flex;
  align-items: center;
  &__key {
    flex: 1;
    margin-left: 5px;
    margin-right: 2.5px;
  }
  &__value {
    flex: 1;
    margin-right: 5px;
    margin-left: 2.5px;
  }
}
</style>
