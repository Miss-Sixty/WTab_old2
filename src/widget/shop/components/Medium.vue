<script setup lang="ts">
import { ref } from 'vue'
import { operinfoApi } from '../api'
import userList from '../userList'
import { useElementVisibility } from '@vueuse/core'
import { Refresh } from '@/icons'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  dragging: Boolean
})

const loading = ref(false)
const rankingInfo = ref({
  ranking: 0,
  operSaleInfolist: [
    {
      selfsalenum: 0,
      selfasfactmoney: 0,
      sharasfactmoney: 0,
      factmoney: 0
    }
  ],
  offlinesalenum: 0
})

// 个人排名信息
const init = async (name: string) => {
  if (props.dragging) return
  loading.value = true
  try {
    const res = await operinfoApi(userList[name].operaterid)
    const [data] = res.data.retdata
    rankingInfo.value = data
  } finally {
    loading.value = false
  }
}

const mediumRef = ref()
const targetIsVisible = useElementVisibility(mediumRef)

watch(targetIsVisible, (val) => {
  if (val) init('xiaohong')
})
</script>

<template>
  <div class="medium" ref="mediumRef" v-loading="loading">
    <Icon class="icon" @click="init('xiaohong')">
      <Refresh />
    </Icon>
    <el-row :gutter="20" align="middle">
      <el-col :span="8">
        <el-statistic title="今日排名" :value="+rankingInfo.ranking" />
      </el-col>
      <el-col :span="8">
        <el-statistic
          title="自己销售数量"
          :value="+rankingInfo.operSaleInfolist?.[0]?.selfsalenum"
        />
      </el-col>
      <el-col :span="8">
        <el-statistic title="总销售数量" :value="+rankingInfo.offlinesalenum" />
      </el-col>
    </el-row>
    <el-row :gutter="20" align="middle">
      <el-col :span="8">
        <el-statistic
          title="自己销售额"
          :value="+rankingInfo.operSaleInfolist?.[0]?.selfasfactmoney"
        />
      </el-col>
      <el-col :span="8">
        <el-statistic
          title="合作销售额"
          :value="+rankingInfo.operSaleInfolist?.[0]?.sharasfactmoney"
        />
      </el-col>
      <el-col :span="8">
        <el-statistic title="销售总额" :value="+rankingInfo.operSaleInfolist?.[0]?.factmoney" />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.medium {
  padding: 10px 16px;
  height: 100%;
  position: relative;

  .icon {
    cursor: pointer;
    position: absolute;
    padding: 6px;
    right: 0;
    top: 0;
    box-sizing: content-box;
    z-index: 1;
  }
}

.el-row {
  height: 50%;
  text-align: center;
}
</style>
