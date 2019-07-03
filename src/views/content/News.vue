<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button icon='el-icon-plus' size="small" @click="handleClick($event)" button_type="发布">发布新闻</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="发布时间"
        min-width="15%">
      </el-table-column>
      <el-table-column
      prop="title"
      label="标题"
      min-width="15%">
    </el-table-column>
      <el-table-column
      prop="content"
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
  </div>
</template>

<script>
import base64 from 'js-base64'
import PopUpDialog from '@/components/PopUpDialog'
import {deleteOneNews, insertOneNews, queryAllNews, queryOne, updateOneNews} from '../../api/news'
// import cleanField from '@/utils/cleanField'
import CleanWordHTML from '@/utils/MSWordHtmlCleaners'

export default {
  name: 'News',
  components: {
    'pop-up-dialog': PopUpDialog
  },
  data () {
    return {
      name: '新闻动态',
      clicked_button_type: '',
      isShowPublish: false,
      tableData: [],
      getted_html: '',
      getted_title: '',
      editing_id: 0
    }
  },
  watch: {
    tableData () {
      let Base64 = base64.Base64
      let tempArr = this.tableData
      this.tableData = tempArr.map(function (o) {
        let decodedContent = Base64.decode(o.content)
        // o['content'] = cleanField(decodedContent).replace(/<\/?.+?>/g, '')
        o['content'] = CleanWordHTML(decodedContent).replace(/<\/?.+?>/g, '')
        return o
      })
      console.log(this.tableData)
    }
  },
  created: function () {
    this.initData()
  },
  methods: {
    initData () {
      queryAllNews().then(resp => {
        this.tableData = resp.data.data
      })
    },
    deleteOneById (id) {
      deleteOneNews({
        id: id
      }).then(resp => {
        this.initData()
        console.log(resp.data)
      })
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
      var that = this
      let Base64 = base64.Base64
      let encodedHtml = Base64.encode(content)
      console.log(encodedHtml)
      if (this.clicked_button_type === '发布') {
        insertOneNews({
          title: title,
          content: encodedHtml
        }).then(resp => {
          this.initData()
          this.isShowPublish = false
          console.log(resp.data)
        })
      } else if (this.clicked_button_type === '编辑') {
        updateOneNews({
          id: that.editing_id,
          title: title,
          content: encodedHtml
        })
      }
      this.getted_title = ''
      this.getted_html = ''
    }
  }
}
</script>

<style scoped>

</style>
