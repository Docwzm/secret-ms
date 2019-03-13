/**
 * 并发症评估
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
        const { getFieldDecorator,getFieldValue } = this.props.form;
        return (
            <div>
                <div className="title">并发症评估</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="糖尿病慢性微血管并发症">
                            {
                                getFieldDecorator('key1', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow1')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow1 ?
                                    getFieldDecorator('key2', {
                                        initialValue: 'a',
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>请注明：<Input className="middle-input"></Input></span>
                                    ) : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病视网膜病变">
                            {
                                getFieldDecorator('key2', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow1')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow1 ?
                                    getFieldDecorator('key3', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>分期：<Input className="middle-input" /></span>
                                    ) : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病肾病">
                            {
                                getFieldDecorator('key2', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow2')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow2 ?
                                    getFieldDecorator('key3', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>分期：<Input className="middle-input" /></span>
                                    ) : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病神经病变">
                            {
                                getFieldDecorator('key3', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow3')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow3 ?
                                    getFieldDecorator('key3', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>如有：
                                            <Radio.Group>
                                                <Radio value="1">周围神经病变</Radio>
                                                <Radio value="2">植物神经病变</Radio>
                                            </Radio.Group>
                                        </span>
                                    ) : null
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="糖尿病大血管病变">
                            {
                                getFieldDecorator('key5', {
                                    initialValue: 'a',
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
                        <FormItem label="冠状动脉粥样硬化性心脏病史">
                            {
                                getFieldDecorator('key112', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow4')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow4 ? <span>
                                    {

                                        getFieldDecorator('key5', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <span>如有,已诊断<Input className="small-input" />年</span>
                                        )
                                    }
                                    {

                                        getFieldDecorator('key5', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <span><Input className="small-input" />月</span>
                                        )
                                    }
                                </span> : null
                            }
                        </FormItem>
                    </div>


                    <div>
                        <FormItem label="行PCI或血管重建术">
                            {
                                getFieldDecorator('key112', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow5')}>
                                        <Radio value="1">否</Radio>
                                        <Radio value="2">是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow5 ? <span>
                                    {

                                        getFieldDecorator('key5', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <span>日期<Input className="small-input" />年</span>
                                        )
                                    }
                                    {

                                        getFieldDecorator('key5', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <span><Input className="small-input" />月</span>
                                        )
                                    }
                                </span> : null
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="脑血管意外病史">
                            {
                                getFieldDecorator('key1122', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'keyShow7')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                this.state.keyShow7 ? <span>
                                    {

                                        getFieldDecorator('key5', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <span>如有,已诊断<Input className="small-input" />年</span>
                                        )
                                    }
                                    {

                                        getFieldDecorator('key5', {
                                            initialValue: 'a',
                                            rules: [{ required: "true" }]
                                        })(
                                            <span><Input className="small-input" />月</span>
                                        )
                                    }
                                </span> : null
                            }
                        </FormItem>
                    </div>


                    <div>
                        <FormItem label="其他大血管病变病史">
                            {
                                getFieldDecorator('key7', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'show111')}>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }

                        </FormItem>
                        {
                            this.state.show111 ?
                                getFieldDecorator('key8', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <div>如有，请详述<Input className="big-input" /></div>
                                ) : null
                        }
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