<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button icon='el-icon-plus' size="small" @click="handleClick($event)" button_type="添加">添加成员</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      stripe
      :data="resultData"
      style="width: 100%">
      <el-table-column
        label="头像"
        min-width="10%">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="100px" height="100px" alt="头像"/>
        </template>
        <el-image
          style="width: 100px; height: 100px"
          src="image"
          fit="fit"></el-image>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="35%">
      </el-table-column>
      <el-table-column
        prop="position"
        label="职称"
        min-width="35%">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="10%">
        <template slot-scope="scope">
          <el-link type="primary" icon="el-icon-edit" size="mini" @click="editOne(scope.row.id,$event)" button_type="编辑">编辑</el-link>
          &nbsp;&nbsp;
          <el-link type="danger" icon="el-icon-delete" size="mini" @click="deleteOneById(scope.row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="page.currentPage"
      @current-change="currentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
      :page-count="page.pageNum">
    </el-pagination>
    <transition name="fade">
      <pop-up-dialog-for-members
        v-if='isShowPublish'
        :getted_html="getted_html"
        :getted_membername="getted_membername"
        :getted_rank="getted_rank"
        :getted_avatar="getted_avatar"
        :module="name"
        :operation="clicked_button_type"
        :is-show="isShowPublish"
        @on-request="sendRequest"
        @on-close="closeDialog">
      </pop-up-dialog-for-members>
    </transition>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import base64 from 'js-base64'
// eslint-disable-next-line no-unused-vars
import {deleteOneMember, insertOneMember, queryByPage, queryOne, updateOneMember} from '../../api/members'
import CleanWordHTML from '@/utils/MSWordHtmlCleaners'
import PopUpDialogForMembers from '@/components/PopUpDialogForMembers'
export default {
  name: 'News',
  components: {
    'pop-up-dialog-for-members': PopUpDialogForMembers
  },
  data () {
    return {
      styles: {
        showOverflowTooltip: true
      },
      loading: false,
      page: {
        prePage: 0,
        nextPage: 0,
        lastPage: 0,
        pageNum: 0,
        PAGE_SIZE: 5,
        currentPage: 0
      },
      name: '团队成员',
      clicked_button_type: '',
      isShowPublish: false,
      tableData: [],
      resultData: [], // 防止watch无限循环
      getted_html: '',
      getted_membername: '',
      getted_rank: '',
      getted_avatar: '',
      editing_id: 0
    }
  },
  watch: {
    tableData () {
      let Base64 = base64.Base64
      this.resultData = this.tableData.map(function (o) {
        let decodedContent = Base64.decode(o.content)
        o['content'] = CleanWordHTML(decodedContent).replace(/<\/?.+?>/g, '')
        return o
      })
    }
  },
  mounted: function () {
    this.initData()
  },
  methods: {
    initData () {
      this.loading = true
      queryByPage({
        page: this.currentPage,
        size: this.page.PAGE_SIZE
      }).then(resp => {
        this.loading = false
        this.tableData = resp.data.data.list
        this.page.nextPage = resp.data.data.nextPage
        this.page.prePage = resp.data.data.prePage
        this.page.pageNum = resp.data.data.pages
      }).catch(() => {
        Message.error({
          message: '失败'
        })
      })
    },
    deleteOneById (id) {
      this.loading = true
      deleteOneMember({
        id: id
      }).then(resp => {
        this.initData()
        console.log(resp.data)
      }).catch(() => {
        Message.error({
          message: '失败'
        })
      })
      this.loading = false
    },
    editOne (id, event) {
      this.clicked_button_type = event.currentTarget.getAttribute('button_type')
      console.log(this.clicked_button_type)
      this.editing_id = id
      queryOne({
        id: id
      }).then(resp => {
        this.isShowPublish = true
        let Base64 = base64.Base64
        this.getted_html = Base64.decode(resp.data.data.content)
        this.getted_avatar = resp.data.data.image
        this.getted_membername = resp.data.data.name
        this.getted_rank = resp.data.data.position
        console.log(this.getted_html)
        this.getted_title = resp.data.data.title
      }).catch(() => {
        Message.error({
          message: '失败'
        })
      })
    },
    handleClick (event) {
      this.getted_html = ''
      this.getted_avatar = ''
      this.getted_membername = ''
      this.getted_rank = ''
      this.isShowPublish = true
      this.clicked_button_type = event.currentTarget.getAttribute('button_type')
    },
    closeDialog () {
      this.isShowPublish = false
      this.getted_title = ''
      this.getted_html = ''
    },
    sendRequest (memberName, rank, content, avatar) {
      this.loading = true
      var that = this
      let Base64 = base64.Base64
      let encodedHtml = Base64.encode(content)
      console.log(encodedHtml)
      if (this.clicked_button_type === '添加') {
        insertOneMember({
          name: memberName,
          position: rank,
          content: encodedHtml,
          image: avatar
        }).then(resp => {
          this.initData()
          this.isShowPublish = false
        }).catch(() => {
          Message.error({
            message: '失败'
          })
        })
      } else if (this.clicked_button_type === '编辑') {
        updateOneMember({
          id: that.editing_id,
          name: memberName,
          position: rank,
          content: encodedHtml,
          image: avatar
        }).then(
          this.initData(),
          this.isShowPublish = false
        ).catch(() => {
          this.loading = false
          Message.error({
            message: '失败'
          })
        })
      }
      this.getted_title = ''
      this.getted_html = ''
    },
    currentChange () {
      this.loading = true
      queryByPage({
        page: this.page.currentPage,
        size: this.page.PAGE_SIZE
      }).then(resp => {
        this.loading = false
        this.tableData = resp.data.data.list
        this.page.nextPage = resp.data.data.nextPage
        this.page.prePage = resp.data.data.prePage
        this.page.pageNum = resp.data.data.pages
      }).catch(() => {
        this.loading = false
        Message.error({
          message: '失败'
        })
      })
    },
    prevClick () {
      this.loading = true
      queryByPage({
        page: this.page.prePage,
        size: this.page.PAGE_SIZE
      }).then(resp => {
        this.loading = false
        this.tableData = resp.data.data.list
        this.page.nextPage = resp.data.data.nextPage
        this.page.prePage = resp.data.data.prePage
        this.page.pageNum = resp.data.data.pages
      }).catch(() => {
        this.loading = false
        Message.error({
          message: '失败'
        })
      })
    },
    nextClick () {
      this.loading = true
      queryByPage({
        page: this.page.nextPage,
        size: this.page.PAGE_SIZE
      }).then(resp => {
        this.loading = false
        this.tableData = resp.data.data.list
        this.page.nextPage = resp.data.data.nextPage
        this.page.prePage = resp.data.data.prePage
        this.page.pageNum = resp.data.data.pages
        console.log(this.tableData)
      }).catch(() => {
        this.loading = false
        Message.error({
          message: '失败'
        })
      })
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 250ms;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
