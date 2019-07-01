import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import PicturesWall from '@/components/imageUpload'
import '../styles/form.scss'
const FormItem = Form.Item;

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
                data.src = this.state.fileList && this.state.fileList.length>0?(this.state.fileList[0].url?this.state.fileList[0].url:'http://www.baidu.com/img/baidu_jgylogo3.gif'):''
                this.props.onSubmit(data)
            });
        }
    }



    componentWillMount() {
        let { src } = this.props.formData
        let fileList = []
        fileList.push({
            uid: '-1',
            status: 'done',
            url: src
        })
        this.setState({
            fileList
        })
    }

    handleUpload = (fileList) => {
        fileList.splice(0,fileList.length-1)
        this.setState({
            fileList
        })
    }

    render() {
        let {
            name,
            mobile,
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
            <div className="_form-wrap">
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} >
                    <FormItem label="联系电话">
                        {
                            getFieldDecorator('mobile', {
                                initialValue: mobile
                            })(
                                <Input type="phone" disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: name,
                            })(
                                <Input disabled={disabled}></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="相关资料">
                        {
                            getFieldDecorator('src', {
                                initialValue: '',
                            })(
                                <PicturesWall disabled={disabled} fileList={fileList} change={this.handleUpload} />
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