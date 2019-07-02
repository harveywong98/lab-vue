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
          <el-link type="primary" icon="el-icon-edit" size="mini">编辑</el-link>
          &nbsp;&nbsp;
          <el-link type="danger" icon="el-icon-delete" size="mini" @click="deleteOneById(scope.row.id)">删除</el-link>
        </template>
    </el-table-column>
    </el-table>
    <pop-up-dialog :module="name" :operation="clicked_button_type" :is-show="isShowPublish" @on-close="closeDialog"></pop-up-dialog>
  </div>
</template>

<script>
import PopUpDialog from '@/components/PopUpDialog'
// eslint-disable-next-line no-unused-vars
import {insertOneNews, queryAllNews, deleteOneNews, updateOneNews} from '../../api/news'
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
      tableData: []
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
    handleClick (event) {
      this.isShowPublish = true
      this.clicked_button_type = event.currentTarget.getAttribute('button_type')
    },
    closeDialog () {
      this.isShowPublish = false
    }
  }
}
</script>

<style scoped>

</style>
