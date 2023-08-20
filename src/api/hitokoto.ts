import request from '@/widget/utils/request'

export const hitokotoApi = async () => {
  const res = await request({
    url: `https://v1.hitokoto.cn/?c=d&c=e&c=h&c=i&c=k`
  })
  return res.data
}
