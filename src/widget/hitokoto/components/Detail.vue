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
    default: ''
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

const { copy, isSupported } = useClipboard()
</script>
<template>
  <Dialog :header="false" :width="650" title="关于我们">
    <div class="detail">
      <!--  <div class="detail__top">
        <h1 class="text">每日一言</h1>
        <p class="date">{{ time.date }}</p>
        <p class="week">{{ time.week }}</p>
        <p class="hitokoto">{{ hitokoto }}</p>
        <p class="from text" v-if="from">《{{ from }}》</p>
        <p class="from_who text" v-if="from_who">—— {{ from_who }} ——</p>
      </div>
      <div class="detail__btn">
        <el-button
          :loading="loading"
          @click.stop="$emit('reset', 'reset')"
          :icon="Refresh"
          circle
        />
        <el-button v-if="isSupported" @click.stop="copy(hitokoto)" :icon="FileCopy2Line" circle />
      </div> -->
    </div>
  </Dialog>
</template>

<style lang="scss">
.detail {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__top {
    flex: 1;
    .text {
      opacity: 0.6;
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
  }
  &__btn {
    margin-bottom: 80px;
  }
}
</style>
