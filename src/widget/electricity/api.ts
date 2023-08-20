import request from '@/utils/request'
import dayjs from 'dayjs'
const VITE_ELECTRICITY_UUID = '6850685d6dda8eb95628e6a85b551216'
const VITE_ELECTRICITY_TOKEN =
  'ed130a4d01e5b6435e88ba4e182351b9841a02183e4e785412ec1c7e1d565f3d836f2f64954c92839424af28a3e462fbc9454804c14b825301e2fb86ab1f7360'
// 电费详情
export function elemeterInfoApi() {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/${VITE_ELECTRICITY_UUID}`,
    headers: {
      'x-access-token': VITE_ELECTRICITY_TOKEN
    }
  })
}

// 充值记录
export function chargeRecordApi() {
  return request({
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/charge_record/${VITE_ELECTRICITY_UUID}`,
    headers: {
      'x-access-token': VITE_ELECTRICITY_TOKEN
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
    url: `${import.meta.env.VITE_API_URL}/admin/elemeter/amount_record/${VITE_ELECTRICITY_UUID}`,
    headers: {
      'x-access-token': VITE_ELECTRICITY_TOKEN
    },
    params: {
      start_time: dayjs().subtract(31, 'day').valueOf(),
      end_time: dayjs().valueOf()
    }
  })
}
