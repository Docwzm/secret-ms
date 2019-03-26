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
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div style={styles.wrap}>
                <div style={styles.title}>眼科检查</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="眼科检查"
                    >
                        {getFieldDecorator('ophthalmologyFlag', {
                            initialValue: ophthalmologyFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>正常</Radio>
                                <Radio value={true}>异常</Radio>
                            </Radio.Group>
                        )}

                    </FormItem>
                    <FormItem
                        label="糖尿病视网膜病变"
                    >
                        {getFieldDecorator('diabeticRetinopathyFlag', {
                            initialValue: diabeticRetinopathyFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                        {
                            getFieldValue('diabeticRetinopathyFlag') ? <span>
                                <span>为，</span>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('diabeticRetinopathyOd', {
                                            initialValue: diabeticRetinopathyOd,
                                        })(
                                            <Input addonAfter="期od" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('diabeticRetinopathyOs', {
                                            initialValue: diabeticRetinopathyOs,
                                        })(
                                            <Input addonAfter="期os" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    <FormItem
                        label="黄斑水肿"
                    >
                        {getFieldDecorator('macularOedemaFlag', {
                            initialValue: macularOedemaFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                        {
                            getFieldValue('macularOedemaFlag') ? <span>
                                <span>为，</span>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('macularOedemaOd', {
                                            initialValue: macularOedemaOd,
                                        })(
                                            <Input addonAfter="期od" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('macularOedemaOs', {
                                            initialValue: macularOedemaOs,
                                        })(
                                            <Input addonAfter="期os" style={styles.input} />
                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
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
        width: "150px",
        marginRight: "10px"
    }
}

const ThisForm = Form.create({
    onValuesChange:(props, changedValues, allValues) => {
        if(!props.canSave){
            props.setCanSave(true)
        }
    }
})(Module11);

export default ThisForm