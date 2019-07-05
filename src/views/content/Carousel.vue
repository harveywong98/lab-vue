<template>
    <div>
      <div class="block" >
        <h2 style="text-align: center">轮播图预览（点击图片删除轮播图）</h2>
        <el-carousel trigger="click" height="300px" >
          <el-carousel-item v-for="item in urlObjs" :key="item">
            <el-image :src="item.content" fit="fit" @click="popup(item.id)"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-dialog
        title="删除确认"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定要删除这张轮播图吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDelete">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import {getCarousel, deleteCarousel} from '../../api/singlePage'
export default {
  data () {
    return {
      clickedId: 0,
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
  methods: {
    popup (id) {
      this.clickedId = id
      this.dialogVisible = true
    },
    handleDelete () {
      deleteCarousel({
        type: this.type,
        id: this.clickedId
      }).then(resp => {
        getCarousel({
          type: this.type
        }).then(resp => {
          this.urlObjs = resp.data.data
        })
      }).catch(err => Message.error(err))
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
