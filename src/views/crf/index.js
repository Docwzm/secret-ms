import React, { Component } from 'react';
import {Redirect,Switch} from "react-router-dom";
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes.jsx'

class NewsManage extends Component {
  render(){
    const {routes} = this.props
    return(
      <Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)} 
        <Redirect from='*' to='/404'/> 
      </Switch>
    )
  }
}

export default NewsManage