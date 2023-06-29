import { useChangeCase } from '@vueuse/integrations/useChangeCase'

const componentsContext: any = import.meta.glob('./*/index.vue', { eager: true })

const list: any = {
  hitokoto: {
    key: 'hitokoto',
    name: '每日一言',
    text: '我们历经沧桑，这样错过了一生最好的时光。',
    sizes: ['tiny', 'small', 'medium', 'large']
  },
  // shop: {
  //   key: 'shop',
  //   name: '门店',
  //   text: '汪汪门店',
  //   sizes: ['small', 'medium']
  // }
}

const components: any = {}
for (const path in componentsContext) {
  const component = componentsContext[path].default
  components[component.name] = {
    component,
    ...list[useChangeCase(component.name, 'camelCase').value]
  }
}

export default components
