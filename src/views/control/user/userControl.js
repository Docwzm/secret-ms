import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Modal } from 'antd';
import {getUsertList} from '@/apis/user'
import './styles/userControl.scss'

class UserControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {},//待录入列表的滚动条设置{x,y}
      list: [],//列表数据
      page: 1,//当前页数
      total: 0,//总条数
      pageSize: 10,//每页10条
    }
  }
  componentWillMount() {
    this.getUserList()
  }
  
  componentDidMount() {
    this.setState({
      scroll: {
        x: 1000,//横向滚动最小范围
        // y: document.body.clientHeight - 482//一屏展示
      }
    })
  }


  getUserList(){
    getUsertList().then(res => {
      let data = res.data;
      if(data){
        this.setState({
          total:data.total,
          list:data.data
        })
      }
    })
  }
  
  openModal = () => {
      this.setState({
          addFlag:true
      })
  }

  cancelModal = () => {
    this.setState({
        addFlag:false
    })
}

  /**
   * 页码改变
   * @params {*} page 当前页码
   * @params {*} pageSize 页码条数
   */
  onPageChange = (page, pageSize) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
    }, 200)
  }


  render() {
    const columns = [{
      title: '序号',
      key: "idx",
      width:50,
      render: (text, record, index) => {
        return index + 1
      }
    }, {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }]

    return (
      <div className="user-control-wrap">
        <Modal
          className="my_modal"
          title="添加账号"
          centered
          visible={this.state.addFlag}
          footer={null}
          onCancel={this.cancelModal}
          destroyOnClose={true}
          width={700}
        >
          
        </Modal>
        <div className="top-bar">
            <div className="title">账号列表</div>
            <div className="opt-bar">
                <Button type="primary" onClick={this.openModal}>添加账号</Button>
            </div>
        </div>
        <div className="list-wrap">
          <div className="list">
            <Table bordered ref="table" columns={columns} dataSource={this.state.list} pagination={false} scroll={{ x: this.state.scroll.x, y: this.state.scroll.y }} />
            <Pagination pageSize={this.state.pageSize} onChange={this.onPageChange} total={this.state.total} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserControl)