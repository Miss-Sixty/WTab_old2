<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import { Miaomiao } from '@/icons'
import Icon from '@/components/Icon.vue'
</script>

<template>
  <Dialog :width="650" title="关于我们">
    <div class="content">
      <Icon><Miaomiao /></Icon>
      <div class="name">
        <p>WTab</p>
        <p>小组件标签页，简洁好用的面板信息展示，最终目标是展示和操作智能家居及物联网硬件。</p>
      </div>

      <div class="link">
        <el-link href="https://web.wtab.cn" target="_blank" :underline="false" type="primary">
          官方网站
        </el-link>
        <el-link
          href="https://support.qq.com/products/592621/"
          target="_blank"
          :underline="false"
          type="primary"
        >
          问题反馈
        </el-link>
      </div>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.content {
  text-align: center;

  .icon {
    margin: 70px 0 10px;
    font-size: 110px;
  }

  .name {
    P {
      min-width: 50%;
      max-width: 70%;
      margin: auto;
      &:first-child {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      &:last-child {
        font-size: 12px;
        color: rgb(142, 142, 148);
      }
    }
  }

  .link {
    margin-top: 15px;
    a {
      margin: 0 5px;
    }
  }
}
</style>
