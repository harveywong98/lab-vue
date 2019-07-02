<template>
  <div>
    <el-dialog
      :title.sync=title
      :visible.sync="isShow"
      width="80%"
      :before-close="closeMyself">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeMyself">取 消</el-button>
    <el-button type="primary" @click="closeMyself">发 布</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PopUpDialog',
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
