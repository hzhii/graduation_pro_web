<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入学号" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getGradeByStuId(queryInfo.query)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="getAllGrades">显示所有成绩信息</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加成绩</el-button>
        </el-col>
      </el-row>
      <!-- 成绩列表区域 -->
      <el-table :data="gradeList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="studentName"></el-table-column>
        <el-table-column label="学号" prop="stuId"></el-table-column>
        <el-table-column label="课程" prop="courseName"></el-table-column>
        <el-table-column label="成绩" prop="grade"></el-table-column>
        <el-table-column label="班级" prop="class_"></el-table-column>
        <el-table-column label="院系" prop="department"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" circle
                       @click="showEditDialog(scope.row.stuId,scope.row.courseId,scope.row.grade,scope.row.courseName)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" circle
                       @click="removeGradeById(scope.row.stuId,scope.row.courseId)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加成绩的对话框 -->
      <el-dialog title="添加成绩" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="学号" prop="id.stuId">
            <el-input v-model="addForm.id.stuId"></el-input>
          </el-form-item>
          <el-form-item label="课程" prop="id.courseId">
            <el-select v-model="addForm.id.courseId" placeholder="请选择课程">
              <el-option v-for="item in courseList" :key="item.id" :label="item.courseName"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成绩" prop="grade">
            <el-input v-model="addForm.grade"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGrade">确 定</el-button>
          </span>
      </el-dialog>

      <!-- 修改成绩的对话框 -->
      <el-dialog title="修改成绩" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
          <el-form-item label="学号">
            <el-input v-model="editForm.grade.id.stuId" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="课程">
            <el-input v-model="editForm.grade.courseName" disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="成绩" prop="grade.grade">
            <el-input v-model="editForm.grade.grade"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateGrade">确 定</el-button>
            </span>
      </el-dialog>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[2,5, 10, 15, 20]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkGrade = (rules, value, cb) => {
      if (value >= 0 && value <= 100) {
        return cb();
      }
      cb(new Error('成绩在0至100之间'))
    }
    return {
      queryInfo: {
        query: '',
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5
      },
      gradeList: [],
      total: 0,
      courseList: [],
      //添加成绩表单
      addForm: {
        id: {
          stuId: '',
          courseId: '',
        },
        grade: ''
      },
      editForm: {
        grade: {
          id: {
            stuId: '',
            courseId: '',
          },
          grade: ''
        },
        courseName: ''
      },
      //控制添加学生对话框的显示和隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      //添加成绩表单的验证规则
      addFormRules: {
        id: {
          stuId: [
            {required: true, message: '请输入学号', trigger: 'blur'}
          ],
          courseId: [
            {required: true, message: '请选择课程', trigger: 'blur'}
          ]
        },
        grade: [
          {required: true, message: '请输入成绩', trigger: 'blur'},
          {validator: checkGrade, trigger: 'blur'}
        ],
      },
      editFormRules: {
        grade: {
          grade: [
            {required: true, message: '请输入成绩', trigger: 'blur'},
            {validator: checkGrade, trigger: 'blur'}
          ]
        }

      }
    }
  },
  methods: {
    //获取所有成绩列表
    async getAllGrades() {
      await this.$http.post("studentSystem/getAllGrades", {
        "pagenum": this.queryInfo.pagenum,
        "pagesize": this.queryInfo.pagesize
      }).then((response) => {
        if (response.data.grades != null) {
          this.gradeList = response.data.grades
          this.total = response.data.total
          console.log(response)
        }

      }).catch((error) => {
        console.log(error)
      })
    },
    //根据学号获取学生成绩
    async getGradeByStuId(id) {
      if (id.trim() == "") {
        this.$message.warning("请输入学号！")
        return
      }

      await this.$http.post("studentSystem/getGradeByStuId", {"id": id}).then((response) => {
        if (response.data.grades != null) {
          this.gradeList = response.data.grades
          this.total = response.data.total
          console.log(response)
        } else {
          this.$message.warning("获取学生成绩失败！")
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    //获取所有课程信息
    async getCourseList() {
      await this.$http.post('/studentSystem/getAllCourse', {"pagenum": 1, "pagesize": 99999}).then((response) => {
        if (response.data.courses != null) {
          this.courseList = response.data.courses
        }
      }).catch((error) => {
        this.$message.warning("获取课程列表失败！")
        console.log(error)
      })
    },
    //添加成绩操作
    addGrade() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        //发起添加成绩的网络请求
        await this.$http.post('studentSystem/addGrade', this.addForm).then((response) => {
          if (response.data.status == "200") {
            this.$message.success("添加成绩成功！")
            this.getGradeByStuId(this.addForm.id.stuId)
          } else {
            this.$message.warning("添加成绩失败！")
          }
        }).catch((error) => {
          console.log(error)
        })
        this.addDialogVisible = false
      })
    },
    //删除成绩信息
    async removeGradeById(stuId, courseId) {
      //弹框询问用户是否删除数据
      const confirmResult = await this.$confirm('此操作将永久删除该条成绩数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //如果用户确认删除则返回值为字符串confirm
      //如果用户取消了删除则返回值为字符串cancel
      if (confirmResult != 'confirm') {
        return this.$message.info('已取消删除')
      }
      await this.$http.post('studentSystem/deleteGrade', {stuId, courseId}).then((response) => {
        if (response.data.status == "200") {
          this.$message.success('删除成绩成功')
          this.getGradeByStuId(stuId + "")
        } else {
          this.$message.warning('删除成绩失败')
        }

      }).catch((error) => {
        console.log(error)
      })
    },
    async updateGrade() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        await this.$http.post('studentSystem/updateGrade', this.editForm.grade).then((response) => {
          if (response.data.status == '200') {
            this.$message.success('修改成绩成功')
            this.getGradeByStuId(this.editForm.grade.id.stuId + "")
          } else {
            this.$message.warning("修改成绩失败")
          }

        }).catch((error) => {
          console.log(error)
        })
        this.editDialogVisible = false
      })
    },
    async showEditDialog(stuId, courseId, grade, courseName) {
      this.editForm.grade.id.stuId = stuId
      this.editForm.grade.id.courseId = courseId
      this.editForm.grade.grade = grade
      this.editForm.grade.courseName = courseName
      this.editDialogVisible = true
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getAllGrades()
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getAllGrades()
    },
    //监听添加成绩对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //监听修改成绩对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
  },
  created() {
    this.getCourseList()
  }
}
</script>

<style lang="less" scoped>

</style>
