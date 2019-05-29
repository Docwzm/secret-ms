/**
 * 其他体格检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'
import PicturesWall from '../crfFormUpload'
const FormItem = Form.Item;

class Module extends Component {

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
        let {
            physicalOtherFlag,
            physicalOtherExplain,
            pelma10NylonWireLeftFlag,
            pelma10NylonWireLeftNum,
            pelma10NylonWireRightFlag,
            pelma10NylonWireRightNum,
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
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="其他体格检查">
                        {
                            getFieldDecorator('physicalOtherFlag', {
                                initialValue: physicalOtherFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>正常</Radio>
                                    <Radio value={true}>异常</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('physicalOtherFlag') ?
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('physicalOtherExplain', {
                                            initialValue: physicalOtherExplain,
                                        })(
                                            <Input addonBefore="请简单记录：" />
                                        )
                                    }
                                </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="足底10g尼龙丝检查">
                        <FormItem>
                            <span>右侧：</span>
                            {
                                getFieldDecorator('pelma10NylonWireLeftFlag', {
                                    initialValue: pelma10NylonWireLeftFlag,
                                })(

                                    <Radio.Group>
                                        <Radio value={false}>阴性</Radio>
                                        <Radio value={true}>阳性</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('pelma10NylonWireLeftFlag') ? <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('pelma10NylonWireLeftNum', {
                                            initialValue: pelma10NylonWireLeftNum,
                                            rules:[{
                                                validator:validDoubleNumber
                                            }]
                                        })(
                                            <Input addonAfter="触角异常" className="cover-input" />
                                        )
                                    }
                                </FormItem> : null
                            }
                        </FormItem>

                        <FormItem>
                            <span>左侧：</span>
                            {
                                getFieldDecorator('pelma10NylonWireRightFlag', {
                                    initialValue: pelma10NylonWireRightFlag,
                                })(

                                    <Radio.Group>
                                        <Radio value={false}>阴性</Radio>
                                        <Radio value={true}>阳性</Radio>
                                    </Radio.Group>

                                )
                            }

                            {
                                getFieldValue('pelma10NylonWireRightFlag') ? <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('pelma10NylonWireRightNum', {
                                            initialValue: pelma10NylonWireRightNum,
                                            rules:[{
                                                validator:validDoubleNumber
                                            }]
                                        })(
                                            <Input addonAfter="触角异常" className="cover-input" />
                                        )
                                    }
                                </FormItem> : null
                            }

                        </FormItem>

                    </FormItem>
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
                        <Button id="form-submit-btn" type="primary" disabled={this.props.disabled} onClick={this.handleSubmit.bind(this)}>保存</Button>
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
})(Module);

export default ThisForm