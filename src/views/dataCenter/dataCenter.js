import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button ,Input } from 'antd';
import './styles/dataCenter.scss'
const InputSearch = Input.Search

class DataCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {},//待录入列表的滚动条设置{x,y}
      // patientNum: '',
      // errorTip: '',
      list: [],//列表数据
      page: 1,//当前页数
      total: 0,//总条数
      pageSize: 10,//每页10条
    }
  }
  componentWillMount() {
  }
  
  componentDidMount() {
    this.setState({
      scroll: {
        x: 1000,//横向滚动最小范围
        // y: document.body.clientHeight - 482//一屏展示
      }
    })
  }
  

  // searchPatient = () => {
  //   if (this.state.patientNum.toString().trim() != '') {

  //   } else {
  //     this.setState({
  //       errorTip: '请输入患者手机号码/患者编号'
  //     })
  //     return
  //   }
  //   searchCrf({
  //     searchText: this.state.patientNum
  //   }).then(res => {
  //     if (!res.data) {
  //       this.setState({
  //         errorTip: '输入患者编号或手机号有误'
  //       })
  //     } else {
  //       this.props.history.push('/crf/patient?id=' + this.state.patientNum)
  //     }
  //   })
  // }


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
      dataIndex: 'userTopicInfo',
      key: 'patientNo',
      render: user => user ? user.patientNo : '',
      width: 100,
    }, {
      title: '姓名',
      dataIndex: 'userTopicInfo',
      key: 'realName',
      render: user => user ? user.realName : '',
      width: 130,
    }, {
      title: '手机号码',
      dataIndex: 'userTopicInfo',
      key: 'mobile',
      render: user => user ? user.mobile : '',
      width: 150,
    },{
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',
      width: 100,
      render: (text, record, index) => <Button type="danger" ghost className="opt" onClick={this.gotoDetail.bind(this, text, record, index)}>录入</Button>
    }]

    return (
      <div className="crf-wrap">
        <div className="search-bar">
          <div className="search-wrap">
              <InputSearch className="search-input"></InputSearch>
          </div>
          {/* <div className="warn-tip">{this.state.errorTip}</div> */}
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

export default withRouter(DataCenter)