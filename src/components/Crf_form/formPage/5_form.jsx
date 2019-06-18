/**
 * 生命体征
 */
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import { validDoubleNumber,validIntNumber } from '../../../utils/formValidate'
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
            systolicPressure,
            diastolicPressure,
            heartRate,
            weight,
            height,
            bmi,
            waistline,
            hipline,
            fileList
        } = this.props.formData;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <div>
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="血压（坐位）">
                        <FormItem className="inline-item">
                            {
                                getFieldDecorator('systolicPressure', {
                                    initialValue: systolicPressure,
                                    rules:[{
                                        validator:validDoubleNumber
                                    }]
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
                                    rules:[{
                                        validator:validDoubleNumber
                                    }]
                                })(
                                    <Input addonAfter="mmHg" className="cover-input"/>
                                )
                            }
                        </FormItem>
                    </FormItem>
                    <FormItem label="脉搏（坐位）">
                        {
                            getFieldDecorator('heartRate', {
                                initialValue: heartRate,
                                rules:[{
                                    validator:validIntNumber
                                }]
                            })(
                                <Input addonAfter="次/分" />
                            )
                        }
                    </FormItem>
                    <FormItem label="体重">
                        {
                            getFieldDecorator('weight', {
                                initialValue: weight,
                                rules:[{
                                    validator:validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="kg" />
                            )
                        }
                    </FormItem>
                    <FormItem label="身高">
                        {
                            getFieldDecorator('height', {
                                initialValue: height,
                                rules:[{
                                    validator:validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="cm" />
                            )
                        }
                    </FormItem>
                    <FormItem label="BMI">
                        {
                            getFieldDecorator('bmi', {
                                initialValue: bmi,
                                rules:[{
                                    validator:validDoubleNumber
                                }]
                            })(
                                <Input addonAfter={<span>kg/m<sup>2</sup></span>} />
                            )
                        }
                    </FormItem>
                    <FormItem label="腰围">
                        {
                            getFieldDecorator('waistline', {
                                initialValue: waistline,
                                rules:[{
                                    validator:validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="cm" />
                            )
                        }
                    </FormItem>
                    <FormItem label="臀围">
                        {
                            getFieldDecorator('hipline', {
                                initialValue: hipline,
                                rules:[{
                                    validator:validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="cm" />
                            )
                        }
                    </FormItem>
                    {/* <FormItem label="相关资料" {...formItemLayout2}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
                    </FormItem> */}
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button id="form-submit-btn" type="primary" disabled={this.props.disabled} onClick={this.handleSubmit.bind(this)}>保存</Button>
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
})(Module);

export default ThisForm