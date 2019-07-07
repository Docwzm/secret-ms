import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Modal, Input, Form } from 'antd';
import { getUsertList,addUser,updateUser } from '@/apis/user'
import './styles/userControl.scss'
const FormItem = Form.Item

class UserControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {},//待录入列表的滚动条设置{x,y}
      list: [],//列表数据
      page: 1,//当前页数
      total: 0,//总条数
      pageSize: 10,//每页10条
      secret_modal_height:'auto'
    }
  }
  componentWillMount() {
    this.getUserList()
    let height = document.body.clientHeight * 80 / 100
    height = height > 500 ? 500 : height
    this.setState({
      secret_modal_height: height
    })
  }

  componentDidMount() {
    this.setState({
      scroll: {
        x: 1000,//横向滚动最小范围
        // y: document.body.clientHeight - 482//一屏展示
      }
    })
  }


  getUserList() {
    getUsertList({
      page:this.state.page
    }).then(res => {
      let data = res.data;
      if (data) {
        this.setState({
          total: data.total,
          list: data.data
        })
      }
    })
  }

  openModal = () => {
    this.setState({
      addFlag: true
    })
  }

  cancelModal = () => {
    this.setState({
      addFlag: false
    })
  }


  handleAddCancel = () => {
    this.setState({
      addFlag:false
    })
  }

  handleAddSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      addUser(values).then(res => {
        this.setState({
          addFlag:false
        })
        this.getUserList()
      })
    });
  }

  /**
   * 页码改变
   * @params {*} page 当前页码
   * @params {*} pageSize 页码条数
   */
  onPageChange = (page, pageSize) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({
        page
      },() => {
        this.getUserList()
      })
    }, 200)
  }


  render() {
    const {secret_modal_height} = this.state
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 10
      },
    };

    const columns = [{
      title: '序号',
      key: "idx",
      width: 50,
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
          style={{height:secret_modal_height}}
          className="my_modal"
          title="添加账号"
          centered
          visible={this.state.addFlag}
          footer={null}
          onCancel={this.handleAddCancel}
          destroyOnClose={true}
          width={700}
        >
          <Form labelalign="left" onSubmit={this.handleSubmit} >
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入用户名' },
                  ]
                })(
                  <Input></Input>
                )
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '请输入密码' },
                  ]
                })(
                  <Input type="password"></Input>
                )
              }
            </FormItem>
            <FormItem label="姓名" {...formItemLayout}>
              {
                getFieldDecorator('real_name')(
                  <Input></Input>
                )
              }
            </FormItem>
            <FormItem label="手机" {...formItemLayout}>
              {
                getFieldDecorator('mobile')(
                  <Input></Input>
                )
              }
            </FormItem>
            <FormItem label="邮件" {...formItemLayout}>
              {
                getFieldDecorator('email')(
                  <Input></Input>
                )
              }
            </FormItem>
            <FormItem label=" " colon={false} {...formItemLayout}>
              <div className="btn-wrap">
                <Button type="primary" onClick={this.handleAddSubmit}>提交</Button>
                <Button type="danger" onClick={this.handleAddCancel}>取消</Button>
              </div>
            </FormItem>
          </Form>
        </Modal>
        <div className="top-bar">
          <div className="title">账号列表</div>
          <div className="opt-bar">
            <Button type="primary" onClick={this.openModal}>添加账号</Button>
          </div>
        </div>
        <div className="list-wrap">
          <div className="list">
            <Table bordered ref="table" rowKey="id" columns={columns} dataSource={this.state.list} pagination={false} scroll={{ x: this.state.scroll.x, y: this.state.scroll.y }} />
            <Pagination pageSize={this.state.pageSize} onChange={this.onPageChange} total={this.state.total} />
          </div>
        </div>
      </div>
    );
  }
}

const ThisForm = Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    // if (!props.canSave) {
    //     props.setCanSave(true)
    // }
  }
})(UserControl);

export default withRouter(ThisForm)