import { useChangeCase } from '@vueuse/integrations/useChangeCase'
const componentsContext: any = import.meta.glob('./*/index.vue', { eager: true })
delete componentsContext['./dialog/index.vue']
const list: any = {
  hitokoto: {
    key: 'hitokoto',
    name: '每日一言',
    text: '我们历经沧桑，这样错过了一生最好的时光。',
    sizes: ['tiny', 'small', 'medium', 'large'],
    widgetData: {
      hitokoto: '执子之手，与子偕老。',
      from_who: '',
      from: '击鼓',
      update: ''
    }
  },
  externalLink: {
    key: 'externalLink',
    name: '外链',
    text: '外链',
    sizes: ['tiny', 'medium'],
    widgetData: {
      protocol: '',
      src: '',
      name: '',
      bgColor: '',
      iconType: 'online',
      onlineIcon: '',
      pureIcon: '',
      localIcon: '',
      update: ''
    }
  },
  shop: {
    key: 'shop',
    name: '门店',
    text: '汪汪门店',
    sizes: ['medium'],
    widgetData: {
      operaterid: '',
      examplecode: '',
      clientcode: '',
      deptcode: '',
      highlight: [{ key: '', value: '', color: '' }],
      ranking: 0,
      offlinesalenum: 0,
      factmoney: 0,
      selfsalenum: 0,
      selfasfactmoney: 0,
      sharasfactmoney: 0,
      update: ''
    }
  },
  electricity: {
    key: 'electricity',
    name: '电费',
    text: '电费相关',
    sizes: ['medium'],
    widgetData: {
      uuid: '',
      token: '',
      consume_amount: 0,
      consume_amount_time: '',
      consume_amount_ranking: 0,
      total_amount: 0,
      total_amount_ranking: 0,
      pooling_amount: 0,
      charge_pooling_amount: 0,
      month_amount: 0,
      update: ''
    }
  }
}

const components: any = {}
for (const path in componentsContext) {
  const component = componentsContext[path]?.default
  components[component.name] = {
    component,
    ...list[useChangeCase(component.name, 'camelCase').value]
  }
}

export default components
