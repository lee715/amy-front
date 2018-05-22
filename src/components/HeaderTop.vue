<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-header"
    mode="horizontal"
    @select="handleSelect"
    background-color="#409EFF"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">用户中心</template>
      <el-menu-item index="1-1">个人信息</el-menu-item>
      <el-menu-item v-if="me.role === 'root'" index="1-2">创建用户</el-menu-item>
      <el-menu-item v-if="me.role === 'root'" index="1-3">用户列表</el-menu-item>
      <el-menu-item index="1-4">退出登陆</el-menu-item>
    </el-submenu>
    <el-menu-item v-if="me.role === 'root'" index="4">系统设置</el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-header {
  position: absolute;
  right: 0;
}
</style>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },

  computed: {
    ...mapState(['me'])
  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
