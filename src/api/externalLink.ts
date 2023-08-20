import request from '@/widget/utils/request'

export const logoApi = async (url: string) => {
  const res = await request({
    url: `/admin/logo`,
    params: {
      url
    }
  })
  return res.data
}
