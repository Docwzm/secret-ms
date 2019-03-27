/**
 * 生命指征
 */
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'
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
                                    // rules:[{
                                    //     validator:validDoubleNumber
                                    // }]
                                })(
                                    <Input className="small-input" />
                                )
                            }
                        </FormItem>
                        <span>/</span>
                        <FormItem className="inline-item">
                            {
                                getFieldDecorator('diastolicPressure', {
                                    initialValue: diastolicPressure,
                                    // rules:[{
                                    //     validator:validDoubleNumber
                                    // }]
                                })(
                                    <Input addonAfter="mmHg" className="cover-input" />
                                )
                            }
                        </FormItem>
                    </FormItem>
                    <FormItem label="脉搏（坐位）">
                        {
                            getFieldDecorator('heartRate', {
                                initialValue: heartRate,
                            })(
                                <Input addonAfter="次/分" />
                            )
                        }
                    </FormItem>
                    <FormItem label="体重">
                        {
                            getFieldDecorator('weight', {
                                initialValue: weight,
                            })(
                                <Input addonAfter="kg" />
                            )
                        }
                    </FormItem>
                    <FormItem label="身高">
                        {
                            getFieldDecorator('height', {
                                initialValue: height,
                            })(
                                <Input addonAfter="cm" />
                            )
                        }
                    </FormItem>
                    <FormItem label="BMI">
                        {
                            getFieldDecorator('bmi', {
                                initialValue: bmi,
                            })(
                                <Input addonAfter="kg/m2" />
                            )
                        }
                    </FormItem>
                    <FormItem label="腰围">
                        {
                            getFieldDecorator('waistline', {
                                initialValue: waistline,
                            })(
                                <Input addonAfter="cm" />
                            )
                        }
                    </FormItem>
                    <FormItem label="臀围">
                        {
                            getFieldDecorator('hipline', {
                                initialValue: hipline,
                            })(
                                <Input addonAfter="cm" />
                            )
                        }
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
})(Module4);

export default ThisForm