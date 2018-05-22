<template>
  <el-form :model="ruleFormCreate" status-icon :rules="rulesCreate" ref="ruleFormCreate" label-width="100px" class="login-form">
    <el-form-item label="邮箱" prop="email">
      <el-input type="text" v-model="ruleFormCreate.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleFormCreate.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="名字" prop="name">
      <el-input type="text" v-model="ruleFormCreate.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-radio v-model="ruleFormCreate.role" label="root">管理员</el-radio>
      <el-radio v-model="ruleFormCreate.role" label="agent">代理商</el-radio>
      <el-radio v-model="ruleFormCreate.role" label="salesman">客服</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleFormCreate')">创建</el-button>
      <el-button @click="resetForm('ruleFormCreate')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
</style>

<script>
import {create} from '@/models/user'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      }
      callback()
    }
    return {
      ruleFormCreate: {
        email: '',
        password: '',
        role: 'root'
      },
      rulesCreate: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
        this.createUser()
      })
    },
    async createUser () {
      try {
        await create(this.ruleFormCreate)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.$router.push('/users')
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
