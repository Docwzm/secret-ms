/**
 * 菜单组件
 */
import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import routes from '../routes/index';
import {checkValuesAllTrue,getRouterKey,filterMenu} from '../utils/index'
import {withRouter} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

class MyMenu extends Component { 
  
  state = {
    selectedKey:getRouterKey(this.props.location.pathname,routes),
    accessRouter:[]
  }

  componentWillMount(){
    let accessRouter = filterMenu(routes)
    this.setState({accessRouter})
    this.props.history.listen((route) => {
        if(this.state.selectedKey !== getRouterKey(route.pathname,routes)){
          this.setState({selectedKey:getRouterKey(route.pathname,routes)})
        }
    })
  }

  render(){
    const {selectedKey,accessRouter} = this.state
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

export default withRouter(MyMenu) 
