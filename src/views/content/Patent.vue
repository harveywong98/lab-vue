<template>
  <div>
    <h3>编辑{{requestInfo.name}}信息</h3>
    <single-page-management :request_info="requestInfo"></single-page-management>
  </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Patent',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'result',
        name: '专利成果'
      }
    }
  }
}
</script>

<style scoped>

</style>
