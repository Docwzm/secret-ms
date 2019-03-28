/**
 * 低血糖事件
 */
import React, { Component } from 'react';
import { Form, Select, Radio, Button, Row, Col, Input, DatePicker, InputNumber, Checkbox } from 'antd';
import { validChinese,validIntNumber } from '../../utils/formValidate'
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;


class SaeForm extends Component {
    state = {

    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            this.props.onSubmit(values)
        });
    }

    render() {
        let formData = this.props.data ? this.props.data[0] : {}
        let {
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={styles.wrap}>
                <FormItem
                    label="报告时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('reportDate', {
                        initialValue: moment(reportDate),
                    })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem
                    label="姓名"
                    {...formItemLayout}
                >
                    {getFieldDecorator('initials', {
                        initialValue: initials,
                        rules:[{
                            validator:validChinese
                        }]
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="性别"
                    {...formItemLayout}
                >
                    {getFieldDecorator('gender', {
                        initialValue: gender,
                    })(
                        <Select>
                            <Option value={1}>男</Option>
                            <Option value={2}>女</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="年龄"
                    {...formItemLayout}
                >
                    {getFieldDecorator('age', {
                        initialValue: age,
                        rules:[{
                            validator:validIntNumber
                        }]
                    })(
                        <Input></Input>
                    )}
                </FormItem>
                <FormItem
                    label="SAE的名称及诊断"
                    {...formItemLayout}
                >
                    {getFieldDecorator('saeName', {
                        initialValue: saeName,
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="SAE的情况"
                    {...formItemLayout}
                >
                    {getFieldDecorator('situationFlag', {
                        initialValue: situationFlag,
                    })(
                        <Checkbox.Group className="inline-item">
                            <Checkbox value="死亡">死亡</Checkbox>
                            {
                                getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('死亡') >= 0 ? <FormItem className="inline-item">
                                    {getFieldDecorator('situationDeathDate', {
                                        initialValue: moment(situationDeathDate),
                                    })(
                                        <DatePicker />
                                    )}
                                </FormItem> : null
                            }
                            <Checkbox value="导致住院">导致住院</Checkbox>
                            <Checkbox value="延长住院时间">延长住院时间</Checkbox>
                            <Checkbox value="伤残">伤残</Checkbox>
                            <Checkbox value="功能障碍">功能障碍</Checkbox>
                            <Checkbox value="危及生命">危及生命</Checkbox>
                            <Checkbox value="其他">其他</Checkbox>
                            {
                                getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('其他') >= 0 ? <FormItem className="inline-item">
                                    {getFieldDecorator('situationOther', {
                                        initialValue: situationOther,
                                    })(
                                        <Input />
                                    )}
                                </FormItem> : null
                            }
                        </Checkbox.Group>
                    )}

                    {
                        getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('其他') >= 0 ? <div>
                            <FormItem
                                label="发生时间"
                                {...formItemLayout2}
                            >
                                {getFieldDecorator('happenDate', {
                                    initialValue: moment(happenDate),
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                label="研究者获知SAE时间"
                                {...formItemLayout2}
                            >
                                {getFieldDecorator('learnDate', {
                                    initialValue: moment(learnDate),
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                label="对研究采取的措施"
                                {...formItemLayout2}
                            >
                                {getFieldDecorator('measureFlag', {
                                    initialValue: measureFlag ? measureFlag.split('、') : [],
                                })(
                                    <Checkbox.Group>
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
                    })(
                        <Checkbox.Group>
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
                    })(
                        <Checkbox.Group>
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
                    })(
                        <Input.TextArea></Input.TextArea>
                    )}

                </FormItem>
            </div>
        )
    }
}

const styles = {
    wrap: {
        padding: '10px',
        border: '1px solid #ccc'
    }
}

export default SaeForm