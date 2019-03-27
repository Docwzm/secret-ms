/**
 * 踝肱动脉压指数（ABI）
 */
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'

const FormItem = Form.Item;

class Module11 extends Component {

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            console.log(values)
            this.props.onSubmit(values)
        });
    }

    render() {
        let {
            abiOffside,
            abiLeftside,
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div>
                <div className="title">踝肱动脉压指数（ABI）</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="右侧"
                    >
                        {getFieldDecorator('abiOffside', {
                            initialValue: abiOffside,
                            rules:[{
                                validator:validDoubleNumber
                            }]
                        })(
                            <Input></Input>
                        )}

                    </FormItem>
                    <FormItem
                        label="左侧"
                    >
                        {getFieldDecorator('abiLeftside', {
                            initialValue: abiLeftside,
                        })(
                            <Input></Input>
                        )}
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const ThisForm = Form.create({
    onValuesChange:(props, changedValues, allValues) => {
        if(!props.canSave){
            props.setCanSave(true)
        }
    }
})(Module11);

export default ThisForm