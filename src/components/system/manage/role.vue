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
              <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 标题区域 -->
          <div class="title">
            <span>角色管理</span>
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
            <el-button type="primary" @click="handleAdd" icon="el-icon-edit"
              >添加角色</el-button
            >
          </div>
          <!-- 表格内容回显 -->
          <div class="info" style="width: 100%">
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column label="角色编号" align="center" prop="roleId">
              </el-table-column>
              <el-table-column label="英文名称" align="center" prop="name">
              </el-table-column>
              <el-table-column label="中文名称" align="center" prop="nameZh">
              </el-table-column>
              <el-table-column label="操作" fixed="right" align="center">
                <template slot-scope="scope">
                  <!-- 修改操作按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
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
        <el-form-item label="英文名称" label-width="120px" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="中文名称" label-width="120px" prop="nameZh">
          <el-input v-model="addForm.nameZh" />
        </el-form-item>
        <el-form-item label="功能配置" label-width="120px" prop="permissions">
          <el-checkbox-group v-model="addForm.checkList">
            <el-checkbox label="add">新增权限</el-checkbox>
            <el-checkbox label="deleted">删除权限</el-checkbox>
            <el-checkbox label="edit">修改权限</el-checkbox>
            <el-checkbox label="query">查询权限</el-checkbox>
            <el-checkbox label="outExcel">导出EXCEL</el-checkbox>
            <el-checkbox label="outWord">导出WORD</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            node-key="id"
            ref="tree1"
          >
          </el-tree>
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
        label-width="66px"
      >
        <el-form-item label="角色编号" label-width="120px" prop="roleId">
          <el-input v-model="editForm.roleId" :disabled="true" />
        </el-form-item>
        <el-form-item label="英文名称" label-width="120px" prop="name">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="中文名称" label-width="120px" prop="nameZh">
          <el-input v-model="editForm.nameZh" />
        </el-form-item>
        <el-form-item label="功能配置" label-width="120px" prop="permissions">
          <el-checkbox-group v-model="editForm.checkList">
            <el-checkbox label="add">新增权限</el-checkbox>
            <el-checkbox label="deleted">删除权限</el-checkbox>
            <el-checkbox label="edit">修改权限</el-checkbox>
            <el-checkbox label="query">查询权限</el-checkbox>
            <el-checkbox label="outExcel">导出EXCEL</el-checkbox>
            <el-checkbox label="outWord">导出WORD</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            :check-strictly="systemNodeFlag"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
            ref="tree"
          >
          </el-tree>
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
  getRoleMenu,
  getAllRoleInfo,
  addRole,
  deleteRole,
  editRole
} from "@/api/manage";
export default {
  data() {
    return {
      noEdit: true,
      queryInfo: {
        pageNum: 1,
        pageSize: 5
      },
      systemNodeFlag: true,
      tableData: [],
      //修改的时候显示的选中了的菜单
      selectedMenusIds: [],
      //所有的菜单信息
      menus: [],
      total: 0,
      addForm: {
        name: "",
        nameZh: "",
        menusId: [],
        checkList: []
      },
      editForm: {
        menusId: [],
        checkList: []
      },
      rules: {
        name: [{ required: true, message: "请输入英文编码", trigger: "blur" }],
        nameZh: [{ required: true, message: "请输入中文编码", trigger: "blur" }]
      },
      editRules: {
        name: [{ required: true, message: "请输入英文编码", trigger: "blur" }],
        nameZh: [{ required: true, message: "请输入中文编码", trigger: "blur" }]
      },
      addTitle: "添加角色",
      editTitle: "修改角色",
      editVisible: false,
      addVisible: false,
      props: {
        id: "id",
        label: "nameZh",
        children: "children"
      }
    };
  },
  methods: {
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getAllRolesInfo();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getAllRolesInfo();
    },
    addClose() {
      this.addVisible = false;
      this.addForm.name = "";
      this.addForm.nameZh = "";
      this.addForm.checkList = [];
      this.$refs.tree1.setCheckedKeys([]);
      this.$refs.addFormRef.resetFields();
    },
    editClose() {
      this.editVisible = false;
      this.selectedMenusIds = [];
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleDelete(record) {
      const that = this;
      deleteRole({ roleId: record.roleId }).then(resp => {
        if (resp.code == 200) {
          this.$message.success("删除成功!");
          that.getAllRolesInfo();
        }
      });
    },
    async handleEdit(record) {
      this.editForm = record;
      console.log(record);
      if (record.permissions != null) {
        this.$set(this.editForm, "checkList", record.permissions.split(","));
      } else {
        this.$set(this.editForm, "checkList", []);
      }
      await this.getUserRoleMenu();
      this.editVisible = true;
    },
    //提交添加表单
    handleSubmit() {
      const that = this;
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        that.addForm.menusId = this.$refs.tree1
          .getCheckedKeys()
          .concat(this.$refs.tree1.getHalfCheckedKeys());
        addRole(that.addForm).then(resp => {
          if (resp.code == 200) {
            this.$message.success("添加信息成功");
            that.getAllRolesInfo();
            that.addClose();
          }
        });
      });
    },
    //提交修改表单
    editSubmit() {
      const that = this;
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        that.editForm.menusId = this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys());
        editRole(this.editForm).then(resp => {
          if (resp.code == 200) {
            this.$message.success("更新成功!");
            that.getAllRolesInfo();
            that.editClose();
          }
        });
      });
    },
    //获取所有的角色信息
    getAllRolesInfo() {
      const that = this;
      getAllRoleInfo(this.queryInfo).then(resp => {
        if (resp.code == 200) {
          that.tableData = resp.result.list;
          that.total = resp.result.total;
        }
      });
    },
    //获取所有的菜单信息
    getAllMenus() {
      const that = this;
      getRoleMenu({ id: 1 }).then(resp => {
        if (resp.code == 200) {
          that.menus = resp.result.menus;
        }
      });
    },
    //获取角色的菜单信息
    getUserRoleMenu() {
      const that = this;
      //角色的菜单信息
      getRoleMenu({ id: this.editForm.roleId }).then(resp => {
        //角色的菜单信息(已处理)
        let menuIds2 = [];
        if (resp.code == 200) {
          if (resp.result.menus != null) {
            for (let i = 0; i < resp.result.menus.length; i++) {
              menuIds2.push(resp.result.menus[i].id);
              for (let j = 0; j < resp.result.menus[i].children.length; j++) {
                menuIds2.push(resp.result.menus[i].children[j].id);
              }
            }
            that.selectedMenusIds = menuIds2;
            // 判断树是否已经加载
            // 第一次打开对话框前树不存在，无法调用方法，需要通过设置 default-checked 正确选中菜单项
            if (that.$refs.tree) {
              that.$refs.tree.setCheckedKeys(menuIds2);
            }
          } else {
            that.selectedMenusIds = menuIds2;
            // 判断树是否已经加载
            // 第一次打开对话框前树不存在，无法调用方法，需要通过设置 default-checked 正确选中菜单项
            if (that.$refs.tree) {
              that.$refs.tree.setCheckedKeys(menuIds2);
            }
          }
        }
      });
    }
  },
  mounted() {
    this.getAllRolesInfo();
    this.getAllMenus();
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
