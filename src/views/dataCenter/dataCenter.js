import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Input, Upload, Icon, Modal } from 'antd';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Excel from '@/utils/excel'
import AddForm from './components/addForm'
import EditForm from './components/editForm'
import {
  getSecretList,
  getSecretListByPhone,
  addSecret,
  updateSecret,
  deleteSecret
} from '@/apis/dataCenter'

import './styles/dataCenter.scss'
const InputSearch = Input.Search
const excel = new Excel()

class DataCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: {},
      disabled: true,
      scroll: {},//待录入列表的滚动条设置{x,y}
      // patientNum: '',
      // errorTip: '',
      list: [],//列表数据
      page: 1,//当前页数
      total: 0,//总条数
      pageSize: 10,//每页10条
      modalAddFlag: false,
      modalEditFlag: false,
      previewImgArray: [],
      currentPreviewImgIndex: 0,
      imgPrviewVisible: false,
      secret_edit_modal_height: 'auto'
    }
  }
  componentWillMount() {
    this.getSecretList()
  }

  componentDidMount() {
    let height = document.body.clientHeight * 80 / 100
    height = height > 700 ? 700 : height
    this.setState({
      secret_edit_modal_height: height
    })
    this.setState({
      scroll: {
        x: 2000,//横向滚动最小范围
        // y: document.body.clientHeight - 482//一屏展示
      }
    })
  }


  getSecretList() {
    getSecretList().then(res => {
      let data = res.data;
      this.setState({
        total: data.total,
        list: data.data
      })
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

  postOut = () => {
    excel.exportExcel(this.state.list, { 名称: 'name', test: 'mobile' }, '公共')
  }

  openDetail = (record, index, type, e) => {
    e.stopPropagation()
    this.setState({
      disabled: type == 'edit' ? false : true,
      modalEditFlag: true,
      editIndex: index,
      formData: {
        ...record
      }
    })
  }

  openAddModal = () => {
    this.setState({
      modalAddFlag: true
    })
  }

  handleModalAddCancel = () => {
    this.setState({
      modalAddFlag: false,
    })
  }


  handleModalEditCancel = () => {
    this.setState({
      modalEditFlag: false,
      disabled: true
    })
  }

  handleEdit = () => {
    this.setState({
      disabled: false
    })
  }

  handleEditSubmit = (values) => {
    updateSecret(this.state.formData.id,values).then(res => {
      this.state.list[this.state.editIndex] = values
      this.setState({
        disabled: true,
        modalEditFlag: false,
        list: this.state.list
      })
    })
  }

  handleAddSubmit = (values) => {
    addSecret(values).then(res => {
      this.setState({
        modalAddFlag: false
      })
    })
  }


  //批量删除
  handleBitchDelete = () => {
    console.log(this.state.selectedRows)
  }

  handleDelete = (id, e) => {
    e.stopPropagation()
    if (!id) {
      id = this.state.formData.id
    }
    deleteSecret(id).then(res => {
      this.getSecretList()
    })
  }

  previewImg = (currentPreviewImgIndex, e) => {
    e.stopPropagation();
    let { list } = this.state;
    let previewImgArray = [];
    list.map(item => {
      previewImgArray.push({
        src: item.src
      })
    })
    this.setState({
      imgPrviewVisible: true,
      previewImgArray,
      currentPreviewImgIndex
    })
  }

  render() {
    let { formData, disabled, previewImgArray, currentPreviewImgIndex, secret_edit_modal_height } = this.state

    const renderContent = (text, row, index, type, style) => {
      if (type == 'thumb') {
        return <img title={text} className="td-img" onClick={(e) => this.previewImg(index, e)} src={text}></img>
      } else if (type == 'tags') {
        return <div className="opt-td" >
          <Button size="small" type="primary" onClick={e => this.openDetail(row, index, 'edit', e)}>编辑</Button>
          <Button size="small" type="danger" onClick={this.handleDelete.bind(this, row.id)}>删除</Button>
        </div>
      }else if(type == 'audio'){
        return <a href={text} download>text</a>
      }else{
        return <div title={text} className="no-wrap" style={style}>{text}</div>
      }
    }


    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="opt-group">
          <Button onClick={this.openAddModal}>添加数据</Button>
          {/* <Button onClick={this.handleBitchDelete}>批量删除</Button> */}
          <Upload className="upload" {...uploadProps}>
            <Button><Icon type="import" /> 导入数据</Button>
          </Upload>
          <Button onClick={this.postOut}><Icon type="export" />导出数据</Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="down-square" style={{ color: filtered ? '#1890ff' : undefined }} />
      )
    });

    const columns = [{
      title: '序号',
      key: "idx",
      width:50,
      render: (text, record, index) => {
        return index + 1
      }
    }, {
      title: '录音',
      dataIndex: 'audio',
      key: 'audio',
      // width: 160,
      render: (text, row, index) => renderContent(text, row, index, 'audio',{width:'160px'})
    }, {
      title: '我想对您说',
      dataIndex: 'say_to_you',
      key: 'say_to_you',
      // width: 160,
      render: (text, row, index) => renderContent(text, row, index, 'say_to_you',{width:'160px'})
    }, {
      title: '永恒一刻',
      dataIndex: 'thumb',
      key: 'thumb',
      width: 150,
      render: (text, row, index) => renderContent(text, row, index, 'thumb')
    }, {
      title: '送卡人姓名/昵称',
      dataIndex: 'username',
      key: 'username',
      render: (text, row, index) => renderContent(text, row, index, 'username',{width:'150px'})
    }, {
      title: 'powerionics淘宝或京东订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      render: (text, row, index) => renderContent(text, row, index, 'order_code',{width:'250px'})
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text, row, index) => renderContent(text, row, index, 'mobile',{width:'100px'})
    },{
      title: '微信昵称',
      dataIndex: 'test1',
      key: 'test1',
      render: (text, row, index) => renderContent(text, row, index, '',{width:'80px'})
    },{
      title: '微信性别',
      dataIndex: 'test2',
      key: 'test2',
      render: (text, row, index) => renderContent(text, row, index, '',{width:'80px'})
    },{
      title: '微信国家',
      dataIndex: 'test3',
      key: 'test3',
      render: (text, row, index) => renderContent(text, row, index, '',{width:'80px'})
    },{
      title: '微信省市',
      dataIndex: 'test4',
      key: 'test4',
      render: (text, row, index) => renderContent(text, row, index, '',{width:'80px'})
    },{
      title: '微信OpenID',
      dataIndex: 'test5',
      key: 'test5',
      render: (text, row, index) => renderContent(text, row, index, '',{width:'200px'})
    },{
      title: '提交时间',
      dataIndex: 'test6',
      key: 'test6',
      render: (text, row, index) => renderContent(text, row, index, '',{width:'200px'})
    }, {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      fixed: 'right',
      width:140,
      render: (text, row, index) => renderContent(text, row, index, 'tags'),
      ...getColumnSearchProps('tags')
    }]

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows
        })
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
        if (info.file.status == 'done') {
          excel.importExcel(info.file.originFileObj, { 名称: 'test1', 型号: 'test2' }).then(data => {
            console.log(data)
          })
        }
      },
    };

    return (
      <div className="crf-wrap">
        <Viewer
          visible={this.state.imgPrviewVisible}
          onClose={() => { this.setState({ imgPrviewVisible: false }); }}
          images={previewImgArray}
          activeIndex={currentPreviewImgIndex}
        />
        <Modal
          className="my_modal"
          style={{ height: secret_edit_modal_height }}
          title="编辑密语"
          centered
          visible={this.state.modalEditFlag}
          footer={null}
          onCancel={this.handleModalEditCancel}
          destroyOnClose={true}
          width={700}
        >
          <EditForm disabled={disabled} formData={formData} onEdit={this.handleEdit} onSubmit={this.handleEditSubmit} onDelete={this.handleDelete}></EditForm>
        </Modal>

        <Modal
          className="my_modal"
          style={{ height: secret_edit_modal_height }}
          title="添加密语"
          centered
          visible={this.state.modalAddFlag}
          footer={null}
          onCancel={this.handleModalAddCancel}
          destroyOnClose={true}
          width={700}
        >
          <AddForm onCancel={this.handleModalAddCancel} onSubmit={this.handleAddSubmit}></AddForm>
        </Modal>
        <div className="opt-bar">
          <div className="search-wrap">
            <InputSearch className="search-input"></InputSearch>
          </div>
          <div className="flex-wrap">

          </div>
          {/* <div className="warn-tip">{this.state.errorTip}</div> */}
        </div>
        <div className="list-wrap">
          <div className="list">
            <Table className="secret-table" size="small" bordered ref="table" onRow={(record, index) => {
              return {
                onClick: (e) => this.openDetail(record, index, '', e), // 点击行
              };
            }} columns={columns} dataSource={this.state.list} pagination={false} scroll={this.state.scroll} />
            <Pagination pageSize={this.state.pageSize} onChange={this.onPageChange} total={this.state.total} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DataCenter)