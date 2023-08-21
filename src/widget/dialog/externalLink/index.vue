<script setup lang="ts">
defineOptions({
  name: 'ExternalLinkDialog'
})
import evevtBus from '@/utils/evevtBus'
import useLayoutStore from '@/stores/layout'
import { logoApi } from '@/api/externalLink'
import { i2b } from '@/utils/img2b64'

const layoutStore = useLayoutStore()

const dialogVisible = ref(false)
const formData = reactive({
  protocol: 'https://',
  src: '',
  name: '',
  onlineIcon: '',
  iconType: ''
})
const id = ref('')
const formRef = ref()

const openDialog = async (data: any) => {
  console.log(2323, data)
  dialogVisible.value = true
  id.value = data.id
  const { src, name, onlineIcon, iconType } = data.widgetData
  formData.src = src
  formData.name = name
  formData.onlineIcon = onlineIcon
  formData.iconType = iconType
  src && getOnlineIcon()
  // name.value = widgetData.name
  // iconType.value = widgetData.iconType
  // onlineIcon.value = widgetData.onlineIcon
  // pureIcon.value = widgetData.pureIcon
  // localIcon.value = widgetData.localIcon
  // if (widgetData.iconType === 'online') {
  //   if (widgetData.onlineIcon.value) onlineIconList.value.push(widgetData.onlineIcon.value)
  //   // onlineIconLoading.value = true
  // }
}
evevtBus.on('externalLinkDetailOpenDialog', openDialog)

const submit = async () => {
  const find = layoutStore.data.find((item: any) => item.id === id.value)
  if (!find) return ElMessage.error('未找到该组件')
  console.log('submit', find)

  const baseUrl = await i2b(formData.onlineIcon)
  find.widgetData = {
    ...find.widgetData,
    protocol: formData.protocol,
    src: formData.src,
    name: formData.name,
    onlineIcon: baseUrl
    // iconType: iconType.value,
    // onlineIcon: onlineIcon.value,
    // pureIcon: pureIcon.value,
    // localIcon: localIcon.value,
    // bgColor: bgColor.value
  }

  dialogVisible.value = false
  ElMessage.success('修改成功！')
}

// const iconTypeChange = (val: string) => {
//   console.log(val)
//   getOnlineIcon()
// }

// import Card from '@/components/Card.vue'
// import Icon from '@/components/Icon.vue'
// import { AddLine, EditBox, Delete } from '@/icons'
// import { useFileDialog, watchDebounced } from '@vueuse/core'
// import ExternalLinkCropperDialog from './ExternalLinkCropperDialog.vue'

// const { open, onChange } = useFileDialog({
//   multiple: false
//   // accept: '.wtab'
// })
// const externalLinkCropperDialogRef = ref()
// onChange((files) => {
//   const [rawFile]: any = files || []
//   const url = URL.createObjectURL(rawFile)
//   externalLinkCropperDialogRef.value.open(url)
// })

// const emit = defineEmits(['update:modelValue'])
// const props = defineProps({
//   modelValue: {
//     type: Boolean,
//     default: false
//   },
//   // itemData: {
//   //   type: Object,
//   //   default: () => {}
//   // },
//   // widgetData: {
//   //   type: Object,
//   //   default: () => {}
//   // }
//   id: {
//     type: String,
//     default: ''
//   },
//   src: {
//     type: String,
//     default: ''
//   }
//   // name: {
//   //   type: String,
//   //   default: ''
//   // },
//   // bgColor: {
//   //   type: String,
//   //   default: null
//   // },
//   // icon: {
//   //   type: String,
//   //   default: ''
//   // },
//   // iconType: {
//   //   type: String,
//   //   default: 'pure'
//   // }
// })
// const modelValue = computed({
//   get: () => props.modelValue,
//   set: (val) => emit('update:modelValue', val)
// })

// // const _iconType = ref(props.iconType)

// // const _name = ref(props.name)
// // const _bgColor = ref(props.bgColor)
// // const _icon = ref(props.icon)
// // const onlineIcon = ref([])
// // const onlineActiveIcon = ref([])

// // const cropperImg = ref('')

// // const base64ImgtoFile = (dataurl: any, filename = 'file') => {
// //   const arr = dataurl.split(',')
// //   const mime = arr[0].match(/:(.*?);/)[1]
// //   const suffix = mime.split('/')[1]
// //   const bstr = atob(arr[1])
// //   let n = bstr.length
// //   const u8arr = new Uint8Array(n)
// //   while (n--) {
// //     u8arr[n] = bstr.charCodeAt(n)
// //   }
// //   return new File([u8arr], `${filename}.${suffix}`, {
// //     type: mime
// //   })
// // }
// // watch(cropperVisible, () => {
// //   if (!cropperImg.value) {
// //     const file = base64ImgtoFile(_icon.value) // 得到File对象
// //     const imgUrl = window.webkitURL.createObjectURL(file) || window.URL.createObjectURL(file) // imgUrl图片网络路径
// //     cropperImg.value = imgUrl
// //   }
// // })

// const id = ref('')
// const src = ref('')
// const name = ref('')
// const onlineIcon = ref('')
// const onlineIconList: any = ref([])
// const pureIcon = ref()
// const localIcon = ref()
// const bgColor = ref('#FBAF5D')

// watchDebounced(src, getOnlineIcon, { debounce: 1000, maxWait: 5000 })

