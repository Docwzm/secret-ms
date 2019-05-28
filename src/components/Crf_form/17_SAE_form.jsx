/**
 * 低血糖事件
 */
import React, { Component } from 'react';
import { Form, Select, Radio, Button, Row, Col, Input, DatePicker, InputNumber, Checkbox } from 'antd';
import { validChinese, validIntNumber } from '../../utils/formValidate'
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;


class SaeForm extends Component {
    state = {

    }

    render() {
        let formData = this.props.data ? this.props.data : {}
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
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const formItemLayout2 = {
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
                

                <FormItem label="" {...formItemLayout}>

                    <div className="my-form-item inline-item">
                        <span>姓名：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('initials', {
                                initialValue: initials,
                                rules: [{
                                    validator: validChinese
                                }]
                            })(
                                <Input className="middle-input"/>
                            )}
                        </FormItem>
                    </div>

                    <div className="my-form-item inline-item">
                        <span>性别：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('gender', {
                                initialValue: gender,
                            })(
                                <Select className="middle-input">
                                    <Option value={1}>男</Option>
                                    <Option value={2}>女</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>

                    <div className="my-form-item inline-item">
                        <span>年龄：</span>
                        <FormItem className="inline-item">
                            {getFieldDecorator('age', {
                                initialValue: age,
                                rules: [{
                                    validator: validIntNumber
                                }]
                            })(
                                <Input className="middle-input"></Input>
                            )}
                        </FormItem>
                    </div>
                    
                </FormItem>

                <FormItem
                    label="报告时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('reportDate', {
                        initialValue: reportDate ? moment(reportDate) : '',
                    })(
                        <DatePicker />
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
                            <Checkbox value="其他">其他</Checkbox>
                            {
                                getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('其他') >= 0 ? <FormItem style={{ 'margin': '0 10px 0 0' }} className="inline-item">
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
                        getFieldValue('situationFlag') && getFieldValue('situationFlag').length != 0 ? <div>
                            <FormItem
                                label="发生时间"
                                {...formItemLayout2}
                            >
                                {getFieldDecorator('happenDate', {
                                    initialValue: happenDate ? moment(happenDate) : '',
                                })(
                                    <DatePicker />
                                )}
                            </FormItem>
                            <FormItem
                                label="研究者获知SAE时间"
                                {...formItemLayout2}
                            >
                                {getFieldDecorator('learnDate', {
                                    initialValue: learnDate ? moment(learnDate) : '',
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
        // padding: '10px',
        // border: '1px solid #ccc'
    },
    inline:{
        display:'inline-block'
    }
}

export default SaeForm