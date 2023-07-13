<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Button from '@/components/Button.vue'
import Card from '@/components/Card.vue'
import Cell from '@/components/Cell.vue'
import Image from '@/components/Image/index.vue'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
const props = defineProps({
  data: Object
})

const modelData = computed(
  () => layoutStore.data.find((item: any) => item.id === props.data?.id) || {}
)
</script>
<template>
  <Dialog :width="650" title="图标设置">
    <div class="img" :style="{ backgroundColor: modelData.bgColor }">
      <span>{{ modelData.text }}</span>
      <!-- <Image width="80px" height="80px" :radius="14" :src="data?.icon" /> -->
    </div>
    <Card class="card">
      <Cell title="网站地址">
        <template #right>
          <input type="text" v-model="modelData.url" />
        </template>
      </Cell>
      <Cell title="网站名称">
        <template #right>
          <input type="text" v-model="modelData.name" />
        </template>
      </Cell>
      <Cell title="图标文字">
        <template #right>
          <input type="text" v-model="modelData.text" />
        </template>
      </Cell>
      <Cell title="背景颜色">
        <template #right>
          <div class="color">
            <div
              class="color-item"
              v-for="item in [
                'rgba(255,71,52,1)',
                'rgba(255,122,9,1)',
                'rgba(255,207,12,1)',
                'rgba(42,233,121,1)',
                'rgba(44,214,223,1)',
                'rgba(0,116,255,1)',
                'rgba(109,9,255,1)',
                'rgba(255,36,160,1)'
              ]"
              :key="item"
              :style="{ color: item }"
              @click="modelData.bgColor = item"
            ></div>
          </div>
        </template>
      </Cell>
    </Card>

    <div class="btn">
      <Button>确 定</Button>
      <Button>关 闭</Button>
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
  border: 1px solid #ccc;
  border-radius: 14px;
}

.card {
  input {
    width: 100%;
  }

  .color {
    display: flex;
    justify-content: space-around;
    &-item {
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      border-radius: 6px;
      cursor: pointer;
      background-color: currentcolor;
    }
  }
}

.btn {
  text-align: center;
  margin-top: 40px;
}
</style>
