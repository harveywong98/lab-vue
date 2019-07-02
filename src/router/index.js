import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import News from '@/components/content/News'
import Notices from '@/components/content/Notices'
import Regulations from '@/components/content/Regulations'
import Cultivation from '@/components/content/Cultivation'
import Members from '@/components/content/Members'
import Activities from '@/components/content/Activities'
import Research from '@/components/content/Research'
import Reward from '@/components/content/Reward'
import Patent from '@/components/content/Patent'
import Thesis from '@/components/content/Thesis'
import Project from '@/components/content/Project'

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
      name: 'Home',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/news',
          name: '新闻动态',
          component: News
        }, {
          path: '/notices',
          name: '公示公告',
          component: Notices
        }, {
          path: '/regulations',
          name: '规章制度',
          component: Regulations
        }, {
          path: '/cultivation',
          name: '学生培养',
          component: Cultivation
        }, {
          path: '/members',
          name: '团队成员',
          component: Members
        }, {
          path: '/activities',
          name: '实验室风采',
          component: Activities
        }, {
          path: '/research',
          name: '研究方向',
          component: Research
        }, {
          path: '/project',
          name: '科研项目',
          component: Project
        }, {
          path: '/reward',
          name: '获奖成果',
          component: Reward
        }, {
          path: '/patent',
          name: '专利成果',
          component: Patent
        }, {
          path: '/thesis',
          name: '论文巨著',
          component: Thesis
        }
      ]
    }
  ]
})
