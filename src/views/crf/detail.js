import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CrfTop from './components/crfTop'
import './styles/detail.scss'

class crfDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        
    }
    returnBack(){
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="crf-detail">
                <CrfTop data={{
                    num: '1',
                    name: 'name',
                    phone: '12345678911',
                    group: '糖尿病',
                    doctor: '杨医生',
                }}></CrfTop>
                <div className="edit-detail">
                    
                </div>
            </div>
        );
    }
}

export default withRouter(crfDetail)