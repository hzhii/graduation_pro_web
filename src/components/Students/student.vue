<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>病案管理</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getStudentsByName"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加病人</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="studentlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="patientName"></el-table-column>
        <el-table-column label="性别" prop="patientGender"></el-table-column>
        <el-table-column label="年龄" prop="patientAge"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(
             scope.row.patientId,
             scope.row.patientName,
             scope.row.patientGender,
             scope.row.patientAge
             )"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle
                       @click="removeStudentById(scope.row.patientId)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[2,5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加病人" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="姓名" prop="patientName">
          <el-input v-model="addForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="patientGender">
          <el-input v-model="addForm.patientGender"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="patientAge">
          <el-input v-model="addForm.patientAge"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addStudent">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改病人信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="姓名" prop="patientName">
          <el-input v-model="editForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="patientAge">
          <el-input v-model="editForm.patientAge"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="patientGender">
          <el-input v-model="editForm.patientGender"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editStudentInfo">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rules, value, cb) => {
      if (value >= 0 && value <= 120) {
        return cb();
      }
      cb(new Error('年龄在0岁至120岁之间'))
    }

    return {
      queryInfo: {
        query: '',
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5
      },
      studentlist: [],
      total: 0,
      //控制添加病人对话框的显示和隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      //添加病人的表单数据
      addForm: {
        patientName: '',
        patientAge: '',
        patientGender: ''
      },
      //修改病人的表单数据
      editForm: {
        patientId: '',
        patientName: '',
        patientAge: '',
        patientGender: ''
      },
      //添加表单的验证规则对象
      addFormRules: {
        patientName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        patientAge: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {validator: checkAge, trigger: 'blur'}
        ],
        patientGender: [
          {required: true, message: '请输入性别', trigger: 'blur'}
        ]
      },
      //修改表单的验证规则
      editFormRules: {
        patientName: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        patientAge: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {validator: checkAge, trigger: 'blur'}
        ],
        patientGender: [
          {required: true, message: '请输入性别', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    //获取所有病人列表
    async getStudentList() {
      await this.$http.post('/studentSystem/getAllStudents', {
        "pagenum": this.queryInfo.pagenum,
        "pagesize": this.queryInfo.pagesize
      }).then((response) => {
        this.studentlist = response.data.list
        this.total = response.data.total
        console.log(response)
      }).catch((error) => {
        this.$message.warning("获取病人列表失败！")
        console.log(error)
      })
    },
    //根据名字获取病人列表
    async getStudentsByName() {
      await this.$http.post('/studentSystem/getStudentsByName', {
        "queryInfo": this.queryInfo.query,
        "pagenum": this.queryInfo.pagenum,
        "pagesize": this.queryInfo.pagesize
      }).then((response) => {
        if (response.data.list != null) {
          console.log(response.data.list)
          this.studentlist = response.data.list
          this.total = response.data.total
          this.queryInfo.query = ''
        }
        console.log(response)
      }).catch((error) => {
        this.$message.warning("获取病人列表失败！")
        console.log(error)
      })
    },

    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getStudentList()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getStudentList()
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //监听修改病人对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //点击按钮添加新病人
    addStudent() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        //发起添加病人的网络请求
        await this.$http.post('/studentSystem/addStudent', this.addForm).then((response) => {
          this.$message.success("添加病人成功!")
          this.getStudentList();
          console.log(response)
        }).catch((error) => {
          this.$message.warning("添加病人失败")
          console.log(error)
        })
        this.addDialogVisible = false
        //重新获取病人列表数据
      })
    },
    //展示编辑病人的对话框
    async showEditDialog(patientId, patientName, patientGender, patientAge) {
      this.editForm.patientId = patientId
      this.editForm.patientName = patientName
      this.editForm.patientAge = patientAge
      this.editForm.patientGender = patientGender
      this.editDialogVisible = true
    },
    //修改病人信息并提交
    editStudentInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        //发起修改用户信息的数据请求
        await this.$http.post("studentSystem/updateStudent", this.editForm).then((response) => {
          this.$message.success("修改病人信息成功!")
          this.getStudentList();
        }).catch((error) => {
          this.$message.warning("修改病人信息失败！")
          console.log(error)
        })
        this.editDialogVisible = false
      })
    },
    //根据Id删除对应的病人信息
    async removeStudentById(id) {
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该病人数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //如果用户确认删除则返回值为字符串confirm
      //如果用户取消了删除则返回值为字符串cancel
      if (confirmResult != 'confirm') {
        return this.$message.info('已取消删除')
      }
      await this.$http.post('studentSystem/deleteStudent', {"id": id}).then((response) => {
        this.$message.success('删除病人成功')
        this.getStudentList()
        console.log(response)
      }).catch((error) => {
        console.log(error)
        this.$message.warning('删除病人失败')
      })
    }
  },
  created() {
    this.getStudentList()
  }
}

</script>

<style lang="less" scoped>

</style>
