<template>
  <div class="main_container">
    <div class="bread">
      <el-card class="box-card">
        <!-- 头部 -->
        <div slot="header" class="clearfix">
          <!-- 面包屑区域 -->
          <div class="text item">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/index' }"
                >首页</el-breadcrumb-item
              >
              <el-breadcrumb-item>系统管理</el-breadcrumb-item>
              <el-breadcrumb-item>用户档案</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>用户档案</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 查询区域 -->
          <div class="search">
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
              <el-form-item label="姓名:">
                <el-input
                  v-model="queryInfo.query"
                  placeholder="请输入查询的姓名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  icon="el-icon-search"
                  @click="fuzzySearch"
                  >查询</el-button
                >
                <el-button
                  type="warning"
                  icon="el-icon-refresh-right"
                  @click="clear"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <!-- 操作按钮区域 -->
          <div class="button">
            <el-button type="primary" @click="handleAdd" icon="el-icon-edit"
              >添加员工档案</el-button
            >
            <el-button
              class="filter-item"
              type="primary"
              icon="el-icon-download"
              @click="outExe()"
              >导出excel</el-button
            >
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
              v-loading="loading"
            >
              <el-table-column
                prop="id"
                label="id"
                sortable
                width="180"
                v-if="show"
              >
              </el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="180">
              </el-table-column>
              <el-table-column
                prop="username"
                label="用户名"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                sortable
                width="180"
                :formatter="formatRole"
              >
              </el-table-column>
              <el-table-column prop="age" label="年龄" sortable width="180">
              </el-table-column>
              <el-table-column prop="address" label="地址" sortable width="180">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="联系电话"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column prop="nameZh" label="角色" sortable width="180">
              </el-table-column>
              <el-table-column
                prop="deptName"
                label="所属部门"
                sortable
                width="180"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="180"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <!-- 修改操作按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleEdit(scope.row)"
                  >
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-download"
                    @click="outWord(scope.row)"
                  ></el-button>
                  <el-popconfirm
                    title="确定删除吗？"
                    @onConfirm="handleDelete(scope.row.id)"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      slot="reference"
                    ></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页区域 -->
          <div class="page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 添加编辑框 -->
    <el-dialog
      :title="addTitle"
      :visible.sync="addVisible"
      @close="addClose"
      width="590px"
      append-to-body
    >
      <el-form
        ref="addFormRef"
        :inline="true"
        :model="addForm"
        :rules="rules"
        size="small"
        label-width="66px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addForm.age" />
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model.number="addForm.telephone" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="addForm.address" />
        </el-form-item>
        <el-form-item label="部门" prop="dep">
          <el-select
            v-model="addForm.dep"
            style="width: 192px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allDept"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex" style="width: 178px">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;" label="角色" prop="role">
          <el-select
            v-model="addForm.role"
            style="width: 437px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allRole"
              :key="item.nameZh"
              :label="item.nameZh"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="addClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 修改编辑框 -->
    <el-dialog
      :title="editTitle"
      :visible.sync="editVisible"
      @close="editClose"
      width="590px"
      append-to-body
    >
      <el-form
        ref="editFormRef"
        :inline="true"
        :model="editForm"
        :rules="editRules"
        size="small"
        label-width="66px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" :disabled="noEdit" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editForm.age" />
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model.number="editForm.telephone" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="editForm.address" />
        </el-form-item>
        <el-form-item label="部门" prop="dep">
          <el-select
            v-model="editForm.dep"
            style="width: 192px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allDept"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex" style="width: 178px">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-bottom: 0;" label="角色" prop="role">
          <el-select
            v-model="editForm.role"
            style="width: 437px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in allRole"
              :key="item.nameZh"
              :label="item.nameZh"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="editClose">取消</el-button>
        <el-button type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isChinese, isvalidPhone, isNumber } from "@/utils/validate";

