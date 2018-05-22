<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',
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
    }
  },
  mounted: async function () {
    await this.initData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body, html, #app, .el-container {
  margin: 0;
  padding: 0;
  height: 100%
}
.el-dialog {
  width: 600px;
  padding: 20px 50px;
}
</style>
