/**
 * 双下肢动脉彩超
 */
import React, { Component } from 'react';
import { Form, Radio, Button } from 'antd';
import { formItemLayoutComponent, tailFormItemLayoutComponent } from '../../utils/formItemLayout'

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
        const disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={styles.wrap}>
                <div style={styles.title}>双下肢动脉彩超</div>
                <Form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="双下肢动脉彩超"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('lowerArteryFlag', {
                            initialValue: lowerArteryFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>正常</Radio>
                                <Radio value={true}>异常</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="动脉斑块"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('arterialPlaqueFlag', {
                            initialValue: arterialPlaqueFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="双动脉硬化"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('arteriosclerosisFlag', {
                            initialValue: arteriosclerosisFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem
                        label="动脉狭窄"
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('arterialStenosisFlag', {
                            initialValue: arterialStenosisFlag,
                            rules: [{ required: "true" }]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    {
                        !disabled ? <div className="btn-wrap">
                            <FormItem>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button onClick={this.props.onCancel}>取消</Button>
                            </FormItem>
                        </div> : null
                    }
                </Form>
            </div>
        )
    }
}

const styles = {
    wrap: {
        marginTop: "50px"
    },
    title: {
        fontSize: "18px",
        borderLeft: "4px solid #1890ff",
        paddingLeft: "10px"
    },
    form: {
        width: "50%",
        marginTop: "30px"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm