import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Table, Pagination, Button } from 'antd';
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
      res.data = [{
        "contentList": [{
          "id": 19,
          "userId": 6,
          "name": "随访方案tst",
          "site": 1,
          "status": 2,
          "startDate": 1553068597000,
          "visitSite": null,
          "categoryTime": null,
          "endDate": null,
          "content": "contnet",
          "planTime": 7,
          "num": 1,
          "programId": 3,
          "deleted": 0,
          "timeType": 1,
          "created": 1552636605000,
          "updated": 1552642783000
        }],
        "programUserRelation": {
          "id": 8,
          "userId": 6,
          "name": "修改的方案名称",
          "timeCategory": 1,
          "periodicTime": 1,
          "status": 1,
          "startDate": null,
          "category": 2,
          "type": 1,
          "doctorId": 2,
          "programId": 3,
          "deleted": 0,
          "created": 1552273480000,
          "updated": 1552562028000
        },
        userTopicInfo:{
          patientNo:'1',
          realName:'tester',
          mobile:'131000000011',
          topicName:'分组1',
          doctorName:'doctor'
        }
      }]

      let data = res.data;
      if(data){
        data = data.map((item, index) => {
          item.key = index;
          return item;
        })
        this.setState({
          list: data
        })
      }
    })
    this.setState({
      scroll: {
        x: 780,
        y: document.body.clientHeight - 482
      }
    })
  }
  gotoDetail = (text, record, index) => {
    let patientNo = record.userTopicInfo.patientNo;
    this.props.history.push('/crf/patient/edit?id='+patientNo)
  }
  searchPatient = () => {
    if(this.state.patientNum.toString().trim()!=''){

    }else{
      this.setState({
        errorTip:'请输入患者手机号码/患者编号'
      })
      return 
    }
    searchCrf(this.state.patientNum).then(res => {
      // if (res.data && res.data.length > 0) {
      this.props.history.push('/crf/patient?id=' + this.state.patientNum)
      // }
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
          errorTip:'',
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
      dataIndex: 'userTopicInfo',
      key: 'patientNo',
      render: user => user.patientNo,
      width: 100,
    }, {
      title: '患者姓名',
      dataIndex: 'userTopicInfo',
      key: 'realName',
      render: user => user.realName,
      width: 130,
    }, {
      title: '手机号码',
      dataIndex: 'userTopicInfo',
      key: 'mobile',
      render: user => user.mobile,
      width: 150,
    }, {
      title: '课题分组',
      dataIndex: 'userTopicInfo',
      key: 'topicName',
      render: user => user.topicName,
      width: 100,
    }, {
      title: '课题医生',
      dataIndex: 'userTopicInfo',
      key: 'doctorName',
      render: user => user.doctorName,
      width: 100,
    }, {
      title: '进行中的节点',
      dataIndex: 'contentList',
      key: 'nodes',
      render: contentList => (
        <span>
          {contentList.map((node, index) => {
            if (index < contentList.length - 1) {
              return node.num + '、'
            }
            return node.num
          })}
        </span>
      ),
    }, {
      title: '操作',
      key: 'tags',
      dataIndex: 'tags',
      width: 80,
      render: (text, record, index) => <div className="opt" onClick={this.gotoDetail.bind(this, text, record, index)}>录入</div>
    }]

    return (
      <div className="crf-wrap">
        <PageHeader title='CRF录入' />
        <div className="search-bar">
          <div className="search-wrap">
            <Input value={this.state.patientNum} placeholder="请输入患者手机号码/患者编号" onChange={event => this.inputSearch(event)}/>
            <Button type="primary" onClick={this.searchPatient}>确定</Button>
          </div>
          <div className="warn-tip">{this.state.errorTip}</div>
        </div>
        <div className="list-wrap">
          <div className="title">待录入列表</div>
          <div className="list">
            <Table bordered ref="table" columns={columns} dataSource={this.state.list} pagination={false} scroll={{ x: this.state.scroll.x, y: this.state.scroll.y }} />
            <Pagination pageSize={10} onChange={this.onPageChange} total={50} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CRF)