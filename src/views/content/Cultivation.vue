<template>
    <div>
      <h3>编辑{{requestInfo.name}}信息</h3>
      <single-page-management :request_info="requestInfo"></single-page-management>
    </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Cultivation',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'student',
        name: '学生培养'
      }
    }
  }
}
</script>
<style scoped>

</style>
