<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form :inline="true" :model="query">
        <el-form-item label="场地">
          <el-select v-model="query.placeId" placeholder="请选择">
            <el-option
              v-for="place in places"
              :key="place.id"
              :label="place.name"
              :value="place.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间区间">
          <el-date-picker
            v-model="query.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">日统计</div>
      <ve-line :data="dailySt"></ve-line>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">月统计</div>
      <ve-histogram :data="monthSt"></ve-histogram>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">对账统计</div>
      <ve-line :data="reconSt" :settings="reconSet"></ve-line>
    </el-card>
  </el-card>
</template>

<script>
import {getAll} from '@/models/place'
import {getPlaceSt} from '@/models/statistic'
import VeLine from 'v-charts/lib/line'
import VeHistogram from 'v-charts/lib/histogram'
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      query: {
        time: []
      },
      placeId: null,
      places: [],
      devices: [],
      dailySt: {},
      month: {},
      reconSt: {},
      reconSet: {
        area: true,
        labelMap: {
          date: '日期',
          wxCost: '微信扣除额',
          saleCost: '客服分成额',
          agentCost: '厂商分成额',
          salesmanMode: '客服分成模式',
          salesmanCount: '客服分成比率',
          agentMode: '厂商分成模式',
          agentCount: '厂商分成比率',
          profit: '利润'
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'getPlaceSt'
    ]),
    async initData () {
      try {
        this.places = await getAll()
      } catch (e) {
        console.log(e)
      }
    },

    async onSubmit () {
      let start = this.query.time[0]
      let end = this.query.time[1]
      if (start) start = (new Date(start)).toISOString()
      if (end) end = (new Date(end)).toISOString()
      let st = await getPlaceSt(this.query.placeId, start, end)
      this.dailySt = {
        columns: ['date', 'count'],
        rows: _.sortBy(st.daily, 'date').map((d) => {
          return {date: d.date, count: d.count}
        })
      }
      this.monthSt = {
        columns: ['date', 'count'],
        rows: _.sortBy(st.month, 'date').map((d) => {
          return {date: d.date, count: d.count}
        })
      }
      this.reconSt = {
        columns: ['date', 'wxCost', 'saleCost', 'agentCost', 'profit', 'agentMode', 'salesmanMode', 'agentMode', 'salesmanCount'],
        rows: _.sortBy(st.reconciliation, 'date')
      }
    },

    async switchPlace () {
      let place = _.find(this.places, {id: this.placeId})
      if (place) {
        this.devices = place.devices
        let st = await this.getPlaceSt(this.placeId)
        this.dailySt = {
          columns: ['date', 'count'],
          rows: _.sortBy(st.daily, 'date').map((d) => {
            return {date: d.date, count: d.count}
          })
        }
        this.monthSt = {
          columns: ['date', 'count'],
          rows: _.sortBy(st.month, 'date').map((d) => {
            return {date: d.date, count: d.count}
          })
        }
        this.reconSt = {
          columns: ['date', 'wxCost', 'saleCost', 'agentCost', 'profit', 'agentMode', 'salesmanMode', 'agentMode', 'salesmanCount'],
          rows: _.sortBy(st.reconciliation, 'date')
        }
      }
    }
  },

  mounted: function () {
    this.initData()
  },

  components: { VeLine, VeHistogram }
}
</script>
