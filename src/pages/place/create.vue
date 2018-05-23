<template>
  <el-dialog
    title="创建"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <el-form :model="PlaceCreateForm" status-icon ref="PlaceCreateForm" label-width="100px">
      <el-form-item label="名字" prop="name">
        <el-input type="text" v-model="PlaceCreateForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="PlaceCreateForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="PlaceCreateForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地理位置" prop="location">
        <el-cascader
          size="large"
          :options="pcaa"
          v-model="PlaceCreateForm.location">
        </el-cascader>
      </el-form-item>
      <el-form-item label="客服" prop="_salesmanId">
        <el-select v-model="PlaceCreateForm._salesmanId" placeholder="请选择">
          <el-option
            v-for="salesman in PlaceCreateForm.salesmans"
            :key="salesman.id"
            :label="salesman.name"
            :value="salesman.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成模式" prop="salesmanMode">
        <el-select v-model="PlaceCreateForm.salesmanMode" placeholder="请选择">
          <el-option
            v-for="salesmanMode in modes"
            :key="salesmanMode.value"
            :label="salesmanMode.key"
            :value="salesmanMode.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成数额" prop="salesmanCount">
        <el-input-number v-model="PlaceCreateForm.salesmanCount" :min="0" :max="100" label="客服分成数额"></el-input-number>
      </el-form-item>
      <el-form-item label="经销商" prop="_agentId">
        <el-select v-model="PlaceCreateForm._agentId" placeholder="请选择">
          <el-option
            v-for="agent in PlaceCreateForm.agents"
            :key="agent.id"
            :label="agent.name"
            :value="agent.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成模式" prop="agentMode">
        <el-select v-model="PlaceCreateForm.agentMode" placeholder="请选择">
          <el-option
            v-for="agentMode in modes"
            :key="agentMode.value"
            :label="agentMode.key"
            :value="agentMode.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分成数额" prop="agentCount">
        <el-input-number v-model="PlaceCreateForm.agentCount" :min="0" :max="100" label="经销商分成数额"></el-input-number>
      </el-form-item>
      <el-form-item label="价格" prop="_gradId">
        <el-select v-model="PlaceCreateForm._gradId" placeholder="请选择">
          <el-option
            v-for="grad in PlaceCreateForm.grads"
            :key="grad.id"
            :label="grad.name"
            :value="grad.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('PlaceCreateForm')">提交</el-button>
        <el-button @click="resetForm('PlaceCreateForm')">重置</el-button>
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
// import { pcaa } from 'area-data'
import { regionData, CodeToText } from 'element-china-area-data'
import {getModes, create} from '@/models/place'
import {getSalesmans, getAgents} from '@/models/user'
import {getAll} from '@/models/grad'
// import {create} from '@/models/place'

export default {
  data () {
    return {
      // pcaa: pcaa,
      pcaa: regionData,
      dialogVisible: true,
      modes: [],
      PlaceCreateForm: {
        name: '',
        email: '',
        password: '',
        location: '',
        agentCount: 0,
        salesmanCount: 0,
        _salesmanId: '',
        _agentId: '',
        agents: [],
        salesmans: [],
        province: '',
        city: '',
        district: '',
        _gradId: ''
      }
    }
  },
  methods: {
    async initData () {
      this.modes = getModes()
      let sales = this.PlaceCreateForm.salesmans = await getSalesmans()
      this.PlaceCreateForm._salesmanId = sales[0] && sales[0].id
      let agents = this.PlaceCreateForm.agents = await getAgents()
      this.PlaceCreateForm._agentId = agents[0] && agents[0].id
      let grads = this.PlaceCreateForm.grads = await getAll()
      console.log(grads)
      this.PlaceCreateForm._gradId = grads[0].id
    },

    async submitForm (formName) {
      // let name = this.PlaceCreateForm.name
      let data = this.PlaceCreateForm
      let locs = data.location
      data.province = CodeToText[locs[0]]
      data.city = CodeToText[locs[1]]
      data.district = CodeToText[locs[2]]
      try {
        await create(data)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.$router.push('/places')
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    },
    resetForm (formName) {
      this.PlaceCreateForm.name = ''
    },
    handleClose () {
      this.$router.push('/places')
    }
  },

  mounted: function () {
    this.initData()
  }
}
</script>
