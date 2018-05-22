<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form :inline="true">
        <el-form-item label="时间区间">
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="orders"
      border
      style="width: 100%">
      <el-table-column
        prop="no"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="place.name"
        label="场地">
      </el-table-column>
      <el-table-column
        prop="agent.name"
        label="经销商">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="设备编号">
      </el-table-column>
      <el-table-column
        prop="statusWord"
        label="交易状态"
        :filters="[{text: '成功', value: '成功'}, {text: '预支付', value: '预支付'}, {text: '已退款', value: '已退款'}]"
        :filter-method="filter">
      </el-table-column>
      <el-table-column
        prop="srvStatusWord"
        label="服务状态">
      </el-table-column>
      <el-table-column
        prop="openId"
        label="客户">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时长">
      </el-table-column>
      <el-table-column
        prop="created"
        label="时间">
      </el-table-column>
    </el-table>
    <div align="center">
      <el-pagination
        :page-size="50"
        layout="prev, pager, next"
        :total="allOrders.length"
        v-on:current-change="onPageChange">
      </el-pagination>
    </div>
  </el-card>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import {batch} from '@/models/order'

export default {
  data () {
    return {
      time: [],
      orders: [],
      allOrders: [],
      token: null,
      hasMore: true
    }
  },
  methods: {
    async fetch () {
      if (!this.hasMore) return
      if (!this.time.length) return
      let rt = await batch({
        startTime: (new Date(this.time[0])).toISOString(),
        endTime: (new Date(this.time[1])).toISOString(),
        count: 500
      })
      if (rt.token) {
        this.token = rt.token
      } else {
        this.hasMore = false
      }
      this.allOrders = rt.result
      this.orders = this.allOrders.slice(0, 50)
    },

    onPageChange (page) {
      this.orders = this.allOrders.slice((page - 1) * 50, page * 50)
    },

    filter (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
