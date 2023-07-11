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
  <h1 class="text">每日一言</h1>
  <div class="content">
    <p class="hitoloto">{{ hitokoto }}</p>
    <p class="text">—— {{ from_who }}</p>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 16px;
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
  margin-top: 10px;
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
