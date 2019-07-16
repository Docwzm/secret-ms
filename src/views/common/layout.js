import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Icon, Popover } from 'antd';
import MyMenu from '../../components/MyMenu.jsx';
import { getLocal, delCookie, removeLocal } from '../../utils/index';
import { logout } from '../../apis/user';
import defaultUser from '../../assets/images/default-user.jpg';
import QRCode from 'qrcode.react';
import configs from '@/configs'
import './styles/layout.scss';

const { Header, Content, Sider } = Layout;

class MyLayout extends Component {
  state = {
    collapsed: false,
    user: {
      username: 'admin'
    }
  };

  componentWillMount() {
    let user = JSON.parse(getLocal("_secret_user"))
    if (user) {
      this.setState({ user })
    }
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    });
  }

  /**
   * 退出登录
   */
  handleLogout = () => {
    // logout().then(res => {
    delCookie("_secret_token")
    removeLocal('_secret_user')
    window.location.href = '/#/login'
    // })
  }

  handleUserCenterVisible() {
    this.props.history.push('/user')
  }

  render() {
    const {
      user
    } = this.state


    const breadcrumbNameMap = {
      '/dataCenter': '数据中心',
      '/editor': '编辑设计',
      '/user': '个人中心',
    };

    const { location } = this.props;

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        {/* <Link to="/patient">首页</Link> */}
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);


    let qrCodeContent = <div className="popver-qrCode-wrap">
      <div className="wrap">
        <QRCode value={configs.server + '/secret/#/powerionics/write'} />
        <p>表单提交</p>
      </div>
      <div className="wrap">
        <QRCode value={configs.server + '/secret/#/powerionics/check'} />
        <p>表单查看</p>
      </div>
    </div>

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ padding: "0 20px" }}>
          <div className='header'>
            <div className='logo'>管理平台</div>
            <div className="flex-wrap">
              <Popover placement="bottom" content={qrCodeContent}>
                <div className="qrCode-wrap">
                  <QRCode size="30" value={configs.server + '/secret/#/powerionics/write'} />
                </div>
              </Popover>
              <div className='user'>
                <div
                  onClick={this.handleUserCenterVisible.bind(this)}
                  className='user-info'
                >
                  <img src={user.headUrl || defaultUser} alt='' />
                  <span>{user.username}</span>
                </div>
                <div className='logout' onClick={this.handleLogout.bind(this)}>
                  <Icon className='icon' type="logout" title='退出登录' />
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
            theme="light"
            //collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <MyMenu />
          </Sider>
          <Layout id="my-layout" style={{ padding: '0 24px 24px' }}>
            <div id="my-breadcrumb">
              <Breadcrumb style={{ margin: '16px 0' }} separator=">">
                {breadcrumbItems}
              </Breadcrumb>
            </div>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 300 }}>
              {this.props.content()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(MyLayout) 
