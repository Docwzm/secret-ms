import React from 'react';
import {Route} from 'react-router-dom';
import {getCookie} from '../utils/index';
import store from '../redux/store';
import actions from '../redux/actions'

//不需要登录态的页面
const pageWithoutAnth = ['/login','/signup']

const  RouteWithSubRoutes = (route) =>  {
  let access_token = getCookie('access_token');
  if(pageWithoutAnth.indexOf(route.path) >= 0){
    return (
      <Route
        path={route.path}
        render={props => (
          <route.component {...props} routes={route.children} />
        )}
      />
    );
  }else{
    if(access_token){
      return (
        <Route
          path={route.path}
          render={props => {
            // if(true){//登陆态判断
            //   console.log('./../ddd')
            //   store.dispatch(actions.imLogin)
            // }
            return <route.component {...props} routes={route.children} />
          }}
        />
      );
    }else{
      window.location.href = '/login'
      return(<div></div>)
    }
  }
}

export default RouteWithSubRoutes


