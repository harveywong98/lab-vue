<template>
  <div>
    <el-input
      type="text"
      placeholder="请输入标题"
      v-model="title"
      maxlength="30"
      show-word-limit
    >
    </el-input>
    <br/>
    <br/>
    <editor id='tinymce' v-model='tinymceHtml' :init='init' ></editor>
  </div>
</template>

<script>
// import base64 from 'js-base64'
import axios from 'axios'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'

import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'

export default {
  name: 'TinyMCE',
  data () {
    return {
      title: '',
      tinymceHtml: '',
      init: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 750,
        plugins: 'preview lists image media table wordcount autoresize',
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
        toolbar:
        // 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
        'preview | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        images_upload_handler: function (blobInfo, success, failure) {
          if (blobInfo.blob().size > self.maxSize) {
            failure('文件体积过大')
          }
          let fileType = blobInfo.blob().name.slice(blobInfo.blob().name.lastIndexOf('.') + 1).toLowerCase()
          if (/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileType)) {
            uploadPic()
          } else {
            failure('图片格式错误')
          }
          function uploadPic () {
            let formData = new FormData()
            // 服务端接收文件的参数名，文件数据，文件名
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            axios({
              method: 'POST',
              // 这里是你的上传地址
              url: 'http://127.0.0.1:8080/upload',
              data: formData
            })
              .then((res) => {
                // 这里返回的是你图片的地址
                console.log(res.data)
                success(res.data.data)
              })
              // .catch(() => {
              //   failure('上传失败')
              // })
          }
        }
      },
      mounted () {
        tinymce.init({})
      }
    }
  },
  components: {
    'editor': Editor
  }
  // ,
  // methods: {
  //   postData () {
  //     this.$emit('postData', this.tinymceHtml)
  //   },
  //   getOneData () {
  //     getonenews({
  //       id: 11
  //     }).then(response => {
  //       // console.log(response.data.data.html)
  //       let Base64 = base64.Base64
  //       let html = Base64.decode(response.data.data.html)
  //       console.log(html)
  //       this.tinymceHtml = html
  //     })
  //   }
  // }
}
</script>

<style scoped>

</style>
