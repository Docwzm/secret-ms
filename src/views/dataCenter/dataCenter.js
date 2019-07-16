import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Button, Input, Upload, Icon, Modal, Select, Dropdown, Menu } from 'antd';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Excel from '@/utils/excel'
import { getCookie } from '@/utils/index'
import AddForm from './components/addForm'
import EditForm from './components/editForm'
import {
  getSecretList,
  getSecretListByPhone,
  addSecret,
  updateSecret,
  deleteSecret
} from '@/apis/dataCenter'
import configs from '@/configs'
import './styles/dataCenter.scss'
const InputSearch = Input.Search
const excel = new Excel()
const { Option } = Select

class DataCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      scroll: {},//待录入列表的滚动条设置{x,y}
      // patientNum: '',
      // errorTip: '',
      list: [
        // {
        //   audio: 'test',
        //   say_to_you: 'test',
        //   thumb: 'http://www.baidu.com/img/baidu_resultlogo@2.png',
        //   username: 'test',
        //   order_code: '1111111',
        //   mobile: '111111111'
        // }
      ],//列表数据
      page: 1,//当前页数
      total: 0,//总条数
      pageSize: 15,//每页10条
      modalAddFlag: false,
      modalEditFlag: false,
      previewImgArray: [],
      currentPreviewImgIndex: 0,
      imgPrviewVisible: false,
      secret_edit_modal_height: 'auto'
    }
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
    this.getSecretList()
  }

  getSecretList() {
    getSecretList({
      page: this.state.page
    }).then(res => {
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
      this.setState({
        page
      }, () => {
        this.getSecretList()
      })
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
      editIndex: index
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
    let { list, editIndex } = this.state;
    let { id } = list[editIndex]
    console.log(".../")
    updateSecret(id, values).then(res => {
      list[editIndex] = { ...list[editIndex], ...values }
      this.setState({
        disabled: true,
        modalEditFlag: false,
        list
      })
    })
  }

  handleAddSubmit = (values) => {
    addSecret(values).then(res => {
      this.setState({
        modalAddFlag: false
      })
      this.getSecretList()
    })
  }


  //批量删除
  handleBitchDelete = () => {
    console.log(this.state.selectedRows)
  }

  handleDelete = (id, e) => {
    e.stopPropagation()
    Modal.confirm({
      title: '确定删除',
      onOk: () => {
        if (!id) {
          id = this.state.list[this.state.editIndex].id
        }
        deleteSecret(id).then(res => {
          this.getSecretList()
          this.setState({
            modalEditFlag: false
          })
        })
      }
    })

  }

  previewImg = (currentPreviewImgIndex, e) => {
    e.stopPropagation();
    let { list } = this.state;
    let previewImgArray = [];
    list.map(item => {
      if (item.rel_thumb && item.rel_thumb.path) {
        previewImgArray.push({
          src: configs.server + item.rel_thumb.path
        })
      }

    })
    this.setState({
      imgPrviewVisible: true,
      previewImgArray,
      currentPreviewImgIndex
    })
  }

  handleStatusChange = (value) => {
    console.log(value)
  }

  handleStatusMenuClick = (e, index) => {
    let { list, editIndex } = this.state;
    let id = ''
    let item = {}
    if (index != undefined) {
      item = list[index]
    } else {
      item = list[editIndex]
    }
    if (item.flag != e.key) {
      item.flag = e.key ? e.key : '';
      updateSecret(item.id, item).then(res => {
        this.setState({
          list
        })
      })
    }
  }

  render() {
    let { list, selectedRows, editIndex, disabled, previewImgArray, currentPreviewImgIndex, secret_edit_modal_height } = this.state
    let formData = list && list.length > 0 && editIndex >= 0 ? list[editIndex] : {}
    let statusStyles = {
      color: formData.flag == 1 ? 'red' : (formData.flag == 2 ? 'blue' : '')
    }


    const renderContent = (text, row, index, type, style) => {
      statusStyles = {
        color: row.flag == 1 ? 'red' : (row.flag == 2 ? 'blue' : '')
      }
      if (type == 'rel_thumb') {
        return text && text.path ? <img className="td-img" onClick={(e) => this.previewImg(index, e)} src={configs.server + text.path}></img> : null
      } else if (type == 'tags') {
        return <div className="opt-td" onClick={(e) => e.stopPropagation()}>
          <Icon title="编辑" type="form" onClick={e => this.openDetail(row, index, 'edit', e)} />
          <Icon title="删除" type="delete" onClick={this.handleDelete.bind(this, row.id)} />
          {/* <Button size="small" type="danger" onClick={this.handleDelete.bind(this, row.id)}>删除</Button> */}
          <Dropdown title="标记" className="status-dropdown" overlay={<Menu onClick={(e) => this.handleStatusMenuClick(e, index)}>
            <Menu.Item key="1" className="red-item">红色</Menu.Item>
            <Menu.Item key="2" className="blue-item">蓝色</Menu.Item>
            <Menu.Item className="gray-item">删除标记</Menu.Item>
          </Menu>} trigger={['click']}>
            <Icon type="tag" style={statusStyles} />
          </Dropdown>
        </div>
      } else if (type == 'rel_audio') {
        return text && text.path ? <a onClick={e => e.stopPropagation()} title={configs.server + text.path} className="audio_url" style={style} href={configs.server + text.path} download>{configs.server + text.path}</a> : null
      } else if (type.indexOf('wx') == 0) {
        type = type.slice(3);
        let str = ''
        if (text) {
          str = text[type]
          if (type == 'sex') {
            str = str == 1 ? '男' : (str == 2 ? '女' : '')
            return <div title={str} className="no-wrap" style={style}>{str}</div>
          } else if (type == 'nickname') {
            str = <div><img className="wx_headimg" src={text.headimgurl}></img>{text[type]}</div>
            return <div title={text[type]} className="no-wrap" style={style}>{str}</div>
          } else if (type == 'province') {
            str = str + ' ' + text.city
            return <div title={str} className="no-wrap" style={style}>{str}</div>
          } else if(type=='audio'){
            return text&&text!=0?<div title={text} className="no-wrap" style={style}>{text}</div>:null
          }
        }
        return null
      } else {
        return text?<div title={text} className="no-wrap" style={style}>{text}</div>:null
      }
    }


    const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div className="opt-group">
          <Button onClick={this.openAddModal}>添加数据</Button>
          {/* <Button onClick={this.handleBitchDelete}>批量删除</Button> */}
          {/* <Upload className="upload" {...uploadProps}>
            <Button><Icon type="import" /> 导入数据</Button>
          </Upload>
          <Button onClick={this.postOut}><Icon type="export" />导出数据</Button> */}
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="down-square" style={{ color: filtered ? '#1890ff' : undefined }} />
      )
    });

    const columns = [{
      title: '序号',
      key: "idx",
      width: 50,
      render: (text, record, index) => {
        return index + 1
      }
    }, {
      title: '录音',
      dataIndex: 'wx_audio',
      key: 'wx_audio',
      render: (text, row, index) => renderContent(text, row, index, 'wx_audio', { width: '100px' })
    }, {
      title: '我想对您说',
      dataIndex: 'say_to_you',
      key: 'say_to_you',
      // width: 160,
      render: (text, row, index) => renderContent(text, row, index, 'say_to_you', { width: '160px' })
    }, {
      title: '永恒一刻',
      dataIndex: 'rel_thumb',
      key: 'rel_thumb',
      width: 150,
      render: (text, row, index) => renderContent(text, row, index, 'rel_thumb')
    }, {
      title: '送卡人姓名/昵称',
      dataIndex: 'username',
      key: 'username',
      render: (text, row, index) => renderContent(text, row, index, 'username', { width: '150px' })
    }, {
      title: 'powerionics淘宝或京东订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      render: (text, row, index) => renderContent(text, row, index, 'order_code', { width: '250px' })
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (text, row, index) => renderContent(text, row, index, 'mobile', { width: '100px' })
    }, {
      title: '微信昵称',
      dataIndex: 'rel_wechat',
      key: 'rel_wechat_nickname',
      render: (text, row, index) => renderContent(text, row, index, 'wx_nickname', { width: '80px' })
    }, {
      title: '微信性别',
      dataIndex: 'rel_wechat',
      key: 'rel_wechat_sex',
      render: (text, row, index) => renderContent(text, row, index, 'wx_sex', { width: '80px' })
    }, {
      title: '微信省市',
      dataIndex: 'rel_wechat',
      key: 'rel_wechat_province',
      render: (text, row, index) => renderContent(text, row, index, 'wx_province', { width: '120px' })
    }, {
      title: '提交时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, row, index) => renderContent(text, row, index, 'created_at', { width: '200px' })
    }, {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      fixed: 'right',
      width: 140,
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
        {/* <div className="opt-bar">
          <div className="flex-wrap">
            <Select disabled={!selectedRows || selectedRows.length == 0} value="状态修改" style={{ width: 120 }} onChange={this.handleStatusChange}>
              <Option value="1">红色</Option>
              <Option value="2">蓝色</Option>
              <Option value="2">删除标记</Option>
            </Select>
          </div>
          <div className="search-wrap">
            <InputSearch className="search-input"></InputSearch>
          </div>
        </div> */}
        <div className="list-wrap">
          <div className="list">
            <Table rowClassName={(record, index) => record.flag == 1 ? 'red-row' : (record.flag == 2 ? 'blue-row' : '')} className="secret-table" size="small" bordered ref="table" onRow={(record, index) => {
              return {
                onClick: (e) => this.openDetail(record, index, '', e), // 点击行
              };
            }} columns={columns} dataSource={this.state.list} pagination={false} scroll={this.state.scroll} />
            <Pagination pageSize={this.state.pageSize} onChange={this.onPageChange} total={this.state.total} />
          </div>
        </div>


        <Viewer
          visible={this.state.imgPrviewVisible}
          onClose={() => { this.setState({ imgPrviewVisible: false }); }}
          images={previewImgArray}
          activeIndex={currentPreviewImgIndex}
        />
        <Modal
          className="my_modal"
          style={{ height: secret_edit_modal_height }}
          title={
            <div className="top">
              <p>编辑密语</p>
              <div className="opt-wrap">
                <Dropdown className="status-dropdown" overlay={<Menu onClick={this.handleStatusMenuClick}>
                  <Menu.Item key="1" className="red-item">红色</Menu.Item>
                  <Menu.Item key="2" className="blue-item">蓝色</Menu.Item>
                  <Menu.Item className="gray-item">删除标记</Menu.Item>
                </Menu>} trigger={['click']}>
                  <Icon type="tag" style={statusStyles} />
                </Dropdown>
                <Icon onClick={this.handleModalEditCancel} className="close-btn" type="close" />
              </div>
            </div>
          }
          closable={false}
          centered
          visible={this.state.modalEditFlag}
          footer={null}
          onCancel={this.handleModalEditCancel}
          destroyOnClose={true}
          width={900}
        >
          <EditForm disabled={disabled} formData={formData} onEdit={this.handleEdit} onSubmit={this.handleEditSubmit} onDelete={(e) => this.handleDelete('', e)}></EditForm>
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
      </div>
    );
  }
}

export default withRouter(DataCenter)