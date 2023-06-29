<script setup lang="ts">
import dayjs from 'dayjs'
import { useClipboard } from '@vueuse/core'
defineEmits(['reset'])
defineProps({
  hitokoto: {
    type: String,
    default: ''
  },
  from_who: {
    type: String,
    default: ''
  },
  from: {
    type: String,
    default: ''
  }
})
const time = computed(() => ({
  date: dayjs().format('YYYY年MM月DD日'),
  week: dayjs().format('dddd')
}))

const { copy, isSupported } = useClipboard()
</script>
<template>
  <el-dialog
    align-center
    class="widget-hitokoto-dialog"
    append-to-body
    v-bind="$attrs"
    width="1024px"
    center
  >
    <h1 class="text">每日一言</h1>
    <p class="date">{{ time.date }}</p>
    <p class="week">{{ time.week }}</p>
    <p class="hitokoto">{{ hitokoto }}</p>
    <p class="from text" v-if="from">《{{ from }}》</p>
    <p class="from_who text" v-if="from_who">—— {{ from_who }} ——</p>
    <div class="btn">
      <el-button @click="$emit('reset')">刷新一言</el-button>
      <el-button v-if="isSupported" @click="copy(hitokoto)">复 制</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.widget-hitokoto-dialog {
  border-radius: 14px;
  overflow: hidden;
  max-width: calc(100vw - 40px);
  background-color: #141414;
  .el-dialog__header {
    height: 0;
    padding: 0;
    margin: 0;
    .el-dialog__headerbtn {
      left: 0;

      &:hover .el-icon {
        color: #fff;
      }

      .el-icon {
        background-color: #f56c6c;
        color: #f56c6c;
        padding: 3px;
        border-radius: 99px;
        cursor: pointer;
        transition: color 0.3s;
      }
    }
  }
  .el-dialog__body {
    padding: 0;
    height: 570px;
    color: #fff;
    position: relative;
    text-align: center;
    .text {
      opacity: 0.6;
      color: rgb(255, 255, 255);
      font-weight: 400;
      font-size: 14px;
      line-height: 1;
    }
    h1 {
      margin-top: 36px;
    }
    .date {
      font-size: 22px;
      margin: 50px 0 0;
    }
    .week {
      font-size: 22px;
      margin: 0;
    }
    .hitokoto {
      font-size: 18px;
      margin: 90px 0 0;
    }
    .from {
      font-size: 16px;
      margin-top: 40px;
    }
    .from_who {
      font-size: 16px;
    }
    .btn {
      position: absolute;
      bottom: 80px;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
