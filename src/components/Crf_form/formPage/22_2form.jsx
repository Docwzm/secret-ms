/**
 * 其他信息记录-3(课题三)
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import PicturesWall from '../crfFormUpload'
const FormItem = Form.Item;

class Module extends Component {
    state = {

    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            if (values.expectedFollowDate) {
                values.expectedFollowDate = moment(values.expectedFollowDate).format('YYYY-MM-DD')
            } else {
                delete values.expectedFollowDate
            }
            if(!values.followResearchFlag&&values.followResearchStepDate){
                values.followResearchStepDate = moment(values.followResearchStepDate).format('YYYY-MM-DD')
            }else{
                values.followResearchStepDate = ''
            }
            if(!values.followResearchFlag&&values.followResearchStepReason.length!=0){
                values.followResearchStepReason = values.followResearchStepReason.join('、')
            }

            // console.log(values)
            // return false;
            this.props.onSubmit(values)
        });
    }

    getDisabledDate(date) {
        if (date.valueOf() - new Date().getTime() > 0) {
            return false;
        } else {
            return true;
        }
    }


    render() {
        let {
            followResearchFlag,
            followResearchStepDate,
            followResearchStepReason,
            followResearchStepReasonOther,
            expectedFollowDate,
            fileList
        } = this.props.formData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        console.log(this.props.crfInfo)
        return (
            <div>
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="是否顺利完成该项研究">
                        {
                            getFieldDecorator('followResearchFlag', {
                                initialValue: followResearchFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={true}>是</Radio>
                                    <Radio value={false}>否</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            (getFieldValue('followResearchFlag') != undefined && !getFieldValue('followResearchFlag')) ? <FormItem className="inline-item">
                                <span>如果否，请填写研究中止的日期及中止的理由</span>
                                <div className="my-form-item">
                                    <span className="lable">中止日期：</span>
                                    <FormItem className="inline-item">
                                        {getFieldDecorator('followResearchStepDate', {
                                            initialValue: followResearchStepDate?moment(followResearchStepDate):''
                                        })(
                                            <DatePicker />
                                        )}
                                    </FormItem>
                                </div>
                                <div className="my-form-item">
                                    <span className="lable" style={{lineHeight:'initial',display:'inline-block',verticalAlign:'top'}}>中止理由：</span>
                                    <FormItem className="inline-item" style={{verticalAlign:'top'}}>
                                        {getFieldDecorator('followResearchStepReason', {
                                            initialValue: followResearchStepReason?followResearchStepReason.split('、'):'',
                                        })(
                                            <Checkbox.Group style={{width:'600px'}}>
                                                <Checkbox value="受试者失访">受试者失访</Checkbox>
                                                <Checkbox value="受试者不愿意继续该研究">受试者不愿意继续该研究</Checkbox>
                                                <Checkbox value="研究者认为受试者不适于继续参加该研究">研究者认为受试者不适于继续参加该研究</Checkbox>
                                                <Checkbox style={{marginTop:'10px'}} value="其他">其他</Checkbox>
                                                {
                                                    getFieldValue('followResearchStepReason') && getFieldValue('followResearchStepReason').indexOf('其他') >= 0 ? <FormItem style={{ 'margin': '0 10px 0 0' }} className="inline-item">
                                                        {getFieldDecorator('followResearchStepReasonOther', {
                                                            initialValue: followResearchStepReasonOther,
                                                        })(
                                                            <Input className="middle-input"/>
                                                        )}
                                                    </FormItem> : null
                                                }
                                            </Checkbox.Group>
                                        )}
                                        
                                    </FormItem>
                                </div>
                            </FormItem> : null
                        }
                    </FormItem>

                    <FormItem
                        style={{display:'none'}}
                        label="预计下次访视时间"
                    >
                        {getFieldDecorator('expectedFollowDate', {
                            initialValue: expectedFollowDate ? moment(expectedFollowDate) : '',
                        })(
                            <DatePicker disabledDate={this.getDisabledDate.bind(this)} />
                        )}
                    </FormItem>

                    {/* <FormItem label="相关资料" {...formItemLayout2}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
                    </FormItem> */}
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
    wrap: {
        marginTop: "50px",
    },
    title: {
        fontSize: "18px",
        borderLeft: "4px solid #1890ff",
        paddingLeft: "10px"
    },
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm