import axios from 'axios'
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../routes/router'
// create an axios instance
const service = axios.create({
  // baseURL: 'http://192.168.0.134:8089', // api的base_url
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 500000 // request timeout
  // 允许携带cookie
})

// request interceptor
service.interceptors.request.use(
  config => {
    // console.log(1)
    // console.log(store.getters.access_token)
    // Do something before request is sent
    if (store.getters.token) {
      // config.headers['Vue-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['withCredentials'] = true
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
          })
          router.replace({
            path: '/login'
          })
          break
        case 403:
          MessageBox.alert('您尚无此权限，请联系管理员！', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
      }
      // console.log('err' + error)// for debug
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      return Promise.reject(error)
    }
  }
)
export default service
