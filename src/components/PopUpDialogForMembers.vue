<template>
  <div style="position:fixed" >
    <el-dialog
      append-to-body
      :modal-append-to-body='true'
      fullscreen
      :title.sync=title
      :visible.sync="isShow"
      width="80%"
      :before-close="closeMyself">
      <div>
        <el-input
          type="text"
          placeholder="请输入姓名"
          v-model="memberName"
          maxlength="10"
          show-word-limit
        >
        </el-input>
        <br/>
        <br/>
        <el-input
          type="text"
          placeholder="请输入职称"
          v-model="rank"
          maxlength="30"
          show-word-limit
        >
        </el-input>
        <br/>
        <br/>
        <div style="text-align: center">
          <el-link type="primary" @click="showCropper">点击重新上传头像</el-link>
          <br/>
          <div @click="showCropper">
            <el-image
              :src="avatar"
              style="width: 100px; height: 100px"
              fit="fit">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="margin: auto;padding: 178px 0"></i>
              </div>
            </el-image>
            </div>
        </div>
        <br/>
        <br/>
        <tiny-m-c-e ref="input" :getted_html="getted_html"></tiny-m-c-e>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMyself">取 消</el-button>
        <el-button type="primary" @click="closeAndRequest">发 布</el-button>
      </span>
      <el-dialog title="上传头像"
                 top="8vh"
                 width="42.55%"
                 :visible.sync="isShowCropper"
                 :before-close="hideCropper"
                 :append-to-body="true" >
        <cropper :apitype="apitype"
                 :fixedd="fixedd"
                 @imgurlchanged="imgUrlChanged"
                 ref="mycropper"></cropper>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import TinyMCE from '@/components/TinyMCE'
import Cropper from '@/components/Cropper'
export default {
  name: 'PopUpDialogForMembers',
  components: {Cropper, TinyMCE},
  props: ['operation', 'module', 'isShow', 'getted_html', 'getted_membername', 'getted_rank', 'getted_avatar'],
  data () {
    return {
      fixedd: true,
      apitype: 'avatar',
      isShowCropper: false,
      memberName: this.getted_membername,
      rank: this.getted_rank,
      avatar: this.getted_avatar
    }
  },
  methods: {
    showCropper () {
      this.isShowCropper = true
    },
    hideCropper () {
      this.isShowCropper = false
    },
    closeMyself () {
      let richText = this.$refs.input
      richText.tinymceHtml = ''
      this.$emit('on-close')
    },
    closeAndRequest () {
      let richText = this.$refs.input
      let cropper = this.$refs.mycropper
      this.$emit('on-request', this.memberName, this.rank, richText.tinymceHtml, cropper.respUrl)
    },
    imgUrlChanged (url) {
      this.avatar = url
      this.isShowCropper = false
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
