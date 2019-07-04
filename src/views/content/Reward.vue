<template>
  <div>
    <h3>编辑{{requestInfo.name}}信息</h3>
    <single-page-management :request_info="requestInfo"></single-page-management>
  </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Reward',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'award',
        name: '获奖成果'
      }
    }
  }
}
</script>

<style scoped>

</style>
