<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import Widget from '@/widget/index.vue'
import widgets from '@/widget'
import Dialog from '@/components/Dialog.vue'
// const emit = defineEmits(['update:modelValue'])

// defineProps({
//   modelValue: {
//     type: Boolean,
//     default: false
//   }
// })

const layoutStore = useLayoutStore()

const onClick = (item: any, size: string) => {
  layoutStore.addPageWidget(item.key, size)
}
</script>
<template>
  <Dialog :bodyStyle="{ padding: '14px' }" title="添加小组件">
    <el-row :gutter="14">
      <el-col :md="12" :sm="24" v-for="(widget, i) in widgets" :key="i">
        <div class="box">
          <el-carousel :autoplay="false">
            <el-carousel-item v-for="(size, i) in widget.sizes" :key="i">
              <Widget
                :size="size"
                type="addWidget"
                @addWidget="onClick(widget, size)"
                scale
                :componentKey="widget.key"
              />
            </el-carousel-item>
          </el-carousel>

          <div class="footer">
            <h2>{{ widget.name }}</h2>
            <p>{{ widget.text }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </Dialog>
</template>
<style scoped lang="scss">
.el-col {
  &:not(:last-child) {
    margin-bottom: 14px;
  }
}
.box {
  background-color: #303030;
  border-radius: 10px;
  height: 390px;

  .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :deep(.el-carousel__button) {
    width: 6px;
    height: 6px;
    border-radius: 3px;
  }
  .footer {
    padding: 1px 14px 14px;
    h2 {
      font-size: 16px;
      font-weight: bold;
      margin: 5px 0 0;
    }
    p {
      font-size: 14px;
      margin: 0;
      color: rgb(142, 142, 148);
      // 超过两行省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
