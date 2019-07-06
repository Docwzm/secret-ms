import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import PicturesWall from '@/components/imageUpload'
import configs from '@/configs'
import '../styles/form.scss'
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class Module extends Component {
    constructor() {
        super()
        this.state = {
            fileList: []
        }
    }

    handleSubmit(e) {
        if (this.props.disabled) {
            this.props.onEdit()
        } else {
            e && e.preventDefault();
            this.props.form.validateFields((err, data) => {
                if (err) return;
                //数据校验通过后，传递到上级提交
                data.thumb = this.state.fileList.length>0?this.state.fileList[0].response.id:undefined
                this.props.onSubmit(data)
            });
        }
    }

    handleUpload = (fileList) => {
        fileList.splice(0, fileList.length - 1)
        this.setState({
            fileList
        })
    }

    render() {
        let { fileList } = this.state

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        };

        return (
            <div className="_form-wrap">
                <Form labelalign="left" onSubmit={this.handleSubmit.bind(this)} >
                    <FormItem label="我想对您说">
                        {
                            getFieldDecorator('say_to_you', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '请输入对TA说的话' },
                                ]
                            })(
                                <TextArea></TextArea>
                            )
                        }
                    </FormItem>
                    <FormItem label="永恒一刻">
                        {
                            getFieldDecorator('thumb', {
                                initialValue: '',
                            })(
                                <PicturesWall action={configs.server + '/static/ueditor/1.4.3.3/php/controller.php?action=uploadimage'} fileList={fileList} change={this.handleUpload} />
                            )
                        }
                    </FormItem>
                    <FormItem label="送卡人姓名/昵称">
                        {
                            getFieldDecorator('username', {
                                initialValue: '',
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="powerionics淘宝或京东订单编号">
                        {
                            getFieldDecorator('order_code', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '请输入订单编号' }
                                ]
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号码">
                        {
                            getFieldDecorator('mobile', {
                                initialValue: '',
                                rules: [
                                    { required: true, message: '请输入对方手机号码' },
                                ]
                            })(
                                <Input type="phone"></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label=" " colon={false}>
                        <div className="btn-wrap">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                            <Button type="danger" onClick={this.props.onCancel}>取消</Button>
                        </div>
                    </FormItem>
                </Form>
            </div >
        )
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        // if (!props.canSave) {
        //     props.setCanSave(true)
        // }
    }
})(Module);

export default ThisForm