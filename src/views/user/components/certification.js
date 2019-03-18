import React, { Component } from 'react';
import {Form} from 'antd'
import {formItemLayout} from '../../../utils/formItemLayout'
import '../styles/center.css'
const FormItem = Form.Item


class Certification extends Component{
    state = {
        
    }

    render(){
        //const {} = this.state
        return(
            <Form className="user-center">
                <FormItem {...formItemLayout} label="医师执业证书">

                </FormItem>
                <FormItem {...formItemLayout} label="医师资格证书">

                </FormItem>
            </Form>
        )
    }
}

export default Certification