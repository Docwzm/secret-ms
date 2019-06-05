import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader'
import CrfFormNode from '../../components/Crf_form/CrfFormNode'
import { getQueryObject } from '../../utils'
import { filterCrfFormType, getCrfNodeName } from '../../utils/crfForm'
import { searchCrf } from '../../apis/crf'
import BaseCrfForm from '../../components/Crf_form/BaseCrfForm';
import './styles/detail.scss'

/**
 * 继承BaseCrfFrom基类
 */
class crfDetail extends BaseCrfForm {
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
    render() {
        const crfFormType = filterCrfFormType(this.state.curPro.crfFormType)//过滤表单的key 关联表单对应的key和组件名称
        const MyComponent = this.state.curPro.crfFormType ? require(`../../components/Crf_form/formPage/${crfFormType}form.jsx`).default : null;//动态引入表单组件
        let { patientNo, realName, mobile, topicName, doctorName, subGroupName } = this.state.userInfo;
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
                        <MyComponent wrappedComponentRef={(form) => this.form = form} crfFormType={this.state.curPro.crfFormType} formData={this.state.formData} disabled={this.state.disabled} canSave={this.state.canSave} onCancel={this.handleCancel.bind(this)} onSubmit={this.handleSubmit.bind(this)} setCanSave={this.setCanSave.bind(this)} changeData={this.changeFormData.bind(this)} />
                    </div> : null
                }
            </div>
        </div>
    }
}

export default withRouter(crfDetail)