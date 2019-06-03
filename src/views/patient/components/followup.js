import React, { Component } from 'react';
import { Modal,Button, Table,Icon,DatePicker,Form,Input,Select} from 'antd';
import { withRouter } from 'react-router-dom'
import CrfFormNode from '../../../components/CrfFormNode'
import { getPatientPlan,getNextPlan,updateVisitTime } from '../../../apis/plan';
import moment from 'moment';
import AddNewNode from '../../../components/AddNewNode'
import { switchEnum } from '../../../utils/enum'
import { formItemLayout, tailFormItemLayout } from '../../../utils/formItemLayout';
import { filterCrfFormType,getCrfNodeName } from '../../../utils/crfForm'
import { getCrfFormDetail, setCrfForm, searchCrfV2 } from '../../../apis/crf'
import '../../../assets/styles/form.scss'
const confirm = Modal.confirm;
const FormItem = Form.Item;

class Followup extends Component {
    state = {
        pageState: true,//页面初始状态（包含列表显示和输入）
        patientPlan: {},
        curPro: {},
        nodeKey: "0",
        disabled: false,
        canSave: false,//可保存标识（表单中任一字段改变了即为true）
        editFollowUpDateModal:false,
        addNewFollowUpModal:false,
        currentNode:{},
        updateLoading:false,
        addNodeModel:{},
        newNode:{}
    }

    componentWillMount() {
        let patientId = this.props.patientId
        let doctorId = this.props.doctorId
        this.actionGetPatientPlan(patientId, 1)
        this.actionSearchCrf(patientId)
        this.actionGetNextPlan(patientId,doctorId)
    }

    handleInputPage(index) {
        this.setState({ pageState: false,nodeKey:index.toString() })
    }

    //横向步骤条点击
    handleStepClick(iconDot, info) {
        console.log(info)
        //根据每个阶段显示不同的内容
    }

    handleSubmit(values) {
        console.log('--->', values)
    }

    selectStep = (activeKey) => {
        this.setState({
            nodeKey: activeKey
        }, () => {
            this.selectPro(this.state.vnodeList[activeKey].crfList[0])
        })
    }

    selectPro(proData) {
        let { nodeKey, vnodeList, canSave, curPro } = this.state;
        let { contentNum, crfFormType } = proData;
        if(curPro&&proData.id==curPro.id){
            return false;
        }
        if(canSave){
            this.showConfirm(proData)
            return false
        }
        getCrfFormDetail({
            contentId: vnodeList[nodeKey].id,
            contentNum,
            crfFormType
        }).then(res => {
            let fileList = [];
            let formData = res.data || {};
            if (res.data&&res.data.imgList) {
                formData.fileList = this.filterUploadImg(res.data.imgList)
            }else{
                formData.fileList = []
            }
            let params = {
                formData,
                canSave: false,
                proData:null
            }
            if (proData) {
                params.curPro = proData;
            }
            this.setState(params)
            this.form.props.form.resetFields()
        })
    }
    filterUploadImg(imgList){
        let fileList = [];
        if(imgList){
            imgList.map((item, index) => {
                fileList.push({
                    uid: '-' + index,
                    status: 'done',
                    response: {
                        data: {
                            token: item.imgToken
                        }
                    },
                    url: item.imgUrl
                })
            })
        }
        return fileList
    }
    haneleSubmit(data) {
        let curPro = this.state.curPro
        let { id, userId, programId, followUpContentId, contentNum, crfFormType } = curPro;
        let other_data = {
            crfId: id,
            userId,
            programId,
            followUpContentId,
            num: contentNum,
            crfType: crfFormType
        }
        data.imgList = [];
        this.state.formData.fileList.map(item => {
            data.imgList.push({
                imgToken: item.response.data.token
            })
        })
        if (this.state.formData.id) {
            other_data.id = this.state.formData.id
        }
        data = { ...other_data, ...data }
        this.setState({
            disabled: true
        })
        setCrfForm(data, curPro.crfFormType).then(res => {
            let data = res.data;
            let formData = this.state.formData;
            if (data.id) {
                formData = Object.assign({}, this.state.formData, { ...res.data })
            }
            this.actionSearchCrf(this.props.patientId)
            this.setState({
                disabled: false,
                formData,
                canSave:false
            },() => {
                this.form.props.form.resetFields()
                if(this.state.proData){
                    this.selectPro(this.state.proData)
                }
            })
        }).catch(e => {
            this.setState({
                disabled: false
            })
        })
    }
    handleCancel = () => {
        this.form.props.form.resetFields();
        let fileList = this.filterUploadImg(this.state.formData.imgList)
        this.setState({
            formData:Object.assign({},this.state.formData,{fileList})
        })
        this.setCanSave(false)
    }

