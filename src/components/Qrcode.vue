<template>
  <el-dialog
    :visible.sync="qrVisible"
    width="500px"
    :before-close="closeQr">
    <qrcode :value="url" :options="{ size: 300 }"></qrcode>
  </el-dialog>
</template>

<script>
import config from '@/env'

export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    closeQr () {
      this.$emit('closeQr')
    }
  },
  props: ['uid', 'qrVisible'],
  mounted: function () {
    this.url = `${config.apiUrl}/wx/ticket?uid=${this.uid}`
  }
}
</script>
