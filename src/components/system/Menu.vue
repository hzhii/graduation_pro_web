<template>
    <el-menu
      :default-active="currentPath"
      :router="true"
      background-color="#373d41"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <!--index 没有用但是必需字段-->
      <el-submenu v-for="(item, i) in userMenus" :key="i" :index="i.toString()">
        <span slot="title" style="font-size: 17px;">
          <i :class="item.iconCls"></i>
          {{ item.nameZh }}
        </span>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          <i :class="child.iconCls"></i>
          {{ child.nameZh }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    userMenus() {
      return this.$store.state.userMenus;
    },
    currentPath() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>

</style>
