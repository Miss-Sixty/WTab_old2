import axios from 'axios'
import dayjs from 'dayjs'

const uuid = '6850685d6dda8eb95628e6a85b551216'
const token =
  'e22e10ac77c42c247434cc4b96b1e69242e98e53d1ab915ad542fe5043096a0c34057c2284ef8a545b29e79215ba584cd1410f73e89a9eca42f435f451c0e775'

// 电费详情
export function elemeterInfoApi() {
  return axios({
    url: `/admin/elemeter/${uuid}`,
    headers: {
      'x-access-token': token
    }
  })
}

// 充值记录
export function chargeRecordApi() {
  return axios({
    url: `/admin/elemeter/charge_record/${uuid}`,
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
export function amountRecordApi() {
  return axios({
    url: `/admin/elemeter/amount_record/${uuid}`,
    headers: {
      'x-access-token': token
    },
    params: {
      start_time: dayjs().subtract(31, 'day').valueOf(),
      end_time: dayjs().valueOf()
    }
  })
}
