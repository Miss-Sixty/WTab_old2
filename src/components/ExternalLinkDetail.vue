<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import useLayoutStore from '@/stores/layout'
import { AddLine, EditBox, Delete } from '@/icons'
import { useFileDialog, watchDebounced } from '@vueuse/core'
import ExternalLinkCropperDialog from './ExternalLinkCropperDialog.vue'

const { open, onChange } = useFileDialog({
  multiple: false
  // accept: '.wtab'
})
const externalLinkCropperDialogRef = ref()
onChange((files) => {
  const [rawFile]: any = files || []
  const url = URL.createObjectURL(rawFile)
  externalLinkCropperDialogRef.value.open(url)
})

const layoutStore = useLayoutStore()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  // itemData: {
  //   type: Object,
  //   default: () => {}
  // },
  // widgetData: {
  //   type: Object,
  //   default: () => {}
  // }
  id: {
    type: String,
    default: ''
  },
  src: {
    type: String,
    default: ''
  }
  // name: {
  //   type: String,
  //   default: ''
  // },
  // bgColor: {
  //   type: String,
  //   default: null
  // },
  // icon: {
  //   type: String,
  //   default: ''
  // },
  // iconType: {
  //   type: String,
  //   default: 'pure'
  // }
})
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// const _iconType = ref(props.iconType)

// const _name = ref(props.name)
// const _bgColor = ref(props.bgColor)
// const _icon = ref(props.icon)
// const onlineIcon = ref([])
// const onlineActiveIcon = ref([])

// const cropperImg = ref('')

// const base64ImgtoFile = (dataurl: any, filename = 'file') => {
//   const arr = dataurl.split(',')
//   const mime = arr[0].match(/:(.*?);/)[1]
//   const suffix = mime.split('/')[1]
//   const bstr = atob(arr[1])
//   let n = bstr.length
//   const u8arr = new Uint8Array(n)
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n)
//   }
//   return new File([u8arr], `${filename}.${suffix}`, {
//     type: mime
//   })
// }
// watch(cropperVisible, () => {
//   if (!cropperImg.value) {
//     const file = base64ImgtoFile(_icon.value) // 得到File对象
//     const imgUrl = window.webkitURL.createObjectURL(file) || window.URL.createObjectURL(file) // imgUrl图片网络路径
//     cropperImg.value = imgUrl
//   }
// })

const dialogVisible = ref(false)

const id = ref('')
const src = ref('')
const name = ref('')
const iconType = ref('online')
const onlineIcon = ref('')
const onlineIconList: any = ref([])
const pureIcon = ref()
const localIcon = ref()
const bgColor = ref('#FBAF5D')

const submit = () => {
  const find = layoutStore.data.find((item: any) => item.id === id.value)
  if (!find) return ElMessage.error('未找到该组件')

  find.widgetData = {
    ...find.widgetData,
    src: src.value,
    name: name.value,
    iconType: iconType.value,
    onlineIcon: onlineIcon.value,
    pureIcon: pureIcon.value,
    localIcon: localIcon.value,
    bgColor: bgColor.value
  }

  dialogVisible.value = false
  ElMessage.success('修改成功！')
}

const openDialog = async (data: any) => {
  dialogVisible.value = true
  const { widgetData } = data
  id.value = data.id
  name.value = widgetData.name
  src.value = widgetData.src
  iconType.value = widgetData.iconType
  onlineIcon.value = widgetData.onlineIcon
  pureIcon.value = widgetData.pureIcon
  localIcon.value = widgetData.localIcon
  if (widgetData.iconType === 'online') {
    if (widgetData.onlineIcon.value) onlineIconList.value.push(widgetData.onlineIcon.value)
    // onlineIconLoading.value = true
  }
}

defineExpose({ openDialog })

const iconTypeChange = (val: string) => {
  console.log(val)
  getOnlineIcon()
}

