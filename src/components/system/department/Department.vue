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
              <el-breadcrumb-item>部门档案</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>部门档案</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 查询区域 -->
          <div class="search">
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
            </el-form>
          </div>
          <!-- 操作按钮区域 -->
          <div class="button">
            <el-button
              type="primary"
              @click="handleAdd"
              icon="el-icon-edit"
              v-has="'admin'"
              >添加部门档案</el-button
            >
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column prop="deptName" label="部门名称">
              </el-table-column>
              <el-table-column prop="deptInfo" label="部门介绍">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="成立时间"
                :formatter="dateFormat"
              >
              </el-table-column>
              <el-table-column prop="deptPhone" label="内部座机">
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
                    v-has="'admin'"
                    @click="handleEdit(scope.row)"
                  >
                  </el-button>
                  <el-popconfirm
                    title="确定删除吗？"
                    @onConfirm="handleDelete(scope.row)"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      v-has="'admin'"
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
        :model="addForm"
        :rules="rules"
        :label-position="labelPosition"
        label-width="40px"
      >
        <el-form-item label="部门名称" prop="username">
          <el-input v-model="addForm.deptName" />
        </el-form-item>
        <el-form-item label="部门介绍" prop="deptInfo">
          <el-input v-model="addForm.deptInfo" type="textarea" />
        </el-form-item>
        <el-form-item label="内部电话" prop="deptPhone">
          <el-input v-model="addForm.deptPhone" />
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
        :model="editForm"
        :rules="editRules"
        :label-position="labelPosition"
        label-width="40px"
      >
        <el-form-item label="部门名称" prop="username">
          <el-input v-model="editForm.deptName" />
        </el-form-item>
        <el-form-item label="部门介绍" prop="deptInfo">
          <el-input v-model="editForm.deptInfo" type="textarea" />
        </el-form-item>
        <el-form-item label="成立时间" prop="createTime">
          <el-date-picker
            v-model="editForm.createTime"
            :readonly="noEdit"
            type="datetime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="内部电话" prop="deptPhone">
          <el-input v-model="editForm.deptPhone" />
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
import {
  getDeptInfo,
  addDept,
  editDept,
  deleteDept,
  getAllDept
} from "@/api/manage";
import { isDeptPhone } from "@/utils/validate";
import moment from "moment";
export default {
  data() {
    // 自定义验证
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输内部联系方式"));
      } else if (!isDeptPhone(value)) {
        callback(new Error("请输入正确座机号码"));
      } else {
        callback();
      }
    };

    return {
      labelPosition: "top",
      noEdit: true,
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
      addForm: {},
      editForm: {},
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        deptInfo: [
          { required: true, trigger: "blur", message: "请输入部门介绍" }
        ],
        deptPhone: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      editRules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        deptInfo: [
          { required: true, trigger: "blur", message: "请输入部门介绍" }
        ],
        deptPhone: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      addTitle: "添加档案",
      editTitle: "修改档案",
      editVisible: false,
      addVisible: false
    };
  },
  methods: {
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllDept();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllDept();
    },
    addClose() {
      this.addVisible = false;
      this.addForm.deptName = "";
      this.addForm.deptInfo = "";
      this.addForm.deptPhone = "";
      this.$refs.addFormRef.resetFields();
    },
    editClose() {
      this.editVisible = false;
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleDelete(record) {
      const that = this;
      deleteDept(record).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功");
          that.getAllDept();
        } else {
          this.$message.error("系统异常,请稍后再试");
        }
      });
    },
    handleEdit(record) {
      console.log("record", record);
      this.editVisible = true;
      this.editForm = record;
    },
    getAllDept() {
      const that = this;
      getAllDept(this.queryInfo)
        .then(resp => {
          if (resp.code == 200) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
          } else {
            that.$message.warning(resp.result.message);
          }
        })
        .catch(error => {
          this.$message.warning("系统异常，请稍后重试");
          console.log(error);
        });
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //提交添加表单
    handleSubmit() {
      const that = this;
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        addDept(this.addForm).then(resp => {
          if (resp.code == 200) {
            this.$message.success("添加成功");
            this.getAllDept();
          }
        });
      });
      that.addClose();
    },
    //提交修改表单
    editSubmit() {
      const that = this;
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        //发起添加的网络请求
        await editDept(this.editForm)
          .then(response => {
            if (response.code == 200) {
              this.$message.success("修改成功");
              this.getAllDept();
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
    }
  },
  created() {
    this.getAllDept();
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
