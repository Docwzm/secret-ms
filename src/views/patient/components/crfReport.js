/**
 * 特殊事件记录
 */
import React, { Component } from 'react';
import { Form, Radio, Button } from 'antd';
import AeForm from '../../../components/Crf_form/17_AE_form';

class crfReport extends Component {
    state = {
        formData: {}
    }

    componentWillMount() {

    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            values.aeReport = this.state.formData.aeReport
            // values.pharmacy = this.state.formData.pharmacy

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
            if (values.saeFlag) {
                values.saeReport = [data]
            }
            console.log(values)
            // this.props.onSubmit(values)
        });
    }

    handleChange = (name, index, type, value) => {
        if (!this.state.formData[name]) {
            this.state.formData[name] = [];
        }
        if (!this.state.formData[name][index]) {
            this.state.formData[name][index] = {}
        }
        this.state.formData[name][index][type] = value
    }

    handleAdd(name) {
        if (!this.state.formData[name]) {
            this.state.formData[name] = []
        }
        let data = this.state.formData[name].concat([{}])
        this.setState({
            formData: Object.assign({}, this.state.formData, { [name]: data })
        })
        this.setCanSave(true)
    }

    handleDelete = (name, index) => {
        if (this.state.formData[name]) {
            this.state.formData[name].splice(index, 1)
            this.setState({
                formData: Object.assign({}, this.state.formData)
            })
            this.setCanSave(true)
        }
    }

    setCanSave(canSave) {
        this.setState({
            canSave
        })
    }

    handlecancel(){
        this.props.form.resetFields();
        this.setCanSave(false)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <AeForm name="aeReport" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} />
                </Form>
                {
                    this.state.canSave ? <div className="btn-wrap">
                        <Button id="form-submit-btn" disabled={this.props.disabled} type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.handlecancel.bind(this)}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        // if (!props.canSave) {
        //     props.setCanSave(true)
        // }
    }
})(crfReport);

export default ThisForm