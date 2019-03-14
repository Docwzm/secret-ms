/**
 * 入口学资料
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

class Module2 extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            data.birthday = new Date(data.birthday).getTime()
            this.props.onSubmit(data)
        });
    }

    render() {
        let {
            sex,
            age,
            minority,
            birthday,
            job,
            educationDegree,
            incomeLevel,
            phoneLink,
            addressLink
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="title">入口学资料</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="性别">
                            {
                                getFieldDecorator('sex', {
                                    initialValue: sex,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="年龄">
                            {
                                getFieldDecorator('age', {
                                    initialValue: age,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="民族">
                            {
                                getFieldDecorator('minority', {
                                    initialValue: minority,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={1}>汉族</Radio>
                                        <Radio value={2}>其他</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="出生日期">
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment(birthday),
                                    rules: [{ required: "true" }]
                                })(
                                    <DatePicker disabled={disabled} />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="职业">
                            {
                                getFieldDecorator('job', {
                                    initialValue: job,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} placeholder="Basic usage" />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="文化程度">
                            {
                                getFieldDecorator('educationDegree', {
                                    initialValue: educationDegree,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={1}>大学或以上</Radio>
                                        <Radio value={2}>大专</Radio>
                                        <Radio value={3}>高中及中专</Radio>
                                        <Radio value={4}>初中及以下</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="收入情况">
                            {
                                getFieldDecorator('incomeLevel', {
                                    initialValue: incomeLevel,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={1}>&lt;5000元/月</Radio>
                                        <Radio value={2}>5000-10000元/月</Radio>
                                        <Radio value={3}>10000元以上</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="联系电话">
                            {
                                getFieldDecorator('phoneLink', {
                                    initialValue: phoneLink,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled}></Input>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址">
                            {
                                getFieldDecorator('addressLink', {
                                    initialValue: addressLink,
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled}></Input>
                                )
                            }
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

const ThisForm = Form.create()(Module2);

export default ThisForm