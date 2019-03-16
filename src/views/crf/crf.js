import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Table, Pagination } from 'antd';
import { searchCrf, getCrfList } from '../../apis/crf';
import PageHeader from '../../components/PageHeader'
import './styles/crf.scss'

const Search = Input.Search;

class CRF extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {},
      patientNum: '',
      errorTip: '',
      list: []
    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    getCrfList().then(res => {
      let data = [];
      res.data.map((item, index) => {
        let vnode = [];
        item.contentList.map(_item => {
          vnode.push('v' + _item.num)
        })
        data.push({
          // userId:item.programUserRelation.userId,
          key: index,
          number: '11',
          name: 'John Brown',
          phone: '12311111122',
          group: '课题1',
          doctor: 'doctor1',
          vnode
        })
      })
      this.setState({
        list: data
      })
    })
    this.setState({
      scroll: {
        x: 760,
        y: document.body.clientHeight - 460
      }
    })
  }
  gotoDetail = (text, record, index) => {
    console.log(text)
    console.log(record)
    console.log(index)
    return false;

    this.props.history.push('/crf/patient/edit?id=12000000003')
  }
  searchPatient = (value, event) => {
    value = '12000000003'
    searchCrf(value).then(res => {
      if (res.data && res.data.length > 0) {
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
    const columns = [{
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
      width: 150,
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
      render: (text, record, index) => <div onClick={this.gotoDetail.bind(this,text,record,index)}>录入</div>
    }]


    return (
      <div className="crf-wrap">
        <PageHeader title='CRF录入' />
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
            <Table ref="table" columns={columns} dataSource={this.state.list} pagination={false} scroll={{ x: this.state.scroll.x, y: this.state.scroll.y }} />
            <Pagination pageSize={10} onChange={this.onPageChange} total={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CRF)