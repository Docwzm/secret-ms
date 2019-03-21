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
        return (
            <div>
                <div className="title">生命指征</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="血压（坐位）">
                            <FormItem>
                                {
                                    getFieldDecorator('systolicPressure', {
                                        initialValue: systolicPressure,
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input disabled={disabled} className="small-input" />
                                    )
                                }
                            </FormItem>
                            <span>/</span>
                            <FormItem>
                                {
                                    getFieldDecorator('diastolicPressure', {
                                        initialValue: diastolicPressure,
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input addonAfter="mmHg" disabled={disabled} className="cover-input" />
                                    )
                                }
                            </FormItem>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="脉搏（坐位）">
                            {
                                getFieldDecorator('heartRate', {
                                    initialValue: heartRate,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input addonAfter="次/分" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="体重">
                            {
                                getFieldDecorator('weight', {
                                    initialValue: weight,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input addonAfter="kg" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="身高">
                            {
                                getFieldDecorator('height', {
                                    initialValue: height,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input addonAfter="cm" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="BMI">
                            {
                                getFieldDecorator('bmi', {
                                    initialValue: bmi,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input addonAfter="kg/m2" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="腰围">
                            {
                                getFieldDecorator('waistline', {
                                    initialValue: waistline,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input addonAfter="cm" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="臀围">
                            {
                                getFieldDecorator('hipline', {
                                    initialValue: hipline,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input addonAfter="cm" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    {
                        !disabled ? <div className="btn-wrap">
                            <FormItem>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button onClick={this.props.onCancel}>取消</Button>
                            </FormItem>
                        </div> : null
                    }
                </Form>
            </div>
        )
    }
}

const ThisForm = Form.create()(Module4);

export default ThisForm