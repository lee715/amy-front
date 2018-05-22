<template>
  <el-dialog
    :visible.sync="qrVisible"
    width="500px"
    :before-close="closeQr">
    <qrcode :value="url" :options="{ size: 300 }"></qrcode>
  </el-dialog>
</template>

<script>
import config from '../env/dev'

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
    this.url = `${config.apiUrl}/api/ticket?uid=${this.uid}`
  }
}
</script>
