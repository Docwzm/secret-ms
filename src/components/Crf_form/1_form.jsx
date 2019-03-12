/**
 * 入口学资料
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import { formItemLayoutComponent, tailFormItemLayoutComponent } from '../../utils/formItemLayout'
import './form.scss'
const FormItem = Form.Item;
const InputGroup = Input.Group;

class Module1 extends Component {

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

    handleCancel() {
        console.log('cancel')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={styles.wrap}>
                <div style={styles.title}>入口学资料</div>
                <Form layout="inline" style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem style={styles.formItem} label="性别">
                        {
                            getFieldDecorator('key1', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group>
                                    <Radio value="a">男</Radio>
                                    <Radio value="b">女</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="年龄">
                        {
                            getFieldDecorator('key2', {
                                rules: [{ required: "true" }]
                            })(
                                <Input />
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="民族">
                        {
                            getFieldDecorator('key3', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group>
                                    <Radio value="a">汉族</Radio>
                                    <Radio value="b">其他</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="出生日期">
                        {
                            getFieldDecorator('key4', {
                                rules: [{ required: "true" }]
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="职业">
                        {
                            getFieldDecorator('key5', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input placeholder="Basic usage" />
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="文化程度">
                        {
                            getFieldDecorator('key6', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group>
                                    <Radio value="a">大学或以上</Radio>
                                    <Radio value="b">大专</Radio>
                                    <Radio value="c">高中及中专</Radio>
                                    <Radio value="d">初中及以下</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="收入情况">
                        {
                            getFieldDecorator('key7', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group>
                                    <Radio value="a">&lt;5000元/月</Radio>
                                    <Radio value="b">5000-10000元/月</Radio>
                                    <Radio value="c">10000元以上</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="联系电话">
                        {
                            getFieldDecorator('key8', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                    <FormItem style={styles.formItem} label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址">
                        {
                            getFieldDecorator('key9', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                    <div>
                        <FormItem>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}

const styles = {
    wrap: {
        marginTop: "50px"
    },
    title: {
        fontSize: "18px",
        borderLeft: "4px solid #1890ff",
        paddingLeft: "10px"
    },
    form: {
        // width: "50%",
        width: '80%',
        marginTop: "30px"
    },
    formLine: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '80%'
    },
    formItem: {
        margin: '0 20px 20px'
        // display: 'flex',
    }
}

const ThisForm = Form.create()(Module1);

export default ThisForm