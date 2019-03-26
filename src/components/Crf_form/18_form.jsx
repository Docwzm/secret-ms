/**
 * 眼科检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import PickForm from './index'
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
            values.expectedFollowDate = values.expectedFollowDate.valueOf()
            this.props.onSubmit(values)
        });
    }

    getDisabledDate(date) {
        if(date.valueOf()-new Date().getTime()>0){
            return false;
        }else{
            return true;
        }
    }

    render() {
        let disabled = this.props.disabled;
        let {
            medicineGrantFlag,
            medicineGlargineDosage,
            medicineMelbineDosage,
            expectedFollowDate
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
                <div style={styles.title}>其他信息记录-1</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="是否发放药品">
                        {
                            getFieldDecorator('medicineGrantFlag', {
                                initialValue: medicineGrantFlag,
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('medicineGrantFlag') ? <span>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineGlargineDosage', {
                                            initialValue: medicineGlargineDosage,
                                        })(
                                            <Input disabled={disabled} addonBefore="甘精胰岛素剂量" addonAfter="U/d" style={styles.input} />

                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineMelbineDosage', {
                                            initialValue: medicineMelbineDosage,
                                        })(
                                            <Input disabled={disabled} addonBefore="二甲双胍剂量" addonAfter="g/d" style={styles.input} />

                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>

                    <FormItem
                        label="预计下次访视时间"
                    >
                        {getFieldDecorator('expectedFollowDate', {
                            initialValue: moment(expectedFollowDate),
                        })(
                            <DatePicker disabledDate={this.getDisabledDate.bind(this)} disabled={disabled} />
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
    },
    datePicker: {
        margin: "10px 0"
    },
}

const ThisForm = Form.create()(Module11);

export default ThisForm