import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Timeline, Icon } from 'antd';
import { parseTime } from '../../../utils'
import {switchEnum} from '../../../utils/enum'
import '../styles/follow.scss'

class Follow extends Component {
    render() {
        let data = this.props.data;
        return <div className="follow-pro">
            <div className="pro-name">{data.name}</div>
            <div className="info">
                <p className="doctor">{data.doctorName}提醒你</p>
                <div className="list">
                    <Timeline>
                        {
                            data.list.map((item, index) => {
                                return <Timeline.Item className="node-item" key={index} dot={<Icon type="clock-circle-o" />}>
                                    <div className="vnode"><span>{item.name}</span><span>首诊{item.planTime}天后（{parseTime(item.startDate,'YYYY-MM-DD')}）</span></div>
                                    <div className="content">内容：{item.content}</div>
                                    <div className="address">地点：{switchEnum(item.site,'site')}</div>
                                </Timeline.Item>
                            })
                        }
                    </Timeline>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(Follow)