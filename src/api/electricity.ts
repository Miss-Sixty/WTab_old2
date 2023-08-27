import request from '@/utils/request'
import dayjs from 'dayjs'
// 设置数据类型
interface ElectricityInfo {
  uuid: string
  token: string
}

// 电费详情
export function elemeterInfoApi({ uuid, token }: ElectricityInfo) {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/${uuid}`,
    headers: {
      'x-access-token': token
    }
  })
}

// 充值记录
export function chargeRecordApi({ uuid, token }: ElectricityInfo) {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/charge_record/${uuid}`,
    headers: {
      'x-access-token': token
    },
    params: {
      start_time: '1675304460000',
      end_time: '1769998860000'
    }
  })
}

// 用电记录
export function amountRecordApi({ uuid, token }: ElectricityInfo) {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/amount_record/${uuid}`,
    headers: {
      'x-access-token': token
    },
    params: {
      start_time: dayjs().subtract(31, 'day').valueOf(),
      end_time: dayjs().valueOf()
    }
  })
}
