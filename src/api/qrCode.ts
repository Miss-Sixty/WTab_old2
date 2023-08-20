import request from '@/widget/utils/request'

// 列表
export const getQrCodeApi = async (nanoid: string) => {
  const res = await request({
    url: `${import.meta.env.VITE_API_URL}/admin/qrCode`,
    params: {
      nanoid
    }
  })
  return res.data
}
// 列表
export const loopGetWxStateApi = async (nanoid: string) => {
  const res = await request({
    url: `${import.meta.env.VITE_API_URL}/admin/loopGetWxState`,
    params: {
      nanoid
    }
  })
  return res.data
}
