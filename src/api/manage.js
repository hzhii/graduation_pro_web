import request from '../utils/request'

const api = {
    user: '/api/getUserList',
    role: '/api/roleInfo',
    service: '/service',
    permission: '/permission',
    permissionNoPager: '/permission/no-pager',
    info: '/api/getUserById',
    update: '/api/updateUser',
  }

//增加员工

//删除员工

//修改员工
export function updateUser (parameter) {
    return request({
      url: api.update,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

//查询员工
export function getUserList (parameter) {
    return request({
      url: api.user,
      method: 'get',
      params: parameter
    })
  }

//修改密码

//获取权限