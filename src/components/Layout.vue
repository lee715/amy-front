<template>
  <el-container>
    <el-header>
      <header-top></header-top>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <aside-left></aside-left>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderTop from '@/components/HeaderTop'
import AsideLeft from '@/components/AsideLeft'

export default {
  data () {
    return {}
  },

  components: {
    HeaderTop,
    AsideLeft
  }
}
</script>

<style>
  .el-header, .el-footer {
    color: #fff;
    text-align: center;
    line-height: 60px;
    padding: 0px;
    background-color: #409EFF;
    box-shadow: 0 1px 3px 0 #409EFF;
    position: relative;
  }

  .el-aside {
    color: #333;
  }

  .el-main {
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
