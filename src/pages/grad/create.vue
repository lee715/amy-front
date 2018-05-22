<template>
  <el-dialog
    title="创建价格梯度"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="ruleFormGradCreate" status-icon ref="ruleFormGradCreate" label-width="100px">
      <el-form-item label="名字" prop="name">
        <el-input type="text" v-model="ruleFormGradCreate.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(grad, index) in ruleFormGradCreate.grads"
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
        <el-button type="primary" @click="submitForm('ruleFormGradCreate')">提交</el-button>
        <el-button @click="addGrad">添加梯度</el-button>
        <el-button @click="resetForm('ruleFormGradCreate')">重置</el-button>
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
import {create} from '@/models/grad'

export default {
  data () {
    return {
      dialogVisible: true,
      ruleFormGradCreate: {
        name: '',
        grads: [{price: '', time: ''}]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      let name = this.ruleFormGradCreate.name
      let grads = this.ruleFormGradCreate.grads
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
          message: '创建成功!'
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
      this.ruleFormGradCreate.name = ''
      this.ruleFormGradCreate.grads = [{price: '', time: ''}]
    },
    addGrad () {
      this.ruleFormGradCreate.grads.push({price: '', time: ''})
    },
    handleClose () {
      this.$router.push('/grads')
    }
  }
}
</script>
