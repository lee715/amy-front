<template>
  <el-row>
    <el-col :span="8"><div class="grid-content bg-purple">&nbsp;</div></el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple-light">
        <el-form :model="ruleFormLogin" status-icon :rules="rulesLogin" ref="ruleFormLogin" label-width="100px" class="login-form">
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="ruleFormLogin.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleFormLogin.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleFormLogin')">提交</el-button>
            <el-button @click="resetForm('ruleFormLogin')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-col :span="8"><div class="grid-content bg-purple">&nbsp;</div></el-col>
  </el-row>
</template>

<style>
.login-form {
  padding: 40px 40px 40px 0px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 60px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
}
</style>

<script>
import {login} from '../models/user'

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
      ruleFormLogin: {
        email: '',
        password: ''
      },
      rulesLogin: {
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
    async submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!')
          return false
        }
      })
      await login(this.ruleFormLogin.email, this.ruleFormLogin.password)
      this.$router.push('/users/create')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
