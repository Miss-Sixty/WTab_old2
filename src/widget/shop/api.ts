import axios from 'axios'
import sign from './sign'
import dayjs from 'dayjs'

// 我的资料
export function myInfoApi(operaterid: string) {
  const data = {
    operaterid,
    timespan: dayjs().unix() + '000'
  }
  return axios({
    url: 'https://shop.yis-soft.com/api/person/info/get',
    method: 'post',
    headers: {
      plcmhntrade: 'iPhone 12 Pro Max',
      plcsysversion: '3.2.6',
      sign: sign(data)
    },
    data
  })
}

// 个人排名详情
export function operinfoApi(operaterid: string) {
  const data = {
    operaterid,
    begintime: dayjs().format('YYYY-MM-DD'),
    endtime: dayjs().format('YYYY-MM-DD'),
    examplecode: '654j1j4dhSzF53y2Vei45S8vhVQyExxpnUXO6nW2OJXUFmNRNRODjA==',
    clientcode: 'CN913010',
    timespan: dayjs().unix() + '000'
  }
  return axios({
    url: 'https://shop.yis-soft.com/api/storesales/operinfo/get',
    method: 'post',
    headers: {
      plcmhntrade: 'iPhone 12 Pro Max',
      plcsysversion: '3.2.6',
      sign: sign(data)
    },
    data
  })
}

// 所有排名列表
export function operrankinginfoApi({ operaterid, begintime, endtime }: any) {
  const data = {
    operaterid,
    examplecode: '654j1j4dhSzF53y2Vei45S8vhVQyExxpnUXO6nW2OJXUFmNRNRODjA==',
    begintime,
    endtime,
    clientcode: 'CN913010',
    timespan: dayjs().unix() + '000'
  }
  return axios({
    url: 'https://shop.yis-soft.com/api/storesales/operrankinginfo/get',
    method: 'post',
    headers: {
      plcmhntrade: 'iPhone 12 Pro Max',
      plcsysversion: '3.2.6',
      sign: sign(data)
    },
    data
  })
}

// 销售单列表
export function salereportApi(operaterid: string) {
  const data = {
    operaterid,
    examplecode: '654j1j4dhSzF53y2Vei45S8vhVQyExxpnUXO6nW2OJXUFmNRNRODjA==',
    clientcode: 'CN913010',
    deptcode: 'F010',
    timespan: dayjs().unix() + '000'
  }
  return axios({
    url: 'https://shop.yis-soft.com/api/cashregisterbasis/salereport/salelist',
    method: 'post',
    headers: {
      plcmhntrade: 'iPhone 12 Pro Max',
      plcsysversion: '3.2.6',
      sign: sign(data)
    },
    data
  })
}
