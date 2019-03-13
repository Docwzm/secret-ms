/**
 * 病史&不良嗜好
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import './form.scss'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Module3 extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            console.log(values)
            this.props.onSubmit(values)
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div>
                <div className="title">病史/不良嗜好</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="糖尿病确诊日期">
                        {
                            getFieldDecorator('key1', {
                                rules: [{ required: "true" }]
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>
                    <div>
                        <FormItem label="糖尿病相关症状">
                            {
                                getFieldDecorator('key2', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        {
                            getFieldValue('key2') == 2 ? <FormItem label="">
                                {
                                    getFieldDecorator('key3', {
                                        rules: [{ required: "true" }]
                                    })(
                                        <span>持续时间<DatePicker /></span>
                                    )
                                }
                            </FormItem> : null
                        }
                    </div>

                    <FormItem label="主要症状">
                        {
                            getFieldDecorator('key4', {
                                initialValue: ['a', 'b'],
                                rules: [{ required: "true" }]
                            })(
                                <CheckboxGroup options={[
                                    { label: '口干', value: 'a' },
                                    { label: '多饮', value: 'b' },
                                    { label: '多尿', value: 'c' },
                                    { label: '消瘦', value: 'd' },
                                    { label: '其他', value: 'e' },
                                ]} />
                            )
                        }
                    </FormItem>
                    <div>
                        <FormItem label="糖尿病家族史">
                            {
                                getFieldDecorator('key5', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="嗜酒">
                            {
                                getFieldDecorator('key6', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">否</Radio>
                                        <Radio value="2">是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key6') == 2 ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('key7', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>请提供<Input className="small-input"></Input>年</span>
                                            )

                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key8', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>平均<Input className="small-input"></Input>两/天</span>
                                            )
                                        }
                                    </FormItem>
                                    <div>
                                        <FormItem label="种类">
                                            {
                                                getFieldDecorator('key9', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <CheckboxGroup options={[
                                                        { label: '白酒', value: 'a' },
                                                        { label: '红酒', value: 'b' },
                                                        { label: '啤酒', value: 'c' },
                                                        { label: '其他', value: 'e' },
                                                    ]} />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <FormItem label="戒酒">
                                        {
                                            getFieldDecorator('key10', {
                                                initialValue: '2',
                                                rules: [{ required: "true" }]
                                            })(
                                                <Radio.Group>
                                                    <Radio value="1">否</Radio>
                                                    <Radio value="2">是</Radio>
                                                </Radio.Group>
                                            )
                                        }
                                        {
                                            getFieldValue('key10') == 2 ? <FormItem>
                                                {
                                                    getFieldDecorator('key11', {
                                                        rules: [{ required: "true" }]
                                                    })(
                                                        <span>已戒<Input className="small-input" />年</span>
                                                    )
                                                }
                                            </FormItem> : null
                                        }
                                    </FormItem>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>其他疾病1</div>
                    <div>
                        <FormItem label="高血压病">
                            {
                                getFieldDecorator('key12', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key12') == 2 ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key13', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>已经诊断<Input className="small-input" />年</span>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key14', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <span><Input className="small-input" />月</span>
                                            )
                                        }
                                    </FormItem>
                                    <div>
                                        <FormItem label="近3月用药种类">
                                            {
                                                getFieldDecorator('key15', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <CheckboxGroup style={{ 'maxWidth': '600px' }} options={[
                                                        { label: '无', value: 'a' },
                                                        { label: 'β受体阻滞剂（βRB）', value: 'b' },
                                                        { label: '钙离子通道拮抗剂（CCB）', value: 'c' },
                                                        { label: '利尿药', value: 'e' },
                                                        { label: 'α受体阻滞剂（αRB）', value: 'f' },
                                                        { label: '血管紧张素转化酶抑制剂（ACEI）', value: 'g' },
                                                        { label: '利尿血管紧张素Ⅱ受体阻滞剂（ARB）', value: 'h' },
                                                        { label: '其他 (合并用药表格)', value: 'i' },
                                                    ]} />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                </span> : null
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="血脂异常">
                            {
                                getFieldDecorator('key16', {
                                    initialValue: 'a',
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key16') == 2 ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key17', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>已诊断<Input className="small-input" />年</span>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key18', {
                                                initialValue: 'a',
                                                rules: [{ required: "true" }]
                                            })(
                                                <span><Input className="small-input" />月</span>
                                            )
                                        }
                                    </FormItem>
                                    <div style={{ 'maxWidth': '500px' }}>
                                        <FormItem label="高甘油三酯血症">
                                            {
                                                getFieldDecorator('key19', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="高胆固醇血症">
                                            {
                                                getFieldDecorator('key20', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="高低密度脂蛋白胆固醇血症">
                                            {
                                                getFieldDecorator('key21', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="低高密度脂蛋白胆固醇血症">
                                            {
                                                getFieldDecorator('key22', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="使用调脂药">
                                            {
                                                getFieldDecorator('key23', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                </span> : null
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="高尿酸血症/痛风">
                            {
                                getFieldDecorator('key24', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key24') == 2 ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key25', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>如有，已诊断<Input className="small-input" />年</span>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key26', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <span><Input className="small-input" />月</span>
                                            )
                                        }
                                    </FormItem>

                                    <div>
                                        <FormItem label="近3个月药物治疗">
                                            {
                                                getFieldDecorator('key27', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="脂肪肝">
                            {
                                getFieldDecorator('key28', {
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">无</Radio>
                                        <Radio value="2">有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('key28') == 2 ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key29', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <span>请提供已发现<Input className="small-input" />年</span>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('key30', {
                                                rules: [{ required: "true" }]
                                            })(
                                                <span><Input className="small-input" />月</span>
                                            )
                                        }
                                    </FormItem>
                                    <div>
                                        <FormItem label="近3个月药物治疗">
                                            {
                                                getFieldDecorator('key31', {
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group>
                                                        <Radio value="1">无</Radio>
                                                        <Radio value="2">有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                </span> : null
                            }
                        </FormItem>
                    </div>

                    <FormItem label="妊娠期糖尿病史（女性）">
                        {
                            getFieldDecorator('key32', {
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group>
                                    <Radio value="1">无</Radio>
                                    <Radio value="2">有</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>

                    <div>
                        <FormItem>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button onClick={this.props.onCancel}>取消</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        )
    }
}

const ThisForm = Form.create()(Module3);

export default ThisForm