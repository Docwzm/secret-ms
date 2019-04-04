import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getQueryObject } from '../../utils';
import Follow from './components/follow';
import Measure from './components/measure';
import { getPatientPlan } from '../../apis/plan'
import './styles/project.scss'

class Project extends Component {
    state = {
        type: '',
        proData: null
    }

    componentWillMount() {
        let params = getQueryObject(this.props.location.search)

        getPatientPlan(params.id,params.doctorId, params.type).then(res => {
            res.data.list.sort((a, b) => {
                return a.num - b.num
            })
            this.setState({
                type: params.type,
                proData: res.data
            })
        })
    }

    render() {
        let {
            proData,
            type
        } = this.state
        return <div className="project-wrap">
            {
                type == 1 ? <Follow data={proData}></Follow> : (type == 3 ? <Measure data={proData}></Measure> : null)
            }
        </div>
    }
}

export default withRouter(Project)