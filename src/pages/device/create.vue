<template>
  <el-dialog
    title="创建设备"
    :visible.sync="dialogVisible"
    :before-close="handleClose">
    <el-form :model="DeviceCreateForm" status-icon ref="DeviceCreateForm" label-width="100px">
      <el-form-item label="名字" prop="name">
        <el-input type="text" v-model="DeviceCreateForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="编码" prop="uid">
        <el-input type="text" v-model="DeviceCreateForm.uid" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="场地" prop="_placeId">
        <el-select v-model="DeviceCreateForm._placeId" placeholder="请选择">
          <el-option
            v-for="place in places"
            :key="place.id"
            :label="place.name"
            :value="place.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('DeviceCreateForm')">提交</el-button>
        <el-button @click="resetForm('DeviceCreateForm')">重置</el-button>
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
import {create} from '@/models/device'
import {getAll} from '@/models/place'

export default {
  data () {
    return {
      dialogVisible: true,
      DeviceCreateForm: {
        name: '',
        uid: '',
        _placeId: ''
      },
      places: []
    }
  },
  methods: {
    async initData () {
      this.places = await getAll()
    },

    async submitForm (formName) {
      try {
        await create(this.DeviceCreateForm)
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.$router.push('/devices')
      } catch (e) {
        this.$message({
          type: 'error',
          message: e.message
        })
      }
    },
    resetForm (formName) {
      this.DeviceCreateForm.name = ''
    },
    handleClose () {
      this.$router.push('/devices')
    }
  },

  mounted: function () {
    this.initData()
  }
}
</script>
