/**
 * form组件请以${key}_form命名；
 * 引用时，请调用pickForm(key)，根据key匹配组件
 */

import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class PickForm extends Component{
    render(){
        const MyComponent = require(`./${this.props.name}_form.jsx`).default;
        return <MyComponent onSubmit={this.props.onSubmit}/>
    }
}

export default withRouter(PickForm) 