/**
 * form组件请以${key}_form命名；
 * 引用时，请调用pickForm(key)，根据key匹配组件
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './form.scss'

class PickForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData:{}
        }
    }
    onCancel(){
        this.refs.childRef.resetFields();
        this.props.onCancel();
    }
    render() {
        console.log(this.props.name)
        console.log('.........../')
        console.log(this.props.formData)
        const disabled = this.props.disabled;
        const MyComponent = require(`./${this.props.name}_form.jsx`).default;
        return <div className="form-wrap">
            <MyComponent ref="childRef" formData={this.props.formData} disabled={disabled} onCancel={this.onCancel.bind(this)} onSubmit={this.props.onSubmit} />
        </div>
    }
}

export default withRouter(PickForm) 