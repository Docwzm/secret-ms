/**
 * form组件请以${key}_form命名；
 * 引用时，请调用pickForm(key)，根据key匹配组件
 */

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {setCrfForm } from '../../apis/crf';
import './form.scss'

class PickForm extends Component{
    onSubmit(data){
        console.log(data)
        // setCrfForm(1,data).then(res => {
        //     console.log(res)
        // this.props.onSubmit(data);
        // })
        this.props.onSubmit(data);
    }
    render(){
        const disabled = this.props.disabled;
        const MyComponent = require(`./${this.props.name}_form.jsx`).default;
        return <div className="form-wrap">
            <MyComponent formData={this.props.formData} disabled={disabled} onCancel={this.props.onCancel} onSubmit={this.onSubmit.bind(this)}/>
        </div>
    }
}

export default withRouter(PickForm) 