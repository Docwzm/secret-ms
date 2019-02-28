import React, { Component } from 'react';
import {Switch} from "react-router-dom";
import RouteWithSubRoutes from '../../components/RouteWithSubRoutes.jsx'

class NewsManage extends Component {
  render(){
    const {routes} = this.props
    return(
      <Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route}/>)} 
      </Switch>
    )
  }
}

export default NewsManage