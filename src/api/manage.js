import request from '../utils/request'

const api = {
    queryUser: '/user/getUserList',
    updateUser: '/user/updateUser',
    getMenu: '/menu/userMenu',
    auth: '/menu/authentication',
    role: '/api/roleInfo',
    service: '/service',
    permission: '/permission',
    permissionNoPager: '/permission/no-pager',
    info: '/api/getUserById'
  }

//增加员工

//删除员工

//修改员工
export function updateUser (parameter) {
    return request({
      url: api.updateUser,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

//查询菜单
export function getMenu () {
    return request({
      url: api.getMenu,
      method: 'get',
    })
  }
//查询员工
  export function queryUser (parameter) {
    return request({
      url: api.queryUser,
      method: 'get',
      params: parameter
    })
  }

//防止构造参数绕过验证
export function getAuth () {
  return request({
    url: api.auth,
    method: 'get',
  })
}

//修改密码

//获取权限