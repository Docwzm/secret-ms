/**
 * form组件请以${key}_form命名；
 * 引用时，请调用pickForm(key)，根据key匹配组件
 * 
 * 
 * name:传入的表单name前缀
 * formData:传入的表单数据
 * disabled:是否可编辑标识
 * onSubmit:提交回调
 * onCancel:取消回调
 * 
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './form.scss'

class PickForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData:{},
        }
    }
    onCancel(){
        this.refs.childRef.resetFields();
        this.props.onCancel();
        this.props.setCanSave(false)
    }
    render() {
        const MyComponent = require(`./${this.props.name}_form.jsx`).default;
        return <div className="form-wrap">
            <MyComponent ref="childRef" formData={this.props.formData} canSave={this.props.canSave} onCancel={this.onCancel.bind(this)} onSubmit={this.props.onSubmit} setCanSave={this.props.setCanSave}  />
        </div>
    }
}

export default withRouter(PickForm) 