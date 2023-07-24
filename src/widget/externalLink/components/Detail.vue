<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import useLayoutStore from '@/stores/layout'
import { AddLine, EditBox, Delete } from '@/icons'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import 'vue-advanced-cropper/dist/theme.compact.css'
import { useFileDialog } from '@vueuse/core'
const { open, onChange } = useFileDialog({
  multiple: false
  // accept: '.wtab'
})
onChange((files) => {
  const [rawFile]: any = files || []
  cropperImg.value = URL.createObjectURL(rawFile)
  cropperVisible.value = true
})

const cropperVisible = ref(false)

const layoutStore = useLayoutStore()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  id: String,
  src: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: ''
  },
  iconType: {
    type: String,
    default: 'pure'
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const _iconType = ref(props.iconType)
const _src = ref(props.src)
const _name = ref(props.name)
const _bgColor = ref(props.bgColor)
const _icon = ref(props.icon)
const onlineIcon = ref([])
const onlineActiveIcon = ref([])

const submit = () => {
  const find = layoutStore.data.find((item: any) => item.id === props.id)
  if (!find) return
  find.widgetData = {
    ...find.widgetData,
    src: _src.value,
    name: _name.value,
    bgColor: _bgColor.value,
    icon: _icon.value
  }

  modelValue.value = false
}

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
  _bgColor.value = color
  colorType.value = type
}

const nameFontSize = computed(() => {
  const sizes = ['40px', '30px', '20px', '15px', '10px']
  return {
    fontSize: sizes[_name.value?.length - 1]
  }
})

watch(
  () => props.modelValue,
  (val) => {
    //关闭弹窗时重置数据
    if (val) return
    _src.value = props.src
    _name.value = props.name
    _bgColor.value = props.bgColor
    _icon.value = props.icon
  }
)

const iconTypeChange = async (val: string) => {
  // if (val === 'online') _icon.value = `${_src.value}/favicon.ico`
  // if (val === 'local') _icon.value = ''
  const res = await fetch(`/admin/logo?url=${_src.value}`)
  const { data } = await res.json()
  console.log(111, data)
  // _icon.value = data.data
  onlineIcon.value = data.logo
  _name.value = data.name
}

const cropperRef = ref()
const zoom = (factor: number) => {
  cropperRef.value.zoom(factor)
}
const flip = (x: boolean, y: boolean) => {
  const { image } = cropperRef.value.getResult()
  if (image.transforms.rotate % 180 !== 0) {
    cropperRef.value.flip(!x, !y)
  } else {
    cropperRef.value.flip(x, y)
  }
}
const rotate = (angle: number) => {
  cropperRef.value.rotate(angle)
}

const cropperImg = ref('')
const cropperSubmit = () => {
  _icon.value = cropperRef.value.getResult().canvas.toDataURL()
  cropperVisible.value = false
}

const base64ImgtoFile = (dataurl: any, filename = 'file') => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })
}
watch(cropperVisible, () => {
  if (!cropperImg.value) {
    const file = base64ImgtoFile(_icon.value) // 得到File对象
    const imgUrl = window.webkitURL.createObjectURL(file) || window.URL.createObjectURL(file) // imgUrl图片网络路径
    cropperImg.value = imgUrl
  }
})
</script>
<template>
  <Dialog v-model="modelValue" :width="650" title="图标设置">
    <Card>
      <el-form>
        <el-form-item label="网站地址">
          <el-input type="text" v-model="_src" />
        </el-form-item>
        <el-form-item label="网站名称">
          <el-input type="text" v-model="_name" />
        </el-form-item>
        <el-form-item label="图标类型">
          <el-radio-group v-model="_iconType" @change="iconTypeChange">
            <el-radio-button label="pure">纯色图标</el-radio-button>
            <el-radio-button label="online">在线图标</el-radio-button>
            <el-radio-button label="local">本地上传</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="选择图标"
          :style="{ marginBottom: _iconType === 'online' ? 0 : '18px' }"
        >
          <div
            v-if="_iconType === 'pure'"
            class="icon"
            :style="{ backgroundColor: _bgColor }"
            :class="{ active: _iconType === 'pure' }"
          >
            <span :style="nameFontSize">{{ _name }}</span>
          </div>
          <div class="onlineList" v-if="_iconType === 'online'">
            <img
              class="icon online"
              :class="{ active: onlineActiveIcon === item }"
              v-for="item in onlineIcon"
              :key="item"
              :src="item"
              referrerpolicy="no-referrer"
              @click="
                () => {
                  _icon = item
                  onlineActiveIcon = item
                }
              "
            />
          </div>
          <div
            v-if="_iconType === 'local'"
            class="icon local"
            :class="{ active: _iconType === 'local' }"
            :style="{ backgroundImage: `url(${_icon})` }"
          >
            <div class="add" @click="open()" v-if="!_icon">
              <Icon><AddLine /></Icon>
            </div>

            <div v-else class="edit-or-del">
              <Icon @click="cropperVisible = true"><EditBox /></Icon>
              <Icon @click="_icon = ''"><Delete /></Icon>
            </div>
          </div>
        </el-form-item>

        <el-form-item v-show="_iconType === 'pure'" label="背景颜色">
          <div class="color">
            <div
              class="color-item"
              v-for="item in colors"
              :key="item"
              :style="{ backgroundColor: item }"
              :class="{ active: _bgColor === item && colorType === 0 }"
              @click="setBgColor(item)"
            ></div>
            <div
              class="color-item other-color"
              :class="{ active: colorType === 1 }"
              @click="colorType = 1"
            >
              <input type="color" v-model="_bgColor" />
            </div>
          </div>
        </el-form-item>
      </el-form>
      <Dialog v-model="cropperVisible" :width="650" title="图标设置">
        <div class="cropper">
          <cropper
            class="cropper__content"
            ref="cropperRef"
            :src="cropperImg"
            :stencil-props="{
              aspectRatio: 1 / 1
            }"
            image-restriction="fit-area"
          />
          <div class="cropper__btn">
            <el-button @click="zoom(2)">放 大</el-button>
            <el-button @click="zoom(0.5)">缩 小</el-button>
            <el-button @click="flip(true, false)">左右翻转</el-button>
            <el-button @click="flip(false, true)">上下翻转</el-button>
            <el-button @click="rotate(90)">右旋转</el-button>
            <el-button @click="rotate(-90)">左旋转</el-button>
          </div>
          <el-button @click="cropperSubmit">确 定</el-button>
        </div>
      </Dialog>
    </Card>

    <div class="btn">
      <el-button @click="modelValue = false">关 闭</el-button>
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
  .icon {
    height: 80px;
    width: 80px;
    border-radius: 14px;
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

    &.local {
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;

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

      .edit-or-del {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        opacity: 0;
        transition: all 0.3s;
        border-radius: 14px;
        .icon {
          font-size: 24px;
          color: #fff;
          cursor: pointer;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
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
