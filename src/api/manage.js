import request from "../utils/request";

const api = {
  queryUser: "/user/getAllUser",
  updatePass: "/user/updatePwd",
  getInfo: "/user/info",
  getMenu: "/menu/userMenu",
  auth: "/menu/authentication",
  getRoleInfo: "/role/getAllRole",
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
  getLog: "/log/userLog",
  leaveApply: "/leave/apply",
  //管理员查看所有记录
  getLeaveRecord: "/leave/record",
  //普通用户查看自己的记录
  getMyRecord: "/leave/myRecord",
  //经理查看部门下的记录
  getDeptRecord: "/leave/deptRecord",
  handlePass: "/leave/pass",
  handleNoPass: "/leave/noPass",
  handleDeleteLeave: "/leave/delete",
  //添加公告
  addAnno: "/anno/add",
  getStaffAnno: "/anno/getStaffAnno",
  getAnno: "/anno/getAnno",
  deleteAnno: "/anno/delete",
  getRubbish: "/anno/rubbish",
  redo: "/anno/redo",
  search: "/anno/search",
  //部门相关
  getDeptInfo: "/dept/getAllDept",
  addDept: "/dept/add",
  editDept: "/dept/edit",
  deleteDept: "/dept/delete",
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

//删除员工
export function deleteUser(parameter) {
  return request({
    url: api.deleteUser,
    method: "post",
    data: parameter
  });
}

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
export function getDeptInfo(parameter) {
  return request({
    url: api.getDeptInfo,
    method: "get",
    params: parameter
  });
}

//添加部门信息
export function addDept(parameter) {
  return request({
    url: api.addDept,
    method: "post",
    data: parameter
  });
}

//删除部门信息
export function deleteDept(parameter) {
  return request({
    url: api.deleteDept,
    method: "post",
    data: parameter
  });
}

//修改部门信息
export function editDept(parameter) {
  return request({
    url: api.editDept,
    method: "post",
    data: parameter
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

//获取用户的操作日志
export function getLog(parameter) {
  return request({
    url: api.getLog,
    method: "get",
    params: parameter
  });
}

//请假申请
export function leaveApply(parameter) {
  return request({
    url: api.leaveApply,
    method: "post",
    data: parameter
  });
}

//获取所有请假记录
export function getLeaveRecord(parameter) {
  return request({
    url: api.getLeaveRecord,
    method: "get",
    params: parameter
  });
}

//获取普通员工的请假记录
export function getMyRecord(parameter) {
  return request({
    url: api.getMyRecord,
    method: "get",
    params: parameter
  });
}

//获取部门下所有的请假记录
export function getDeptRecord(parameter) {
  return request({
    url: api.getDeptRecord,
    method: "get",
    params: parameter
  });
}

//通过员工申请请假
export function handlePass(parameter) {
  return request({
    url: api.handlePass,
    method: "post",
    data: parameter
  });
}

//删除员工申请请假
export function handleDeleteLeave(parameter) {
  return request({
    url: api.handleDeleteLeave,
    method: "post",
    data: parameter
  });
}

//不通过员工申请请假
export function handleNoPass(parameter) {
  return request({
    url: api.handleNoPass,
    method: "post",
    data: parameter
  });
}

//添加公告
export function addAnno(parameter) {
  return request({
    url: api.addAnno,
    method: "post",
    data: parameter
  });
}

//普通员工获取员工的所有的公告
export function getStaffAnno(parameter) {
  return request({
    url: api.getStaffAnno,
    method: "get",
    params: parameter
  });
}

//经理获取员工的所有的公告
export function getAnno(parameter) {
  return request({
    url: api.getAnno,
    method: "get",
    params: parameter
  });
}

//删除公告
export function deleteAnno(parameter) {
  return request({
    url: api.deleteAnno,
    method: "post",
    data: parameter
  });
}

//获取回收站信息
export function getRubbish(parameter) {
  return request({
    url: api.getRubbish,
    method: "get",
    params: parameter
  });
}

//删除公告
export function redo(parameter) {
  return request({
    url: api.redo,
    method: "post",
    data: parameter
  });
}

//区间查询公告
export function search(parameter) {
  return request({
    url: api.search,
    method: "get",
    params: parameter
  });
}

//获取权限
