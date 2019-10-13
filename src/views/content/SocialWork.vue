<template>
  <div>
    <h3>编辑{{requestInfo.name}}信息</h3>
    <single-page-management :request_info="requestInfo"></single-page-management>
  </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'SocialWork',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'social_work',
        name: '社会服务'
      }
    }
  }
}
</script>

<style scoped>

</style>