const onlineIconLoading = ref(false)
const getOnlineIcon = async () => {
  if (iconType.value !== 'online') return
  onlineIconList.value = []
  name.value = ''
  onlineIconLoading.value = true
  try {
    if (!src.value) return
    const res = await fetch(`/admin/logo?url=${src.value}`)
    const { data, code, message } = await res.json()
    console.log(2222, data)
    if (code !== 0) return ElMessage.error(message)
    // const data = {
    //   name: '百度',
    //   host: 'www.baidu.com',
    //   logo: [
    //     'https://infinityicon.infinitynewtab.com/user-share-icon/c9f7546ad597dd7fb53e8129b6c07877.png',
    //     'https://infinitypro-img.infinitynewtab.com/custom-icon/9001c1m84th5ijro0bxdpdr73k5nhe.png',
    //     'https://infinitypro-img.infinitynewtab.com/custom-icon/9001c1jh0p5nveu30fijtqj5y8af79.png',
    //     'https://infinitypro-img.infinitynewtab.com/custom-icon/8001d0h67jq9owtrwukrxa71f7u0zm.png',
    //     'https://infinitypro-img.infinitynewtab.com/custom-icon/9001ciebqcpkncs4a1lmhxm5ryz0yl.png',
    //     'https://infinitypro-img.infinitynewtab.com/custom-icon/9001ch0q92fpbyuc925iqvkao74p01.png'
    //   ]
    // }
    onlineIconList.value = onlineIconList.value.concat(data.icons)
    name.value = data.name
  } catch {
    onlineIconList.value = []
    name.value = ''
  } finally {
    onlineIconLoading.value = false
  }
}

watchDebounced(src, getOnlineIcon, { debounce: 1000, maxWait: 5000 })

const nameFontSize = computed(() => {
  const sizes = ['35px', '26px', '20px', '15px']
  return {
    fontSize: sizes[name.value?.length - 1] || '12px'
  }
})

const colors = [
  '#FBAF5D',
  '#82CA9C',
  '#BD8CBF',
  '#7DA7D9',
  '#ACD373',
  '#F5989D',
  '#FF4734',
  '#FF7A09'
]
const colorType = ref(0) //0:固定色 1:自选色
const setBgColor = (color: string, type = 0) => {
  bgColor.value = color
  colorType.value = type
}

watch(
  () => props.modelValue,
  (val) => {
    //关闭弹窗时重置数据
    if (val) return
    id.value = ''
    src.value = ''
    name.value = ''
    iconType.value = 'online'
    onlineIcon.value = ''
    onlineIconList.value = []
    pureIcon.value = ''
    localIcon.value = ''
    bgColor.value = '#FBAF5D'
  }
)

const formData = ref({
  protocol: 'http://',
  url: ''
})
const select = ref('http')

// function isValidHttpUrl(
//   rule: any,
//   value: any,
//   callback: any
//   //  url: string
// ) {
//   if (!value) {
//     return callback(new Error('请输入网站地址'))
//   }
//   let url
//   try {
//     console.log(33, formData.value.protocol + value)
//     url = new URL(formData.value.protocol + value)
//     console.log(22, url)
//   } catch (_) {
//     return callback(new Error('请输入正确的网站地址'))
//   }

