/**
 * 生命指征
 */
import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="title">生命指征</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="血压（坐位）">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>/</span>
                            {
                                getFieldDecorator('key2', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>mmHg</span>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="脉搏（坐位）">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>次/分</span>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="体重">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>kg</span>
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="身高">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>cm</span>
                        </FormItem>
                        <FormItem label="BMI">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>kg/m2</span>
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="腰围">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>cm</span>
                        </FormItem>
                        <FormItem label="臀围">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input disabled={disabled} className="small-input" />
                                )
                            }
                            <span>cm</span>
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