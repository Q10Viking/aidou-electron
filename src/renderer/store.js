import Vue from 'vue'
import storage from '@/common/storage'

// 初始化配置
const collectData = storage.get('collect_data') || {}

export default new Vue({
  data: {
    collectData
  },

  watch: {
    'collectData': {
      immediate: true,
      deep: true,
      handler (value) {
        storage.set('collect_data', value)
      }
    }
  }
})
