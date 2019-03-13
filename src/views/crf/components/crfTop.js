import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/top.scss'

class crfTop extends Component {
    returnBack = () => {
        this.props.history.goBack();
    }
    render() {
        let {
            num,
            name,
            phone,
            group,
            doctor
        } = this.props.data;
        return (
            <div className="patient-info">
                <p onClick={this.returnBack}>&lt;</p>
                <p>患者编号：{num}</p>
                <p>患者姓名：{name}</p>
                <p>手机号码：{phone}</p>
                <p>课题分组：{group}</p>
                <p>负责医生：{doctor}</p>
            </div>
        );
    }
}

export default withRouter(crfTop)