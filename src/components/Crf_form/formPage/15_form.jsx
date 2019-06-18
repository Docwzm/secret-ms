/**
 * 强化CSII治疗情况
 */
import React, { Component } from 'react';
import { Form, Button, DatePicker, Input } from 'antd';
import moment from 'moment'
import { validDoubleNumber } from '../../../utils/formValidate'
import PicturesWall from '../crfFormUpload'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class Module extends Component {
    state = {
        tableData: []
    }

    handleChange = (index, type, e) => {
        // if (!this.state.formData.csiiRecordList || this.state.formData.csiiRecordList.length == 0) {
        //     this.state.formData.csiiRecordList = [{}];
        // }
        let params = {}
        if (type == 'date') {
            params.startDate = e[0].format('YYYY-MM-DD');
            params.endDate = e[1].format('YYYY-MM-DD');
        }
        if (type == 'reachDate') {
            params.reachDate = e.format('YYYY-MM-DD')
        }
        this.props.changeData(params)
    }


    //提交数据
    handleSubmit(e) {
        e && e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            if (values.date) {
                values.startDate = values.date[0].format('YYYY-MM-DD');
                values.endDate = values.date[1].format('YYYY-MM-DD');
            }
            if (values.reachDate) {
                values.reachDate = values.reachDate.format('YYYY-MM-DD')
            }
            delete values.date
            delete values.dateWaste
            delete values.reachDateWaste
            let data = {
                ...values
            }
            console.log(data)
            this.props.onSubmit(data)
        });
    }

    render() {
        let {
            startDate,
            endDate,
            reachDate,
            insulinStartDosage,
            insulinReachDosage,
            insulinStopDosage,
        } = this.props.formData;
        let {fileList} = this.props.formData;
        
        const reachDateWaste = reachDate&&startDate?((moment(reachDate).valueOf() - moment(startDate).valueOf()) / (24 * 3600 * 1000) + 1):''
        const dateWaste = endDate&&startDate?((moment(endDate).valueOf() - moment(startDate).valueOf()) / (24 * 3600 * 1000) + 1):''
        let date = [startDate ? moment(startDate) : '', endDate ? moment(endDate) : ''];
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <div>
                <div style={styles.title}>注：初始及调整剂量时填</div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="CSII治疗时间：">
                        {
                            getFieldDecorator('date', {
                                initialValue: date,
                            })(
                                <RangePicker className="inline-item" onChange={(date) => this.handleChange(null, 'date', date)} />
                            )
                        }
                        <FormItem className="inline-item" style={{marginLeft:'6px'}}>
                            {
                                getFieldDecorator('dateWaste', {
                                    initialValue: dateWaste,
                                })(
                                    <Input disabled addonBefore="共" addonAfter="天" className="cover-input" />
                                )
                            }
                        </FormItem>
                    </FormItem>
                    <FormItem label="达标时间：">
                        {
                            getFieldDecorator('reachDate', {
                                initialValue: reachDate ? moment(reachDate) : '',
                            })(
                                <DatePicker onChange={date => this.handleChange(null, 'reachDate', date)} />
                            )
                        }
                        <FormItem className="inline-item" style={{marginLeft:'6px'}}>
                            {
                                getFieldDecorator('reachDateWaste', {
                                    initialValue: reachDateWaste,
                                })(
                                    <Input disabled addonBefore="达标耗时" addonAfter="天" className="cover-input" />
                                )
                            }
                        </FormItem>
                    </FormItem>
                    <FormItem label="胰岛素起始日总剂量">
                        {
                            getFieldDecorator('insulinStartDosage', {
                                initialValue: insulinStartDosage,
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="U/d" />
                            )
                        }
                    </FormItem>
                    <FormItem label="胰岛素达标日剂量">
                        {
                            getFieldDecorator('insulinReachDosage', {
                                initialValue: insulinReachDosage,
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="U/d" />
                            )
                        }
                    </FormItem>
                    <FormItem label="胰岛素停泵前剂量">
                        {
                            getFieldDecorator('insulinStopDosage', {
                                initialValue: insulinStopDosage,
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input addonAfter="U/d" />
                            )
                        }
                    </FormItem>
                    <FormItem label="相关资料（非必须，胰岛素治疗医嘱表）" {...formItemLayout2}>
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
    title:{
        paddingLeft:'14px'
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