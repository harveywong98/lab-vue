<template>
  <div>
    <el-dialog
      :title.sync=title
      :visible.sync="isShow"
      width="80%"
      :before-close="closeMyself">
      <div>
        <tiny-m-c-e></tiny-m-c-e>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeMyself">取 消</el-button>
    <el-button type="primary" @click="closeMyself">发 布</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import TinyMCE from '@/components/TinyMCE'
export default {
  name: 'PopUpDialog',
  components: {TinyMCE},
  props: ['operation', 'module', 'isShow'],
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  },
  computed: {
    title () {
      return this.operation + this.module
    }
  }
}
</script>

<style scoped>

</style>
