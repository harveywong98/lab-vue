<template>
  <div>
    <el-dialog
      fullscreen
      :title.sync=title
      :visible.sync="isShow"
      width="80%"
      :before-close="closeMyself">
      <div>
        <el-input
          type="text"
          placeholder="请输入标题"
          v-model="titles"
          maxlength="30"
          show-word-limit
        >
        </el-input>
        <br/>
        <br/>
        <tiny-m-c-e ref="input" :getted_html="getted_html"></tiny-m-c-e>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMyself">取 消</el-button>
        <el-button type="primary" @click="closeAndRequest">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TinyMCE from '@/components/TinyMCE'
export default {
  name: 'PopUpDialog',
  components: {TinyMCE},
  props: ['operation', 'module', 'isShow', 'getted_html', 'getted_title'],
  data () {
    return {
      titles: this.getted_title
    }
  },
  methods: {
    closeMyself () {
      let richText = this.$refs.input
      richText.tinymceHtml = ''
      this.$emit('on-close')
    },
    closeAndRequest () {
      let richText = this.$refs.input
      this.$emit('on-request', this.titles, richText.tinymceHtml)
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
