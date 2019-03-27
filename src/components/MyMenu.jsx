/**
 * 菜单组件
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import routers from '../routes/index';
import {checkValuesAllTrue,getRouterKey} from '../utils/index'
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {getMenu} from '../apis/user'
const SubMenu = Menu.SubMenu;

class MyMenu extends Component { 
  
  state = {
    selectedKey:getRouterKey(this.props.location.pathname,routers),
    routers:routers
  }

  componentWillMount(){
    //this.actionGetMenu()
  }

  componentWillUpdate(){
    if(this.state.selectedKey!==getRouterKey(this.props.menu.key,routers)){
      this.setState({selectedKey:getRouterKey(this.props.menu.key,routers)})
    }
  }

  /**
   * 获取菜单
   */
  async actionGetMenu(){
    let getmenu = await getMenu()
    let menus = getmenu.data.menus
    let menukey = menus.map(item=>item.key)
    let newRouters = []
    for(let i in routers){
      if(!routers[i].menu){
        newRouters.push(routers[i])
      }else{
        if(menukey.indexOf(routers[i].key) >= 0){
          newRouters.push(routers[i])
        }
      }
    }
    this.setState({routers:newRouters})
  }

  render(){
    const {selectedKey,routers} = this.state 
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
            <Menu.Item key={router.key} style={{height:"53px",marginTop:0,marginBottom:0,lineHeight:"53px"}}>
              <Link to={router.path}>
                <Icon type={router.meta.icon || 'pie-chart'} />
                <span>{router.meta.title}</span>
              </Link>
            </Menu.Item>
          )
        }
      }
    }
    const MyMenuItem = routers.map(createMenu)
    
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
    'menu':state.menu
  }
},null)(MyMenu)) 
