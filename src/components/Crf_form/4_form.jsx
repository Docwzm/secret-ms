/**
 * 并发症评估
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { getFilterProper } from '../../utils/crfForm';
import { validIntNumber } from '../../utils/formValidate'
const FormItem = Form.Item; class Module4 extends Component {
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
                <div className="title">并发症评估</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="糖尿病慢性微血管并发症">
                        {
                            getFieldDecorator('diabeticComplicationFlag', {
                                initialValue: diabeticComplicationFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('diabeticComplicationFlag') ?
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('diabeticComplicationExplain', {
                                            initialValue: diabeticComplicationExplain,
                                        })(
                                            <Input addonBefore="请注明：" className="cover-middle-input" />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="糖尿病视网膜病变">
                        {
                            getFieldDecorator('diabeticRetinopathyFlag', {
                                initialValue: diabeticRetinopathyFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('diabeticRetinopathyFlag') ?
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('diabeticRetinopathyStage', {
                                            initialValue: diabeticRetinopathyStage,
                                        })(
                                            <Input addonBefore="分期：" className="cover-middle-input" />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="糖尿病肾病">
                        {
                            getFieldDecorator('diabeticNephropathyFlag', {
                                initialValue: diabeticNephropathyFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('diabeticNephropathyFlag') ?
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('diabeticNephropathyStage', {
                                            initialValue: diabeticNephropathyStage,
                                        })(
                                            <Input addonBefore="分期：" className="cover-middle-input" />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="糖尿病神经病变">
                        {
                            getFieldDecorator('diabeticNeuropathyFlag', {
                                initialValue: diabeticNeuropathyFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('diabeticNeuropathyFlag') ?
                                <FormItem className="inline-item">
                                    如有：
                                        {
                                        getFieldDecorator('diabeticNeuropathyType', {
                                            initialValue: diabeticNeuropathyType,
                                        })(<Radio.Group>
                                            <Radio value="周围神经病变">周围神经病变</Radio>
                                            <Radio value="植物神经病变">植物神经病变</Radio>
                                        </Radio.Group>)
                                    }
                                </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="糖尿病大血管病变">
                        {
                            getFieldDecorator('diabeticMacroangiopathyFlag', {
                                initialValue: diabeticMacroangiopathyFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="冠状动脉粥样硬化性心脏病史">
                        {
                            getFieldDecorator('atheroscleroticHeartFlag', {
                                initialValue: atheroscleroticHeartFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('atheroscleroticHeartFlag') ? <span>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('atheroscleroticHeartDurationYear', {
                                            initialValue: atheroscleroticHeartDuration ? getFilterProper(atheroscleroticHeartDuration, 0) : '',
                                            rules:[{
                                                validator:validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="如有,已诊断" addonAfter="年" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('atheroscleroticHeartDurationMonth', {
                                            initialValue: atheroscleroticHeartDuration ? getFilterProper(atheroscleroticHeartDuration, 1) : '',
                                            rules:[{
                                                validator:validIntNumber
                                            }]
                                        })(
                                            <Input addonAfter="月" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    <FormItem label="行PCI或血管重建术">
                        {
                            getFieldDecorator('vascularReconstructionFlag', {
                                initialValue: vascularReconstructionFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('vascularReconstructionFlag') ? <span>
                                <FormItem className="inline-item">
                                    {getFieldDecorator('vascularReconstructionDateYear', {
                                        initialValue: vascularReconstructionDate ? getFilterProper(vascularReconstructionDate, 0) : '',
                                        rules:[{
                                            validator:validIntNumber
                                        }]
                                    })(
                                        <Input addonBefore="日期" addonAfter="年" className="cover-input" />
                                    )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {getFieldDecorator('vascularReconstructionDateMonth', {
                                        initialValue: vascularReconstructionDate ? getFilterProper(vascularReconstructionDate, 1) : '',
                                        rules:[{
                                            validator:validIntNumber
                                        }]
                                    })(
                                        <Input addonAfter="月" className="cover-input" />
                                    )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    <FormItem label="脑血管意外病史">
                        {
                            getFieldDecorator('cerebrovascularFlag', {
                                initialValue: cerebrovascularFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('cerebrovascularFlag') ? <span>
                                <FormItem className="inline-item">
                                    {getFieldDecorator('cerebrovascularDurationYear', {
                                        initialValue: cerebrovascularDuration ? getFilterProper(cerebrovascularDuration, 0) : '',
                                        rules:[{
                                            validator:validIntNumber
                                        }]
                                    })(
                                        <Input addonBefore="如有,已诊断" addonAfter="年" className="cover-input" />
                                    )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {getFieldDecorator('cerebrovascularDurationMonth', {
                                        initialValue: cerebrovascularDuration ? getFilterProper(cerebrovascularDuration, 1) : '',
                                        rules:[{
                                            validator:validIntNumber
                                        }]
                                    })(
                                        <Input addonAfter="月" className="cover-input" />
                                    )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    <FormItem label="其他大血管病变病史">
                        {
                            getFieldDecorator('diabeticMacroangiopathyOtherFlag', {
                                initialValue: diabeticMacroangiopathyOtherFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('diabeticMacroangiopathyOtherFlag') ?
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('diabeticMacroangiopathyOtherExplain', {
                                            initialValue: diabeticMacroangiopathyOtherExplain,
                                        })(
                                            <Input addonBefore="如有，请详述" className="cover-middle-input" />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </FormItem>
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
})(Module4); 

export default ThisForm