/**
 * 腹部彩超
 */
import React, { Component } from 'react';
import { Form, Button, Radio } from 'antd';
import { formItemLayoutComponent, tailFormItemLayoutComponent } from '../../utils/formItemLayout'

const FormItem = Form.Item;

class Module11 extends Component {

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
        let { fattyLiverFlag, fattyLiverOtherFlag } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div style={styles.wrap}>
                <div style={styles.title}>腹部彩超</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="脂肪肝"
                    >
                        {getFieldDecorator('fattyLiverFlag', {
                            initialValue: fattyLiverFlag,
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}

                    </FormItem>
                    <FormItem
                        label="其他异常"
                    >
                        {getFieldDecorator('fattyLiverOtherFlag', {
                            initialValue: fattyLiverOtherFlag,
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
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

const styles = {
    wrap: {
        marginTop: "50px"
    },
    title: {
        fontSize: "18px",
        borderLeft: "4px solid #1890ff",
        paddingLeft: "10px"
    },
    form: {
        width: "50%",
        marginTop: "30px"
    },
    input: {
        width: "250px",
        marginRight: "10px"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm