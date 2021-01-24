import axios from 'axios'
import store from '../store'

let apiBaseUrl = "http://localhost:8080";

// 创建 axios 实例
const service = axios.create({
    baseURL: apiBaseUrl, 
    timeout: 9000,
    withCredentials: true
  })

// 配置请求拦截器
service.interceptors.request.use(config =>{
    const token = store.state.token
    if(token){
        // 如果存在token，让每次请求携带token
        config.headers[ 'Access-Token' ] = token 
    }
    return config
},
error => {
  console.log(error)
  return Promise.reject(error)
})

//配置响应拦截器
service.interceptors.response.use(response => {
    const res = response.data
      return res  
  },error => {
    console.log('err' + error)
    store.commit('logout')
    router.replace('/')
    // 返回接口错误信息
    return Promise.reject(error)
  })
  
export default service