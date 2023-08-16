import request from '@/utils/request'
import dayjs from 'dayjs'

// 电费详情
export function elemeterInfoApi() {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/${import.meta.env.VITE_ELECTRICITY_UUID}`,
    headers: {
      'x-access-token': import.meta.env.VITE_ELECTRICITY_TOKEN
    }
  })
}

// 充值记录
export function chargeRecordApi() {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/charge_record/${
      import.meta.env.VITE_ELECTRICITY_UUID
    }`,
    headers: {
      'x-access-token': import.meta.env.VITE_ELECTRICITY_TOKEN
    },
    params: {
      start_time: '1675304460000',
      end_time: '1769998860000'
    }
  })
}

// 用电记录
export function amountRecordApi() {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/amount_record/${
      import.meta.env.VITE_ELECTRICITY_UUID
    }`,
    headers: {
      'x-access-token': import.meta.env.VITE_ELECTRICITY_TOKEN
    },
    params: {
      start_time: dayjs().subtract(31, 'day').valueOf(),
      end_time: dayjs().valueOf()
    }
  })
}
