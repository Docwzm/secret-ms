/**
 * 特殊事件记录
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

    componentWillMount() {
        this.setState({
            formData: JSON.parse(JSON.stringify(this.props.formData))
        })
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            values.aeReport = this.state.formData.aeReport
            values.pharmacy = this.state.formData.pharmacy
            
            let data = {};
            if (this.state.formData.saeReport && this.state.formData.saeReport[0].id) {
                data.id = this.state.formData.saeReport[0].id
            }

            for (let x in values) {
                if (x.indexOf('aeReport_') >= 0 || x.indexOf('pharmacy_') >= 0) {
                    delete values[x]//删除新增用药和不良事件多余数据
                } else {
                    if (x != 'aeFlag' && x != 'aeReport' && x != 'saeFlag' && x != 'saeReport'
                        && x != 'pharmacyFlag' && x != 'pharmacy') {
                        if (typeof values[x] == 'object') {
                            if (values[x].format) {
                                values[x] = values[x].format('YYYY-MM-DD')
                            } else {
                                values[x] = values[x].join('、')
                            }
                        }
                        data[x] = values[x] // sae表单数据封装
                        delete values[x]
                    }
                }
            }
            if(values.saeFlag){
                values.saeReport = [data]
            }
            this.props.onSubmit(values)
        });
    }

    handleChange = (name, index, type, event) => {
        if (!this.state.formData[name]) {
            this.state.formData[name] = [];
        }
        if (!this.state.formData[name][index]) {
            this.state.formData[name][index] = {}
        }
        if (event.target) {
            this.state.formData[name][index][type] = event.target.value
        } else {
            if (type == 'saeFlag') {
                this.state.formData[name][index][type] = event
            } else {
                this.state.formData[name][index][type] = event.format('YYYY-MM-DD')
            }
        }
    }

    handleAdd(name) {
        if (!this.state.formData[name]||this.state.formData[name].length==0) {
            this.state.formData[name] = [{}]
        }
        let data = this.state.formData[name].concat([{}])
        this.setState({
            formData: Object.assign({}, this.state.formData, { [name]: data })
        })
        this.props.setCanSave(true)
    }

    handleDelete = (name, index) => {
        if(this.state.formData[name]){
            this.state.formData[name].splice(index, 1)
            this.setState({
                formData: Object.assign({}, this.state.formData)
            })
            this.props.setCanSave(true)
        }
    }

    render() {
        let {
            aeFlag,
            saeFlag,
            pharmacyFlag
        } = this.props.formData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 },
            },
        };
        return (
            <div>
                <div className="title">特殊事件记录</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="不良事件"
                    >
                        {getFieldDecorator('aeFlag', {
                            initialValue: aeFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>正常</Radio>
                                <Radio value={true}>异常</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    {
                        getFieldValue('aeFlag') ? <AeForm name="aeReport" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
                    }

                    <FormItem
                        label="低血糖事件"
                    >
                        {getFieldDecorator('saeFlag', {
                            initialValue: saeFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    {
                        getFieldValue('saeFlag') ? <SaeForm name="saeReport" data={this.state.formData.saeReport} form={this.props.form} /> : null
                    }

                    <FormItem
                        label="新增用药"
                    >
                        {getFieldDecorator('pharmacyFlag', {
                            initialValue: pharmacyFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    {
                        getFieldValue('pharmacyFlag') ? <TheRapyForm name="pharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
                    }
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button disabled={this.props.disabled} type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const ThisForm = Form.create({
    onValuesChange:(props, changedValues, allValues) => {
        if(!props.canSave){
            props.setCanSave(true)
        }
    }
})(Module11);

export default ThisForm