    handleEditFollowUpDateHide(){
        this.setState({
            editFollowUpDateModal:false
        })
    }

    handleAddNewFollowUpHide(){
        let patientId = this.props.patientId
        this.setState({
            addNewFollowUp:false
        })
        this.actionGetPatientPlan(patientId, 1)
    }

    //修改下次随访时间
    handleNextPlanTime(value){
        let nextPLanTime = value.valueOf();
        this.setState({
            nextPLanTime
        })
    }

    handleUpdateVisitTime(){
        let {currentNode,nextPLanTime} = this.state
        let startDate = nextPLanTime || currentNode.startDate
        this.actionUpdateVisitTime({
            startDate,
            contentId:currentNode.id
        })
    }

    handleInputNewNode(key,e){
        let {newNode} = this.state
        let value=''
        if(key === 'site'){
            value = e
        }else if(key ==='startDate'){
            value = e.valueOf()
        }else{
            value = e.target.value
        }
        newNode[key] = value
        console.log(newNode)
        this.setState({newNode})
    }

    setCanSave = (canSave) => {
        this.setState({
            canSave
        })
    }

    showConfirm(proData){
        confirm({
            title: '是否保存本次填写信息？',
            cancelText:'否',
            okText:'是',
            onOk: () => {
              document.getElementById('form-submit-btn').click()
              this.setState({
                proData
              })
            },
            onCancel: () => {
                this.setState({
                    canSave:false
                },() => {
                    this.selectPro(proData)
                })
            },
        });
    }

    /**
     * 获取患者随访方案
     * @param {*} data 
     */
    async actionGetPatientPlan(patientId, type) {
        let doctorId = this.props.doctorId
        let patientPlan = await getPatientPlan(patientId, doctorId, type)
        if (patientPlan) {
            let data = patientPlan.data || {}
            this.setState({
                patientPlan: data
            })
        }
    }

    async actionSearchCrf(patientId) {
        //新增传入doctorId
        let doctorId = this.props.doctorId
        let search = await searchCrfV2({ patientId,doctorId })
        let data = search.data;
        let proId = '';
        if (data) {
            this.setState({
                canSave: false,
                userInfo: data.userTopicInfo,
                vnodeList: data.contentCrfList
            })
        }
    }

    /**
     * 查询下一次随访
     * @param {*} patientId 
     */
    async actionGetNextPlan(patientId,doctorId){
        try{
            let res = await getNextPlan(patientId,doctorId)
            let data = res.data
            data.startTime = moment(data.startDate).format('YYYY年MM月DD日')
            this.setState({
                currentNode:data
            })
        }catch(err){
            console.error(err)
        }
    }

    /**
     * 修改随访时间
     * @param {*} data 
     */
    async actionUpdateVisitTime(data){
        try{
            this.setState({updateLoading:true})
            let res = await  updateVisitTime(data)
            let patientId = this.props.patientId
            console.log(res)
            this.setState({updateLoading:false,editFollowUpDateModal:false})
            this.actionGetPatientPlan(patientId, 1)
        }catch(err){
            console.error(err)
            this.setState({updateLoading:false})
        }
    }

