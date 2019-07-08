<template>
    <el-row style="justify-content: center">
      <el-col :span="1"></el-col>
      <el-col :span="23" >
        <div class="block">
          <h2>轮播图预览（点击图片删除轮播图）</h2>
          <el-carousel trigger="click" height="300px" style="width: 580px;height: 360px;margin: 0 auto;">
            <el-carousel-item v-for="item in urlObjs" :key="item.id">
              <el-image :src="item.content" fit="fill" @click="popup(item.id)">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" style=""></i>
                </div>
              </el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-dialog
        title="删除确认"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定要删除这张轮播图吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDelete">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
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
      name: 'CarouselView',
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
          this.dialogVisible = false
          this.urlObjs = resp.data.data
        })
      }).catch(err => {
        this.dialogVisible = false
        Message.error(err)
      })
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
