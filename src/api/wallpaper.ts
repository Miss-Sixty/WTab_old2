import request from '@/utils/request'

export const wallpaperApi = async () => {
  const res = await request({
    url: `${import.meta.env.VITE_API_URL}/admin/bing`
  })
  return res.data
}
