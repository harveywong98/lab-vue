<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <span class="home_title">实验室后台管理系统</span>
<!--        <div ><img src="../assets/logo.png" alt="实验室后台管理系统" style="width: 75%;height: 95%;left: 15px;"></div>-->
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
        <el-aside class="home-aside" style="width:180px;overflow:auto;overflow-x: hidden;display: flex;justify-content: flex-start;text-align: left;height: 100%">
<!--          <div style="display: flex;justify-content: flex-start;width: 180px;text-align: left;height: 100%">-->
            <el-scrollbar>
              <el-menu
                router
                style="background: #ececec;width: 176px;"
                default-active="/home/news">
                <el-menu-item index="/home/news">
                  <i class="el-icon-news"></i>
                  <span slot="title">新闻动态</span>
                </el-menu-item>
                <el-menu-item index="/home/notices">
                  <i class="el-icon-c-scale-to-original"></i>
                  <span slot="title">公示公告</span>
                </el-menu-item>
                <el-menu-item index="/home/regulations">
                  <i class="el-icon-document"></i>
                  <span slot="title">规章制度</span>
                </el-menu-item>
                <el-menu-item index="/home/members">
                  <i class="el-icon-user"></i>
                  <span slot="title">团队成员</span>
                </el-menu-item>
                <el-menu-item index="/home/cultivation">
                  <i class="el-icon-monitor"></i>
                  <span slot="title">学生培养</span>
                </el-menu-item>
                <el-menu-item index="/home/activities">
                  <i class="el-icon-basketball"></i>
                  <span slot="title">实验室风采</span>
                </el-menu-item>
                <el-menu-item index="/home/research">
                  <i class="el-icon-guide"></i>
                  <span slot="title">研究方向</span>
                </el-menu-item>
                <el-menu-item index="/home/project">
                  <i class="el-icon-discover"></i>
                  <span slot="title">科研项目</span>
                </el-menu-item>
                <el-menu-item index="/home/reward">
                  <i class="el-icon-trophy"></i>
                  <span slot="title">获奖成果</span>
                </el-menu-item>
                <el-menu-item index="/home/patent">
                  <i class="el-icon-medal"></i>
                  <span slot="title">专利成果</span>
                </el-menu-item>
                <el-menu-item index="/home/thesis">
                  <i class="el-icon-notebook-1"></i>
                  <span slot="title">论文巨著</span>
                </el-menu-item>
                <el-submenu index="/home/carousel/view">
                  <template slot="title"><i class="el-icon-picture-outline-round"></i>轮播图管理</template>
                  <el-menu-item index="/home/carousel/view">
                    <span slot="title" >轮播图浏览和删除</span>
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
      <div style="width: 60%;margin:0 auto;">
        <h3>请输入原密码和新密码</h3>
        <el-input placeholder="请输入原密码" v-model="password.oldPasswd" show-password></el-input>
        <br/>
        <br/>
        <el-input placeholder="请输入新密码" minlength='minLength' v-model="password.newPasswd" show-password></el-input>
        <br/>
        <br/>
        <el-input placeholder="请再次输入新密码" minlength='minLength' v-model="password.repeatNewPasswd" show-password></el-input>
      </div>
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
      if (this.password.newPasswd.length < 6) {
        Message.error('密码长度至少为6位！')
        return
      }
      if (this.password.newPasswd !== this.password.repeatNewPasswd) {
        Message.error('两次输入的新密码不一致！')
        return
      }
      let reg = /^[\w]{6,12}$/
      if (!this.password.newPasswd.match(reg)) {
        Message.error('密码必须由6-12位字母、数字和下划线组成！')
        return
      }
      updatePasword({
        name: this.$store.state.info.name,
        password: this.password.newPasswd
      }, {
        pass: this.password.oldPasswd
      }).then(resp => {
        if (resp.data.code === 200) {
          Message.success('修改成功')
          this.$router.replace({path: '/'})
        } else if (resp.data.code === 400) {
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
      minLength: 6,
      password: {
        oldPasswd: undefined,
        newPasswd: undefined,
        repeatNewPasswd: undefined
      },
      showChangePasswdDialog: false,
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
    /*background-color: #ececec;*/
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

</style>
