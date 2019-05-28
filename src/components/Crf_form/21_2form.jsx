/**
 * 其他信息记录-2(课题三)
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker } from 'antd';
import moment from 'moment';
import { validDoubleNumber } from '../../utils/formValidate'
import PicturesWall from '../crfFormUpload'
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
            medicineGrantFlag,
            medicineMelbineDosage,
            medicineVildagliptinDosage,
            medicineOadFlag,
            medicineOadName,
            medicineOadDosage,
            medicineInsulinFlag,
            medicineInsulinName,
            medicineInsulinDosage,
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
                sm: { span: 15 },
            },
        };
        return (
            <div>
                <div className="title">其他信息记录-2</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
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
                            (getFieldValue('medicineGrantFlag') != undefined && !getFieldValue('medicineGrantFlag')) ? <div>
                                <FormItem
                                    label="二甲双胍剂量"
                                    {...formItemLayout2}
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
                                    {...formItemLayout2}
                                >
                                    {getFieldDecorator('medicineVildagliptinDosage', {
                                        initialValue: medicineVildagliptinDosage,
                                        rules: [{
                                            validator: validDoubleNumber
                                        }]
                                    })(
                                        <Input addonAfter="mg/bid" />
                                    )}
                                </FormItem>
                                <FormItem label="是否加第三种OAD" {...formItemLayout2}>
                                    {
                                        getFieldDecorator('medicineOadFlag', {
                                            initialValue: medicineOadFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>否</Radio>
                                                <Radio value={true}>是</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                    {
                                        (getFieldValue('medicineOadFlag') != undefined && !getFieldValue('medicineOadFlag')) ? <div>
                                            <FormItem className="inline-item">
                                                {
                                                    getFieldDecorator('medicineOadName', {
                                                        initialValue: medicineOadName
                                                    })(
                                                        <Input addonBefore="如果是，请填写通用名：" className="cover-input" />
                                                    )
                                                }
                                            </FormItem>
                                            <FormItem className="inline-item">
                                                {
                                                    getFieldDecorator('medicineOadDosage', {
                                                        initialValue: medicineOadDosage
                                                    })(
                                                        <Input addonBefore="剂量" addonAfter="g/d" className="cover-input" />
                                                    )
                                                }
                                            </FormItem>
                                        </div> : null
                                    }
                                </FormItem>
                            </div> : null
                        }
                    </FormItem>

                    <FormItem label="是否需要加用胰岛素治疗">
                        {
                            getFieldDecorator('medicineInsulinFlag', {
                                initialValue: medicineInsulinFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            (getFieldValue('medicineInsulinFlag') != undefined && !getFieldValue('medicineInsulinFlag')) ? <div>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineInsulinName', {
                                            initialValue: medicineInsulinName
                                        })(
                                            <Input addonBefore="如果是，请填写通用名：" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('medicineInsulinDosage', {
                                            initialValue: medicineInsulinDosage
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

                    <FormItem label="相关资料">
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
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