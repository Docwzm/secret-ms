/**
 * 眼科检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Row, Col, Input, DatePicker, InputNumber, Checkbox } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;


class SaeForm extends Component {
    state = {

    }

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

    handleAddColumn() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //比较特殊的表单布局
        const formItemLayoutComponent = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        }
        const tailFormItemLayoutComponent = {
            wrapperCol: {
                xs: {
                    span: 44,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        }

        return (
            <div style={styles.wrap}>
                <div>
                    <FormItem
                        label="报告时间"
                    >
                        {getFieldDecorator('key', {
                            rules: [{ required: "true" }]
                        })(
                            <DatePicker />
                        )}

                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="姓名"
                    >
                        {getFieldDecorator('key', {
                            rules: [{ required: "true" }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="性别"
                    >
                        {getFieldDecorator('key', {
                            rules: [{ required: "true" }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="年龄"
                    >
                        {getFieldDecorator('key', {
                            rules: [{ required: "true" }]
                        })(
                            <InputNumber />
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE的名称及诊断"
                    >
                        {getFieldDecorator('key', {
                            rules: [{ required: "true" }]
                        })(
                            <Input />
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE的情况"
                    >
                        {getFieldDecorator('key1', {
                            rules: [{ required: "true" }]
                        })(
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row>
                                    <Col span={8}><Checkbox value="A">死亡</Checkbox></Col>
                                    <Col span={8}><Checkbox value="B">导致住院</Checkbox></Col>
                                    <Col span={8}><Checkbox value="C">延长住院时间</Checkbox></Col>
                                    <Col span={8}><Checkbox value="D">伤残</Checkbox></Col>
                                    <Col span={8}><Checkbox value="E">功能障碍</Checkbox></Col>
                                    <Col span={8}><Checkbox value="F">危及生命</Checkbox></Col>
                                    <Col span={8}><Checkbox value="G">其他</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="发生时间"
                    >
                        <DatePicker />
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="研究者获知SAE时间"
                    >
                        <DatePicker />
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="对研究采取的措施"
                    >
                        {getFieldDecorator('key1', {
                            rules: [{ required: "true" }]
                        })(
                            <Checkbox.Group>
                                <Row>
                                    <Col span={8}><Checkbox value="A">继续研究</Checkbox></Col>
                                    <Col span={8}><Checkbox value="B">减小剂量</Checkbox></Col>
                                    <Col span={8}><Checkbox value="C">药物暂停后恢复</Checkbox></Col>
                                    <Col span={8}><Checkbox value="D">停用药物</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE的转归"
                    >
                        {getFieldDecorator('key1', {
                            rules: [{ required: "true" }]
                        })(
                            <Checkbox.Group>
                                <Row>
                                    <Col span={8}><Checkbox value="A">完全恢复</Checkbox></Col>
                                    <Col span={8}><Checkbox value="B">好转伴后遗症</Checkbox></Col>
                                    <Col span={8}><Checkbox value="C">死亡</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE与研究药物的关系"
                    >
                        {getFieldDecorator('key1', {
                            rules: [{ required: "true" }]
                        })(
                            <Checkbox.Group>
                                <Row>
                                    <Col span={8}><Checkbox value="A">肯定有关</Checkbox></Col>
                                    <Col span={8}><Checkbox value="B">可能有关</Checkbox></Col>
                                    <Col span={8}><Checkbox value="C">可能无关</Checkbox></Col>
                                    <Col span={8}><Checkbox value="D">肯定无关</Checkbox></Col>
                                    <Col span={8}><Checkbox value="F">无法判定</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE发生及处理的详细情况"
                    >
                        <Input.TextArea></Input.TextArea>
                    </FormItem>
                </div>
            </div>
        )
    }
}

const styles = {
    wrap: {
        padding:'10px 30px',
        border: '1px solid #ccc'
    }
}

export default SaeForm