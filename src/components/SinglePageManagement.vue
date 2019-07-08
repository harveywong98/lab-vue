<template>
  <div v-loading="isUploading"
       element-loading-text="文章发布中"
       element-loading-spinner="el-icon-loading">
    <tiny-m-c-e ref="input" :getted_html="getted_html" v-if="isShow"></tiny-m-c-e>
    <br/>
    <el-button type="primary" @click="update">发布</el-button>
  </div>
</template>

<script>
import TinyMCE from '@/components/TinyMCE'
import {getOne, updateOne} from '@/api/singlePage'
import {Message} from 'element-ui'
import base64 from 'js-base64'
export default {
  name: 'SinglePageManagement',
  components: {TinyMCE},
  data () {
    return {
      isUploading: false,
      requestInfo: this.request_info,
      getted_html: '',
      loading: false,
      values: {
        id: 0,
        title: '',
        content: ''
      },
      isShow: false
    }
  },
  props: ['request_info'],
  mounted: function () {
    this.isShow = false
    let _this = this
    this.title = _this.requestInfo.name
    this.editOne()
  },
  watch: {
    values () {
      this.isShow = true
    }
  },
  methods: {
    editOne () {
      let _this = this
      getOne({
        type: _this.requestInfo.type
      }).then(resp => {
        let Base64 = base64.Base64
        this.getted_html = Base64.decode(resp.data.data.content)
        this.values = resp.data.data
        console.log(this.values)
      }).catch((error) => {
        Message.error({
          message: error
        })
      })
    },
    update () {
      this.isUploading = true
      let Base64 = base64.Base64
      this.values.content = Base64.encode(this.$refs.input.tinymceHtml)
      updateOne(this.values)
        .then(resp => {
          this.editOne()
          this.isUploading = false
          Message.success('发布成功')
        }).catch((error) => {
          this.isUploading = false
          Message.error({
            message: error
          })
        })
    }
  }
}

</script>

<style scoped>

</style>
