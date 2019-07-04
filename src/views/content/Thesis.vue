<template>
  <div>
    <h3>编辑{{requestInfo.name}}信息</h3>
    <single-page-management :request_info="requestInfo"></single-page-management>
  </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Thesis',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'paper',
        name: '论文巨著'
      }
    }
  }
}
</script>

<style scoped>

</style>