import {
  queryUser,
  getRoleInfo,
  getDeptInfo,
  getUserRole,
  getUserDept,
  addUser,
  vaildUserName,
  deleteUser,
  updateUser,
  fuzzySearch
} from "@/api/manage";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
export default {
  name: "Employee",
  data() {
    // 自定义验证
    const validName = (rule, value, callback) => {
      if (value) {
        let param = { username: value };
        vaildUserName(param)
          .then(resp => {
            if (resp.code == 200) {
              callback();
            } else {
              callback(new Error(resp.message));
            }
          })
          .catch(err => {
            callback(new Error(err.message));
          });
      } else {
        callback(new Error("请输入用户名！"));
      }
    };

    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };

    const validNumber = (rule, value, callback) => {
      if (!isNumber(value)) {
        callback(new Error("请输入正确格式"));
      } else {
        callback();
      }
    };

    return {
      loading: true,
      show: false,
      noEdit: true,
      tableData: [],
      excelData: [],
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5
      },
      editVisible: false,
      addVisible: false,
      total: 0,
      rules: {
        username: [{ required: true, validator: validName, trigger: "blur" }],
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        telephone: [{ required: true, trigger: "blur", validator: validPhone }],
        age: [{ validator: validNumber }],
        dep: [{ required: true, message: "请选择部门", trigger: "change" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      editRules: {
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        telephone: [{ required: true, trigger: "blur", validator: validPhone }],
        age: [{ validator: validNumber }],
        dep: [{ required: true, message: "请选择部门", trigger: "change" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
      addForm: {
        username: "",
        telephone: "",
        name: "",
        address: "",
        sex: "",
        age: "",
        role: "",
        dep: ""
      },
      editForm: {
        username: "",
        telephone: "",
        name: "",
        address: "",
        sex: "",
        age: "",
        role: "",
        dep: "",
        id: ""
      },
      allDept: [],
      allRole: [],
      form: {},
      addTitle: "添加档案",
      editTitle: "修改档案"
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    onSubmit() {
      console.log("submit!");
    },
    async getAllUser() {
      const that = this;
      await queryUser(this.queryInfo)
        .then(resp => {
          if (resp.code == 200) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
          } else {
            that.$message.warning(resp.message);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 性别转换
    formatRole: function(row, column) {
      return row.sex == "1" ? "男" : row.sex == "0" ? "女" : "null";
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllUser();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllUser();
    },
    //加载角色列表
    async initialRoleList() {
      const that = this;
      await getRoleInfo().then(resp => {
        if (resp.code == 200) {
          that.allRole = resp.result;
        } else {
          this.$message.error(resp.message);
        }
      });
    },
    //加载部门列表
    async initialDeptist() {
      const that = this;
      await getDeptInfo().then(resp => {
        if (resp.code == 200) {
          that.allDept = resp.result;
        } else {
          this.$message.error(resp.message);
        }
      });
    },
    //加载用户对应的角色
    async getUserRole(id) {
      const that = this;
      await getUserRole(id).then(resp => {
        if (resp.code == 200) {
          that.editForm.role = resp.result.roleId;
        } else {
          this.$message.error(resp.message);
        }
      });
    },
    //加载用户对应的部门
    async getUserDept(id) {
      const that = this;
      await getUserDept(id).then(resp => {
        if (resp.code == 200) {
          that.editForm.dep = resp.result.deptId;
        } else {
          this.$message.error(resp.message);
        }
      });
    },
    addClose() {
      this.addVisible = false;
      this.addForm.role = "";
      this.addForm.dep = "";
      this.addForm.sex = "";
      this.$refs.addFormRef.resetFields();
    },
    editClose() {
      this.editVisible = false;
      this.editForm = this.form;
      console.log("close", this.form);
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleDelete(record) {
      const that = this;
      deleteUser({ id: record }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功");
          that.getAllUser();
        } else {
          this.$message.error("系统异常,请稍后再试");
        }
      });
    },
    handleEdit(record) {
      console.log("record", record);
      this.getUserRole({ id: record.id });
      this.getUserDept({ id: record.id });
      this.form = record;
      this.editVisible = true;
      this.editForm = record;
      console.log("form", this.form);
    },
    //提交添加表单
    handleSubmit() {
      const that = this;
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        //发起添加的网络请求
        await addUser(this.addForm)
          .then(response => {
            if (response.code == 200) {
              this.$message.success(response.message);
              this.getAllUser();
            } else {
              this.$message.error(response.message);
            }
          })
          .catch(error => {
            this.$message.warning("系统异常，请稍后重试");
            console.log(error);
          });
        that.addClose();
      });
    },
    //提交修改表单
    editSubmit() {
      const that = this;
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        //发起添加的网络请求
        await updateUser(this.editForm)
          .then(response => {
            if (response.code == 200) {
              this.$message.success(response.message);
              this.getAllUser();
            } else {
              this.$message.error(response.message);
            }
          })
          .catch(error => {
            this.$message.warning("系统异常，请稍后重试");
            console.log(error);
          });
        that.editClose();
      });
    },
    //模糊查询
    async fuzzySearch() {
      const that = this;
      await fuzzySearch(this.queryInfo)
        .then(response => {
          if (response.code == 200) {
            that.tableData = response.result.list;
            that.total = response.result.total;
            this.$message.success("查询成功");
            that.queryInfo.query = "";
          }
        })
        .catch(error => {
          this.$message.warning("?！");
          console.log(error);
        });
    },
    //清除查询条件并刷新
    clear() {
      this.queryInfo.query = "";
      this.getAllUser();
    },
    //excel
    outExe() {
      const that = this;
      this.$confirm("此操作将导出excel文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.excelData = this.tableData; //你要导出的数据list。
          console.log("excel", this.excelData);
          that.export2Excel();
        })
        .catch(() => {});
    },
    export2Excel() {
      var that = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../../excel/Export2Excel"); //这里必须使用绝对路径
        const tHeader = [
          "id",
          "name",
          "username",
          "sex",
          "age",
          "address",
          "telephone",
          "nameZh",
          "deptName"
        ]; // 导出的表头名
        const filterVal = [
          "id",
          "name",
          "username",
          "sex",
          "age",
          "address",
          "telephone",
          "nameZh",
          "deptName"
        ]; // 导出的表头字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, `用户档案excel`); // 导出的表格名称，根据需要自己命名
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    outWord(record) {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(
        window.location.origin + "/static/mod.docx",
        (error, content) => {
          if (error) {
            throw error;
          }
          // 创建一个PizZip实例，内容为模板的内容
          let zip = new PizZip(content);
          // 创建并加载docxtemplater实例对象
          let doc = new docxtemplater().loadZip(zip);
          // 设置模板变量的值
          let docxData = {
            time: "",
            name: record.name,
            sex: record.sex,
            age: record.age,
            depaName: record.deptName,
            nameZh: record.nameZh,
            telephone: record.telephone,
            address: record.address
          };
          doc.setData({
            ...docxData
          });
          try {
            // 用模板变量的值替换所有模板变量
            doc.render();
          } catch (error) {
            // 抛出异常
            let e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
          }

          // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
          let out = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
          // 将目标文件对象保存为目标类型的文件，并命名
          saveAs(out, record.name + "信息档案.docx");
        }
      );
    }
  },
  created() {
    this.getAllUser();
    this.initialRoleList();
    this.initialDeptist();
  }
};
</script>

<style lang="less" scoped>
.main_container {
  .bread {
    .title {
      span {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 32px;
        font-weight: 600;
      }
    }
    .page {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
