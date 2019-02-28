import React, {Component} from 'react';
import {Layout,Form,Breadcrumb,Icon} from 'antd';
import MyMenu from '../../components/MyMenu.jsx'
import {getLocal} from '../../utils/index'
import {logout} from '../../apis/user'
import {delCookie} from '../../utils/index'
import './styles/layout.css'
import defaultUser from '../../assets/images/default-user.jpg'

const {Header,Content,Sider} = Layout;

class MyLayoutForm extends Component {
  state = {
    collapsed: false,
    visible: false,
  };

  componentWillMount() {
    let user = JSON.parse(getLocal("user"))
    this.setState({
      user
    })
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 退出登录
   */
  logoutHanlder = () => {
    logout().then(res => {
      delCookie("access_token")
      window.location.href = '/login'
    })
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{padding:"0 20px"}}>
          <div className='header'>
            <div className='logo'>乐心RPM医生端管理平台</div>
            <div className='user'>
              <div className='add-patient'>
                <Icon className='icon' type="usergroup-add" />
              </div>
              <div className='user-info'>
                <img src={defaultUser} alt=''/>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider 
            width={200} 
            style={{ background: '#001529' }}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <MyMenu/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 300,}}
            >
              {this.props.content()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  } 
}

const MyLayout = Form.create()(MyLayoutForm);

export default MyLayout