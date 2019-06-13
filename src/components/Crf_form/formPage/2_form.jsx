/**
 * 入口学资料
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Select } from 'antd';
import { validChinese, validIntNumber } from '../../../utils/formValidate'
import PicturesWall from '../crfFormUpload'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class Module extends Component {
    constructor(){
        super()
        this.state = {
            fileList:[]
        }
    }

    handleSubmit(e) {
        e && e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            data.birthday = data.birthday ? new Date(data.birthday).getTime() : ''
            this.props.onSubmit(data)
        });
    }

    changeBirthDay = (date, dateStr) => {
        let age = new Date().getFullYear() - date.year();
        this.props.changeData({
            age
        })
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
            addressLink,
            fileList
        } = this.props.formData;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 4 },
                md: { span: 3 },
                lg: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 20 },
                md: { span: 16 },
                lg: { span: 14 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 4 },
                md: { span: 3 },
                lg: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 20 },
                md: { span: 16 },
                lg: { span: 12 },
            },
        };

        const jobType = ['国家公务员', '专业技术人员', '职员', '企业管理人员', '工人', '农民', '学生', '现役军人', '自由职业者', '个体经营者', '无业人员', '退（离）休人员', '其他']

        return (
            <div>
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} >
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
                    <FormItem label="出生日期">
                        {
                            getFieldDecorator('birthday', {
                                initialValue: birthday ? moment(birthday) : '',
                            })(
                                <DatePicker onChange={this.changeBirthDay} />
                            )
                        }
                    </FormItem>
                    <FormItem label="年龄">
                        {
                            getFieldDecorator('age', {
                                initialValue: age,
                                rules: [{
                                    validator: validIntNumber
                                }]
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
                    <FormItem label="职业">
                        {
                            getFieldDecorator('job', {
                                initialValue: job,
                                rules: [{
                                    validator: validChinese
                                }]
                            })(
                                <Select>
                                    {
                                        jobType.map((item,index) => {
                                            return <Option key={index} value={item}>{item}</Option>
                                        })
                                    }
                                </Select>
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
                                rules: [{
                                    validator: validIntNumber
                                }]
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
                    {/* <FormItem label="相关资料" {...formItemLayout2}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
                    </FormItem> */}
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button id="form-submit-btn" type="primary" disabled={this.props.disabled} onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div >
        )
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm