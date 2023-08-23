import request from '@/widget/utils/request'

export const logoApi = async (url: string) => {
  const res = await request({
    url: `${import.meta.env.VITE_API_URL}/admin/logo`,
    params: {
      url
    }
  })
  return res.data
}
