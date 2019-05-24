/**
 * 强化CSII治疗情况
 */
import React, { Component } from 'react';
import { Form, Button,DatePicker,Input } from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class Module11 extends Component {
    state = {
        tableData: []
    }

    componentWillMount() {
        this.setState({
            formData: JSON.parse(JSON.stringify(this.props.formData))
        })
    }

    handleAdd = () => {
        if (!this.state.formData.csiiRecordList) {
            this.state.formData.csiiRecordList = [];
        }
        let csiiRecordList = this.state.formData.csiiRecordList.concat([{}])
        this.setState({
            formData: Object.assign({}, this.state.formData, { csiiRecordList })
        })
        this.props.setCanSave(true)
    }

    handleDelete = (index) => {
        if (this.state.formData.csiiRecordList) {
            this.state.formData.csiiRecordList.splice(index, 1)
            this.setState({
                formData: Object.assign({}, this.state.formData, { csiiRecordList: this.state.formData.csiiRecordList })
            })
            this.props.setCanSave(true)
        }
    }

    handleChange = (index, type, e) => {
        if (!this.state.formData.csiiRecordList || this.state.formData.csiiRecordList.length == 0) {
            this.state.formData.csiiRecordList = [{}];
        }
        if (type == 'date') {
            this.state.formData.startDate = e[0].format('YYYY-MM-DD');
            this.state.formData.endDate = e[1].format('YYYY-MM-DD');
        } else if (type == 'measurementDate') {
            this.state.formData['csiiRecordList'][index][type] = e.valueOf()
        } else {
            this.state.formData['csiiRecordList'][index][type] = e.target.value
        }
    }

    handleCancel() {
        this.setState({
            formData: JSON.parse(JSON.stringify(this.props.formData))
        })
        this.props.onCancel();
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            let {
                csiiRecordList,
                startDate,
                endDate
            } = this.state.formData

            let data = {
                csiiRecordList,
                startDate,
                endDate
            }
            this.props.onSubmit(data)
        });
    }

    render() {
        let {
            startDate,
            endDate
        } = this.props.formData;
        let date = [startDate?moment(startDate):'', endDate?moment(endDate):''];
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <div>
                <div className="title">强化治疗情况</div>
                <div>CSII使用情况（注：初始及调整剂量时填）</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="CSII治疗时间：">
                        {
                            getFieldDecorator('date', {
                                initialValue: date,
                            })(
                                <RangePicker onChange={(date) => this.props.handleChange(null, 'date', date)} />
                            )
                        }
                    </FormItem>
                    <div>
                    <FormItem label="达标时间：" className="inline-item">
                        {
                            getFieldDecorator('date', {
                                initialValue: '',
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <FormItem className="inline-item">
                        {
                            getFieldDecorator('date', {
                                initialValue: '',
                            })(
                                <Input addonBefore="达标耗时" className="cover-input"/>
                            )
                        }
                    </FormItem>
                    </div>
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
})(Module11);

export default ThisForm