// const nameFontSize = computed(() => {
//   const sizes = ['35px', '26px', '20px', '15px']
//   return {
//     fontSize: sizes[name.value?.length - 1] || '12px'
//   }
// })

// const colors = [
//   '#FBAF5D',
//   '#82CA9C',
//   '#BD8CBF',
//   '#7DA7D9',
//   '#ACD373',
//   '#F5989D',
//   '#FF4734',
//   '#FF7A09'
// ]
// const colorType = ref(0) //0:固定色 1:自选色
// const setBgColor = (color: string, type = 0) => {
//   bgColor.value = color
//   colorType.value = type
// }

const clearData = () => {
  console.log(111, formData)
  formRef.value.resetFields()

  // formData.protocol = 'https://'
  // formData.src = ''
  // formData.name = ''
  // formData.onlineIcon = ''
  id.value = ''
  onlineIconLoading.value = false
  onlineIconList.value = []
  console.log(222, formData)
}

function isValidHttpUrl(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error('请输入网站地址'))
  }
  try {
    new URL(formData.protocol + value)
  } catch (_) {
    return callback(new Error('请输入正确的网站地址'))
  }
}

const onlineIconLoading = ref(false)
const onlineIconList = ref([])
const getOnlineIcon = async () => {
  if (formData.iconType !== 'online') return
  if (!formData.src) return
  onlineIconList.value = []
  onlineIconLoading.value = true
  try {
    const { data, code, message } = await logoApi(formData.src)
    if (code !== 0) return ElMessage.error(message)
    const { icons, name } = data
    onlineIconList.value = icons
    formData.name = name
  } catch {
    onlineIconList.value = []
    formData.name = ''
  } finally {
    onlineIconLoading.value = false
  }
}
</script>
<template>
  <Dialog v-model="dialogVisible" :width="650" title="图标设置" @closed="clearData">
    <template #header-right>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>

    <el-form ref="formRef" :model="formData">
      <el-form-item
        label="网站地址"
        prop="src"
        :rules="{ validator: isValidHttpUrl, trigger: 'change' }"
      >
        <el-input type="text" v-model="formData.src" placeholder="请输入网址" @change="getOnlineIcon">
          <template #prepend>
            <el-select v-model="formData.protocol" style="width: 75px">
              <el-option label="https" value="https://" />
              <el-option label="http" value="http://" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="网站名称" prop="name">
        <el-input type="text" v-model="formData.name" placeholder="请输入网站名称" />
      </el-form-item>

      <el-form-item label="图标类型" prop="iconType">
        <el-radio-group v-model="formData.iconType">
          <el-radio-button label="online">在线图标</el-radio-button>
          <!-- <el-radio-button label="pure">纯色图标</el-radio-button>
          <el-radio-button label="local">本地上传</el-radio-button> -->
        </el-radio-group>
      </el-form-item>

      <el-form-item
        class="icon-box"
        label="选择图标"
        :style="{ marginBottom: formData.iconType === 'online' ? 0 : '18px' }"
        :prop="formData.iconType + 'Icon'"
      >
        <div class="onlineList" v-if="formData.iconType === 'online'" v-loading="onlineIconLoading">
          <div class="grid" v-if="onlineIconList.length">
            <el-image
              v-for="src in onlineIconList"
              :key="src"
              class="icon online"
              :src="src"
              :class="{ active: formData.onlineIcon === src }"
              @click="formData.onlineIcon = src"
            />
          </div>

          <el-empty
            style="padding: 0"
            v-else
            description="暂未获取到当前链接的图标"
            :image-size="60"
          >
            <el-button type="primary" plain @click="getOnlineIcon">重 试</el-button>
          </el-empty>
        </div>
        <!-- <div v-if="iconType === 'pure'" class="icon pure" :style="{ backgroundColor: bgColor }">
          <span :style="nameFontSize">{{ name }}</span>
        </div> -->

        <!-- <div v-if="iconType === 'local'" class="icon local active">
          <div class="add" v-if="!src" @click="open()">
            <Icon><AddLine /></Icon>
          </div>

          <div v-else class="edit-or-del">
            <Icon @click="cropperVisible = true"><EditBox /></Icon>
            <Icon @click="_icon = ''"><Delete /></Icon>
          </div>
        </div> -->
      </el-form-item>
    </el-form>
    <!-- <Card>
   
 
     
     

        <el-form-item v-show="iconType === 'pure'" label="背景颜色">
          <div class="color">
            <div
              class="color-item"
              v-for="item in colors"
              :key="item"
              :style="{ backgroundColor: item }"
              :class="{ active: bgColor === item && colorType === 0 }"
              @click="setBgColor(item)"
            />-->
    <!-- <div
              class="color-item other-color"
              :class="{ active: colorType === 1 }"
              @click="colorType = 1"
            >
              <input type="color" v-model="_bgColor" />
            </div> -->
    <!--   </div>
        </el-form-item>
      </el-form>
    </Card>

    <ExternalLinkCropperDialog ref="externalLinkCropperDialogRef" />-->
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
  width: 100%;
  min-height: 60px;
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }
}
// .icon-box {
//   position: relative;
//   .relative{
//     position: ;
//   }
// }

.icon {
  height: 70px;
  width: 70px;
  border-radius: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    border: 2px solid #409eff;
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
