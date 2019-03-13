/**
 * 心电图
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
                <div>心电图</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem>
                            {
                                getFieldDecorator('key7', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group onChange={(event) => this.showNext(event, 'show111')}>
                                        <Radio value="1">正常</Radio>
                                        <Radio value="2">异常</Radio>
                                    </Radio.Group>
                                )
                            }

                        </FormItem>

                        {
                            this.state.show111 ? <FormItem>
                                {
                                    getFieldDecorator('key3', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <span><Input className="middle-input" /></span>
                                    )
                                }
                            </FormItem> : null
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