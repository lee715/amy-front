<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">test1</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="goto('/places')">场地列表</el-menu-item>
        <el-menu-item :show="me.isRoot" index="1-2" @click="goto('/places/create')">创建场地</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span slot="title">test2</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">设备列表</el-menu-item>
        <el-menu-item v-show="me.role === 'root'" index="2-2" @click="goto('/devices/create')">创建设备</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">test3</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" @click="goto('/grads')">梯度列表</el-menu-item>
        <el-menu-item index="3-2" @click="goto('/grads/create')">创建梯度</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">test4</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" @click="goto('/orders')">订单查询</el-menu-item>
        <el-menu-item index="4-2" @click="goto('/orders/fail')">故障订单</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
</style>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data () {
    return {
      isCollapse: false
    }
  },

  computed: {
    ...mapState(['me'])
  },

  methods: {
    ...mapActions([
      'getMe'
    ]),
    async initData () {
      try {
        await this.getMe()
      } catch (e) {
        console.log(e)
        this.$router.push('/login')
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    goto (path) {
      this.$router.push(path)
    }
  },
  mounted: async function () {
    await this.initData()
  }
}
</script>