    changeFormData = (obj) => {
        this.setState({
            formData: {
                ...this.state.formData,
                ...obj,
            }
        })
        this.setCanSave(true)
    }
    render() {
        const { pageState, patientPlan, nodeKey, vnodeList, curPro ,editFollowUpDateModal,addNewFollowUp,currentNode,updateLoading,addNodeModel} = this.state
        let list = patientPlan.list || []
        
        const columns = [{
            title: "状态",
            align: "center",
            width: "100px",
            key: "status",
            render: row => {
                if (row.status === 1) {
                    return <i className="grey"></i>
                } else if (row.status === 2) {
                    return <i className="red"></i>
                } else {
                    return <i className="green"></i>
                    
                }
            }
        }, {
            title: "节点名称",
            dataIndex: "name",
            align: "center",
            width: "200px",
            key: "name"
        }, {
            title: "时间",
            align: "center",
            width: "150px",
            key: "startTime",
            render: row => moment(row.startDate).format("YY-MM-DD")
        }, {
            title: "地点",
            align: "center",
            width: "150px",
            render: row => {
                if (row.site) {
                    return switchEnum(row.site, 'site')
                }
                return '--'
            }
        }, {
            title: "内容",
            dataIndex: "describes",
            align: "describes",
            key: "describes"
        }, {
            title: "操作",
            align: "center",
            width: "150px",
            render: (row,record,index) => {
                if (patientPlan.category === 1) {
                    if(row.status === 1){
                        return (<Button disabled={this.props.onlyRead} onClick={this.handleInputPage.bind(this,index)}>未到期</Button>)
                    }
                    if(row.status === 2){
                        return (<Button type="primary" disabled={this.props.onlyRead} onClick={this.handleInputPage.bind(this,index)}>待录入</Button>)
                    }
                    if(row.status === 3){
                        return (<Button disabled={this.props.onlyRead} onClick={this.handleInputPage.bind(this,index)}>查看</Button>)
                    }
                    
                }
                return "--"
            }
        }]

        const header = () => (
            <header className="table-header">
                <span className="header-left">随访类型：<strong>{patientPlan.name}</strong></span>
                <span className="header-left">开始时间：<strong>{patientPlan.categoryTime}</strong></span>
                <span className="header-left">下一次访视：<strong>{currentNode.name}&nbsp;&nbsp;&nbsp;&nbsp;{currentNode.startTime}</strong> &nbsp;&nbsp;{currentNode.startTime?<Button onClick={()=>{this.setState({editFollowUpDateModal:true})}}>修改</Button>:null}</span>
            </header>
        )
        const footer = () =>(
            <Button type='primary' onClick={()=>{this.setState({addNewFollowUp:true})}}><Icon type="plus"/>添加额外随访</Button>
        )
        //随访列表
        const stepPage = () => (
            <Table
                dataSource={list}
                columns={columns}
                bordered
                rowKey={record => record.num}
                pagination={false}
                title={() => header()}
                footer={()=>footer()}
            />
        )
        const crfFormType = filterCrfFormType(this.state.curPro.crfFormType)
        const MyComponent = this.state.curPro.crfFormType?require(`../../../components/Crf_form/${crfFormType}form.jsx`).default:null;

        //随访录入
        const inputPage = () => (
            <div className="input-page">
                <CrfFormNode list={vnodeList} activeFormId={curPro.id} activeKey={nodeKey} selectStep={this.selectStep.bind(this)} selectPro={this.selectPro.bind(this)}></CrfFormNode>
                {
                    this.state.formData?<div className="crf-form-wrap">
                        <div className="form-title">{getCrfNodeName(this.state.curPro.crfFormType)}</div>
                        <MyComponent wrappedComponentRef={(form) => this.form = form} crfFormType={this.state.curPro.crfFormType} formData={this.state.formData} disabled={this.state.disabled} canSave={this.state.canSave} onCancel={this.handleCancel.bind(this)} onSubmit={this.haneleSubmit.bind(this)} setCanSave={this.setCanSave.bind(this)} changeData={this.changeFormData.bind(this)}  />
                    </div>:null
                }
            </div>
        )

        const editDateModal = () =>(
            <Modal
                visible={editFollowUpDateModal}
                title="修改随访日期"
                onCancel={this.handleEditFollowUpDateHide.bind(this)}
                footer={null}
                width={700}
            >
                <div>
                    <FormItem  {...formItemLayout} label="随访节点" >
                    <span className="bold">{currentNode.name}</span>
                    </FormItem>
                    <FormItem  {...formItemLayout} label="随访时间">
                        <DatePicker 
                            defaultValue={moment(currentNode.startTime, 'YYYY/MM/DD')} 
                            format='YYYY/MM/DD' 
                            onChange={this.handleNextPlanTime.bind(this)}
                        />
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button className="modal-btn" type="primary" onClick={this.handleUpdateVisitTime.bind(this)} loading={updateLoading}>确认</Button>
                        <Button className="modal-btn" onClick={this.handleEditFollowUpDateHide.bind(this)}>取消</Button>
                    </FormItem>
                </div>
            </Modal>
        )


        return (
            <div className="tab1">
                {pageState ? stepPage() : inputPage()}
                {editDateModal()}
                <AddNewNode visible={addNewFollowUp} id={patientPlan.id} groupId={patientPlan.groupId} list={patientPlan.list} onHide={this.handleAddNewFollowUpHide.bind(this)}/>
            </div>
        )
    }
}

export default withRouter(Followup)