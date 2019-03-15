/**
 * 其他体格检查
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
                <div className="title">其他体格检查</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="其他体格检查">
                            {
                                getFieldDecorator('key1', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="1">正常</Radio>
                                        <Radio value="2">异常</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        {
                            getFieldValue('key1') == 2 ?
                                <FormItem>
                                    {
                                        getFieldDecorator('key2', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input addonBefore="请简单记录：" disabled={disabled} className="cover-middle-input" />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </div>
                    <div>
                        <FormItem label="足底10g尼龙丝检查">
                            <div>
                                <FormItem>
                                    {
                                        getFieldDecorator('key3', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <span>
                                                右侧：
                                            <Radio.Group disabled={disabled}>
                                                    <Radio value="1">阴性</Radio>
                                                    <Radio value="2">阳性</Radio>
                                                </Radio.Group>
                                            </span>
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldValue('key3') == 2 ?
                                            getFieldDecorator('key4', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="点不能触知" disabled={disabled} className="cover-input" />
                                            ) : null
                                    }
                                </FormItem>
                            </div>
                            <div>
                                <FormItem>
                                    {
                                        getFieldDecorator('key5', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <span>
                                                左侧：
                                            <Radio.Group disabled={disabled}>
                                                    <Radio value="1">阴性</Radio>
                                                    <Radio value="2">阳性</Radio>
                                                </Radio.Group>
                                            </span>
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldValue('key5') == 2 ?
                                            getFieldDecorator('key6', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="点不能触知" disabled={disabled} className="cover-input" />
                                            ) : null
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