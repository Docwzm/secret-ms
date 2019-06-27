import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Input, Upload, Icon } from 'antd';
import Excel from '@/utils/excel'
import './styles/dataCenter.scss'
const InputSearch = Input.Search
const excel = new Excel()

class DataCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll: {},//待录入列表的滚动条设置{x,y}
      // patientNum: '',
      // errorTip: '',
      list: [
        {
          name: 'test',
          mobile: '1'
        }, {
          name: 'test2',
          mobile: '2'
        }
      ],//列表数据
      page: 1,//当前页数
      total: 0,//总条数
      pageSize: 10,//每页10条
    }
  }
  componentWillMount() {
  }

  componentDidMount() {
    // this.setState({
    //   scroll: {
    //     x: 1000,//横向滚动最小范围
    //     // y: document.body.clientHeight - 482//一屏展示
    //   }
    // })
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

  fileChange = (e) => {
    console.log(e.currentTarget.file)
  }

  postIn = () => {
  }

  postOut = () => {
    excel.exportExcel(this.state.list,{名称:'name',test:'mobile'},'公共')
  }


  render() {
    const columns = [{
      title: '序号',
      key: "idx",
      render: (text, record, index) => {
        return index + 1
      }
    }, {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 130,
    }, {
      title: 'test',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 150,
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        name: record.name,
      }),
    };

    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if(info.file.status=='done'){
          excel.importExcel(info.file.originFileObj,{名称:'test1',型号:'test2'}).then(data => {
            console.log(data)
          })
        }
      },
    };

    return (
      <div className="crf-wrap">
        <div className="search-bar">
          <div className="search-wrap">
            <InputSearch className="search-input"></InputSearch>
            <Upload {...uploadProps}>
              <Button><Icon type="upload" /> Click to Upload</Button>
            </Upload>
            <Button onClick={this.postIn}>导入</Button>
            <Button onClick={this.postOut}>导出</Button>
          </div>
          {/* <div className="warn-tip">{this.state.errorTip}</div> */}
        </div>
        <div className="list-wrap">
          <div className="list">
            <Table bordered ref="table" rowSelection={rowSelection} columns={columns} dataSource={this.state.list} pagination={false} />
            <Pagination pageSize={this.state.pageSize} onChange={this.onPageChange} total={this.state.total} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DataCenter)