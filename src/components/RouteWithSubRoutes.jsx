import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../utils/index';
import store from '../redux/store'
import action from '../redux/actions'
//不需要登录态的页面
const pageWithoutAnth = ['/login', '/signup']

const RouteWithSubRoutes = (route) => {
  //根据路由切换菜单选中状态
  store.dispatch(action.changeMenu(route.location.pathname))

  let access_token = getCookie('accessToken');
  if (pageWithoutAnth.indexOf(route.path) >= 0) {
    //路由白名单
    return (
      <Route
        path={route.path}
        render={props => (
          <route.component {...props} routes={route.children} />
        )}
      />
    );
  } else {
    if (access_token) {
      //已经登陆过
      if (route.location.pathname == '/') {
        return <Redirect to="/patient" />
      }
      return (
        <Route
          path={route.path}
          render={props => (
            <route.component {...props} routes={route.children} />
          )}
        />
      );
    } else {
      //未登录 重定向登陆页面
      return (<Redirect to="/login" />)
    }
  }
}

export default RouteWithSubRoutes


