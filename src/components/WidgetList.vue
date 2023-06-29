<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import Widget from '@/widget/index.vue'
import widgets from '@/widget'
import Dialog from '@/components/Dialog.vue'

const layoutStore = useLayoutStore()

const onClick = (item: any, size: string) => {
  layoutStore.addPageWidget(item.key, size)
}
</script>
<template>
  <Dialog title="添加小组件">
    <div>
      <div class="item" v-for="(widget, i) in widgets" :key="i">
        <h2>{{ widget.name }}</h2>
        <p>{{ widget.text }}</p>
        <div class="row">
          <div class="col" v-for="(size, i) in widget.sizes" :key="i">
            <Widget
              :size="size"
              type="addWidget"
              @addWidget="onClick(widget, size)"
              scale
              :componentData="widget.component"
            ></Widget>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
<style scoped lang="scss">
.item {
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0 0;
  }
  p {
    font-size: 14px;
    margin: 0;
  }

  .row {
    display: flex;
    margin: -12px -12px;
    flex-wrap: wrap;
    .col {
      padding: 12px;
    }
  }
}

@media only screen and (min-width: 705px) {
  .col {
    max-width: 50%;
    flex: 0 0 50%;
  }
}
@media only screen and (max-width: 705px) {
  .col {
    max-width: 100%;
    flex: 0 0 100%;
  }
}
</style>
