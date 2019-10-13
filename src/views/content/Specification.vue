<template>
  <div>
    <h3>编辑{{requestInfo.name}}信息</h3>
    <single-page-management :request_info="requestInfo"></single-page-management>
  </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Specification',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'standard',
        name: '标准规范'
      }
    }
  }
}
</script>

<style scoped>

</style>
