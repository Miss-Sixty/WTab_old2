import axios from 'axios'

// img 转 base64
export async function i2b(url: string) {
    console.log(111,url);
    
  const res = await axios({
    url,
    responseType: 'blob'
  })
  var reader = new window.FileReader()
  reader.readAsDataURL(res.data)
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result)
    reader.onerror = (e) => reject(e)
  })
}
