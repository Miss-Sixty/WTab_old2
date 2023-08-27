import axios from 'axios'
import sign from './sign'
import dayjs from 'dayjs'

// 我的资料
export function infoApi(operaterid: string) {
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
  }).then((res) => res.data)
}

// 个人排名详情
export function operinfoApi(operaterid: string, examplecode: string, clientcode: string) {
  const data = {
    operaterid,
    begintime: dayjs().format('YYYY-MM-DD'),
    endtime: dayjs().format('YYYY-MM-DD'),
    examplecode,
    clientcode,
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
  }).then((res) => res.data)
}

// 所有排名列表
export function operrankinginfoApi(obj: any) {
  const data = { ...obj, timespan: dayjs().unix() + '000' }
  return axios({
    url: 'https://shop.yis-soft.com/api/storesales/operrankinginfo/get',
    method: 'post',
    headers: {
      plcmhntrade: 'iPhone 12 Pro Max',
      plcsysversion: '3.2.6',
      sign: sign(data)
    },
    data
  }).then((res) => res.data)
}

// 销售单列表
export function salereportApi(obj: any) {
  const data = { ...obj, timespan: dayjs().unix() + '000' }
  return axios({
    url: 'https://shop.yis-soft.com/api/cashregisterbasis/salereport/salelist',
    method: 'post',
    headers: {
      plcmhntrade: 'iPhone 12 Pro Max',
      plcsysversion: '3.2.6',
      sign: sign(data)
    },
    data
  }).then((res) => res.data)
}
