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


class PickForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData:{},
        }
    }
    onCancel(){
        
    }
    render() {
        if(!this.props.name){
            return null
        }
        
    }
}

export default withRouter(PickForm) 