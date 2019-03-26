/**
 * 入口学资料
 */
import React, { Component } from 'react';
import { formItemLayoutComponent, tailFormItemLayoutComponent } from '../../utils/formItemLayout'
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

class Module2 extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            data.birthday = data.birthday?new Date(data.birthday).getTime():''
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
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <div className="title">入口学资料</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} >
                    <FormItem label="性别">
                        {
                            getFieldDecorator('sex', {
                                initialValue: sex,
                            })(
                                <Radio.Group>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄">
                        {
                            getFieldDecorator('age', {
                                initialValue: age,
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem label="民族">
                        {
                            getFieldDecorator('minority', {
                                initialValue: minority,
                            })(
                                <Radio.Group>
                                    <Radio value={1}>汉族</Radio>
                                    <Radio value={2}>其他</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="出生日期">
                        {
                            getFieldDecorator('birthday', {
                                initialValue: moment(birthday),
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem label="职业">
                        {
                            getFieldDecorator('job', {
                                initialValue: job,
                            })(
                                <Input placeholder="Basic usage" />
                            )
                        }
                    </FormItem>
                    <FormItem label="文化程度">
                        {
                            getFieldDecorator('educationDegree', {
                                initialValue: educationDegree,
                            })(
                                <Radio.Group>
                                    <Radio value={1}>大学或以上</Radio>
                                    <Radio value={2}>大专</Radio>
                                    <Radio value={3}>高中及中专</Radio>
                                    <Radio value={4}>初中及以下</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="收入情况">
                        {
                            getFieldDecorator('incomeLevel', {
                                initialValue: incomeLevel,
                            })(
                                <Radio.Group>
                                    <Radio value={1}>&lt;5000元/月</Radio>
                                    <Radio value={2}>5000-10000元/月</Radio>
                                    <Radio value={3}>10000元以上</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="联系电话">
                        {
                            getFieldDecorator('phoneLink', {
                                initialValue: phoneLink,
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址">
                        {
                            getFieldDecorator('addressLink', {
                                initialValue: addressLink,
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div >
        )
    }
}

const ThisForm = Form.create({
    onValuesChange:(props, changedValues, allValues) => {
        if(!props.canSave){
            props.setCanSave(true)
        }
    }
})(Module2);

export default ThisForm