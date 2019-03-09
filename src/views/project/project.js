import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getQueryString } from '../../utils';
import Follow from './components/follow';
import Measure from './components/measure';
import { getProgram } from '../../apis/program'
import './styles/project.scss'

class Project extends Component {
    state = {
        type: '',
        proData:null
    }

    componentWillMount() {
        let type = getQueryString('type')
        let proId = getQueryString('id')

        getProgram({
            type,
            id:proId
        }).then(res => {
            this.setState({
                type,
                proData:res.data
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