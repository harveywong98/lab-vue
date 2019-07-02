<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="2">
        <div class="grid-content bg-purple">
          <el-button size="small" @click="handleClick($event)" button_type="发布">发布新新闻</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
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
      min-width="50%">
    </el-table-column>
      <el-table-column
      label="操作"
      min-width="20%">
    </el-table-column>
    </el-table>
    <pop-up-dialog :module="name" :operation="clicked_button_type" :is-show="isShowPublish" @on-close="closeDialog"></pop-up-dialog>
  </div>
</template>

<script>
import PopUpDialog from '@/components/PopUpDialog'

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
      tableData: [{
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        title: '王小虎',
        content: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
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
