/**
 * 入口学资料
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import './form.scss'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Module2 extends Component {

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
                <div>入口学资料</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="糖尿病确诊日期">
                        {
                            getFieldDecorator('key1', {
                                rules: [{ required: "true" }]
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem label="糖尿病相关症状">
                        {
                            getFieldDecorator('key2', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group onChange={(event) => this.showNext(event, 'keyShow')}>
                                    <Radio value="1">无</Radio>
                                    <Radio value="2">有</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    {
                        this.state.keyShow ? <FormItem label="持续时间">
                            {
                                getFieldDecorator('key3', {
                                    rules: [{ required: "true" }]
                                })(
                                    <DatePicker />
                                )
                            }
                        </FormItem> : null
                    }
                    <FormItem label="主要症状">
                        {
                            getFieldDecorator('key4', {
                                initialValue: ['a', 'b'],
                                rules: [{ required: "true" }]
                            })(
                                <CheckboxGroup options={[
                                    { label: '口干', value: 'a' },
                                    { label: '多饮', value: 'b' },
                                    { label: '多尿', value: 'c' },
                                    { label: '消瘦', value: 'd' },
                                    { label: '其他', value: 'e' },
                                ]} />
                            )
                        }
                    </FormItem>
                    <FormItem label="糖尿病家族史">
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
                    <FormItem label="嗜酒">
                        {
                            getFieldDecorator('key6', {
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group onChange={(event) => this.showNext(event, 'drinkShow')}>
                                    <Radio value="1">否</Radio>
                                    <Radio value="2">是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            this.state.drinkShow ? <span>
                                {
                                    getFieldDecorator('keymm', {
                                        initialValue: 'a',
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>请提供<Input className="small-input"></Input>年</span>
                                    )
                                }
                                {
                                    getFieldDecorator('keym', {
                                        initialValue: 'a',
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>平均<Input className="small-input"></Input>两/天</span>
                                    )
                                }
                                <div>
                                    <FormItem label="种类">
                                        {
                                            getFieldDecorator('keyma', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <CheckboxGroup options={[
                                                    { label: '白酒', value: 'a' },
                                                    { label: '红酒', value: 'b' },
                                                    { label: '啤酒', value: 'c' },
                                                    { label: '其他', value: 'e' },
                                                ]} />
                                            )
                                        }
                                    </FormItem>
                                </div>
                                <FormItem label="戒酒">
                                    {
                                        getFieldDecorator('key111', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <Radio.Group onChange={(event) => this.showNext(event, 'showDrink')}>
                                                <Radio value="1">否</Radio>
                                                <Radio value="2">是</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                    {
                                        this.state.showDrink ? getFieldDecorator('key6', {
                                            rules: [{ required: "true" }]
                                        })(
                                            <span>已戒<Input className="small-input" />年</span>
                                        ) : null
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    {
                        this.state.drinkShow ? <div>
                            {/* <FormItem label="请提供"> */}
                            {

                            }
                            {/* </FormItem> */}
                            {/* <FormItem label="平居">
                                {
                                    getFieldDecorator('key7', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input></Input>
                                    )
                                }
                            </FormItem>
                            <FormItem label="请提供">
                                {
                                    getFieldDecorator('key7', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input></Input>
                                    )
                                }
                            </FormItem>
                            <FormItem label="请提供">
                                {
                                    getFieldDecorator('key7', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input></Input>
                                    )
                                }
                            </FormItem>
                            <FormItem label="请提供">
                                {
                                    getFieldDecorator('key7', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input></Input>
                                    )
                                }
                            </FormItem> */}
                        </div> : null
                    }
                    <FormItem label="收入情况">
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
                    <FormItem label="联系电话">
                        {
                            getFieldDecorator('key8', {
                                initialValue: 'a',
                                rules: [{ required: "true" }]
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址">
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

}

const ThisForm = Form.create()(Module2);

export default ThisForm