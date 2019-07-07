<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <span class="home_title">实验室后台管理系统</span>
        <div style="display: flex;align-items: center;margin-right: 7px">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
                {{info.name}}
                <i><img src="@/assets/avatar.png"
                        style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="176px" class="home-aside" style="overflow:auto;overflow-x: hidden;display: flex;justify-content: flex-start;text-align: left;height: 100%">
<!--          <div style="display: flex;justify-content: flex-start;width: 180px;text-align: left;height: 100%">-->
            <el-scrollbar>
              <el-menu
                router
                style="background: #ececec;width: 176px;"
                default-active="/home/news">
                <el-menu-item index="/home/news">
                  <i class="el-icon-menu"></i>
                  <span slot="title">新闻动态</span>
                </el-menu-item>
                <el-menu-item index="/home/notices">
                  <i class="el-icon-menu"></i>
                  <span slot="title">公示公告</span>
                </el-menu-item>
                <el-menu-item index="/home/regulations">
                  <i class="el-icon-document"></i>
                  <span slot="title">规章制度</span>
                </el-menu-item>
                <el-menu-item index="/home/cultivation">
                  <i class="el-icon-setting"></i>
                  <span slot="title">学生培养</span>
                </el-menu-item>
                <el-menu-item index="/home/members">
                  <i class="el-icon-setting"></i>
                  <span slot="title">团队成员</span>
                </el-menu-item>
                <el-menu-item index="/home/activities">
                  <i class="el-icon-setting"></i>
                  <span slot="title">实验室风采</span>
                </el-menu-item>
                <el-menu-item index="/home/research">
                  <i class="el-icon-setting"></i>
                  <span slot="title">研究方向</span>
                </el-menu-item>
                <el-menu-item index="/home/project">
                  <i class="el-icon-setting"></i>
                  <span slot="title">科研项目</span>
                </el-menu-item>
                <el-menu-item index="/home/reward">
                  <i class="el-icon-setting"></i>
                  <span slot="title">获奖成果</span>
                </el-menu-item>
                <el-menu-item index="/home/patent">
                  <i class="el-icon-setting"></i>
                  <span slot="title">专利成果</span>
                </el-menu-item>
                <el-menu-item index="/home/thesis">
                  <i class="el-icon-setting"></i>
                  <span slot="title">论文巨著</span>
                </el-menu-item>
                <el-submenu index="/home/carousel/view">
                  <template slot="title"><i class="el-icon-setting"></i>轮播图管理</template>
                  <el-menu-item index="/home/carousel/view">
                    <span slot="title">轮播图浏览和删除</span>
                  </el-menu-item>
                  <el-menu-item index="/home/carousel/upload">
                    <span slot="title">轮播图上传</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-scrollbar>
<!--          </div>-->
        </el-aside>
        <el-main>
          <el-scrollbar>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
  <!--          <transition name="fade">-->
  <!--          </transition>-->
            <router-view></router-view>
            <!--          <keep-alive>-->
            <!--            <router-view v-if="this.$route.meta.keepAlive"></router-view>-->
            <!--          </keep-alive>-->
            <!--          <router-view v-if="!this.$route.meta.keepAlive"></router-view>-->
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
      title="修改密码"
      :visible.sync="showChangePasswdDialog"
      width="55%"
      :before-close="handleClose">
        <el-input placeholder="请输入原密码" v-model="password.oldPasswd" show-password></el-input>
        <el-input placeholder="请输入新密码" v-model="password.newPasswd" show-password></el-input>
        <el-input placeholder="请再次输入新密码" v-model="password.repeatNewPasswd" show-password></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showChangePasswdDialog = false">取 消</el-button>
    <el-button type="primary" @click="updatePasswd">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
import updatePasword from '@/api/admin'
import {Message} from 'element-ui'
export default {
  methods: {
    updatePasswd () {
      updatePasword({
        name: this.$store.state.name,
        oldPassword: this.oldPasswd,
        newPassword: this.newPassword
      }).then(resp => {
        if (resp.data.code === '200') {
          Message.success('修改成功')
        } else {
          Message.error(resp.data.message)
        }
      }).catch(err => {
        Message.error(err)
      })
      this.showChangePasswdDialog = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleCommand (cmd) {
      var _this = this
      if (cmd === 'logout') {
        this.$confirm('注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // _this.getRequest('/logout')
          _this.$store.commit('logout')
          _this.$router.replace({path: '/'})
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          })
        })
      } else if (cmd === 'changePassword') {
        this.showChangePasswdDialog = true
      }
    }
  },
  data () {
    return {
      password: {
        oldPasswd: '',
        newPasswd: '',
        repeatNewPasswd: ''
      },
      showChangePasswdDialog: true,
      isDot: false
    }
  },
  computed: {
    info () {
      return this.$store.state.info
    }
  }
}
</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #ECECEC;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

  /*.fade-enter, .fade-leave {*/
  /*  transition: opacity 500ms;*/
  /*}*/

  /*.fade-enter, .fade-leave {*/
  /*  opacity: 0;*/
  /*}*/
</style>
