import request from '@/utils/request'

// 列表
export const getQrCodeApi = async (nanoid: string) => {
  const res = await request({
    url: '/admin/qrCode',
    params: {
      nanoid
    }
  })
  return res.data
}
// 列表
export const loopGetWxStateApi = async (nanoid: string) => {
  const res = await request({
    url: '/admin/loopGetWxState',
    params: {
      nanoid
    }
  })
  return res.data
}
