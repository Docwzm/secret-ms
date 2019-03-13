/**
 * 生命指征
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import './form.scss'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Module4 extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
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

    handleCancel() {
        console.log('cancel')
    }

    showNext(data, attr) {
        console.log(data)
        if (data.target.value == 2) {
            this.setState({
                [attr]: true
            })
        } else {
            this.setState({
                [attr]: false
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div>生命指征</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="血压（坐位）">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input className="small-input" />
                                )
                            }
                            <span>/</span>
                            {
                                getFieldDecorator('key2', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Input className="small-input" />
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
                                    <Input className="small-input" />
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
                                    <Input className="small-input" />
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
                                    <Input className="small-input" />
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
                                    <Input className="small-input" />
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
                                    <Input className="small-input" />
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
                                    <Input className="small-input" />
                                )
                            }
                            <span>cm</span>
                        </FormItem>
                    </div>

                    <div>
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

const styles = {

}

const ThisForm = Form.create()(Module4);

export default ThisForm