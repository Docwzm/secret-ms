/**
 * 双下肢动脉彩超
 */
import React, { Component } from 'react';
import { Form, Radio, Button } from 'antd';

const FormItem = Form.Item;

class Module11 extends Component {

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (err) return;
            //数据校验通过后，传递到上级提交
            console.log(values)
            this.props.onSubmit(values)
        });
    }

    render() {
        let {
            lowerArteryFlag,
            cervicalThickness,
            arterialPlaqueFlag,
            arteriosclerosisFlag,
            arterialStenosisFlag,
        } = this.props.formData;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div>
                <div className="title">双下肢动脉彩超</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="双下肢动脉彩超"
                    >
                        {getFieldDecorator('lowerArteryFlag', {
                            initialValue: lowerArteryFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>正常</Radio>
                                <Radio value={true}>异常</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="动脉斑块"
                    >
                        {getFieldDecorator('arterialPlaqueFlag', {
                            initialValue: arterialPlaqueFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="双动脉硬化"
                    >
                        {getFieldDecorator('arteriosclerosisFlag', {
                            initialValue: arteriosclerosisFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="动脉狭窄"
                    >
                        {getFieldDecorator('arterialStenosisFlag', {
                            initialValue: arterialStenosisFlag,
                        })(
                            <Radio.Group>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
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
})(Module11);

export default ThisForm