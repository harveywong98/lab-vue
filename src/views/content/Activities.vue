<template>
    <div>
      <h3>编辑{{requestInfo.name}}</h3>
      <single-page-management :request_info="requestInfo"></single-page-management>
    </div>
</template>

<script>
import SinglePageManagement from '@/components/SinglePageManagement'
export default {
  name: 'Activities',
  components: {SinglePageManagement},
  data () {
    return {
      requestInfo: {
        type: 'lab_style',
        name: '实验室风采'
      }
    }
  }
}
</script>

<style scoped>

</style>
