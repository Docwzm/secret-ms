import React from 'react';
import {Route} from 'react-router-dom';
import {getCookie} from '../utils/index';

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
          render={props => (
            <route.component {...props} routes={route.children} />
          )}
        />
      );
    }else{
      window.location.href = '/login'
      return(<div></div>)
    }
  }
}

export default RouteWithSubRoutes


