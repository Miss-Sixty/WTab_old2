import encUtf8 from 'crypto-js/enc-utf8'
import aes from 'crypto-js/aes'
import { stringify, parse } from 'zipson'

//加密方法
export function encrypt(data: object | string): string {
  return aes.encrypt(stringify(data), import.meta.env.VITE_DECRYPT_KEY).toString()
}

//解密方法
export function decrypt(data: string): object | string {
  return parse(aes.decrypt(data, import.meta.env.VITE_DECRYPT_KEY).toString(encUtf8))
}
