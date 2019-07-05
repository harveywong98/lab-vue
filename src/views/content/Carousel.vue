<template>
    <div @click="consoles">
      <div style="display:inline" v-for="item in urls" :key="item" >
        <el-image :src="item" style="height: 200px;" fit="contain"></el-image>
<!--        <el-image-->
<!--          style="width: 100px; height: 100px"-->
<!--          src="item"-->
<!--          fit="contain">-->
<!--        </el-image>-->
      </div>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
import {getCarousel} from '../../api/singlePage'
export default {
  data () {
    return {
      // urls: [
      //   'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //   'http://192.168.1.120:8888/files/1562290622880.png',
      //   'http://192.168.1.120:8888/files/1562290631748.png'
      // ],
      type: 'image',
      urlObjs: [],
      action: process.env.BASE_API + '/posts',
      name: 'Carousel',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created () {
    getCarousel({
      type: this.type
    }).then(resp => {
      this.urlObjs = resp.data.data
    })
  },
  computed: {
    urls () {
      return this.urlObjs.map((o) => {
        return o['content']
      })
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    consoles () {
      console.log(this.urls)
    }
  }
}
</script>

<style scoped>

</style>
