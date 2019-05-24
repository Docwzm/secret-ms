/**
 * 辅助检查
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input } from 'antd';
import { validDoubleNumber, validIntNumber } from '../../utils/formValidate'
const FormItem = Form.Item;

class Module4 extends Component {
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
            cervicalThickness,
            arterialStenosisPercent,
            lowerArteryFlag,
            arterialPlaqueFlag,
            arteriosclerosisFlag,
            arterialStenosisFlag,
            fattyLiverFlag, fattyLiverOtherFlag,
            abiOffside,
            abiLeftside,
            ophthalmologyFlag,
            diabeticRetinopathyFlag,
            diabeticRetinopathyOd,
            diabeticRetinopathyOs,
            macularOedemaFlag,
            macularOedemaOd,
            macularOedemaOs,
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
                <div className="title">辅助检查</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="心电图">
                        {
                            getFieldDecorator('a', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={false}>未做</Radio>
                                    <Radio value={true}>已做</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('a') ? <FormItem className="inline-item">
                                {
                                    getFieldDecorator('i', {
                                        initialValue: '',
                                    })(
                                        <Radio.Group>
                                            <Radio value={false}>正常</Radio>
                                            <Radio value={true}>异常</Radio>
                                        </Radio.Group>
                                    )
                                }
                                {
                                    getFieldValue('i') ? <span class="inline-item">
                                        {
                                            getFieldDecorator('j', {
                                                initialValue: '',
                                            })(
                                                <Input />
                                            )
                                        }
                                    </span> : null
                                }
                            </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="颈部大血管多普勒">
                        {
                            getFieldDecorator('b', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={false}>未做</Radio>
                                    <Radio value={true}>已做</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('b') ? <FormItem className="inline-item">
                                {
                                    getFieldDecorator('cervicalThickness', {
                                        initialValue: cervicalThickness,
                                        rules: [{
                                            validator: validDoubleNumber
                                        }]
                                    })(
                                        <Input addonBefore="颈动脉内膜中层厚度" addonAfter="mm" />
                                    )
                                }
                                <FormItem label="其他异常">
                                    <FormItem label="动脉斑块" {...formItemLayout}>
                                        {
                                            getFieldDecorator('arterialPlaqueFlag', {
                                                initialValue: arterialPlaqueFlag,
                                            })(
                                                <Radio.Group>
                                                    <Radio value={false}>无</Radio>
                                                    <Radio value={true}>有</Radio>
                                                </Radio.Group>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="动脉硬化" {...formItemLayout}>
                                        {
                                            getFieldDecorator('arteriosclerosisFlag', {
                                                initialValue: arteriosclerosisFlag,
                                            })(
                                                <Radio.Group>
                                                    <Radio value={false}>无</Radio>
                                                    <Radio value={true}>有</Radio>
                                                </Radio.Group>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label="动脉狭窄" {...formItemLayout}>
                                        {
                                            getFieldDecorator('arterialStenosisFlag', {
                                                initialValue: arterialStenosisFlag,
                                            })(
                                                <Radio.Group>
                                                    <Radio value={false}>无</Radio>
                                                    <Radio value={true}>有</Radio>
                                                </Radio.Group>
                                            )
                                        }
                                        {
                                            getFieldValue('arterialStenosisFlag') ?
                                                <FormItem className="inline-item">
                                                    {
                                                        getFieldDecorator('arterialStenosisPercent', {
                                                            initialValue: arterialStenosisPercent,
                                                            rules: [{
                                                                validator: validDoubleNumber
                                                            }]
                                                        })(
                                                            <Input addonAfter="%" className="cover-input" />
                                                        )
                                                    }
                                                </FormItem> : null
                                        }
                                    </FormItem>
                                </FormItem>
                            </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="双下肢动脉彩超">
                        {
                            getFieldDecorator('c', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={false}>未做</Radio>
                                    <Radio value={true}>已做</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('c') ? <FormItem className="inline-item">
                                {
                                    getFieldDecorator('d', {
                                        initialValue: '',
                                    })(
                                        <Radio.Group>
                                            <Radio value={false}>正常</Radio>
                                            <Radio value={true}>异常</Radio>
                                        </Radio.Group>
                                    )
                                }
                                {
                                    getFieldValue('d') ? <div>
                                        <div className="my-form-item">
                                            <span className="label" style={{ width: '100px' }}>动脉斑块：</span>
                                            <FormItem className="inline-item">
                                                {getFieldDecorator('arterialPlaqueFlag', {
                                                    initialValue: arterialPlaqueFlag,
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )}
                                            </FormItem>
                                        </div>

                                        <div className="my-form-item">
                                            <span className="label" style={{ width: '100px' }}>双动脉硬化：</span>
                                            <FormItem className="inline-item">
                                                {getFieldDecorator('arteriosclerosisFlag', {
                                                    initialValue: arteriosclerosisFlag,
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )}
                                            </FormItem>
                                        </div>

                                        <div className="my-form-item">
                                            <span className="label" style={{ width: '100px' }}>动脉狭窄：</span>
                                            <FormItem className="inline-item">
                                                {getFieldDecorator('arterialStenosisFlag', {
                                                    initialValue: arterialStenosisFlag,
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )}
                                            </FormItem>
                                        </div>

                                    </div> : null
                                }
                            </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="眼科检查">
                        {
                            getFieldDecorator('e', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={false}>未做</Radio>
                                    <Radio value={true}>已做</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('e') ? <FormItem className="inline-item">
                                {
                                    getFieldDecorator('f', {
                                        initialValue: '',
                                    })(
                                        <Radio.Group>
                                            <Radio value={false}>正常</Radio>
                                            <Radio value={true}>异常</Radio>
                                        </Radio.Group>
                                    )
                                }
                                {
                                    getFieldValue('f') ? <div>
                                        <div className="my-form-item">
                                            <span className="label" style={{ width: '130px' }}>糖尿病视网膜病变：</span>
                                            <FormItem className="inline-item">
                                                {getFieldDecorator('diabeticRetinopathyFlag', {
                                                    initialValue: diabeticRetinopathyFlag,
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )}
                                                {
                                                    getFieldValue('diabeticRetinopathyFlag') ? <span>
                                                        <span>为，</span>
                                                        <FormItem className="inline-item">
                                                            {
                                                                getFieldDecorator('diabeticRetinopathyOd', {
                                                                    initialValue: diabeticRetinopathyOd,
                                                                    rules: [{
                                                                        validator: validIntNumber
                                                                    }]
                                                                })(
                                                                    <Input addonAfter="期od" className="cover-input" />
                                                                )
                                                            }
                                                        </FormItem>
                                                        <FormItem className="inline-item">
                                                            {
                                                                getFieldDecorator('diabeticRetinopathyOs', {
                                                                    initialValue: diabeticRetinopathyOs,
                                                                    rules: [{
                                                                        validator: validIntNumber
                                                                    }]
                                                                })(
                                                                    <Input addonAfter="期os" className="cover-input" />
                                                                )
                                                            }
                                                        </FormItem>
                                                    </span> : null
                                                }
                                            </FormItem>
                                        </div>
                                        <div className="my-form-item">
                                            <span className="label" style={{ width: '130px' }}>黄斑水肿：</span>
                                            <FormItem className="inline-item">
                                                {getFieldDecorator('macularOedemaFlag', {
                                                    initialValue: macularOedemaFlag,
                                                })(
                                                    <Radio.Group>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )}
                                                {
                                                    getFieldValue('macularOedemaFlag') ? <span>
                                                        <span>为，</span>
                                                        <FormItem className="inline-item">
                                                            {
                                                                getFieldDecorator('macularOedemaOd', {
                                                                    initialValue: macularOedemaOd,
                                                                    rules: [{
                                                                        validator: validIntNumber
                                                                    }]
                                                                })(
                                                                    <Input addonAfter="期od" className="cover-input" />
                                                                )
                                                            }
                                                        </FormItem>
                                                        <FormItem className="inline-item">
                                                            {
                                                                getFieldDecorator('macularOedemaOs', {
                                                                    initialValue: macularOedemaOs,
                                                                    rules: [{
                                                                        validator: validIntNumber
                                                                    }]
                                                                })(
                                                                    <Input addonAfter="期os" className="cover-input" />
                                                                )
                                                            }
                                                        </FormItem>
                                                    </span> : null
                                                }
                                            </FormItem>
                                        </div>
                                    </div> : null
                                }
                            </FormItem> : null
                        }
                    </FormItem>


                    <FormItem label="踝肱动脉压指数（ABI）">
                        {
                            getFieldDecorator('g', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={false}>未做</Radio>
                                    <Radio value={true}>已做</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('g') ? <FormItem className="inline-item">
                                <div className="my-form-item">
                                    <span className="label">右侧</span>
                                    <FormItem className="inline-item">
                                        {getFieldDecorator('abiOffside', {
                                            initialValue: abiOffside,
                                            rules: [{
                                                validator: validDoubleNumber
                                            }]
                                        })(
                                            <Input></Input>
                                        )}

                                    </FormItem>
                                </div>
                                <div className="my-form-item">
                                    <span className="label">左侧</span>
                                    <FormItem className="inline-item">
                                        {getFieldDecorator('abiLeftside', {
                                            initialValue: abiLeftside,
                                            rules: [{
                                                validator: validDoubleNumber
                                            }]
                                        })(
                                            <Input></Input>
                                        )}
                                    </FormItem>
                                </div>
                            </FormItem> : null
                        }

                    </FormItem>


                    <FormItem label="腹部彩超">
                        {
                            getFieldDecorator('h', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={false}>未做</Radio>
                                    <Radio value={true}>已做</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('h') ? <FormItem className="inline-item">
                                <div className="my-form-item">
                                    <span className="label">脂肪肝</span>
                                    <FormItem className="inline-item">
                                        {getFieldDecorator('fattyLiverFlag', {
                                            initialValue: fattyLiverFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )}
                                    </FormItem>
                                </div>
                                <div className="my-form-item">
                                    <span className="label">其他异常</span>
                                    <FormItem className="inline-item">
                                        {getFieldDecorator('fattyLiverOtherFlag', {
                                            initialValue: fattyLiverOtherFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )}
                                    </FormItem>
                                </div>
                            </FormItem> : null
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
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module4);

export default ThisForm