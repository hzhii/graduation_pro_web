import request from "../utils/request";

const api = {
  queryUser: "/user/getAllUser",
  updateUser: "/user/updateUser",
  updatePass: "/user/updatePwd",
  getInfo: "/user/info",
  getMenu: "/menu/userMenu",
  auth: "/menu/authentication",
  role: "/api/roleInfo",
  service: "/service",
  permission: "/permission",
  permissionNoPager: "/permission/no-pager",
  info: "/api/getUserById"
};

//增加员工

//删除员工

//修改员工
export function updateUser(parameter) {
  return request({
    url: api.updateUser,
    method: "post",
    data: parameter,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
}

//查询菜单
export function getMenu() {
  return request({
    url: api.getMenu,
    method: "get"
  });
}

//查询所有员工
export function queryUser(parameter) {
  return request({
    url: api.queryUser,
    method: "get",
    params: parameter
  });
}

//查询当前用户信息
export function getInfo() {
  return request({
    url: api.getInfo,
    method: "get"
  });
}

//防止构造参数绕过验证
export function getAuth() {
  return request({
    url: api.auth,
    method: "get"
  });
}

//修改密码
export function updatePass(parameter) {
  return request({
    url: api.updatePass,
    method: "post",
    data: parameter
  });
}

//获取权限
