/**
 * 低血糖事件
 */
import React, { Component } from 'react';
import { Form, Select, Input, DatePicker, Checkbox } from 'antd';
import { validChinese, validIntNumber } from '../../utils/formValidate'
import moment from 'moment';
import { getLocal } from '../../utils/index'
const Option = Select.Option;
const FormItem = Form.Item;

class SaeForm extends Component {
    state = {
    }

    render() {
        let userName = getLocal('user') ? JSON.parse(getLocal('user')).realName : '';
        let disabled = this.props.type == 'check' ? true : false;
        let formData = this.props.data ? this.props.data : {}
        let {
            doctorName,
            reportDate,
            initials,
            gender,
            age,
            saeName,
            situationFlag,
            situationDeathDate,
            situationOther,
            happenDate,
            learnDate,
            measureFlag,
            lapseFlag,
            researchMedicineRelation,
            deathHandleDetail
        } = formData
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <div style={styles.wrap}>

                <FormItem>
                    <div className="my-form-item inline-item">
                        <span className="label">报告时间：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('reportDate', {
                                initialValue: reportDate ? moment(reportDate) : '',
                                rules: [{
                                    message: '请输入报告时间',
                                    required: true,
                                }]
                            })(
                                <DatePicker disabled={disabled} />
                            )}
                        </FormItem>
                    </div>
                    <div className="my-form-item inline-item">
                        <span className="label">报告人：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('doctorName', {
                                initialValue: doctorName ? doctorName : userName,
                                rules: [{
                                    message: '请输入报告人',
                                    required: true,
                                }]
                            })(
                                <Input disabled={disabled} />
                            )}
                        </FormItem>
                    </div>
                </FormItem>

                <FormItem label="" {...formItemLayout}>
                    <div className="my-form-item inline-item">
                        <span className="label">姓名：</span>
                        <FormItem className="inline-item" >
                            {getFieldDecorator('initials', {
                                initialValue: initials ? initials : this.props.patientInfo.realName,
                                rules: [{
                                    message: '请输入姓名',
                                    required: true,
                                }, {
                                    validator: validChinese
                                }]
                            })(
                                <Input className="middle-input" disabled={disabled} />
                            )}
                        </FormItem>
                    </div>

                    <div className="my-form-item inline-item">
                        <span className="label">性别：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('gender', {
                                initialValue: gender,
                                rules: [{
                                    message: '请输入性别',
                                    required: true,
                                }]
                            })(
                                <Select className="middle-input" disabled={disabled}>
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>

                    <div className="my-form-item inline-item">
                        <span className="label">年龄：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('age', {
                                initialValue: age,
                                rules: [{
                                    message: '请输入年龄',
                                    required: true,
                                }, {
                                    validator: validIntNumber
                                }]
                            })(
                                <Input className="middle-input" disabled={disabled}></Input>
                            )}
                        </FormItem>
                    </div>
                </FormItem>

                <FormItem
                    label="SAE的名称及诊断"
                    {...formItemLayout}
                >
                    {getFieldDecorator('saeName', {
                        initialValue: saeName,
                        rules: [{
                            message: '请输入SAE的名称及诊断',
                            required: true,
                        }]
                    })(
                        <Input disabled={disabled} />
                    )}
                </FormItem>
                <FormItem
                    label="SAE的情况"
                    {...formItemLayout}
                >
                    {getFieldDecorator('situationFlag', {
                        initialValue: situationFlag,
                        rules: [{
                            message: '请选择SAE的情况',
                            required: true,
                        }]
                    })(
                        <Checkbox.Group className="inline-item" disabled={disabled}>
                            <Checkbox value="死亡">死亡</Checkbox>
                            {/* {
                                getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('死亡') >= 0 ? <FormItem style={{'margin':'0 10px 0 0'}} className="inline-item">
                                    {getFieldDecorator('situationDeathDate', {
                                        initialValue: situationDeathDate?moment(situationDeathDate):'',
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem> : null
                            } */}
                            <Checkbox value="导致住院">导致住院</Checkbox>
                            <Checkbox value="延长住院时间">延长住院时间</Checkbox>
                            <Checkbox value="伤残">伤残</Checkbox>
                            <Checkbox value="功能障碍">功能障碍</Checkbox>
                            <Checkbox value="危及生命">危及生命</Checkbox>
                            <Checkbox style={{ marginTop: '10px' }} value="其他">其他</Checkbox>
                            {
                                getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('其他') >= 0 ? <FormItem style={{ 'margin': '0 10px 0 0' }} className="inline-item">
                                    {getFieldDecorator('situationOther', {
                                        initialValue: situationOther,
                                    })(
                                        <Input disabled={disabled} />
                                    )}
                                </FormItem> : null
                            }
                        </Checkbox.Group>
                    )}

                    {
                        getFieldValue('situationFlag') && getFieldValue('situationFlag').length != 0 ? <div>
                            <FormItem
                                label="发生时间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('happenDate', {
                                    initialValue: happenDate ? moment(happenDate) : '',
                                    rules: [{
                                        message: '请输入发生时间',
                                        required: true,
                                    }]
                                })(
                                    <DatePicker disabled={disabled} />
                                )}
                            </FormItem>
                            <FormItem
                                label="研究者获知SAE时间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('learnDate', {
                                    initialValue: learnDate ? moment(learnDate) : '',
                                    rules: [{
                                        message: '请输入研究者获知SAE时间',
                                        required: true,
                                    }]
                                })(
                                    <DatePicker disabled={disabled} />
                                )}
                            </FormItem>
                            <FormItem
                                label="对研究采取的措施"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('measureFlag', {
                                    initialValue: measureFlag ? measureFlag.split('、') : [],
                                    rules: [{
                                        message: '请选择对研究采取的措施',
                                        required: true,
                                    }]
                                })(
                                    <Checkbox.Group disabled={disabled}>
                                        <Checkbox value="继续研究">继续研究</Checkbox>
                                        <Checkbox value="减小剂量">减小剂量</Checkbox>
                                        <Checkbox value="药物暂停后恢复">药物暂停后恢复</Checkbox>
                                        <Checkbox value="停用药物">停用药物</Checkbox>
                                    </Checkbox.Group>
                                )}
                            </FormItem>
                        </div> : null
                    }
                </FormItem>
                <FormItem
                    label="SAE的转归"
                    {...formItemLayout}
                >
                    {getFieldDecorator('lapseFlag', {
                        initialValue: lapseFlag ? lapseFlag.split('、') : [],
                        rules: [{
                            message: '请选择SAE的转归',
                            required: true,
                        }]
                    })(
                        <Checkbox.Group disabled={disabled}>
                            <Checkbox value="完全恢复">完全恢复</Checkbox>
                            <Checkbox value="好转伴后遗症">好转伴后遗症</Checkbox>
                            <Checkbox value="死亡">死亡</Checkbox>
                        </Checkbox.Group>
                    )}
                </FormItem>
                <FormItem
                    label="SAE与研究药物的关系"
                    {...formItemLayout}
                >
                    {getFieldDecorator('researchMedicineRelation', {
                        initialValue: researchMedicineRelation ? researchMedicineRelation.split('、') : [],
                        rules: [{
                            message: '请选择SAE与研究药物的关系',
                            required: true,
                        }]
                    })(
                        <Checkbox.Group disabled={disabled}>
                            <Checkbox value="肯定有关">肯定有关</Checkbox>
                            <Checkbox value="可能有关">可能有关</Checkbox>
                            <Checkbox value="可能无关">可能无关</Checkbox>
                            <Checkbox value="肯定无关">肯定无关</Checkbox>
                            <Checkbox value="无法判定">无法判定</Checkbox>
                        </Checkbox.Group>
                    )}
                </FormItem>
                <FormItem
                    label="SAE发生及处理的详细情况"
                    {...formItemLayout}
                >
                    {getFieldDecorator('deathHandleDetail', {
                        initialValue: deathHandleDetail,
                        rules: [{
                            message: '请输入SAE发生及处理的详细情况',
                            required: true,
                        }]
                    })(
                        <Input.TextArea disabled={disabled}></Input.TextArea>
                    )}

                </FormItem>
            </div>
        )
    }
}

const styles = {
    wrap: {
        // padding: '10px',
        // border: '1px solid #ccc'
    },
    inline: {
        display: 'inline-block'
    }
}

export default SaeForm