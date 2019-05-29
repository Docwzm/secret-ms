import React, { Component } from 'react';
import MyLayout from './common/layout.js'
import routes from '../routes/index'
import lockImg from '../assets/images/cc-lock.png'
import {filterMenu} from '../utils/index'
import { connect } from 'react-redux'
import actions from '../redux/actions'

class Index extends Component {
  state = {
    accessRouter:[]
  }
  componentWillMount(){
    let accessRouter = filterMenu(routes)
    this.setState({accessRouter})
    let { config } = this.props.imInfo
    if (!config.imLoginInfo || !config.imLoginInfo.identifier) {//登陆态判断
      this.props.imLogin();
      this.props.initRecentContactList()
    }
  }
  render() {
    let {accessRouter} = this.state
    let pathname,Content;
    let matchRoutes = function(routes){
      for(let i in routes){
        if(routes[i].children){
          matchRoutes(routes[i].children)
        }
        if(routes[i].path === pathname){
          Content = routes[i].component
        }
      }
    }
    
    if(!this.props.location){
      window.location.href='/rpm/#/login'
      return(<></>)
    }else{
      pathname = this.props.location.pathname
      matchRoutes(accessRouter);
      if(!Content) Content = ()=>{
        return(
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"400px"}}>
            <img style={{display:"inline-block",width:"40px",height:"40px"}} src={lockImg } alt=''/>
            <span style={{fontSize:"16px",marginLeft:"10px"}}>暂无访问权限</span>
          </div>
        )
      };
      return (
        <MyLayout content={()=>(<Content />)} />
      );
    }
  }
}

export default connect(state => {
  return {
    imInfo:state.imInfo
  }
},{
    imLogin:actions.imLogin,
    initRecentContactList:actions.initRecentContactList
})(Index)
