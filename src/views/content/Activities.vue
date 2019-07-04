<template>
    <div>
      <h3>编辑实验室风采</h3>
      <tiny-m-c-e ref="input" :getted_html="getted_html"></tiny-m-c-e>
      <br/>
      <el-button type="primary">发布</el-button>
    </div>
</template>

<script>
import TinyMCE from '@/components/TinyMCE'
export default {
  name: 'Activities',
  components: {TinyMCE},
  data () {
    return {
      getted_html: ''
    }
  }
}
</script>

<style scoped>

</style>
