/**
 * 特殊事件记录
 */
import React, { Component } from 'react';
import { Form, Radio, Button } from 'antd';
import AeForm from './17_AE_form';
import TheRapyForm from './17_THERAPY_form';
import PicturesWall from '../crfFormUpload'
const FormItem = Form.Item;

class Module extends Component {
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
            values.saeReport = this.state.formData.saeReport

            for (let x in values) {
                if (x.indexOf('aeReport_') >= 0 || x.indexOf('pharmacy_') >= 0) {
                    delete values[x]//删除新增用药和不良事件多余数据
                }
            }

            this.props.onSubmit(values)
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
        this.props.setCanSave(true)
    }

    handleDelete = (name, index) => {
        if (this.state.formData[name]) {
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
            pharmacyFlag,
            fileList
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
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="不良事件"
                    >
                        {getFieldDecorator('aeFlag', {
                            initialValue: aeFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
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
                        getFieldValue('saeFlag') ? <AeForm name="saeReport" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
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

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm