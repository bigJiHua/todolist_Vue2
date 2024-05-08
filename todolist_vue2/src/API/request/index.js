import axios from 'axios'
import { app } from '@/main'
import { Notify } from 'vant'

const request = axios.create({
  baseURL: 'http://todo.jihau.top/todo'
})

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
}, function (error) {
  Notify({ type: 'warning', position: 'top', message: error })
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
  // 对响应数据做点什么
  const { data: res } = response
  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('UserData')
    app.$router.push('/login')
  } else if (res.status !== 200) {
    Notify({ type: 'warning', position: 'top', message: res.message })
  }
  Notify({ type: 'success', position: 'top', message: res.message ? res.message : '成功' })
  return response
}, (error) => {
  console.log(error)
  // 对响应错误做点什么
  Notify({ type: 'danger', position: 'top', message: error })
  return Promise.reject(error)
})

export default request
