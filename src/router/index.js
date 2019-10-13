import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import News from '@/views/content/News'
import Notices from '@/views/content/Notices'
import Regulations from '@/views/content/Regulations'
import Cultivation from '@/views/content/Cultivation'
import Members from '@/views/content/Members'
import Activities from '@/views/content/Activities'
import Research from '@/views/content/Research'
import Reward from '@/views/content/Reward'
import Patent from '@/views/content/Patent'
import Thesis from '@/views/content/Thesis'
import Project from '@/views/content/Project'
import Specification from '@/views/content/Specification'
import SocialWork from '@/views/content/SocialWork'
import CarouselView from '@/views/content/CarouselView'
import CarouselUpload from '@/views/content/CarouselUpload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    }, {
      path: '/home',
      name: '首页',
      component: Home,
      hidden: true,
      redirect: '/home/news',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'news',
          name: '新闻动态',
          component: News
        }, {
          path: 'notices',
          name: '公示公告',
          component: Notices
        }, {
          path: 'regulations',
          name: '规章制度',
          component: Regulations
        }, {
          path: 'specification',
          name: '标准规范',
          component: Specification
        }, {
          path: 'cultivation',
          name: '学生培养',
          component: Cultivation
        }, {
          path: 'members',
          name: '团队成员',
          component: Members
        }, {
          path: 'activities',
          name: '实验室风采',
          component: Activities
        }, {
          path: 'research',
          name: '研究方向',
          component: Research
        }, {
          path: 'project',
          name: '科研项目',
          component: Project
        }, {
          path: 'reward',
          name: '获奖成果',
          component: Reward
        }, {
          path: 'patent',
          name: '专利成果',
          component: Patent
        }, {
          path: 'thesis',
          name: '论文专著',
          component: Thesis
        }, {
          path: 'socialworks',
          name: '社会服务',
          component: SocialWork
        }, {
          path: 'carousel/view',
          name: '轮播图浏览和删除',
          component: CarouselView
        }, {
          path: 'carousel/upload',
          name: '轮播图上传',
          component: CarouselUpload
        }
      ]
    }
  ]
})
