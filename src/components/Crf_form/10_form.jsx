/**
 * 颈部大血管多普勒
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
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div>
                <div className="title">颈部大血管多普勒</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="颈部大血管多普勒">
                            {
                                getFieldDecorator('key1', {
                                    rules: [{ required: "true" }]
                                })(
                                    <span>颈动脉内膜中层厚度<Input disabled={disabled} className="small-input" />mm</span>
                                )
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="其他异常">
                            <div>
                                <FormItem label="动脉斑块">
                                    {
                                        getFieldDecorator('key2', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group disabled={disabled}>
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
                                        getFieldDecorator('key3', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group disabled={disabled}>
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
                                        getFieldDecorator('key4', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group disabled={disabled}>
                                                <Radio value="1">无</Radio>
                                                <Radio value="2">有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                    {
                                        getFieldValue('key4') == 2 ?
                                            <FormItem>
                                                {
                                                    getFieldDecorator('key10', {
                                                        rules: [{ required: "true" }]
                                                    })(
                                                        <span><Input disabled={disabled} className="small-input" />%</span>
                                                    )
                                                }
                                            </FormItem> : null
                                    }
                                </FormItem>
                            </div>
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