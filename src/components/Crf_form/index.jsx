/**
 * form组件请以${key}_form命名；
 * 引用时，请调用pickForm(key)，根据key匹配组件
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { setCrfForm,getCrfFormDetail } from '../../apis/crf';
import './form.scss'

class PickForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData:{}
        }
    }
    onSubmit(data) {
        console.log(data)
        // setCrfForm(1,data).then(res => {
        //     console.log(res)
        // this.props.onSubmit(data);
        // })
        this.props.onSubmit(data);
    }
    onCancel(){
        this.refs.childRef.resetFields();
        this.props.onCancel();
    }
    render() {
        let formData = JSON.parse(JSON.stringify(this.props.formData))
        const disabled = this.props.disabled;
        const MyComponent = require(`./${this.props.name}_form.jsx`).default;
        return <div className="form-wrap">
            <MyComponent ref="childRef" formData={formData} disabled={disabled} onCancel={this.onCancel.bind(this)} onSubmit={this.onSubmit.bind(this)} />
        </div>
    }
}

export default withRouter(PickForm) 