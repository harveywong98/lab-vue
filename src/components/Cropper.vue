<template>
  <div>
    <div class="model" v-show="model" @click="model = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div>
    <div class="cut">
      <my-copper
        ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full"
        :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
        :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
        @real-time="realTime" :high="option.high"
        @img-load="imgLoad"
      ></my-copper>
    </div>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
    <div>
      <label class="btn" for="uploads">选择图片</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
             @change="uploadImg($event, 1)">
      <button @click="refreshCrop" class="btn">重置裁剪区域</button>
      <button @click="changeScale(1)" class="btn">放大</button>
      <button @click="changeScale(-1)" class="btn">缩小</button>
      <button @click="rotateLeft" class="btn">向左旋转</button>
      <button @click="rotateRight" class="btn">向右旋转</button>
      <button @click="finish('blob')" class="btn">预览</button>
      <button @click="tryUpload" class="btn">确认上传</button>
    </div>
  </div>
</template>

<script>
import { getCookie } from '@/utils/auth'
import { VueCropper } from 'vue-cropper'
// import {Message} from 'element-ui'
export default {
  name: 'Cropper',
  components: {
    'my-copper': VueCropper
  },
  mounted () {
    this.APITYPE = this.apitype
  },
  props: ['apitype'],
  data () {
    return {
      APITYPE: 'carousel',
      model: false,
      modelSrc: '',
      crap: false,
      previews: {},
      option: {
        img: 'https://vuejs.org/images/logo.png',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 200,
        autoCropHeight: 150,
        centerBox: false,
        high: true
      },
      show: true
    }
  },
  methods: {
    realTime (data) {
      this.previews = data
    },
    refreshCrop () {
      this.$refs.cropper.refresh()
    },
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    finish () {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
        var img = window.URL.createObjectURL(data)
        this.model = true
        this.modelSrc = img
        console.log(this.modelSrc)
      })
    },
    tryUpload () {
      var formData = new FormData()
      // let name = Math.floor(Math.random() * 1000000)
      this.filesss = this.$refs.cropper.getCropBlob(data => {
        // let file = this.dataURLtoFile(data, name)
        formData.append('file', data, (Math.floor(Math.random() * 1000000) + '.' + this.option.outputType).toString())
        console.log(formData.get('file'))
        let config = {
          headers: {
            'Authorization': getCookie('USER_TOKEN')
          }
        }
        let url = process.env.BASE_API + '/image/for'
        if (url === 'avatar') {
          url = process.env.BASE_API + '/?'
        }
        this.$axios.post('url', formData, config)
          .then(resp => {
            console.log(resp)
          }).catch(err => {
            console.log(err)
          })
      })
      console.log(this.filesss)
    },
    imgLoad (msg) {
      console.log(msg)
    },
    uploadImg (e, num) {
      // this.option.img
      let file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
          console.log(data)
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .cut {
    width: 80%;
    height: 500px;
    margin: 30px auto;
  }

  .c-item {
    max-width: 800px;
    margin: 10px auto;
    margin-top: 20px;
  }

  .content {
    margin: auto;
    max-width: 1200px;
    margin-bottom: 100px;
  }

  .test-button {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }

  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:20px 10px 0px 0px;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    transition: all .2s ease;
    text-decoration: none;
    user-select: none;
  }

  .des {
    line-height: 30px;
  }

  code.language-html {
    padding: 10px 20px;
    margin: 10px 0px;
    display: block;
    background-color: #333;
    color: #fff;
    overflow-x: auto;
    font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
    border-radius: 5px;
    white-space: pre;
  }

  .show-info {
    margin-bottom: 50px;
  }

  .show-info h2 {
    line-height: 50px;
  }

  /*.title, .title:hover, .title-focus, .title:visited {
    color: black;
  }*/

  .title {
    display: block;
    text-decoration: none;
    text-align: center;
    line-height: 1.5;
    margin: 20px 0px;
    background-image: -webkit-linear-gradient(left,#3498db,#f47920 10%,#d71345 20%,#f7acbc 30%,#ffd400 40%,#3498db 50%,#f47920 60%,#d71345 70%,#f7acbc 80%,#ffd400 90%,#3498db);
    color: transparent;
    -webkit-background-clip: text;
    background-size: 200% 100%;
    animation: slide 5s infinite linear;
    font-size: 40px;
  }

  .test {
    height: 500px;
  }

  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
  }

  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  }

  .c-item {
    display: block;
    user-select: none;
  }

  @keyframes slide {
    0%  {
      background-position: 0 0;
    }
    100% {
      background-position: -100% 0;
    }
  }

</style>
