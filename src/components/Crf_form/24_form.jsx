/**
 * 辅助检查
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
            this.props.onSubmit(values)
        });
    }
    render() {
        let {
            ecgFlag,
            ecgExplain,
            cervicalThickness,
            arterialPlaqueFlag,
            arteriosclerosisFlag,
            arterialStenosisFlag,
            arterialStenosisPercent,
            lowerArteryFlag,
            cervicalThickness,
            arterialPlaqueFlag,
            arteriosclerosisFlag,
            arterialStenosisFlag,
        } = this.props.formData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <div className="title">辅助检查</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="心电图">
                        {
                            getFieldDecorator('ecgFlag', {
                                initialValue: ecgFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>正常</Radio>
                                    <Radio value={true}>异常</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('ecgFlag') ? <FormItem className="inline-item">
                                {
                                    getFieldDecorator('ecgExplain', {
                                        initialValue: ecgExplain,
                                    })(
                                        <Input className="middle-input" />
                                    )
                                }
                            </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="颈部大血管多普勒">
                        {
                            getFieldDecorator('cervicalThickness', {
                                initialValue: cervicalThickness,
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input addonBefore="颈动脉内膜中层厚度" addonAfter="mm" />
                            )
                        }
                    </FormItem>
                    <FormItem label="其他异常">
                        <FormItem label="动脉斑块" {...formItemLayout}>
                            {
                                getFieldDecorator('arterialPlaqueFlag', {
                                    initialValue: arterialPlaqueFlag,
                                })(
                                    <Radio.Group>
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
                                })(
                                    <Radio.Group>
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
                                })(
                                    <Radio.Group>
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
                                                rules: [{
                                                    validator: validDoubleNumber
                                                }]
                                            })(
                                                <Input addonAfter="%" className="cover-input" />
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
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
})(Module4);

export default ThisForm