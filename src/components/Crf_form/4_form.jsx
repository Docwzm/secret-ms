/**
 * 并发症评估
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
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div>
                <div className="title">并发症评估</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="糖尿病慢性微血管并发症">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key1') == 2 ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('key2', {
                                                initialValue: 'a',
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
                                getFieldDecorator('key3', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key3') == 2 ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('key4', {
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
                                getFieldDecorator('key5', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key5') == 2 ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('key6', {
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
                                getFieldDecorator('key7', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key7') == 2 ?
                                    <FormItem>
                                        {
                                            getFieldDecorator('key8', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>如有：
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value="1">周围神经病变</Radio>
                                                        <Radio value="2">植物神经病变</Radio>
                                                    </Radio.Group>
                                                </span>
                                            )
                                        }
                                    </FormItem> : null
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="糖尿病大血管病变">
                            {
                                getFieldDecorator('key9', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="冠状动脉粥样硬化性心脏病史">
                            {
                                getFieldDecorator('key10', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key10') == 2 ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key11', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="如有,已诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key12', {
                                                initialValue: 'a',
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
                                getFieldDecorator('key13', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">否</Radio>
                                        <Radio value="2">是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key13') == 2 ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('key14', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="日期" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {

                                            getFieldDecorator('key15', {
                                                initialValue: 'a',
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
                                getFieldDecorator('key16', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key16') == 2 ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('key17', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="如有,已诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {

                                            getFieldDecorator('key18', {
                                                initialValue: 'a',
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
                                getFieldDecorator('key19', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        {
                            getFieldValue('key19') == 2 ?
                                <FormItem>
                                    {
                                        getFieldDecorator('key20', {
                                            initialValue: 'a',
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