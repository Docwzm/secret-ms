/**
 * 菜单组件
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import routers from '../routes/index';
import {checkValuesAllTrue,getRouterKey} from '../utils/index'
import {withRouter} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

class MyMenu extends Component {  
  constructor(props){
    super(props)
    console.log(props)
  } 

  state = {
    defaultKey:getRouterKey(this.props.location.pathname)
  }

  render(){
    const {defaultKey} = this.state 
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
      <Menu theme="light" mode="inline" defaultSelectedKeys={[defaultKey]}>
          {MyMenuItem} 
      </Menu>
    )
  }
}

export default withRouter(MyMenu) 