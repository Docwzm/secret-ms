/**
 * 心电图
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
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
            ecgFlag,
            ecgExplain,
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
                    <FormItem>
                        {
                            getFieldDecorator('ecgFlag', {
                                initialValue: ecgFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>正常</Radio>
                                    <Radio value={true}>异常</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('ecgFlag') ? <FormItem className="inline-item">
                                {
                                    getFieldDecorator('ecgExplain', {
                                        initialValue: ecgExplain,
                                    })(
                                        <Input className="middle-input" />
                                    )
                                }
                            </FormItem> : null
                        }
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
                        <Button id="form-submit-btn" disabled={this.props.disabled} type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
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