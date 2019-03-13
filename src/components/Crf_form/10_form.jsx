/**
 * 颈部大血管多普勒
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
                <div>颈部大血管多普勒</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="颈部大血管多普勒">
                            {
                                getFieldDecorator('key6', {
                                    rules: [{ required: "true" }]
                                })(
                                    <span>颈动脉内膜中层厚度<Input className="small-input" />mm</span>
                                )
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="其他异常">
                            <div>
                                <FormItem label="动脉斑块">
                                    {
                                        getFieldDecorator('key7', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group>
                                                <Radio value="1">无</Radio>
                                                <Radio value="2">有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                            </div>
                            <div>
                                <FormItem label="动脉硬化">
                                    {
                                        getFieldDecorator('key8', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group>
                                                <Radio value="1">无</Radio>
                                                <Radio value="2">有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                            </div>
                            <div>
                                <FormItem label="动脉狭窄">
                                    {
                                        getFieldDecorator('key9', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group onChange={event => this.showNext(event, 'keyshow')}>
                                                <Radio value="1">无</Radio>
                                                <Radio value="2">有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                    {
                                        this.state.keyshow?getFieldDecorator('key10', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <span><Input className="small-input"/>%</span>
                                        ):null
                                    }
                                </FormItem>
                            </div>
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