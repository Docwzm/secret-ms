/**
 *请保证一级菜单key和路径同名 
 */
import Index from '../views/index'
import Login from '../views/user/login'
import NotFound from '../views/common/404'
import Signup from '../views/user/signup'

/**
 * 首页 数据中心
 */
import dataCenter from '../views/dataCenter/dataCenter'

//编辑
import editor from '../views/editor/editor'

/**
 * 用户中心
 */
import UserCenter from '../views/user/center'


//账号管理
import userControl from '../views/control/user/userControl'


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
  path: '/',
  component: Index,
  key: 'index',
  redirect:'/dataCenter'
}]

const asyncRoutes = [{
  path: '/dataCenter',
  component: dataCenter,
  menu: true,
  key: 'data_center',
  meta: {
    title: '数据中心',
    icon: 'team'
  }
},{
  path: '/editor',
  component: editor,
  menu: true,
  key: 'editor',
  meta: {
    title: '编辑设计',
    icon: 'team'
  }
},{
  path: "/user",
  component: UserCenter,
  menu: true,
  key: "personal_center",
  meta: {
    title: "个人中心",
    icon: "user"
  }
},{
  path: "/userControl",
  component: userControl,
  menu: true,
  key: "user_control",
  meta: {
    title: "账号管理",
    icon: "user"
  }
}, ]

let routes = staticRoutes.concat(asyncRoutes)
export default routes;