<script setup lang="ts">
defineProps({
  hitokoto: {
    type: String,
    default: ''
  },
  from_who: {
    type: String,
    default: '佚名'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <h1 class="text">每日一言</h1>
  <div class="content" v-loading="loading">
    <p class="hitokoto">
      {{ hitokoto }}
    </p>
    <p class="from_who text">—— {{ from_who || '佚名' }}</p>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  position: absolute;
  top: 5px;
  width: 100%;
  text-align: center;
}
.text {
  opacity: 0.6;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
}
.content {
  line-height: 20px;
  padding: 10px;
  width: 100%;
  margin-top: 15px;

  p {
    margin: 0;
  }
  .hitokoto {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .from_who {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
