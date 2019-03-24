/**
 * 眼科检查
 */
import React, { Component } from 'react';
import { Form, Select, Radio, Button, Row, Col, Input, DatePicker, InputNumber, Checkbox } from 'antd';
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

    handleAddColumn() {

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
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        //比较特殊的表单布局

        return (
            <div style={styles.wrap}>
                <div>
                    <FormItem
                        label="报告时间"
                    >
                        {getFieldDecorator('reportDate', {
                            initialValue: moment(reportDate),
                            rules: [{ required: "true" }]
                        })(
                            <DatePicker disabled={disabled} />
                        )}

                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="姓名"
                    >
                        {getFieldDecorator('initials', {
                            initialValue: initials,
                            rules: [{ required: "true" }]
                        })(
                            <Input disabled={disabled} />
                        )}
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        {getFieldDecorator('gender', {
                            initialValue: gender,
                            rules: [{ required: "true" }]
                        })(
                            <Select disabled={disabled}>
                                <Option value={1}>男</Option>
                                <Option value={2}>女</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="年龄"
                    >
                        {getFieldDecorator('age', {
                            initialValue: age,
                            rules: [{ required: "true" }]
                        })(
                            <InputNumber disabled={disabled} />
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE的名称及诊断"
                    >
                        {getFieldDecorator('saeName', {
                            initialValue: saeName,
                            rules: [{ required: "true" }]
                        })(
                            <Input disabled={disabled} />
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE的情况"
                    >
                        {getFieldDecorator('situationFlag', {
                            initialValue: situationFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Checkbox.Group disabled={disabled}>
                                <div>
                                    <Checkbox value="死亡">死亡</Checkbox>
                                    {
                                        getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('死亡') >= 0 ? <FormItem>
                                            {getFieldDecorator('situationDeathDate', {
                                                initialValue: moment(situationDeathDate),
                                                rules: [{ required: "true" }]
                                            })(
                                                <DatePicker disabled={disabled} />
                                            )}
                                        </FormItem> : null
                                    }
                                </div>
                                <Checkbox value="导致住院">导致住院</Checkbox>
                                <Checkbox value="延长住院时间">延长住院时间</Checkbox>
                                <Checkbox value="伤残">伤残</Checkbox>
                                <Checkbox value="功能障碍">功能障碍</Checkbox>
                                <Checkbox value="危及生命">危及生命</Checkbox>
                                <div>
                                    <Checkbox value="其他">其他</Checkbox>
                                    {
                                        getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('其他') >= 0 ? <FormItem>
                                            {getFieldDecorator('situationOther', {
                                                initialValue: situationOther,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input />
                                            )}
                                        </FormItem> : null
                                    }
                                </div>
                            </Checkbox.Group>
                        )}
                        {
                            getFieldValue('situationFlag') && getFieldValue('situationFlag').indexOf('其他') >= 0 ? <div>
                                <div>
                                    <FormItem
                                        label="发生时间"
                                    >
                                        {getFieldDecorator('happenDate', {
                                            initialValue: moment(happenDate),
                                            rules: [{ required: "true" }]
                                        })(
                                            <DatePicker />
                                        )}
                                    </FormItem>
                                </div>
                                <div>
                                    <FormItem
                                        label="研究者获知SAE时间"
                                    >
                                        {getFieldDecorator('learnDate', {
                                            initialValue: moment(learnDate),
                                            rules: [{ required: "true" }]
                                        })(
                                            <DatePicker />
                                        )}
                                    </FormItem>
                                </div>
                                <div>
                                    <FormItem
                                        label="对研究采取的措施"
                                    >
                                        {getFieldDecorator('measureFlag', {
                                            initialValue: measureFlag ? measureFlag.split('、') : [],
                                            rules: [{ required: "true" }]
                                        })(
                                            <Checkbox.Group>
                                                <Checkbox value="继续研究">继续研究</Checkbox>
                                                <Checkbox value="减小剂量">减小剂量</Checkbox>
                                                <Checkbox value="药物暂停后恢复">药物暂停后恢复</Checkbox>
                                                <Checkbox value="停用药物">停用药物</Checkbox>
                                            </Checkbox.Group>
                                        )}
                                    </FormItem>
                                </div>
                            </div> : null
                        }
                    </FormItem>
                </div>

                <div>
                    <FormItem
                        label="SAE的转归"
                    >
                        {getFieldDecorator('lapseFlag', {
                            initialValue: lapseFlag ? lapseFlag.split('、') : [],
                            rules: [{ required: "true" }]
                        })(
                            <Checkbox.Group>
                                <Checkbox value="完全恢复">完全恢复</Checkbox>
                                <Checkbox value="好转伴后遗症">好转伴后遗症</Checkbox>
                                <Checkbox value="死亡">死亡</Checkbox>
                            </Checkbox.Group>
                        )}
                    </FormItem>
                </div>
                <div>
                    <FormItem
                        label="SAE与研究药物的关系"
                    >
                        {getFieldDecorator('researchMedicineRelation', {
                            initialValue: researchMedicineRelation ? researchMedicineRelation.split('、') : [],
                            rules: [{ required: "true" }]
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
                </div>
                <div>
                    <FormItem
                        label="SAE发生及处理的详细情况"
                    >
                        {getFieldDecorator('deathHandleDetail', {
                            initialValue: deathHandleDetail,
                            rules: [{ required: "true" }]
                        })(
                            <Input.TextArea></Input.TextArea>
                        )}

                    </FormItem>
                </div>
            </div>
        )
    }
}

const styles = {
    wrap: {
        padding: '10px 30px',
        border: '1px solid #ccc'
    }
}

export default SaeForm