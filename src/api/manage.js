import request from "../utils/request";

const api = {
  queryUser: "/user/getAllUser",
  updatePass: "/user/updatePwd",
  getInfo: "/user/info",
  getMenu: "/menu/userMenu",
  auth: "/menu/authentication",
  getRoleInfo: "/role/getAllRole",
  getDeptInfo: "/dept/getAllDept",
  getUserRole: "/role/getUserRole",
  getUserDept: "/dept/getUserDept",
  vaildUserName: "/user/vaildUserName",
  addUser: "/user/addUser",
  deleteUser: "/user/deleteUser",
  updateUser: "/user/updateUser",
  fuzzySearch: "/user/search",
  getCharts1: "/user/charts",
  getCharts2: "/user/charts2",
  getCharts3: "/user/charts3",
  service: "/service",
  permission: "/permission",
  permissionNoPager: "/permission/no-pager",
  info: "/api/getUserById"
};

//增加员工
export function addUser(parameter) {
  return request({
    url: api.addUser,
    method: "post",
    data: parameter
  });
}

//增加员工
export function deleteUser(parameter) {
  return request({
    url: api.deleteUser,
    method: "post",
    data: parameter
  });
}

//删除员工

//修改员工
export function updateUser(parameter) {
  return request({
    url: api.updateUser,
    method: "post",
    data: parameter
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

//查询所有角色信息
export function getRoleInfo() {
  return request({
    url: api.getRoleInfo,
    method: "get"
  });
}

//根据用户id查询对应的角色信息
export function getUserRole(parameter) {
  return request({
    url: api.getUserRole,
    method: "get",
    params: parameter
  });
}

//根据用户id查询对应的部门信息
export function getUserDept(parameter) {
  return request({
    url: api.getUserDept,
    method: "get",
    params: parameter
  });
}

//查询所有部门信息
export function getDeptInfo() {
  return request({
    url: api.getDeptInfo,
    method: "get"
  });
}

//用户名重复校验
export function vaildUserName(parameter) {
  return request({
    url: api.vaildUserName,
    method: "get",
    params: parameter
  });
}

//模糊查询
export function fuzzySearch(parameter) {
  return request({
    url: api.fuzzySearch,
    method: "post",
    data: parameter
  });
}

//echarts图标渲染
export function getCharts1() {
  return request({
    url: api.getCharts1,
    method: "get"
  });
}

//echarts图标渲染
export function getCharts2() {
  return request({
    url: api.getCharts2,
    method: "get"
  });
}

//echarts图标渲染
export function getCharts3() {
  return request({
    url: api.getCharts3,
    method: "get"
  });
}

//获取权限
