import md5 from 'crypto-js/md5'

export default (params: any) => {
  let str = 'ASDF3636HS'

  const sortKeys = Object.keys(params).sort((s1, s2) => {
    const x1 = s1.toLowerCase()
    const x2 = s2.toLowerCase()
    if (x1 < x2) return -1
    if (x1 > x2) return 1
    return 0
  })

  for (let i = 0; i < sortKeys.length; i++) {
    const key = sortKeys[i]
    str += `${key}${params[key]}`
  }

  return md5(str).toString().toUpperCase()
}
