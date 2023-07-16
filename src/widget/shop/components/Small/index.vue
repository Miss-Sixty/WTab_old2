<script setup lang="ts">
import { ref } from 'vue'
import MySell from './components/MySell.vue'
import Salereport from './components/Salereport.vue'

const props = defineProps({
  dragging: Boolean
})

// 弹窗
const mySellRef = ref()
const salereportRef = ref()
const openDialog = (domRef: any, row: object) => {
  if (props.dragging) return
  domRef.openDialog(row)
}
</script>

<template>
  <el-row>
    <el-col :span="12" @click="openDialog(mySellRef, { name: 'xiaohong', dateType: 'today' })">
      今日<br />排名
    </el-col>
    <el-col :span="12" @click="openDialog(mySellRef, { name: 'xiaohong', dateType: 'month' })">
      本月<br />排名
    </el-col>
    <el-col :span="12" @click="openDialog(mySellRef, { name: 'xiaohong', dateType: 'year' })">
      今年<br />排名
    </el-col>
    <el-col
      :span="12"
      @click="openDialog(salereportRef, { name: 'xiaohong', dateType: 'salereportRef' })"
    >
      销售<br />详情
    </el-col>
  </el-row>

  <MySell ref="mySellRef" />
  <Salereport ref="salereportRef" />
</template>

<style lang="scss" scoped>
.el-row {
  height: 100%;
  text-align: center;
  color: var(--el-text-color-primary);
  font-size: 14px;
  .el-col {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;

    &:nth-child(2n + 1) {
      border-right: 1px solid var(--el-border-color);
    }
    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: 1px solid var(--el-border-color);
    }

    &:hover {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}
</style>
