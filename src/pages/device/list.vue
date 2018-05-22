<template>
  <div>
    <el-table
      :data="devices"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="响应延时">
              <span>{{ props.row.ms }}毫秒</span>
            </el-form-item>
            <ve-line :data="props.row.lineChart" :settings="lineSet"></ve-line>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="设备名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="设备编码"
        prop="uid">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status">
      </el-table-column>
      <el-table-column
        label="操作"
        width="160">
        <template slot-scope="device">
          <el-button @click="handleQrcode(device.row)" type="text" size="small"><i class="el-icon-picture"></i></el-button>
          <el-button @click="handleEdit(device.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(device.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <qrcode :uid="uid" :qrVisible="qrVisible" @closeQr="closeQr"></qrcode>
  </div>
</template>

<script>
import {getByPlaceId, remove} from '@/models/device'
import VeLine from 'v-charts/lib/line'
import Qrcode from '@/components/Qrcode'

export default {
  data () {
    return {
      devices: [],
      lineSet: {
        labelMap: {
          date: '日期',
          count: '流水'
        }
      },
      uid: '',
      qrVisible: false
    }
  },

  methods: {
    async initData () {
      try {
        let devices = await getByPlaceId(this.$route.params.id)
        for (let de of devices) {
          de.lineChart = {
            columns: ['date', 'count'],
            rows: de.st
          }
        }
        this.devices = devices
      } catch (e) {
        console.log(e)
      }
    },
    handleQrcode (device) {
      this.uid = device.uid
      this.qrVisible = true
    },
    closeQr () {
      this.qrVisible = false
    },
    handleEdit (device) {
      this.$router.push(`/devices/${device.id}`)
    },
    handleDel (device) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeDevice(device.id, (err) => {
          if (!err) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: err.message
            })
          }
        })
      })
    },
    async removeDevice (id, cb) {
      try {
        await remove(id)
        cb(null)
      } catch (e) {
        cb(e)
      }
    }
  },

  mounted: function () {
    this.initData()
  },

  components: { VeLine, Qrcode }
}
</script>
