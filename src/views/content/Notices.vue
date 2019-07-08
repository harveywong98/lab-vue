<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button icon='el-icon-plus' size="small" @click="handleClick($event)" button_type="发布">发布公告</el-button>
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
        prop="date"
        label="发布时间"
        min-width="10%">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="20%">
      </el-table-column>
      <el-table-column
        prop="content"
        :show-overflow-tooltip="styles.showOverflowTooltip"
        label="内容"
        min-width="60%">
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
      <pop-up-dialog
        v-if='isShowPublish'
        :getted_html="getted_html"
        :getted_title="getted_title"
        :module="name"
        :operation="clicked_button_type"
        :is-show="isShowPublish"
        @on-request="sendRequest"
        @on-close="closeDialog">
      </pop-up-dialog>
    </transition>
  </div>
</template>

<script>
import {Message} from 'element-ui'
import base64 from 'js-base64'
import PopUpDialog from '@/components/PopUpDialog'
import {deleteOneNotice, insertOneNotice, queryByPage, queryOne, updateOneNotice} from '../../api/notices'
import CleanWordHTML from '@/utils/MSWordHtmlCleaners'
export default {
  name: 'Notices',
  components: {
    'pop-up-dialog': PopUpDialog
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
        PAGE_SIZE: 10,
        currentPage: 0
      },
      name: '公示公告',
      clicked_button_type: '',
      isShowPublish: false,
      tableData: [],
      resultData: [],
      getted_html: '',
      getted_title: '',
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
      deleteOneNotice({
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
      this.editing_id = id
      queryOne({
        id: id
      }).then(resp => {
        this.isShowPublish = true
        let Base64 = base64.Base64
        this.getted_html = Base64.decode(resp.data.data.content)
        console.log(this.getted_html)
        this.getted_title = resp.data.data.title
      }).catch(() => {
        Message.error({
          message: '失败'
        })
      })
    },
    handleClick (event) {
      this.isShowPublish = true
      this.clicked_button_type = event.currentTarget.getAttribute('button_type')
    },
    closeDialog () {
      this.isShowPublish = false
      this.getted_title = ''
      this.getted_html = ''
    },
    sendRequest (title, content) {
      this.loading = true
      var that = this
      let Base64 = base64.Base64
      let encodedHtml = Base64.encode(content)
      console.log(encodedHtml)
      if (this.clicked_button_type === '发布') {
        insertOneNotice({
          title: title,
          content: encodedHtml
        }).then(resp => {
          this.initData()
          this.isShowPublish = false
        }).catch(() => {
          Message.error({
            message: '失败'
          })
        })
      } else if (this.clicked_button_type === '编辑') {
        updateOneNotice({
          id: that.editing_id,
          title: title,
          content: encodedHtml
        }).then(
          this.initData(),
          this.isShowPublish = false
        ).catch(() => {
          Message.error({
            message: '失败'
          })
        })
      }
      this.getted_title = ''
      this.getted_html = ''
      this.loading = false
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
        this.tableData = resp.data.data.list
        this.page.nextPage = resp.data.data.nextPage
        this.page.prePage = resp.data.data.prePage
        this.page.pageNum = resp.data.data.pages
        // console.log(this.tableData)
        this.loading = false
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
