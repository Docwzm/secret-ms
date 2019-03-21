/**
 * 并发症评估
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { getFilterProper } from './tool';
const FormItem = Form.Item;

class Module4 extends Component {
    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            values.cerebrovascularDuration = values.cerebrovascularDurationYear + '-' + values.cerebrovascularDurationMonth
            values.vascularReconstructionDate = values.vascularReconstructionDateYear + '-' + values.vascularReconstructionDateMonth
            values.atheroscleroticHeartDuration = values.atheroscleroticHeartDurationYear + '-' + values.atheroscleroticHeartDurationMonth
            delete values.atheroscleroticHeartDurationYear;
            delete values.atheroscleroticHeartDurationMonth
            delete values.vascularReconstructionDateYear
            delete values.vascularReconstructionDateMonth
            delete values.cerebrovascularDurationYear
            delete values.cerebrovascularDurationMonth
            this.props.onSubmit(values)
        });
    }
    render() {
        let {
            diabeticComplicationFlag,
            diabeticComplicationExplain,
            diabeticRetinopathyFlag,
            diabeticRetinopathyStage,
            diabeticNephropathyFlag,
            diabeticNephropathyStage,
            diabeticNeuropathyFlag,
            diabeticNeuropathyType,
            diabeticMacroangiopathyFlag,
            atheroscleroticHeartFlag,
            atheroscleroticHeartDuration,
            vascularReconstructionFlag,
            vascularReconstructionDate,
            cerebrovascularFlag,
            cerebrovascularDuration,
            diabeticMacroangiopathyOtherFlag,
            diabeticMacroangiopathyOtherExplain
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div>
                <div className="title">并发症评估</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="糖尿病慢性微血管并发症">
                            {
                                getFieldDecorator('diabeticComplicationFlag', {
                                    initialValue: diabeticComplicationFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('diabeticComplicationFlag') ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('diabeticComplicationExplain', {
                                                initialValue: diabeticComplicationExplain,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="请注明：" disabled={disabled} className="cover-middle-input" />
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病视网膜病变">
                            {
                                getFieldDecorator('diabeticRetinopathyFlag', {
                                    initialValue: diabeticRetinopathyFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('diabeticRetinopathyFlag') ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('diabeticRetinopathyStage', {
                                                initialValue: diabeticRetinopathyStage,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="分期：" disabled={disabled} className="cover-middle-input" />
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病肾病">
                            {
                                getFieldDecorator('diabeticNephropathyFlag', {
                                    initialValue: diabeticNephropathyFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('diabeticNephropathyFlag') ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('diabeticNephropathyStage', {
                                                initialValue: diabeticNephropathyStage,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="分期：" disabled={disabled} className="cover-middle-input" />
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病神经病变">
                            {
                                getFieldDecorator('diabeticNeuropathyFlag', {
                                    initialValue: diabeticNeuropathyFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('diabeticNeuropathyFlag') ?
                                    <FormItem>
                                        如有：
                                        {
                                            getFieldDecorator('diabeticNeuropathyType', {
                                                initialValue: diabeticNeuropathyType,
                                                rules: [{ required: "true" }]
                                            })(
                                                
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value="周围神经病变">周围神经病变</Radio>
                                                        <Radio value="植物神经病变">植物神经病变</Radio>
                                                    </Radio.Group>
                                                
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病大血管病变">
                            {
                                getFieldDecorator('diabeticMacroangiopathyFlag', {
                                    initialValue: diabeticMacroangiopathyFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="冠状动脉粥样硬化性心脏病史">
                            {
                                getFieldDecorator('atheroscleroticHeartFlag', {
                                    initialValue: atheroscleroticHeartFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('atheroscleroticHeartFlag') ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('atheroscleroticHeartDurationYear', {
                                                initialValue: getFilterProper(atheroscleroticHeartDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="如有,已诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('atheroscleroticHeartDurationMonth', {
                                                initialValue: getFilterProper(atheroscleroticHeartDuration, 1),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="行PCI或血管重建术">
                            {
                                getFieldDecorator('vascularReconstructionFlag', {
                                    initialValue: vascularReconstructionFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>否</Radio>
                                        <Radio value={true}>是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('vascularReconstructionFlag') ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('vascularReconstructionDateYear', {
                                                initialValue: getFilterProper(vascularReconstructionDate, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="日期" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {

                                            getFieldDecorator('vascularReconstructionDateMonth', {
                                                initialValue: getFilterProper(vascularReconstructionDate, 1),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="脑血管意外病史">
                            {
                                getFieldDecorator('cerebrovascularFlag', {
                                    initialValue: cerebrovascularFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('cerebrovascularFlag') ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('cerebrovascularDurationYear', {
                                                initialValue: getFilterProper(cerebrovascularDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="如有,已诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {

                                            getFieldDecorator('cerebrovascularDurationMonth', {
                                                initialValue: getFilterProper(cerebrovascularDuration, 1),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="其他大血管病变病史">
                            {
                                getFieldDecorator('diabeticMacroangiopathyOtherFlag', {
                                    initialValue: diabeticMacroangiopathyOtherFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        {
                            getFieldValue('diabeticMacroangiopathyOtherFlag') ?
                                <FormItem>
                                    {
                                        getFieldDecorator('diabeticMacroangiopathyOtherExplain', {
                                            initialValue: diabeticMacroangiopathyOtherExplain,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input addonBefore="如有，请详述" disabled={disabled} className="cover-middle-input" />
                                        )
                                    }
                                </FormItem> : null
                        }
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