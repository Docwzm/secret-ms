import React, { Component } from 'react';
import { Button, Table, message } from 'antd';
import { withRouter } from 'react-router-dom'
import PickForm from '../../../components/Crf_form/index.jsx';
import CrfFormNode from '../../../components/CrfFormNode'
import { getPatientPlan } from '../../../apis/plan';
import moment from 'moment';
import { getCrfFormDetail, setCrfForm, searchCrf } from '../../../apis/crf'

class Followup extends Component {
    state = {
        pageState: true,//页面初始状态（包含列表显示和输入）
        patientPlan: {},
        curPro: {},
        nodeKey: "0",
        canSave: false,//可保存标识（表单中任一字段改变了即为true）
    }

    componentWillMount() {
        this.actionGetPatientPlan(this.props.patientId, 1)

        this.actionSearchCrf(this.props.patientId)
    }

    handleInputPage() {
        this.setState({ pageState: false })
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
        })
    }

    selectPro(proData) {
        let { nodeKey, vnodeList } = this.state;
        let { contentNum, crfFormType } = proData;
        getCrfFormDetail({
            contentId: vnodeList[nodeKey].id,
            contentNum,
            crfFormType
        }).then(res => {
            let params = {
                formData: res.data || {},
                canSave: false
            }
            if (proData) {
                params.curPro = proData;
            }
            this.setState(params)
        })
    }

    haneleSubmit(data) {
        let curPro = this.state.curPro
        let { id, userId, programId, followUpContentId, contentNum } = curPro;
        let other_data = {
            crfId: id,
            userId,
            programId,
            followUpContentId,
            num: contentNum,
        }
        if (this.state.formData.id) {
            other_data.id = this.state.formData.id
        }
        data = { ...other_data, ...data }
        setCrfForm(data, curPro.crfFormType).then(res => {
            this.state.vnodeList[this.state.nodeKey].crfList = this.state.vnodeList[this.state.nodeKey].crfList.map(item => {
                if (item.id == this.state.curPro.id) {
                    item.status = 3;
                }
                return item
            })
            this.state.vnodeList[this.state.nodeKey].status = 2;
            this.setState({
                vnodeList: this.state.vnodeList,
                canSave: false
            })
        })
    }
    handleCancel = () => {
        
    }
    setCanSave = (canSave) => {
        this.setState({
            canSave
        })
    }

    /**
     * 获取患者随访方案
     * @param {*} data 
     */
    async actionGetPatientPlan(patientId, type) {
        let patientPlan = await getPatientPlan(patientId, type)
        if (patientPlan) {
            this.setState({
                patientPlan: patientPlan.data || {}
            })
        }
    }

    async actionSearchCrf(patientId) {
        let search = await searchCrf({ patientId })
        let data = search.data;
        let proId = '';
        if (data) {
            this.setState({
                userInfo: data.userTopicInfo,
                vnodeList: data.contentCrfList
            })

        }
    }

    render() {
        const { pageState, patientPlan, nodeKey, vnodeList, curPro } = this.state
        let list = patientPlan.list || []

        const columns = [{
            title: "状态",
            align: "center",
            width: "100px",
            key: "status",
            render: row => {
                if (row.status === 1) {
                    return <i className="green"></i>
                } else if (row.status === 2) {
                    return <i className="red"></i>
                } else {
                    return <i className="grey"></i>
                }
            }
        }, {
            title: "序号",
            dataIndex: "num",
            align: "center",
            width: "150px",
            key: "num"
        }, {
            title: "时间",
            align: "center",
            width: "150px",
            key: "startTime",
            render: row => moment(row.startDate).format("YY-MM-DD")
        }, {
            title: "节点名称",
            dataIndex: "name",
            align: "center",
            width: "200px",
            key: "name"
        }, {
            title: "内容",
            dataIndex: "content",
            align: "center",
            key: "content"
        }, {
            title: "操作",
            align: "center",
            width: "150px",
            render: row => {
                if (patientPlan.category === 1) {
                    return (<Button onClick={this.handleInputPage.bind(this)}>待录入</Button>)
                }
                return "--"
            }
        }]

        const header = () => (
            <header>
                <span style={{ marginRight: "100px" }}>随访类型：<strong>{patientPlan.name}</strong></span>开始时间：<strong>{patientPlan.categoryTime}</strong>
            </header>
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
            />
        )

        //随访录入
        const inputPage = () => (
            <div className="input-page">
                <CrfFormNode list={vnodeList} activeFormId={curPro.id} activeKey={nodeKey} selectStep={this.selectStep.bind(this)} selectPro={this.selectPro.bind(this)}></CrfFormNode>
                {
                    this.state.formData ? <div>
                        <PickForm formData={this.state.formData} name={this.state.curPro.crfFormType} canSave={this.state.canSave} setCanSave={this.setCanSave} onCancel={this.handleCancel.bind(this)} onSubmit={this.haneleSubmit.bind(this)}></PickForm>
                    </div> : null
                }
            </div>
        )

        return (
            <div className="tab1">
                {pageState ? stepPage() : inputPage()}
            </div>
        )
    }
}

export default withRouter(Followup)