import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Button, Icon,notification } from 'antd';
import PageHeader from '../../components/PageHeader';
import { getQueryObject, getLocal, setLocal } from '../../utils'
import { searchCrf } from '../../apis/crf'
import { getCrfNodeName } from '../../utils/crfForm'
import AddNewNode from '../../components/AddNewNode'
import './styles/process.scss'

class process extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneId: '',//手机号码
            userInfo: {},//患者信息
            vnodeList: []//crf各个节点信息
        }
    }
    componentWillMount() {
        let params = getQueryObject(this.props.location.search);
        //解决从编辑页点击面包屑时无法获取ID的bug，上个页面点击录入时，会暂存ID
        let id = params.id || getLocal('crfPatientMobile');
        this.setState({
            phoneId: id
        })
        this.initCrfFormNode(id)
    }
    initCrfFormNode(id) {
        searchCrf({
            searchText: id
        }).then(res => {
            let data = res.data;
            //通过搜索进入详情时，增加ID缓存
            setLocal('crfPatientMobile', id)
            if (data) {
                let userInfo = data.userTopicInfo;
                let vnodeList = data.contentCrfList || [];
                let planId = data.userProgramId;
                this.setState({
                    userInfo,
                    vnodeList,
                    planId
                })
            }else{
                notification['error']({
                    message: '无此信息'
                })
            }
        })
    }
    gotoDetail = (data, item) => {
        this.props.history.push('/crf/patient/edit?id=' + this.state.phoneId + '&nodeId=' + data.id + '&pro=' + item.crfFormType);
    }
    //关闭添加随访弹窗
    closeFollowModal = () => {
        this.setState({
            addFlag: false
        })
        this.initCrfFormNode(this.state.phoneId)
    }
    //打开添加随访弹窗
    openFollowModal = () => {
        this.setState({
            addFlag: true
        })
    }
    render() {
        let { patientNo, realName, mobile, topicName, doctorName, topicId, subGroupName } = this.state.userInfo;
        let { planId, vnodeList, addFlag } = this.state;
        return (
            patientNo?<div className="crf-process">
                <AddNewNode visible={addFlag} id={planId} groupId={topicId} list={vnodeList} onHide={this.closeFollowModal} />
                <PageHeader onBack={this.props.history.goBack} content={<div className="patient-info">
                    <p>患者编号：{patientNo}</p>
                    <p>患者姓名：{realName}</p>
                    <p>手机号码：{mobile}</p>
                    <p>课题分组：{subGroupName}</p>
                    <p>负责医生：{doctorName}</p>
                </div>} />

                <div className="vnode-list">
                    <Timeline>
                        {
                            this.state.vnodeList.map((item, index) => {
                                return <Timeline.Item key={index} color={item.status == 3 ? 'green' : (item.status == 2 ? 'red' : 'blue')}>
                                    <div className="node">
                                        <span className="name">{item.name}</span>
                                        {
                                            item.status == 3 ? <i className="done">已完成</i> : (item.status == 2 ? <i className="wait">待录入</i> : null)
                                        }
                                    </div>
                                    <div className="node-detail">
                                        {
                                            item.crfList.map((crfItem, _index) => {
                                                return <p key={_index} className={crfItem.status == 3 ? 'done' : (crfItem.status == 2 ? 'wait' : '')} onClick={this.gotoDetail.bind(this, item, crfItem)}>{getCrfNodeName(crfItem.crfFormType)}</p>
                                            })
                                        }
                                    </div>
                                </Timeline.Item>
                            })
                        }
                    </Timeline>
                    {
                        <Button type='primary' onClick={this.openFollowModal}><Icon type="plus" />添加额外随访</Button>
                    }
                </div>
            </div>:null
        );
    }
}

export default withRouter(process)