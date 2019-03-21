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
        return (
            <div>
                <div className="title">颈部大血管多普勒</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="颈部大血管多普勒">
                            {
                                getFieldDecorator('cervicalThickness', {
                                    initialValue: cervicalThickness,
                                    rules: [{ required: "true", message: '请输入颈动脉内膜中层厚度' }],
                                })(
                                    <Input addonBefore="颈动脉内膜中层厚度" addonAfter="mm" disabled={disabled} className="cover-input" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="其他异常">
                            <div>
                                <FormItem label="动脉斑块">
                                    {
                                        getFieldDecorator('arterialPlaqueFlag', {
                                            initialValue:arterialPlaqueFlag,
                                            rules: [{ required: "true", message: '请选择动脉斑块' }]
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
                                <FormItem label="动脉硬化">
                                    {
                                        getFieldDecorator('arteriosclerosisFlag', {
                                            initialValue:arteriosclerosisFlag,
                                            rules: [{ required: "true", message: '请选择动脉硬化' }]
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
                                <FormItem label="动脉狭窄">
                                    {
                                        getFieldDecorator('arterialStenosisFlag', {
                                            initialValue:arterialStenosisFlag,
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
                                            <FormItem>
                                                {
                                                    getFieldDecorator('arterialStenosisPercent', {
                                                        initialValue:arterialStenosisPercent,
                                                        rules: [{ required: "true" }]
                                                    })(
                                                        <Input addonAfter="%" disabled={disabled} className="cover-input" />
                                                    )
                                                }
                                            </FormItem> : null
                                    }
                                </FormItem>
                            </div>
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