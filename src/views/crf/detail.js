import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getQueryObject } from '../../utils'
import CrfForm from './components/crfForm';
import './styles/detail.scss'

class crfDetail extends Component {
    constructor(props) {
        super(props)
    }
    submitCall(data) {
    }
    render() {
        let params = getQueryObject(this.props.location.search);
        return <div className="crf-detail">
            <CrfForm hasHeader={true} id={params.id} nodeId={params.nodeId} pro={params.pro} submitCall={this.submitCall.bind(this)}></CrfForm>
        </div>
    }
}

export default withRouter(crfDetail)