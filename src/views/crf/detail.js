import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import PageHeader from '../../components/PageHeader'
import CrfFormNode from '../../components/CrfFormNode'
import { getQueryObject } from '../../utils'
import { filterCrfFormType,getCrfNodeName } from '../../utils/crfForm'
import { getCrfFormDetail, setCrfForm, searchCrf } from '../../apis/crf'
import '../../assets/styles/form.scss'
import './styles/detail.scss'
const confirm = Modal.confirm;

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeKey: '0',//当前节点key
            vnodeList: [],//v1-v9节点数据
            userInfo: {},//患者信息
            formData: null,//表单数据
            curPro: {}, //
            disabled: false,
            canSave: false,//可保存标识（表单中任一字段改变了即为true）
        }
    }
    componentWillMount() {
        this.getCrfDetail('init')
    }
    getCrfDetail(type) {
        let params = getQueryObject(this.props.location.search);
        searchCrf({
            searchText: params.id
        }).then(res => {
            let data = res.data;
            let proId = '';
            if (data) {
                this.setState({
                    canSave: false,
                    userInfo: data.userTopicInfo || {},
                    vnodeList: data.contentCrfList || []
                })
                if (type == 'init') {
                    let pro = {};
                    let vIndex = data.contentCrfList.findIndex(item => item.id == params.nodeId)
                    if (vIndex >= 0) {
                        if (params.pro) {
                            pro = data.contentCrfList[vIndex].crfList.find(item => item.crfFormType == params.pro)
                        } else {
                            pro = data.contentCrfList[vIndex].crfList.find(item => item.status == 2)
                        }
                        this.setState({
                            nodeKey: vIndex.toString()
                        })
                    }
                    if (pro.id) {
                        console.log(pro)
                        this.selectPro(pro)
                    }
                }
            }
        })
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
        if (curPro && proData.id == curPro.id) {
            return false;
        }
        if (canSave) {
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
                proData: null
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
        let { id, userId, programId, followUpContentId, contentNum, crfFormType } = this.state.curPro;
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
        setCrfForm(data, crfFormType).then(res => {
            let data = res.data;
            let formData = this.state.formData;
            if (data.id) {
                formData = Object.assign({}, this.state.formData, { ...res.data })
            }
            this.getCrfDetail()
            this.setState({
                disabled: false,
                formData,
                canSave: false
            }, () => {
                this.form.props.form.resetFields()
                if (this.state.proData) {
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
    setCanSave = (canSave) => {
        this.setState({
            canSave
        })
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
    showConfirm(proData) {
        confirm({
            title: '是否保存本次填写信息？',
            cancelText: '否',
            okText: '是',
            onOk: () => {
                document.getElementById('form-submit-btn').click()
                this.setState({
                    proData
                })
            },
            onCancel: () => {
                this.setState({
                    canSave: false
                }, () => {
                    this.selectPro(proData)
                })
            },
        });
    }

    render() {
        let { patientNo, realName, mobile, topicName, doctorName,subGroupName } = this.state.userInfo;
        const crfFormType = filterCrfFormType(this.state.curPro.crfFormType)
        const MyComponent = this.state.curPro.crfFormType ? require(`../../components/Crf_form/${crfFormType}form.jsx`).default : null;
        return <div className="crf-detail">
            <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                <p>患者编号：{patientNo}</p>
                <p>患者姓名：{realName}</p>
                <p>手机号码：{mobile}</p>
                <p>课题分组：{topicName}（{subGroupName}）</p>
                <p>负责医生：{doctorName}</p>
            </div>} />
            <div className="node-detail">
                <CrfFormNode list={this.state.vnodeList} activeFormId={this.state.curPro.id} activeKey={this.state.nodeKey} selectStep={this.selectStep.bind(this)} selectPro={this.selectPro.bind(this)}></CrfFormNode>
                {
                    this.state.formData ? <div className="crf-form-wrap">
                        <div className="form-title">{getCrfNodeName(this.state.curPro.crfFormType)}</div>
                        <MyComponent wrappedComponentRef={(form) => this.form = form} crfFormType={this.state.curPro.crfFormType} formData={this.state.formData} disabled={this.state.disabled} canSave={this.state.canSave} onCancel={this.handleCancel.bind(this)} onSubmit={this.haneleSubmit.bind(this)} setCanSave={this.setCanSave.bind(this)} changeData={this.changeFormData.bind(this)} />
                    </div> : null
                }
            </div>
        </div>
    }
}

export default withRouter(crfDetail)