/**
 * 踝肱动脉压指数（ABI）
 */
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import { validDoubleNumber } from '../../../utils/formValidate'
import PicturesWall from '../crfFormUpload'

const FormItem = Form.Item;

class Module extends Component {

    //提交数据
    handleSubmit(e) {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            this.props.onSubmit(values)
        });
    }

    render() {
        let {
            abiOffside,
            abiLeftside,
            fileList
        } = this.props.formData;
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <div>
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="右侧"
                    >
                        {getFieldDecorator('abiOffside', {
                            initialValue: abiOffside,
                            rules: [{
                                validator: validDoubleNumber
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
                            rules: [{
                                validator: validDoubleNumber
                            }]
                        })(
                            <Input></Input>
                        )}
                    </FormItem>
                    <FormItem label="相关资料" {...formItemLayout2}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button id="form-submit-btn" disabled={this.props.disabled} type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm