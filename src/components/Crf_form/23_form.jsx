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


    render() {
        let {
            relieveFlag,
            medicineMelbineDosage,
            other,
            followExtensionFlag
        } = this.props.formData;
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
            <div style={styles.wrap}>
                <div style={styles.title}>其他信息记录-3</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="是否仍处于缓解">
                        {
                            getFieldDecorator('relieveFlag', {
                                initialValue: relieveFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            !getFieldValue('relieveFlag') ? <span>
                                <span>用药方案为，二甲双胍剂量</span>
                                <FormItem
                                    className="inline-item"
                                >
                                    {getFieldDecorator('medicineMelbineDosage', {
                                        initialValue: medicineMelbineDosage,
                                    })(
                                        <Input style={styles.formInput} />
                                    )}
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>

                    <FormItem
                        label="是否完成延展随访"
                    >
                        {getFieldDecorator('followExtensionFlag', {
                            initialValue: followExtensionFlag,
                        })(
                            <Radio.Group>
                                <Radio value={true}>是</Radio>
                                <Radio value={false}>否</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="其他"
                    >
                        {getFieldDecorator('other', {
                            initialValue: other,
                        })(
                            <Input className="big-input" />
                        )}
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
        marginTop: "50px",
    },
    title: {
        fontSize: "18px",
        borderLeft: "4px solid #1890ff",
        paddingLeft: "10px"
    },
}

const ThisForm = Form.create({
    onValuesChange:(props, changedValues, allValues) => {
        if(!props.canSave){
            props.setCanSave(true)
        }
    }
})(Module11);

export default ThisForm