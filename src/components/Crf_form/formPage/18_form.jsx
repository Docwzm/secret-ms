/**
 * 其他信息记录-1
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import { validDoubleNumber } from '../../../utils/formValidate'
import moment from 'moment';
import PicturesWall from '../crfFormUpload'
const FormItem = Form.Item;

class Module extends Component {
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
            medicineGrantFlag,
            medicineGlargineDosage,
            medicineMelbineDosage,
            expectedFollowDate,
            fileList
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return (
            <div>
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="是否发放药品">
                        {
                            getFieldDecorator('medicineGrantFlag', {
                                initialValue: medicineGrantFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }

                        {
                            getFieldValue('medicineGrantFlag') ? <FormItem className="inline-item">
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineGlargineDosage', {
                                            initialValue: medicineGlargineDosage,
                                            rules: [{
                                                validator: validDoubleNumber
                                            }]
                                        })(
                                            <Input className="cover-input" addonBefore="甘精胰岛素剂量" addonAfter="U/d" />

                                        )
                                    }
                                </FormItem>
                                <div>
                                    <FormItem className="inline-item">
                                        {
                                            getFieldDecorator('medicineMelbineDosage', {
                                                initialValue: medicineMelbineDosage,
                                                rules: [{
                                                    validator: validDoubleNumber
                                                }]
                                            })(
                                                <Input className="cover-input" addonBefore="二甲双胍剂量" addonAfter="g/d" />

                                            )
                                        }
                                    </FormItem>
                                </div>
                            </FormItem> : null
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

                    {/* <FormItem label="相关资料" {...formItemLayout2}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData} />
                            )
                        }
                    </FormItem> */}
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

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm