<script setup lang="ts">
import dayjs from 'dayjs'
import { useClipboard } from '@vueuse/core'
import { Refresh, FileCopy2Line } from '@/icons'
defineEmits(['reset'])
defineProps({
  hitokoto: {
    type: String,
    default: ''
  },
  from_who: {
    type: String,
    default: '佚名'
  },
  from: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const time = computed(() => ({
  date: dayjs().format('YYYY年MM月DD日'),
  week: dayjs().format('dddd')
}))
const { copy, isSupported, copied } = useClipboard({ legacy: true })
watch(copied, (bl) => {
  bl && ElMessage.success('复制成功！')
})
</script>

<template>
  <h1 class="text">每日一言</h1>
  <div class="content">
    <p class="date">{{ time.date }}</p>
    <p class="week">{{ time.week }}</p>
    <div class="box">
      <p class="hitokoto">{{ hitokoto }}</p>
    </div>
    <p class="from text" v-if="from">《{{ from }}》</p>
    <p class="from_who text" v-if="from_who">—— {{ from_who }} ——</p>
    <div class="btn">
      <el-button :loading="loading" @click.stop="$emit('reset', 'reset')" :icon="Refresh" circle />
      <el-button v-if="isSupported" @click.stop="copy(hitokoto)" :icon="FileCopy2Line" circle />
    </div>
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
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .date,
  .week {
    text-align: center;
    font-size: 18px;
    margin: 0;
    line-height: 1;
  }
  .date {
    margin: 30px 0 5px;
  }
  .box {
    flex: 1;
    display: flex;
    align-items: center;
    .hitokoto {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-align: center;
    }
  }

  .from,
  .from_who {
    text-align: center;
    margin: 0 0 10px;
  }
  .from_who {
    margin-bottom: 15px;
  }

  .btn {
    margin-bottom: 10px;
  }
}
</style>
