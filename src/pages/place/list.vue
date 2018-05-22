<template>
  <el-table
    :data="places"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="工作">
            <span>{{ props.row.deviceCount.work }}</span>
          </el-form-item>
          <el-form-item label="空闲">
            <span>{{ props.row.deviceCount.idle }}</span>
          </el-form-item>
          <el-form-item label="无信号">
            <span>{{ props.row.deviceCount.fault }}</span>
          </el-form-item>
          <el-form-item label="总数">
            <span>{{ props.row.deviceCount.total }}</span>
          </el-form-item>
          <ve-line :data="props.row.chart"></ve-line>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="场地名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="地理位置"
      prop="location">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="countStatus">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="place">
        <el-button @click="handleDevices(place.row)" type="text" size="small">查看设备</el-button>
        <el-button @click="handleEdit(place.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDel(place.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getAll, remove} from '@/models/place'
import VeLine from 'v-charts/lib/line'

export default {
  data () {
    return {
      places: []
    }
  },

  methods: {
    async initData () {
      try {
        this.places = await getAll()
      } catch (e) {
        console.log(e)
      }
    },
    handleDevices (place) {
      this.$router.push(`/places/${place.id}/devices`)
    },
    handleEdit (place) {
      this.$router.push(`/places/${place.id}`)
    },
    handleDel (place) {
      this.$confirm('此操作将永久删除该场地, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removePlace(place.id, (err) => {
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
    async removePlace (id, cb) {
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

  components: { VeLine }
}
</script>
