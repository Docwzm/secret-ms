/**
 * form组件请以${key}_form命名；
 * 引用时，请调用pickForm(key)，根据key匹配组件
 */

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import './form.scss'

class PickForm extends Component{
    render(){
        const disabled = this.props.disabled;
        const MyComponent = require(`./${this.props.name}_form.jsx`).default;
        return <div className="form-wrap">
            <MyComponent disabled={disabled} onCancel={this.props.onCancel} onSubmit={this.props.onSubmit}/>
        </div>
    }
}

export default withRouter(PickForm) 