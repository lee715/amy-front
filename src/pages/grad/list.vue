<template>
  <el-table
    :data="grads"
    border
    style="width: 100%">
    <el-table-column
      prop="name"
      label="名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格梯度"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间梯度">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="grad">
        <el-button @click="handleEdit(grad.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDel(grad.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getAll, remove} from '@/models/grad'

export default {
  data () {
    return {
      grads: []
    }
  },

  methods: {
    async initData () {
      try {
        this.grads = await getAll()
      } catch (e) {
        console.log(e)
      }
    },
    handleEdit (grad) {
      this.$router.push(`/grads/${grad.id}`)
    },
    handleDel (grad) {
      this.$confirm('此操作将永久删除该价格梯度, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeGrad(grad.id, (err) => {
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
    async removeGrad (id, cb) {
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
  }
}
</script>
