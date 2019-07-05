<template>
  <div>
    <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
<!--    <editor id='editorId' v-model='tinymceHtml' :init='init'></editor>-->
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import uploadPicture from '../api/upload'

import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'

export default {
  name: 'TinyMCE',
  props: ['getted_html', 'getted_title'],
  data () {
    return {
      title: this.getted_title,
      tinymceHtml: this.getted_html,
      init: {
        selector: `#tinymce`,
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
            uploadPicture(formData).then((res) => {
              // console.log(res)
              console.log(res.data)
              success(res.data.data)
            }).catch(() => {
              failure('上传失败')
            })
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
}
</script>

<style scoped>

</style>
