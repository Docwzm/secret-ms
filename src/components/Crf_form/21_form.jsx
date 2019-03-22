/**
 * 眼科检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

class Module11 extends Component {
    state = {

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

    handleAddColumn() {

    }

    render() {
        let {
            relieveFlag,
            medicineMelbineDosage,
            other,
            expectedFollowDate
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        //比较特殊的表单布局
        const formItemLayoutComponent = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        }

        return (
            <div style={styles.wrap}>
                <div style={styles.title}>其他信息记录-2</div>
                <Form layout="inline" style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="是否仍处于缓解">
                            {
                                getFieldDecorator('relieveFlag', {
                                    initialValue: relieveFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={true}>是</Radio>
                                        <Radio value={false}>否</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        {
                            !getFieldValue('relieveFlag') ? <span>
                                <span>用药方案为，</span>
                                <FormItem
                                    label="二甲双胍剂量"
                                >
                                    {getFieldDecorator('medicineMelbineDosage', {
                                        initialValue: medicineMelbineDosage,
                                        rules: [{ required: "true" }]
                                    })(
                                        <Input disabled={disabled} style={styles.formInput} />
                                    )}
                                </FormItem>
                            </span> : null
                        }
                    </div>

                    <div>
                        <FormItem
                            label="其他"
                        >
                            {getFieldDecorator('other', {
                                initialValue: other,
                                rules: [{ required: "true" }]
                            })(
                                <Input disabled={disabled} className="big-input" />
                            )}
                        </FormItem>
                    </div>

                    <div>
                        <FormItem
                            label="预计下次访视时间"
                        >
                            {getFieldDecorator('expectedFollowDate', {
                                initialValue: moment(expectedFollowDate),
                                rules: [{ required: "true" }]
                            })(
                                <DatePicker disabled={disabled} />
                            )}
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

const styles = {
    wrap: {
        marginTop: "50px",
    },
    title: {
        fontSize: "18px",
        borderLeft: "4px solid #1890ff",
        paddingLeft: "10px"
    },
}

const ThisForm = Form.create()(Module11);

export default ThisForm