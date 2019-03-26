/**
 * 生命指征
 */
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
const FormItem = Form.Item;

class Module4 extends Component {

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
            systolicPressure,
            diastolicPressure,
            heartRate,
            weight,
            height,
            bmi,
            waistline,
            hipline
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };
        return (
            <div>
                <div className="title">生命指征</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="血压（坐位）">
                        <FormItem className="inline-item">
                            {
                                getFieldDecorator('systolicPressure', {
                                    initialValue: systolicPressure,
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                        </FormItem>
                        <span>/</span>
                        <FormItem className="inline-item">
                            {
                                getFieldDecorator('diastolicPressure', {
                                    initialValue: diastolicPressure,
                                })(
                                    <Input addonAfter="mmHg" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </FormItem>
                    <FormItem label="脉搏（坐位）">
                        {
                            getFieldDecorator('heartRate', {
                                initialValue: heartRate,
                            })(
                                <Input addonAfter="次/分" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    <FormItem label="体重">
                        {
                            getFieldDecorator('weight', {
                                initialValue: weight,
                            })(
                                <Input addonAfter="kg" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    <FormItem label="身高">
                        {
                            getFieldDecorator('height', {
                                initialValue: height,
                            })(
                                <Input addonAfter="cm" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    <FormItem label="BMI">
                        {
                            getFieldDecorator('bmi', {
                                initialValue: bmi,
                            })(
                                <Input addonAfter="kg/m2" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    <FormItem label="腰围">
                        {
                            getFieldDecorator('waistline', {
                                initialValue: waistline,
                            })(
                                <Input addonAfter="cm" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    <FormItem label="臀围">
                        {
                            getFieldDecorator('hipline', {
                                initialValue: hipline,
                            })(
                                <Input addonAfter="cm" disabled={disabled} />
                            )
                        }
                    </FormItem>
                </Form>
                {
                    !disabled ? <div className="btn-wrap">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const ThisForm = Form.create()(Module4);

export default ThisForm