/**
 * 颈部大血管多普勒
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
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
            cervicalThickness,
            arterialPlaqueFlag,
            arteriosclerosisFlag,
            arterialStenosisFlag,
            arterialStenosisPercent
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div>
                <div className="title">颈部大血管多普勒</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="颈部大血管多普勒">
                        {
                            getFieldDecorator('cervicalThickness', {
                                initialValue: cervicalThickness,
                                rules: [{ required: "true", message: '请输入颈动脉内膜中层厚度' }],
                            })(
                                <Input addonBefore="颈动脉内膜中层厚度" addonAfter="mm" disabled={disabled} />
                            )
                        }
                    </FormItem>
                    <FormItem label="其他异常">
                        <FormItem label="动脉斑块" {...formItemLayout}>
                            {
                                getFieldDecorator('arterialPlaqueFlag', {
                                    initialValue: arterialPlaqueFlag,
                                    rules: [{ required: "true", message: '请选择动脉斑块' }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label="动脉硬化" {...formItemLayout}>
                            {
                                getFieldDecorator('arteriosclerosisFlag', {
                                    initialValue: arteriosclerosisFlag,
                                    rules: [{ required: "true", message: '请选择动脉硬化' }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label="动脉狭窄" {...formItemLayout}>
                            {
                                getFieldDecorator('arterialStenosisFlag', {
                                    initialValue: arterialStenosisFlag,
                                    rules: [{ required: "true", message: '请选择动脉狭窄' }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('arterialStenosisFlag') ?
                                    <FormItem className="inline-item">
                                        {
                                            getFieldDecorator('arterialStenosisPercent', {
                                                initialValue: arterialStenosisPercent,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="%" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
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