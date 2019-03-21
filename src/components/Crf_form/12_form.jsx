/**
 * 眼科检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
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
        let {
            ophthalmologyFlag,
            diabeticRetinopathyFlag,
            diabeticRetinopathyOd,
            diabeticRetinopathyOs,
            macularOedemaFlag,
            macularOedemaOd,
            macularOedemaOs,
        } = this.props.formData;
        const { disabled } = this.props
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div style={styles.wrap}>
                <div style={styles.title}>眼科检查</div>
                <Form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="眼科检查"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('ophthalmologyFlag', {
                            initialValue: ophthalmologyFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>正常</Radio>
                                <Radio value={true}>异常</Radio>
                            </Radio.Group>
                        )}

                    </FormItem>
                    <FormItem
                        label="糖尿病视网膜病变"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('diabeticRetinopathyFlag', {
                            initialValue: diabeticRetinopathyFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                        {
                            getFieldValue('diabeticRetinopathyFlag') ? <span>
                                <span>为，</span>
                                <FormItem>
                                    {
                                        getFieldDecorator('diabeticRetinopathyOd', {
                                            initialValue: diabeticRetinopathyOd,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input disabled={disabled} addonAfter="期od" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('diabeticRetinopathyOs', {
                                            initialValue: diabeticRetinopathyOs,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input disabled={disabled} addonAfter="期os" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    <FormItem
                        label="黄斑水肿"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('macularOedemaFlag', {
                            initialValue: macularOedemaFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                        {
                            getFieldValue('macularOedemaFlag') ? <span>
                                <span>为，</span>
                                <FormItem>
                                    {
                                        getFieldDecorator('macularOedemaOd', {
                                            initialValue: macularOedemaOd,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input disabled={disabled} addonAfter="期od" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                                <FormItem>
                                    {
                                        getFieldDecorator('macularOedemaOs', {
                                            initialValue: macularOedemaOs,
                                            rules: [{ required: "true" }]
                                        })(
                                            <Input disabled={disabled} addonAfter="期os" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>

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
        width: "150px",
        marginRight: "10px"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm