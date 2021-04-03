<template>
  <!-- 头部区域 -->
  <div class="container">
    <div class="title">
      <svg-icon icon-class="档案" style="size:20px"></svg-icon>
      <span>档案信息管理系统</span>
    </div>
    <div class="box">
      <div class="time" style="font-size: 15px">
        {{ nowTime }}
      </div>
      <!-- 头像 -->
      <div class="test">
        <img
          :src="
            this.$store.state.user.avaterName
              ? 'http://localhost:8080' +
                '/avatar/' +
                this.$store.state.user.avaterName
              : Avatar
          "
          class="user-avatar"
        />
      </div>
      <el-dropdown>
        <span class="el-dropdown-link" style="color: black">
          {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/system/center">
            <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="warn()"
            >注销登录
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-star-off"
            @click.native="databasebackup"
            v-if="this.$store.state.user.sysrole.nameZh == '系统管理员'"
            >数据库备份
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { logout } from "@/api/login";
import { databasebackup } from "@/api/manage";
import store from "@/store";
import Avatar from "@/assets/avatar.png";

export default {
  name: "Header",
  data() {
    return {
      Avatar: Avatar,
      nowTime: ""
    };
  },
  computed: {
    username() {
      return this.$store.state.user.name;
    }
  },
  methods: {
    async signOut() {
      const _this = this;
      await logout().then(response => {
        if (response.code === 200) {
          _this.$store.commit("logout");
          _this.$router.push("/");
        }
      });
    },
    warn() {
      const _this = this;
      this.$confirm("是否退出?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.signOut();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        " " +
        hh +
        ":" +
        mm +
        ":" +
        ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    databasebackup() {
      databasebackup().then(resp => {
        if (resp.code == 200) {
          this.$message.success("备份成功");
        }
      });
    }
  },
  created() {
    this.nowTimes();
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  position: relative;
  .box {
    display: inline;
    margin: auto;
    float: right;
    text-align: right;
    margin-right: 0;
    > div {
      display: inline;
      align-items: center;
    }
  }
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.avatar-wrapper {
  margin-top: 5px;
  position: relative;
}

.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
