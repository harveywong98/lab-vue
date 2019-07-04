<template>
  <div>
    <h3>编辑{{requestInfo.name}}信息</h3>
    <single-page-management :request_info="requestInfo"></single-page-management>
  </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Research',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'direction',
        name: '研究方向'
      }
    }
  }
}
</script>

<style scoped>

</style>
