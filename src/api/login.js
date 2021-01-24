import request from '../utils/request'

const loginApi = {
    Login: '/login',
    Logout: '/logout',
  }
// 登录接口
export function login (parameter) {
    return request({
      url: loginApi.Login,
      method: 'post',
      data: parameter
    })
  }
// 登出接口
export function logout () {
  return request({
    url: loginApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}