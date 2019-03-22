/**
 * 眼科检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button } from 'antd';
import AeForm from './17_AE_form';
import SaeForm from './17_SAE_form';
import TheRapyForm from './17_THERAPY_form';
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
            return false;
            this.props.onSubmit(values)
        });
    }

    handleAddColumn() {

    }

    render() {
        let {
            aeFlag,
            saeFlag,
            pharmacyFlag
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        return (
            <div style={styles.wrap}>
                <div style={styles.title}>特殊时间记录</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem
                            label="不良事件"
                        >
                            {getFieldDecorator('aeFlag', {
                                initialValue: aeFlag,
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value={false}>正常</Radio>
                                    <Radio value={true}>异常</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        {
                            getFieldValue('aeFlag') ? <span><AeForm name="17_AE" form={this.props.form} disabled={disabled} /></span> : null
                        }
                    </div>
                    <div>
                        <FormItem
                            label="低血糖事件"
                        >
                            {getFieldDecorator('saeFlag', {
                                initialValue: saeFlag,
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        {
                            getFieldValue('saeFlag') ? <span><SaeForm name="17_SAE" form={this.props.form} disabled={disabled} /></span> : null
                        }
                    </div>
                    <div>
                        <FormItem
                            label="新增用药"
                        >
                            {getFieldDecorator('pharmacyFlag', {
                                initialValue: pharmacyFlag,
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        {
                            getFieldValue('pharmacyFlag') ? <TheRapyForm name="17_THERAPY" form={this.props.form} disabled={disabled} /> : null
                        }
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
        width: "150px",
        marginRight: "10px"
    },
    datePicker: {
        margin: "10px 0"
    },
}

const ThisForm = Form.create()(Module11);

export default ThisForm