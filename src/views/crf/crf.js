import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Table, Pagination, Button, Select, Icon } from 'antd';
import { searchCrf, getCrfList, searchCrfV3 } from '../../apis/crf';
import { getButton } from '../../apis/user'
import PageHeader from '../../components/PageHeader'
import { buttonAuth, setLocal } from '../../utils/index'
import './styles/crf.scss'

class CRF extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {},
      patientNum: '',
      errorTip: '',
      list: [],
      page: 1,
      total: 0,
      pageSize: 10,
      crfPatientList: []
    }
  }
  componentWillMount() {
    this.actionGetButton({ pageId: 5 })
  }
  componentDidMount() {
    this.getCrfList()
    this.setState({
      scroll: {
        x: 1000,
        y: document.body.clientHeight - 482
      }
    })
  }
  getCrfList(page) {
    getCrfList({
      page,
      pageSize: this.state.pageSize
    }).then(res => {
      let data = res.data.list || [];
      let total = res.data.total;
      data = data.map((item, index) => {
        item.key = index;
        return item;
      })
      this.setState({
        list: data,
        total,
        page
      })
    })
  }
  gotoDetail = (text, record, index) => {
    let mobile = record.userTopicInfo.mobile;
    //增加缓存患者ID
    setLocal('crfPatientMobile', mobile)
    this.props.history.push('/crf/patient/edit?id=' + mobile)
  }
  searchPatient = () => {
    if (this.state.patientNum.toString().trim() != '') {

    } else {
      this.setState({
        errorTip: '请输入患者手机号码/患者编号'
      })
      return
    }
    searchCrf({
      searchText: this.state.patientNum
    }).then(res => {
      if (!res.data) {
        this.setState({
          errorTip: '输入患者编号或手机号有误'
        })
      } else {
        this.props.history.push('/crf/patient?id=' + this.state.patientNum)
      }
    })
  }

  onSearchChange = (e) => {
    let value = e.target.value;
    console.log('search./.....')
    this.setState({
      searchValue: value
    })
    clearTimeout(this.timer)
    if(!value){
      this.setState({
        crfPatientList:[]
      })
    }else{
      this.timer = setTimeout(() => {
        searchCrfV3(value).then(res => {
          let crfPatientList = res.data;
          this.setState({
            crfPatientList
          })
        })
      }, 200)
    }
  }
  onSearch = (mobile) => {
    if (mobile) {
      this.props.history.push('/crf/patient?id=' + mobile)
    }
  }

  onPageChange = (page, pageSize) => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getCrfList(page)
    }, 200)
  }


  //页面按钮权限
  async actionGetButton(data) {
    let buttons = await getButton(data)
    let buttonList = buttons.data.buttons
    let buttonKey = buttonList.map(item => item.buttonKey)
    this.setState({ buttonKey })
  }

  filterSearchValue = (str) => {
    let index = str.toString().indexOf(this.state.searchValue);
    if (index >= 0) {
      let newStr = <span>{str.toString().slice(0, index)}<b style={{ color: 'red', fontStyle: 'normal' }}>{str.toString().slice(index, this.state.searchValue.length)}</b>{str.toString().slice(index + this.state.searchValue.length)}</span>
      return newStr;
    }
    return str
  }

  render() {
    const { buttonKey } = this.state

    const columns = [{
      title: '患者编号',
      dataIndex: 'userTopicInfo',
      key: 'patientNo',
      render: user => user ? user.patientNo : '',
      width: 100,
    }, {
      title: '患者姓名',
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
    }, {
      title: '课题分组',
      dataIndex: 'userTopicInfo',
      key: 'topicName',
      render: user => user ? user.topicName : '',
      width: 100,
    }, {
      title: '课题医生',
      dataIndex: 'userTopicInfo',
      key: 'doctorName',
      render: user => user ? user.doctorName : '',
      width: 100,
    }, {
      title: '进行中的节点',
      dataIndex: 'contentList',
      key: 'nodes',
      render: contentList => (
        <span>
          {contentList.map((node, index) => {
            if (index < contentList.length - 1) {
              return node.name + '、'
            }
            return node.name
          })}
        </span>
      ),
    }, {
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',
      width: 100,
      render: (text, record, index) => buttonAuth(buttonKey, 'crf_create', <Button type="danger" ghost className="opt" onClick={this.gotoDetail.bind(this, text, record, index)}>录入</Button>)
    }]

    return (
      <div className="crf-wrap">
        <PageHeader title='CRF录入' />
        <div className="search-bar">
          <div className="search-wrap">
            <div className="input-wrap">
              <Input
                placeholder="患者姓名/姓名缩写/手机号/编号"
                onChange={this.onSearchChange}
                // onSearch={this.onSearch}
                allowClear={true}
              />
              <div className="user-wrap-drowdown">
                {
                  this.state.crfPatientList.map(item => <div className="wrap" key={item.id} onClick={() => this.onSearch(item.mobile)}>
                    <span className="name">{this.filterSearchValue(item.realName)}</span>
                    <span className="mobile">{this.filterSearchValue(item.mobile)}</span>
                    <span className="num">{this.filterSearchValue(item.id)}</span>
                    <Icon type="right" />
                  </div>)
                }
              </div>
            </div>
            {/* <Button type="primary" onClick={this.searchPatient}>确定</Button> */}
          </div>
          <div className="warn-tip">{this.state.errorTip}</div>
        </div>
        <div className="list-wrap">
          <div className="title">待录入列表</div>
          <div className="list">
            <Table bordered ref="table" columns={columns} dataSource={this.state.list} pagination={false} scroll={{ x: this.state.scroll.x, y: this.state.scroll.y }} />
            <Pagination pageSize={this.state.pageSize} onChange={this.onPageChange} total={this.state.total} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CRF)