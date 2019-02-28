/**
 * 菜单组件
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import routers from '../routes/index';
const SubMenu = Menu.SubMenu;

class MyMenu extends Component {   
  render(){
    const createMenu = (router,i)=>{
      if(router.menu){
        if(router.children){
          return(
            <SubMenu key={router.key} title={<span><Icon type={router.meta.icon || 'folder'} /><span>{router.meta.title}</span></span>} >
              {router.children.map(createMenu)}
            </SubMenu>
          )
        }else{
          return (
            <Menu.Item key={router.key} style={{height:"53px",marginTop:0,lineHeight:"53px"}}>
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          {MyMenuItem} 
      </Menu>
    )
  }
}

export default  MyMenu