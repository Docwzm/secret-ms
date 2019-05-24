/**
 * 其他信息记录-2(课题三)
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import { validDoubleNumber } from '../../utils/formValidate'
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
            if (values.expectedFollowDate) {
                values.expectedFollowDate = values.expectedFollowDate.format('YYYY-MM-DD')
            } else {
                delete values.expectedFollowDate
            }
            this.props.onSubmit(values)
        });
    }

    getDisabledDate(date) {
        if (date.valueOf() - new Date().getTime() > 0) {
            return false;
        } else {
            return true;
        }
    }



    render() {
        let {
            relieveFlag,
            medicineMelbineDosage,
            other,
            medicineGlargineDosage,
            followResearchFlag,
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
            <div>
                <div className="title">其他信息记录-2</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="是否发放药品">
                        {
                            getFieldDecorator('relieveFlag', {
                                initialValue: relieveFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            (getFieldValue('relieveFlag') != undefined && !getFieldValue('relieveFlag')) ? <div>
                                <FormItem
                                    label="二甲双胍剂量"
                                >
                                    {getFieldDecorator('medicineMelbineDosage', {
                                        initialValue: medicineMelbineDosage,
                                        rules: [{
                                            validator: validDoubleNumber
                                        }]
                                    })(
                                        <Input addonAfter="g/d" />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="维格列汀量"
                                >
                                    {getFieldDecorator('medicineMelbineDosage', {
                                        initialValue: medicineMelbineDosage,
                                        rules: [{
                                            validator: validDoubleNumber
                                        }]
                                    })(
                                        <Input addonAfter="mg/bid" />
                                    )}
                                </FormItem>
                            </div> : null
                        }
                    </FormItem>


                    <FormItem label="是否加第三种OAD">
                        {
                            getFieldDecorator('relieveFlag', {
                                initialValue: relieveFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            (getFieldValue('relieveFlag') != undefined && !getFieldValue('relieveFlag')) ? <div>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineGlargineDosage', {
                                            initialValue: medicineGlargineDosage
                                        })(
                                            <Input addonBefore="如果是，请填写通用名：" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineGlargineDosage', {
                                            initialValue: medicineGlargineDosage
                                        })(
                                            <Input addonBefore="剂量" addonAfter="g/d" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                            </div> : null
                        }
                    </FormItem>


                    <FormItem label="是否需要加用胰岛素治疗">
                        {
                            getFieldDecorator('relieveFlag', {
                                initialValue: relieveFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            (getFieldValue('relieveFlag') != undefined && !getFieldValue('relieveFlag')) ? <div>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineGlargineDosage', {
                                            initialValue: medicineGlargineDosage
                                        })(
                                            <Input addonBefore="如果是，请填写通用名：" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineGlargineDosage', {
                                            initialValue: medicineGlargineDosage
                                        })(
                                            <Input addonBefore="剂量" addonAfter="U/d" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                            </div> : null
                        }
                    </FormItem>

                    <FormItem
                        label="预计下次访视时间"
                    >
                        {getFieldDecorator('expectedFollowDate', {
                            initialValue: expectedFollowDate ? moment(expectedFollowDate) : '',
                        })(
                            <DatePicker disabledDate={this.getDisabledDate.bind(this)} />
                        )}
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button id="form-submit-btn" disabled={this.props.disabled} type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
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
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module11);

export default ThisForm