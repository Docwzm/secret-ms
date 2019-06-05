import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import PageHeader from '../../components/PageHeader'
import CrfFormNode from '../../components/Crf_form/CrfFormNode'
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
            nodeKey: '0',//当前选中节点key
            vnodeList: [],//v1-v9节点数据
            userInfo: {},//患者信息
            formData: null,//表单数据
            curPro: {}, //当前选中的表单
            disabled: false,//
            canSave: false,//可保存标识（表单中任一字段改变了即为true）
        }
    }
    componentWillMount() {
        this.getCrfDetail('init')
    }
    //获取患者crf节点信息
    getCrfDetail(type) {
        let params = getQueryObject(this.props.location.search);
        searchCrf({
            searchText: params.id
        }).then(res => {
            let data = res.data;
            if (data) {
                this.setState({
                    canSave: false,
                    userInfo: data.userTopicInfo || {},
                    vnodeList: data.contentCrfList || []
                })
                //初始化进来的时候 需要url是否带有表单信息 有则请求表单信息
                if (type == 'init') {
                    let pro = {};
                    let vIndex = data.contentCrfList.findIndex(item => item.id == params.nodeId)//对应的节点index
                    if (vIndex >= 0) {
                        if (params.pro) {
                            //pro为表单的key,即crfFormType
                            pro = data.contentCrfList[vIndex].crfList.find(item => item.crfFormType == params.pro)//对应的节点的表单
                        } else {
                            pro = data.contentCrfList[vIndex].crfList.find(item => item.status == 2)
                        }
                        this.setState({
                            nodeKey: vIndex.toString()
                        })
                    }
                    if (pro.id) {
                        this.selectPro(pro)
                    }
                }
            }
        })
    }
    /**
     * 选择节点
     * @memberof activeKey 当前选中节点key
     */
    selectStep = (activeKey) => {
        this.setState({
            nodeKey: activeKey
        }, () => {
            // （默认选择节点第一个表单）
            this.selectPro(this.state.vnodeList[activeKey].crfList[0])
        })
    }
    /**
     * 选择节点表单 获取表单数据
     * @param {*} proData 选择的表单信息
     */
    selectPro(proData) {
        let { nodeKey, vnodeList, canSave, curPro } = this.state;
        let { contentNum, crfFormType } = proData;
        if (curPro && proData.id == curPro.id) {
            //防止重复点击
            return false;
        }
        if (canSave) {
            //如果之前的表单被编辑过，那么选择其他表单的时候需要询问是否保存之前表单的编辑信息
            this.showConfirm(proData)
            return false
        }
        //获取crf表单数据
        getCrfFormDetail({
            contentId: vnodeList[nodeKey].id,
            contentNum,
            crfFormType
        }).then(res => {
            let formData = res.data || {};
            if (res.data&&res.data.imgList) {
                formData.fileList = this.filterUploadImg(res.data.imgList)//过滤相关资料图片
            }else{
                formData.fileList = []
            }
            let params = {
                formData,//表单数据
                canSave: false,//每次请求时 编辑标识置为否
                proData: null//每次请求时 需要将其置为null
            }

            if (proData) {
                params.curPro = proData;//切换为当前的表单信息curPro
            }
            this.setState(params)
            this.form.props.form.resetFields()//充值表单信息 防止不同节点同一个表单的字段缓存
        })
    }
    /**
     * 过滤相关资料图片 组装成upload组件兼容的格式
     * @param {*} imgList
     * @returns {Array}
     */
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
    /**
     * 提交表单
     * @param {*} data 表单数据
     */
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
        })//过滤图片 只提交token
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
            this.getCrfDetail()//再次请求节点信息 更新节点状态
            this.setState({
                disabled: false,
                formData,
                canSave: false
            }, () => {
                this.form.props.form.resetFields()//重置表单 防止缓存
                if (this.state.proData) {
                    //如果当前的proData不为空，则说明当前需要切换到其他表单或其他节点
                    this.selectPro(this.state.proData)
                }
            })
        }).catch(e => {
            this.setState({
                disabled: false
            })
        })
    }
    // 取消提交
    handleCancel = () => {
        this.form.props.form.resetFields();//重置表单数据
        let fileList = this.filterUploadImg(this.state.formData.imgList)//重置相关资料图片为初始值
        this.setState({
            formData:Object.assign({},this.state.formData,{fileList})
        })
        this.setCanSave(false)
    }
    // 设置表单可提交状态
    setCanSave = (canSave) => {
        this.setState({
            canSave
        })
    }
    /**
     * 改变表单字段 更新formData
     * @params {*} obj 需要改变表单数据
     */
    changeFormData = (obj) => {
        this.setState({
            formData: {
                ...this.state.formData,
                ...obj,
            }
        })
        this.setCanSave(true)//每次编辑改动 置表单可编辑状态为true
    }
    /**
     * 改动某个表单后 切换节点或表单 询问是否保存编辑信息
     * @param {*} proData 当前需要切换的表单信息
     */
    showConfirm(proData) {
        confirm({
            title: '是否保存本次填写信息？',
            cancelText: '否',
            okText: '是',
            onOk: () => {
                this.setState({
                    proData//保存当前要切换的表单信息 当触发提交时，需要切换为当前的表单信息curPro
                },() => {
                    document.getElementById('form-submit-btn').click()//触发crfForm 表单提交事件  也可以通过this.form.handleSubmit()提交 但是handleSubmit需要做兼容处理
                })
            },
            onCancel: () => {
                this.setState({
                    canSave: false
                }, () => {
                    this.selectPro(proData) //取消后 不用提交之前的编辑信息 直接选择要切换的表单
                })
            },
        });
    }

    render() {
        let { patientNo, realName, mobile, topicName, doctorName,subGroupName } = this.state.userInfo;
        const crfFormType = filterCrfFormType(this.state.curPro.crfFormType)//过滤表单的key 关联表单对应的key和组件名称
        const MyComponent = this.state.curPro.crfFormType ? require(`../../components/Crf_form/${crfFormType}form.jsx`).default : null;//动态引入表单组件

        return <div className="crf-detail">
            {/* 患者信息 */}
            <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                <p>患者编号：{patientNo}</p>
                <p>患者姓名：{realName}</p>
                <p>手机号码：{mobile}</p>
                <p>课题分组：{subGroupName}</p>
                <p>负责医生：{doctorName}</p>
            </div>} />
            <div className="node-detail">
                {/* 节点信息 */}
                <CrfFormNode list={this.state.vnodeList} activeFormId={this.state.curPro.id} activeKey={this.state.nodeKey} selectStep={this.selectStep.bind(this)} selectPro={this.selectPro.bind(this)}></CrfFormNode>
                {
                    // 表单信息
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