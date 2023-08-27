<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
defineOptions({
  name: 'electricitySettings'
})
const emit = defineEmits(['update'])

const dialogVisible = ref(false)
const formRef = ref()
const formData = reactive({
  uuid: '',
  token: ''
})
const id = ref('')
const openDialog = async (data: any) => {
  id.value = data.id
  const { uuid, token } = data.widgetData
  formData.uuid = uuid
  formData.token = token
  dialogVisible.value = true
}

const submit = async () => {
  try {
    await formRef.value.validate()
    const find = layoutStore.data.find((item: any) => item.id === id.value)
    if (!find) return ElMessage.error('未找到该组件')
    find.widgetData = {
      ...find.widgetData,
      ...formData,
      updateDate: new Date().getTime()
    }
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

    <el-form ref="formRef" :model="formData" label-width="80px" style="margin-top: 20px">
      <el-form-item
        label="UUID"
        prop="uuid"
        :rules="{ required: true, message: 'uuid 不能为空', trigger: 'blur' }"
      >
        <el-input type="text" v-model="formData.uuid" placeholder="请输入 uuid" />
      </el-form-item>

      <el-form-item
        label="TOKEN"
        prop="token"
        :rules="{ required: true, message: 'token 不能为空', trigger: 'blur' }"
      >
        <el-input type="text" v-model="formData.token" placeholder="请输入 token" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<style lang="scss" scoped></style>
