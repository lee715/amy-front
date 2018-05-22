<template>
  <el-dialog
    title="编辑价格梯度"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="ruleFormGradEdit" status-icon ref="ruleFormGradEdit" label-width="100px">
      <el-form-item label="名字" prop="name">
        <el-input type="text" v-model="ruleFormGradEdit.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(grad, index) in ruleFormGradEdit.grads"
        :label="'梯度' + index"
        :key="grad.price"
        prop="grad">
        <el-col :span="8">
          <el-input v-model="grad.price"></el-input>
        </el-col>
        <el-col :span="4" class="el-col-center">测试</el-col>
        <el-col :span="8">
          <el-input v-model="grad.time"></el-input>
        </el-col>
        <el-col :span="4" class="el-col-center">测试</el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleFormGradEdit')">提交</el-button>
        <el-button @click="addGrad">添加梯度</el-button>
        <el-button @click="resetForm('ruleFormGradEdit')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style>
.el-col-center {
  text-align:center;
}
</style>

<script>
import {create, get} from '@/models/grad'

export default {
  data () {
    return {
      dialogVisible: true,
      ruleFormGradEdit: {
        name: '',
        grads: [{price: '', time: ''}]
      }
    }
  },
  methods: {
    async initData () {
      try {
        let grad = await get(this.$route.params.id)
        let prices = grad.price.split(',')
        let times = grad.time.split(',')
        let grads = []
        prices.forEach((price, i) => {
          grads.push({price, time: times[i]})
        })
        this.ruleFormGradEdit = {
          name: grad.name || '',
          grads: grads
        }
      } catch (e) {
        console.log(e)
      }
    },
    async submitForm (formName) {
      let name = this.ruleFormGradEdit.name
      let grads = this.ruleFormGradEdit.grads
      let prices = []
      let times = []
      for (let grad of grads) {
        if (grad.price && grad.time) {
          prices.push(grad.price)
          times.push(grad.time)
        }
      }
      let grad = {
        name,
        price: prices.join(','),
        time: times.join(',')
      }
      try {
        await create(grad)
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.$router.push('/grads')
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    },
    resetForm (formName) {
      this.ruleFormGradEdit.name = ''
      this.ruleFormGradEdit.grads = [{price: '', time: ''}]
    },
    addGrad () {
      this.ruleFormGradEdit.grads.push({price: '', time: ''})
    },
    handleClose () {
      this.$router.push('/grads')
    }
  },

  mounted: function () {
    this.initData()
  }
}
</script>
