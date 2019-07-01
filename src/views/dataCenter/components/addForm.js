import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import PicturesWall from '@/components/imageUpload'
import '../styles/form.scss'
const FormItem = Form.Item;

class Module extends Component {
    constructor() {
        super()
        this.state = {
            fileList:[]
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

    handleUpload = (fileList) => {
        fileList.splice(0,fileList.length-1)
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
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)} >
                    <FormItem label="联系电话">
                        {
                            getFieldDecorator('mobile')(
                                <Input type="phone" ></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="名称">
                        {
                            getFieldDecorator('name')(
                                <Input ></Input>
                            )
                        }
                    </FormItem>
                    <FormItem label="相关资料">
                        {
                            getFieldDecorator('src')(
                                <PicturesWall fileList={fileList} change={this.handleUpload} />
                            )
                        }
                    </FormItem>
                    <FormItem label=" " colon={false}>
                        <div className="btn-wrap">
                            <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                            <Button onClick={this.props.onCancel}>取消</Button>
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