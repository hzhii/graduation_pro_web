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
              <el-breadcrumb-item>通告管理</el-breadcrumb-item>
              <el-breadcrumb-item>系统通告</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>系统通告</span>
          </div>
        </div>
        <!-- 主体内容 -->
        <div class="main">
          <!-- 查询区域 -->
          <div class="search">
            <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
              <el-form-item label="日期区间：">
                <el-date-picker
                  v-model="query"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="success" icon="el-icon-search" @click="search"
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
            <el-button
              type="primary"
              @click="handleAdd"
              icon="el-icon-edit"
              v-has="'admin'"
              >添加公告</el-button
            >
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete()">
              <el-button
                type="danger"
                icon="el-icon-delete"
                slot="reference"
                v-has="'admin'"
                >删除</el-button
              >
            </el-popconfirm>
            <el-button
              type="success"
              @click="handleRubbish"
              icon="el-icon-copy-document"
              v-has="'admin'"
              >回收站</el-button
            >
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              @row-click="show"
              tooltip-effect="light"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="title" label="通知公告">
                <template slot-scope="scope">
                  <el-link type="primary">{{ scope.row.title }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="发布时间" align="right">
                <template slot-scope="scope">
                  {{ dateFormatter(scope.row.createTime) }}
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
        label-width="77px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title" />
        </el-form-item>
        <el-form-item label="通知" prop="role">
          <el-select
            v-model="addForm.role"
            style="width: 192px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="addForm.author" :disabled="true" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            v-model="addForm.content"
            :rows="6"
            style="width:450px"
          />
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
        label-width="77px"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="editForm.title" :readonly="true" />
        </el-form-item>
        <el-form-item label="通知角色" prop="time">
          <el-input v-model="editForm.role" :readonly="true" />
        </el-form-item>
        <el-form-item label="发布者" prop="author">
          <el-input v-model="editForm.author" :readonly="true" />
        </el-form-item>
        <el-form-item label="发布内容" prop="time">
          <el-input
            type="textarea"
            v-model="editForm.content"
            :rows="6"
            style="width:450px"
            :readonly="noEdit"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="editClose">取消</el-button>
        <el-button type="primary" @click="editSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 回收站 -->
    <el-dialog
      :title="rubbishTitle"
      :visible.sync="rubbishVisible"
      @close="rubbishClose"
      width="900px"
    >
      <el-table :data="rubbish" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="公告内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="role" label="通知对象" width="180">
        </el-table-column>
        <el-table-column prop="author" label="发布人" width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          width="180"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="scope">
            <el-popconfirm title="确定撤销吗？" @onConfirm="redo(scope.row)">
              <el-button
                type="success"
                icon="el-icon-refresh-right"
                size="mini"
                slot="reference"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  addAnno,
  getStaffAnno,
  getAnno,
  deleteAnno,
  getRubbish,
  redo,
  search
} from "@/api/manage";
import moment from "moment";
export default {
  data() {
    return {
      options: [
        {
          value: "全体用户",
          label: "全体用户"
        },
        {
          value: "全体经理",
          label: "全体经理"
        }
      ],
      isStaff: false,
      noEdit: true,
      //多选
      multipleSelection: [],
      query: "",
      queryInfo: {
        startDate: "",
        endDate: "",
        pageNum: 1,
        pageSize: 5
      },
      tableData: [],
      total: 0,
      addForm: {
        title: "",
        content: "",
        role: "",
        author: this.$store.state.username
      },
      editForm: {},
      rubbish: [],
      rules: {
        title: [{ required: true, trigger: "blur", message: "请输入标题" }],
        role: [
          { required: true, message: "请选择通知对象", trigger: "change" }
        ],
        content: [{ required: true, trigger: "blur", message: "请输入内容" }]
      },
      editRules: {},
      addTitle: "添加公告",
      editTitle: "查看公告",
      rubbishTitle: "回收站",
      editVisible: false,
      addVisible: false,
      rubbishVisible: false
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllAnnotation();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllAnnotation();
    },
    addClose() {
      this.addVisible = false;
      this.$refs.addFormRef.resetFields();
    },
    editClose() {
      this.editVisible = false;
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleRubbish() {
      this.rubbishVisible = true;
      this.getRubbish();
    },
    rubbishClose() {
      this.rubbishVisible = false;
    },
    //提交添加表单
    handleSubmit() {
      const that = this;
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        //发起添加的网络请求
        await addAnno(this.addForm)
          .then(response => {
            if (response.code == 200) {
              this.$message.success("添加成功!");
              this.getAllAnnotation();
            } else {
              this.$message.error("添加失败");
            }
          })
          .catch(error => {
            this.$message.warning("系统异常，请稍后重试");
            console.log(error);
          });
        that.addClose();
      });
    },
    handleDelete() {
      const that = this;
      let params = [];
      this.multipleSelection.forEach(function(item) {
        params.push(item.id); // 添加所有需要删除数据的id到一个数组，post提交过去
      });
      if (params == "") {
        this.$message.warning("请先选择要删除的公告!");
        return;
      }
      deleteAnno({ ids: params }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功");
          this.getAllAnnotation();
        } else {
          this.$message.error("系统异常,请稍后再试");
        }
      });
    },
    handleEdit(record) {
      console.log("record", record);
      this.getUserRole({ id: record.id });
      this.getUserDept({ id: record.id });
      this.editVisible = true;
      this.editForm = record;
    },
    //提交修改表单
    editSubmit() {},
    show(value) {
      let thisRowData = this;
      thisRowData = value;
      this.editVisible = true;
      this.editForm = value;
      console.log(value);
    },
    getAllAnnotation() {
      const that = this;
      if (this.$store.state.user.sysrole.nameZh == "普通员工") {
        getStaffAnno(this.queryInfo).then(resp => {
          if (resp.code == 200) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
            that.$message.success(resp.message);
          }
        });
      } else {
        getAnno(this.queryInfo).then(resp => {
          if (resp.code == 200 && resp.result != null) {
            that.tableData = resp.result.list;
            that.total = resp.result.total;
            that.$message.success(resp.message);
          } else {
            that.tableData = resp.result;
            that.total = 0;
            that.$message.warning("暂无数据");
          }
        });
      }
    },
    dateFormatter(str) {
      //默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] != false ? true : false; //可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        return (
          [year, month, day].join("-") + " " + [hour, minute, second].join(":")
        );
      } else {
        return [year, month, day].join("-");
      }
    },
    //获取被删除的信息
    getRubbish() {
      const that = this;
      getRubbish().then(resp => {
        if (resp.code == 200 && resp.result != null) {
          that.rubbish = resp.result;
        } else {
          that.rubbish = [];
        }
      });
    },
    dateFormat(row, column) {
      var date = row[column.property];

      if (date == undefined) {
        return "";
      }

      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    redo(record) {
      const that = this;
      redo({ id: record.id }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("撤销成功!");
          that.rubbishVisible = false;
        }
        that.getRubbish();
        that.getAllAnnotation();
      });
    },
    clear() {
      this.query = "";
      this.queryInfo.startDate = "";
      this.queryInfo.endDate = "";
      this.getAllAnnotation();
    },
    search() {
      const that = this;
      if (this.query != null) {
        let a = this.query[0];
        let b = this.query[1];
        this.queryInfo.startDate = a;
        this.queryInfo.endDate = b;
      }
      search(this.queryInfo).then(resp => {
        if (resp.code == 200) {
          that.tableData = resp.result.list;
          that.total = resp.result.total;
          this.$message.success(resp.message);
        } else {
          that.tableData = resp.result;
          that.total = 0;
          this.$message.warning(resp.message);
        }
      });
    }
  },
  created() {
    this.getAllAnnotation();
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