//   if (url.protocol === 'http:' || url.protocol === 'https:') {
//     return callback()
//   } else {
//     return callback(new Error('请输入正确的网站地址'))
//   }
// }

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
console.log(isValidHttpUrl('https://www.baidu'))
</script>
<template>
  <Dialog v-model="dialogVisible" :width="650" title="图标设置">
    {{ formData }}
    <Card>
      <el-form :model="formData">
        <el-form-item
          label="网站地址"
          prop="url"
          :rules="{ validator: isValidHttpUrl, trigger: 'change' }"
        >
          <el-input type="text" v-model="formData.url">
            <template #prepend>
              <el-select v-model="formData.protocol" style="width: 75px">
                <el-option label="http" value="http://" />
                <el-option label="https" value="https://" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="网站名称">
          <el-input type="text" v-model="name" />
        </el-form-item>
        <el-form-item label="图标类型">
          <el-radio-group v-model="iconType" @change="iconTypeChange">
            <el-radio-button label="online">在线图标</el-radio-button>
            <el-radio-button label="pure">纯色图标</el-radio-button>
            <el-radio-button label="local">本地上传</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="选择图标"
          :style="{ marginBottom: iconType === 'online' ? 0 : '18px' }"
        >
          <div class="onlineList" v-if="iconType === 'online'" v-loading="onlineIconLoading">
            <img
              v-for="item in onlineIconList"
              :key="item"
              class="icon online"
              :class="{ active: onlineIcon === item }"
              :src="item"
              @click="onlineIcon = item"
            />
          </div>
          <div v-if="iconType === 'pure'" class="icon pure" :style="{ backgroundColor: bgColor }">
            <span :style="nameFontSize">{{ name }}</span>
          </div>

          <div v-if="iconType === 'local'" class="icon local active">
            <div class="add" v-if="!src" @click="open()">
              <Icon><AddLine /></Icon>
            </div>

            <!-- <div v-else class="edit-or-del">
              <Icon @click="cropperVisible = true"><EditBox /></Icon>
              <Icon @click="_icon = ''"><Delete /></Icon>
            </div> -->
          </div>
        </el-form-item>

        <el-form-item v-show="iconType === 'pure'" label="背景颜色">
          <div class="color">
            <div
              class="color-item"
              v-for="item in colors"
              :key="item"
              :style="{ backgroundColor: item }"
              :class="{ active: bgColor === item && colorType === 0 }"
              @click="setBgColor(item)"
            />
            <!-- <div
              class="color-item other-color"
              :class="{ active: colorType === 1 }"
              @click="colorType = 1"
            >
              <input type="color" v-model="_bgColor" />
            </div> -->
          </div>
        </el-form-item>
      </el-form>
    </Card>

    <ExternalLinkCropperDialog ref="externalLinkCropperDialogRef" />

    <div class="btn">
      <el-button @click="dialogVisible = false">关 闭</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.title {
  margin-right: 40px;
  height: 40px;
  line-height: 40px;
}
.el-input {
  flex: 1;
}

.onlineList {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  width: 100%;
  min-height: 60px;
}

.icon {
  height: 70px;
  width: 70px;
  border-radius: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    border: 2px solid #ccc;
  }
  &.online {
    cursor: pointer;
  }
  &.pure {
    padding: 4px;
    line-height: 1.4;
  }
  &.local {
    //   background-size: cover;
    //   background-repeat: no-repeat;
    //   position: relative;

    .add {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      cursor: pointer;
      .icon {
        font-size: 36px;
        color: var(--w-upload-icon-color);
      }
    }

    //   .edit-or-del {
    //     display: none;
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    //     width: 100%;
    //     height: 100%;
    //     background-color: rgba(0, 0, 0, 0.5);
    //     display: flex;
    //     justify-content: space-evenly;
    //     align-items: center;
    //     opacity: 0;
    //     transition: all 0.3s;
    //     border-radius: 14px;
    //     .icon {
    //       font-size: 24px;
    //       color: #fff;
    //       cursor: pointer;
    //     }
    //     &:hover {
    //       opacity: 1;
    //     }
    //   }
  }
}

.color {
  display: flex;
  justify-content: space-between;
  flex: 1;
  &-item {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 10px;
    cursor: pointer;

    &.active {
      border: 2px solid #ccc;
    }

    &.other-color {
      background-image: url('data:image/jpeg;base64,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');
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      overflow: hidden;
      input {
        opacity: 0;
        inset: 0;
        position: absolute;
        cursor: pointer;
      }
    }
  }
}

.btn {
  text-align: center;
  margin-top: 40px;
}

.cropper {
  padding: 10px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__content {
    width: 300px;
    height: 300px;
  }
  &__btn {
    margin-top: 20px;
  }
}
</style>
