/**
 * 心电图
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
        let disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div>
                <div className="title">心电图</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem>
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
                            getFieldValue('key1') == 2 ? <FormItem>
                                {
                                    getFieldDecorator('key3', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <span><Input disabled={disabled} className="middle-input" /></span>
                                    )
                                }
                            </FormItem> : null
                        }

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