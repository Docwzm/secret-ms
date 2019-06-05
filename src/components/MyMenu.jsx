/**
 * 菜单组件
 */
import React, { Component } from 'react';
import { Menu, Icon,Badge } from 'antd';
import {Link} from 'react-router-dom'
import routes from '../routes/index';
import {checkValuesAllTrue,getRouterKey,filterMenu} from '../utils/index'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
const SubMenu = Menu.SubMenu;

class MyMenu extends Component { 
  
  state = {
    selectedKey:getRouterKey(this.props.location.pathname,routes),
    accessRouter:[]
  }

  componentWillMount(){
    let accessRouter = filterMenu(routes)
    this.setState({accessRouter})
  }

  componentWillUpdate(){
    if(this.state.selectedKey!==getRouterKey(this.props.menu.key,routes)){
      this.setState({selectedKey:getRouterKey(this.props.menu.key,routes)})
    }
  }

  render(){
    const {selectedKey,routers,accessRouter} = this.state
    const {recentSess} = this.props.imInfo;
    let count = 0;
    recentSess.map(item => {
      count += item.unReadCount
    })
    const createMenu = (router,i)=>{
      if(router.menu){
        //检查有需要的的子路由
        if(router.children && !checkValuesAllTrue(router.children,"menu",false)){
          return(
            <SubMenu key={router.key} title={<span><Icon type={router.meta.icon || 'folder'} /><span>{router.meta.title}</span></span>} >
              {router.children.map(createMenu)}
            </SubMenu>
          )
        }else{
          return (
            <Menu.Item key={router.key} title={router.meta.title} style={{height:"53px",marginTop:0,marginBottom:0,lineHeight:"53px"}}>
              <Link to={router.path}>
                <Icon type={router.meta.icon || 'pie-chart'} />
                <span>{router.meta.title}</span>
                {
                  router.key === 'patient_chat'?<Badge className="menu-badge" count={count} overflowCount={99}></Badge>:null
                }
              </Link>
            </Menu.Item>
          )
        }
      }
    }
    const MyMenuItem = accessRouter.map(createMenu)
    
    return(
      //openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}
      <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
          {MyMenuItem} 
      </Menu>
    )
  }
}

export default withRouter(connect(state=>{
  return {
    'menu':state.menu,
    'imInfo':state.imInfo
  }
},null)(MyMenu)) 
