<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Cell from '@/components/Cell.vue'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  id: String,
  src: String,
  name: String,
  bgColor: String,
  modelValue: Boolean
})
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const modelData: any = reactive({
  src: props.src,
  name: props.name,
  bgColor: props.bgColor
})

const submit = () => {
  const find = layoutStore.data.find((item: any) => item.id === props.id)
  if (!find) return
  find.widgetData = modelData
  modelValue.value = false
}

const colors = [
  '#FBAF5D',
  '#82CA9C',
  '#BD8CBF',
  '#7DA7D9',
  '#ACD373',
  '#F5989D',
  '#FF4734',
  '#FF7A09'
]
</script>
<template>
  <Dialog v-model="modelValue" :width="650" title="图标设置">
    <div class="img" :style="{ backgroundColor: modelData.bgColor }">
      <span>{{ modelData.name }}</span>
    </div>
    <Card class="card">
      <Cell title="网站地址">
        <template #right>
          <input type="text" v-model="modelData.src" />
        </template>
      </Cell>
      <Cell title="网站名称">
        <template #right>
          <input type="text" v-model="modelData.name" />
        </template>
      </Cell>
      <Cell title="背景颜色">
        <template #right>
          <div class="color">
            <div
              class="color-item"
              v-for="item in colors"
              :key="item"
              :style="{ color: item }"
              :class="{ active: modelData.bgColor === item }"
              @click="modelData.bgColor = item"
            ></div>
          </div>
        </template>
      </Cell>
    </Card>

    <div class="btn">
      <Button @click="modelValue = false">关 闭</Button>
      <Button @click="submit">确 定</Button>
    </div>
  </Dialog>
</template>

<style lang="scss">
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 20px;
  height: 80px;
  width: 80px;
  border: 2px solid #ccc;
  border-radius: 14px;
}

.card {
  input {
    width: 100%;
  }

  .color {
    display: flex;
    justify-content: space-between;
    &-item {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border-radius: 6px;
      cursor: pointer;
      background-color: currentcolor;

      &.active {
        border: 2px solid #fff;
      }
    }
  }
}

.btn {
  text-align: center;
  margin-top: 40px;
}
</style>
