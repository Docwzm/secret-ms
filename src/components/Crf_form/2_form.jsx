/**
 * 入口学资料
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
const FormItem = Form.Item;

class Module2 extends Component {
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="title">入口学资料</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="性别">
                        {
                            getFieldDecorator('key1', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value="a">男</Radio>
                                    <Radio value="b">女</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄">
                        {
                            getFieldDecorator('key2', {
                                rules: [{ required: "true" }]
                            })(
                                <Input disabled={disabled}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="民族">
                        {
                            getFieldDecorator('key3', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value="a">汉族</Radio>
                                    <Radio value="b">其他</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="出生日期">
                        {
                            getFieldDecorator('key4', {
                                rules: [{ required: "true" }]
                            })(
                                <DatePicker disabled={disabled}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="职业">
                        {
                            getFieldDecorator('key5', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input disabled={disabled} placeholder="Basic usage" />
                            )
                        }
                    </FormItem>
                    <FormItem label="文化程度">
                        {
                            getFieldDecorator('key6', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value="a">大学或以上</Radio>
                                    <Radio value="b">大专</Radio>
                                    <Radio value="c">高中及中专</Radio>
                                    <Radio value="d">初中及以下</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="收入情况">
                        {
                            getFieldDecorator('key7', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value="a">&lt;5000元/月</Radio>
                                    <Radio value="b">5000-10000元/月</Radio>
                                    <Radio value="c">10000元以上</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="联系电话">
                        {
                            getFieldDecorator('key8', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址">
                        {
                            getFieldDecorator('key9', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <div className="btn-wrap">
                        <FormItem>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button onClick={this.props.onCancel}>取消</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}

const ThisForm = Form.create()(Module2);

export default ThisForm