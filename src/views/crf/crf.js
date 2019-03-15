import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Table, Pagination } from 'antd';
import { searchCrf } from '../../apis/crf'
import './styles/crf.scss'

const Search = Input.Search;

class CRF extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patientNum: '',
      errorTip: '',
      columns: [{
        title: '患者编号',
        dataIndex: 'number',
        key: 'number',
        width: 100,
      }, {
        title: '患者姓名',
        dataIndex: 'name',
        key: 'name',
        width: 100,
      }, {
        title: '手机号码',
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
      }, {
        title: '课题分组',
        dataIndex: 'group',
        key: 'group',
        width: 100,
      }, {
        title: '课题医生',
        dataIndex: 'doctor',
        key: 'doctor',
        width: 100,
      }, {
        title: '进行中的节点',
        dataIndex: 'vnode',
        key: 'vnode',
        render: nodes => (
          <span>
            {nodes.map((node, index) => {
              if (index < nodes.length - 1) {
                return node + '、'
              }
              return node
            })}
          </span>
        ),
      }, {
        title: '操作',
        key: 'tags',
        dataIndex: 'tags',
        width: 80,
        render: () => <div onClick={this.gotoDetail}>录入</div>
      }],
      list: [{
        key: '1',
        number: '11',
        name: 'John Brown',
        phone: '12311111122',
        group: '课题1',
        doctor: 'doctor1',
        vnode: ['v1', 'v2']
      }, {
        key: '2',
        number: '12',
        name: 'Jim Green',
        phone: '12311111122',
        group: '课题2',
        doctor: 'doctor2',
        vnode: ['v1']
      }, {
        key: '3',
        name: 'Joe Black',
        number: '13',
        phone: '12311111122',
        group: '课题3',
        doctor: 'doctor3',
        vnode: ['v1']
      }, {
        key: '4',
        name: 'Joe Black',
        number: '13',
        phone: '12311111122',
        group: '课题3',
        doctor: 'doctor3',
        vnode: ['v1']
      }, {
        key: '5',
        name: 'Joe Black',
        number: '13',
        phone: '12311111122',
        group: '课题3',
        doctor: 'doctor3',
        vnode: ['v1']
      }]
    }
  }
  componentWillMount() {

  }
  gotoDetail = () => {
    this.props.history.push('/crf/patient/edit?id=1')
  }
  searchPatient = (value, event) => {
    console.log(value)
    value = '12000000003'
    searchCrf(value).then(res => {
      if(res.data&&res.data.length>0){
        this.props.history.push('/crf/patient?id=' + value)
      }
    })
  }
  inputSearch = (event) => {
    let value = event.target.value;
    if (value.trim() == '') {
      this.setState({
        patientNum: ''
      })
    } else {
      if (!isNaN(parseInt(value))) {
        this.setState({
          patientNum: parseInt(value)
        })
      }
    }
  }
  onPageChange = (page, pageSize) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log(page)
    }, 200)
  }
  render() {
    return (
      <div className="crf-wrap">
        <div className="search-bar">
          <Search
            ref='search-input'
            defaultValue=''
            value={this.state.patientNum}
            allowClear
            placeholder="请输入患者手机号码/患者编号"
            enterButton="确定"
            size="large"
            onSearch={this.searchPatient}
            onChange={event => this.inputSearch(event)}
          />
          <div className="warn-tip">{this.state.errorTip}</div>
        </div>
        <div className="list-wrap">
          <div className="title">待录入列表</div>
          <div className="list">
            <Table columns={this.state.columns} dataSource={this.state.list} pagination={false} />
            <Pagination pageSize={10} onChange={this.onPageChange} total={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CRF)