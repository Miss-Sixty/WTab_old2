<script setup lang="ts">
defineProps({
  hitokoto: String,
  from_who: {
    type: String,
    default: '佚名'
  }
})
</script>

<template>
  <h1 class="text">TODO</h1>
  <div class="content">
    <!-- <p class="hitoloto">{{ hitokoto }}</p>
    <p class="text">—— {{ from_who }}</p> -->
    <p>1、首页壁纸过渡</p>
    <p>2、导入配置限制导入类型</p>
    <p>3、无自定义壁纸时背景颜色优化</p>
    <p>4、第一个位置无小组件时，再添加小组件添加到错误的位置</p>
    <p>5、考虑要不要右击桌面时显示右键菜单</p>
    <p>6、思考如何做到专属小组件</p>
    <p>7、错误捕获</p>
    <p>8、浏览上报</p>
    <p>9、每日一言适配不同大小，详情改版</p>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: center;
}
.text {
  opacity: 0.6;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
}
.content {
  letter-spacing: 1px;
  line-height: 20px;
  padding: 15px 0;

  p {
    margin: 0;
  }
  .hitoloto {
    margin-bottom: 20px;
    font-size: 14px;
  }
  .text {
    text-align: right;
  }
}
</style>
