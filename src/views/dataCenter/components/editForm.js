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
                console.log('../')
                let { fileList } = this.state
                data.thumb = fileList.length > 0 ? (fileList[0].id ? fileList[0].id : fileList[0].response.id) : undefined
                this.props.onSubmit(data)
            });
        }
    }



    componentWillMount() {
        let { rel_thumb, thumb } = this.props.formData
        let fileList = []
        if (rel_thumb && rel_thumb.path) {
            fileList.push({
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: configs.server + rel_thumb.path,
                id: thumb
            })
        }
        this.setState({
            fileList
        })
    }

    handleUpload = (fileList) => {
        fileList.splice(0, fileList.length - 1)
        this.setState({
            fileList
        })
    }

    render() {
        let {
            say_to_you,
            username,
            order_code,
            mobile,
            rel_wechat,
            created_at,
            view
        } = this.props.formData;
        let { fileList } = this.state

        let { disabled } = this.props
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
            <div className="_form-wrap edit-form-wrap">
                <Form labelalign="left" onSubmit={this.handleSubmit.bind(this)} >
                    <FormItem label="我想对您说">
                        {
                            getFieldDecorator('say_to_you', {
                                initialValue: say_to_you
                            })(
                                <TextArea disabled={disabled}></TextArea>
                            )
                        }
                    </FormItem>
                    <FormItem label="永恒一刻">
                        {
                            getFieldDecorator('thumb', {
                                initialValue: '',
                            })(
                                <PicturesWall disabled={disabled} action={configs.server + '/static/ueditor/1.4.3.3/php/controller.php?action=uploadimage'} fileList={fileList} change={this.handleUpload} />
                            )
                        }
                    </FormItem>
                    <FormItem label="送卡人姓名/昵称">
                        {
                            getFieldDecorator('username', {
                                initialValue: username,
                            })(
                                <Input disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="powerionics淘宝或京东订单编号">
                        {
                            getFieldDecorator('order_code', {
                                initialValue: order_code,
                            })(
                                <Input disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号码">
                        {
                            getFieldDecorator('mobile', {
                                initialValue: mobile,
                            })(
                                <Input type="phone" disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label=" " colon={false}>
                        <div className="btn-wrap">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>{disabled ? '编辑' : '保存'}</Button>
                            <Button type="danger" onClick={this.props.onDelete}>删除</Button>
                        </div>
                    </FormItem>
                </Form>
                <div className="right-box">
                    <p>查询次数：<span>{view}</span></p>
                    <p>提交时间：<span>{created_at}</span></p>
                    {
                        rel_wechat ? <div className="wx-info">
                            <p>微信信息</p>
                            <div className="padding-left-30">
                                <p>头像：<span><img src={rel_wechat.headimgurl}></img></span></p>
                                <p>昵称：<span>{rel_wechat.nickname}</span></p>
                                <p>性别：<span>{rel_wechat.sex==1?'男':(rel_wechat.sex==2?'女':'')}</span></p>
                                <p>国家：<span>{rel_wechat.country}</span></p>
                                <p>省市：<span>{rel_wechat.province+' ' +rel_wechat.city+' ' +rel_wechat.country}</span></p>
                                <p>OpenID：<span>{rel_wechat.openId}</span></p>
                            </div>
                        </div> : null
                    }
                </div>
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