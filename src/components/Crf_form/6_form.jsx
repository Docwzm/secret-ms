/**
 * 其他体格检查
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
        let {
            physicalOtherFlag,
            physicalOtherExplain,
            pelma10NylonWireLeftFlag,
            pelma10NylonWireLeftNum,
            pelma10NylonWireRightFlag,
            pelma10NylonWireRightNum
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <div className="title">其他体格检查</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="其他体格检查">
                        {
                            getFieldDecorator('physicalOtherFlag', {
                                initialValue: physicalOtherFlag,
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value={false}>正常</Radio>
                                    <Radio value={true}>异常</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('physicalOtherFlag') ?
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('physicalOtherExplain', {
                                            initialValue: physicalOtherExplain,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input addonBefore="请简单记录：" disabled={disabled} />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="足底10g尼龙丝检查">
                        <FormItem>
                            <span>右侧：</span>
                            {
                                getFieldDecorator('pelma10NylonWireLeftFlag', {
                                    initialValue: pelma10NylonWireLeftFlag,
                                    rules: [{ required: "true" }]
                                })(

                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>阴性</Radio>
                                        <Radio value={true}>阳性</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('pelma10NylonWireLeftFlag') ? <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('pelma10NylonWireLeftNum', {
                                            initialValue: pelma10NylonWireLeftNum,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input addonAfter="点不能触知" disabled={disabled} className="cover-input" />
                                        )
                                    }
                                </FormItem> : null
                            }
                        </FormItem>

                        <FormItem>
                            <span>左侧：</span>
                            {
                                getFieldDecorator('pelma10NylonWireRightFlag', {
                                    initialValue: pelma10NylonWireRightFlag,
                                    rules: [{ required: "true" }]
                                })(

                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>阴性</Radio>
                                        <Radio value={true}>阳性</Radio>
                                    </Radio.Group>

                                )
                            }

                            {
                                getFieldValue('pelma10NylonWireRightFlag') ? <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('pelma10NylonWireRightNum', {
                                            initialValue: pelma10NylonWireRightNum,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input addonAfter="点不能触知" disabled={disabled} className="cover-input" />
                                        )
                                    }
                                </FormItem> : null
                            }

                        </FormItem>

                    </FormItem>
                </Form>
                {
                    !disabled ? <div className="btn-wrap">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const ThisForm = Form.create()(Module4);

export default ThisForm