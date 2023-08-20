import axios from 'axios'
import { ElMessage } from 'element-plus'

// create an axios instance
const service = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  timeout: 60 * 1000
  // withCredentials: true, // send cookies when cross-domain requests
})

service.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = useUserStore().token
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    const { code, msg, message } = res.data
    console.log(res)

    // if (code === 3000) {
    //   console.log(router)
    //   useUserStore().clearUserInfo()
    //   router.currentRoute.value.name !== 'login' && toLogin()
    //   return Promise.reject(res)
    // }

    // if (code === 0) {
    //   ElMessage({
    //     message: msg || message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000,
    //   })
    //   return Promise.reject(res)
    // }

    return res
  },
  (err) => {
    console.log(222, err)
    ElMessage.error({
      message: err?.message || err?.response?.data?.message,
      duration: 5000
    })

    return Promise.reject(err)
  }
)

export default service
