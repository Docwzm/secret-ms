/**
 *请保证一级菜单key和路径同名 
 */

import Index from '../views/index'
import Login from '../views/user/login'
import NotFound from '../views/common/404'
import Signup from '../views/user/signup'

/**
 * 患者管理
 */
import Patient from '../views/patient/patient'
import PatientArchives from '../views/patient/archives'
/**
 * 方案管理
 */
import Plan from '../views/plan/plan'
import PlanEdit from '../views/plan/edit'
import FollowUpPlan from '../views/plan/followUp'
import MeasurementPlan from '../views/plan/measurement'
/**
 * 医患沟通
 */
import Communicate from '../views/im/im'
/**
 * crf录入
 */
import CRF from '../views/crf/crf'
import crfProcess from '../views/crf/process'
import crfEdit from '../views/crf/detail'

/**
 * 用户中心
 */
import UserCenter from '../views/user/center'
import project from '../views/project/project'


import {
  getLocal,
  filteRouter
} from '../utils/index';

const staticRoutes = [{
  path: '/login',
  component: Login,
  menu: false
}, {
  path: '/signup',
  component: Signup,
  menu: false
}, {
  path: '/404',
  component: NotFound,
  menu: false
}, {
  path: '/project',
  component: project,
  menu: false
}, {
  path: '/',
  component: Index,
  key: 'index',
  redirect:'/patient'
}]

const asyncRoutes = [{
  path: '/patient',
  component: Patient,
  menu: true,
  key: 'patient_manage',
  meta: {
    title: '患者管理',
    icon: 'team'
  },
  children: [{
    path: '/patient/archives',
    component: PatientArchives,
    menu: false
  }]
}, {
  path: '/plan',
  component: Plan,
  menu: true,
  key: 'solution_manage',
  meta: {
    title: '方案管理',
    icon: 'calendar'
  },
  children: [{
    path: "/plan/edit",
    component: PlanEdit,
    key: "planEdit",
    menu: false
  }, {
    path: "/plan/followup",
    component: FollowUpPlan,
    key: "followup",
    menu: false
  }, {
    path: "/plan/measurement",
    component: MeasurementPlan,
    key: "measurement",
    menu: false
  }]
}, {
  path: '/chat',
  component: Communicate,
  menu: true,
  key: 'patient_chat',
  meta: {
    title: '医患沟通',
    icon: 'message'
  }
}, {
  path: '/crf',
  component: CRF,
  menu: true,
  key: 'crf_insert',
  meta: {
    title: 'CRF录入',
    icon: 'form'
  },
  children: [
    {
      path: '/crf/patient',
      component: crfProcess,
      menu: false,
      key: "crf_insert",
      meta: {
        title: "患者crf"
      },
      children: [
        {
          path: '/crf/patient/edit',
          component: crfEdit,
          menu: false,
          key: "crfEdit",
          meta: {
            title: "节点详情"
          },
        }
      ]
    }
  ]
}, {
  path: "/user",
  component: UserCenter,
  menu: true,
  key: "personal_center",
  meta: {
    title: "个人中心",
    icon: "user"
  }
}]


// let menus = JSON.parse(getLocal('menus')) || []

// let routes = []
// let menukey = menus.map(item=>item.key)
// for(let i in asyncRoutes){
//   if(!asyncRoutes[i].menu){
//     routes.push(asyncRoutes[i])
//   }else{
//     if(menukey.indexOf(asyncRoutes[i].key) >= 0){
//       routes.push(asyncRoutes[i])
//     }
//   }
// }

let routes = staticRoutes.concat(asyncRoutes)
export default routes;