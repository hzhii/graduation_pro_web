import request from "../utils/request";

const api = {
  queryUser: "/user/getAllUser",
  updatePass: "/user/updatePwd",
  getInfo: "/user/info",
  getMenu: "/menu/userMenu",
  auth: "/menu/authentication",
  getRoleInfo: "/role/allRole",
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
  getSystemLog: "/log/systemLog",
  deleteSystemLog: "/log/delete",
  //请假相关
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
  //部门相关用于用户的回显
  getDeptInfo: "/dept/allDept",
  getAllDept: "/dept/getAllDept",
  addDept: "/dept/add",
  editDept: "/dept/edit",
  deleteDept: "/dept/delete",
  //获取角色所拥有的菜单
  getRolesMenu: "/menu/getRoleMenu",
  getAllRoleInfo: "/role/getAllRole",
  //添加角色信息
  addRole: "/roleMenu/add",
  deleteRole: "/role/deleteRole",
  editRole: "/roleMenu/edit",
  service: "/service",
  //获取城市相关json信息
  getAddressJson: "http://localhost:8088/static/districts.json",
  //出差相关
  getAllOutRecord: "/out/getAllOutRecord",
  getMyOutRecord: "/out/getMyOutRecord",
  getDeptOutRecord: "/out/getDeptOutRecord",
  addOutRecord: "/out/add",
  deleteOutRecord: "/out/delete",
  passOutRecord: "/out/pass",
  failOutRecord: "/out/fail",
  outSearch: "/out/search",
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

//查询所有部门信息（回显）
export function getDeptInfo(parameter) {
  return request({
    url: api.getDeptInfo,
    method: "get",
    params: parameter
  });
}

//查询所有部门信息（回显）
export function getAllDept(parameter) {
  return request({
    url: api.getAllDept,
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

//获取系统的日志
export function getSystemLog(parameter) {
  return request({
    url: api.getSystemLog,
    method: "get",
    params: parameter
  });
}

//删除系统日志
export function deleteSystemLog(parameter) {
  return request({
    url: api.deleteSystemLog,
    method: "post",
    data: parameter
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

//查询树的结构用于编辑角色所拥有的菜单
export function getRoleMenu(parameter) {
  return request({
    url: api.getRolesMenu,
    method: "get",
    params: parameter
  });
}

//获取所有的角色信息
export function getAllRoleInfo(parameter) {
  return request({
    url: api.getAllRoleInfo,
    method: "get",
    params: parameter
  });
}

//添加角色信息
export function addRole(parameter) {
  return request({
    url: api.addRole,
    method: "post",
    data: parameter
  });
}

//删除角色信息
export function deleteRole(parameter) {
  return request({
    url: api.deleteRole,
    method: "post",
    data: parameter
  });
}

//修改角色信息
export function editRole(parameter) {
  return request({
    url: api.editRole,
    method: "post",
    data: parameter
  });
}

//获取级联选择器地址信息
export function getAddressJson(parameter) {
  return request({
    url: api.getAddressJson,
    method: "get",
    params: parameter
  });
}

//获取所有出差记录
export function getAllOutRecord(parameter) {
  return request({
    url: api.getAllOutRecord,
    method: "get",
    params: parameter
  });
}

//获取自己的出差记录
export function getMyOutRecord(parameter) {
  return request({
    url: api.getMyOutRecord,
    method: "get",
    params: parameter
  });
}

//获取部门的出差记录
export function getDeptOutRecord(parameter) {
  return request({
    url: api.getDeptOutRecord,
    method: "get",
    params: parameter
  });
}

//添加出差记录
export function addOutRecord(parameter) {
  return request({
    url: api.addOutRecord,
    method: "post",
    data: parameter
  });
}

//删除出差记录
export function deleteOutRecord(parameter) {
  return request({
    url: api.deleteOutRecord,
    method: "post",
    data: parameter
  });
}

//同意申请
export function passOutRecord(parameter) {
  return request({
    url: api.passOutRecord,
    method: "post",
    data: parameter
  });
}

//不同意申请
export function failOutRecord(parameter) {
  return request({
    url: api.failOutRecord,
    method: "post",
    data: parameter
  });
}

//综合查询
export function outSearch(parameter) {
  return request({
    url: api.outSearch,
    method: "post",
    data: parameter
  });
}

//获取权限
