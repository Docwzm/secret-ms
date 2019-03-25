/**
 * 病史&不良嗜好
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { getFilterProper } from '../../utils/crfForm'
import TheRapyForm from './17_THERAPY_form';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Module3 extends Component {

    componentWillMount() {
        this.setState({
            formData: JSON.parse(JSON.stringify(this.props.formData))
        })
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            if(values.dyslipidemiaFlag||values.fattyLiverFlag||values.hypertensionFlag||values.hyperuricemiaFlag){
                values.hypertensionDuration = values.hypertensionDurationYear + '-' + values.hypertensionDurationMonth;
                values.dyslipidemiaDuration = values.dyslipidemiaDurationYear + '-' + values.dyslipidemiaDurationMonth;
                values.hyperuricemiaDuration = values.hyperuricemiaDurationYear + '-' + values.hyperuricemiaDurationMonth;
                values.fattyLiverDuration = values.fattyLiverDurationYear + '-' + values.fattyLiverDurationMonth;
                delete values.hypertensionDurationYear
                delete values.hypertensionDurationMonth;
                delete values.dyslipidemiaDurationYear;
                delete values.dyslipidemiaDurationMonth;
                delete values.hyperuricemiaDurationYear;
                delete values.hyperuricemiaDurationMonth;
                delete values.fattyLiverDurationYear;
                delete values.fattyLiverDurationMonth;
            }

            for(let x in values){
                if(x.indexOf('dyslipidemiaAntilipemicPharmacy_')==0||x.indexOf('hypertensionPharmacy_')==0){
                    delete values[x];
                }
                if(typeof values[x] == 'object'){
                    if(values[x].format){
                        values[x] = values[x].format('YYYY-MM-DD')
                    }else{
                        values[x] = values[x].join('、')
                    }
                }
            }

            if(values.dyslipidemiaAntilipemicFlag){
                values.dyslipidemiaAntilipemicPharmacy = this.state.formData.dyslipidemiaAntilipemicPharmacy;
            }

            if(values.hypertensionPharmacyType.indexOf('其他')>=0){
                values.hypertensionPharmacy = this.state.formData.hypertensionPharmacy;
            }

            console.log(values);
            this.props.onSubmit(values)
        });
    }


    handleChange = (name, index, type, event) => {
        if (!this.state.formData[name]) {
            this.state.formData[name] = [];
        }
        if (!this.state.formData[name][index]) {
            this.state.formData[name][index] = {}
        }
        if (event.target) {
            this.state.formData[name][index][type] = event.target.value
        } else {
            if (type == 'saeFlag') {
                this.state.formData[name][index][type] = event
            } else {
                this.state.formData[name][index][type] = event.format('YYYY-MM-DD')
            }
        }
        console.log(this.state.formData[name][index][type])
        console.log(this.state.formData[name])
    }

    handleAdd(name) {
        if (!this.state.formData[name]) {
            this.state.formData[name] = []
        }
        let data = this.state.formData[name].concat([{}])
        this.setState({
            formData: Object.assign({}, this.state.formData, { [name]: data })
        })
    }

    handleDelete = (name, index) => {
        if (!this.state.formData[name]) {
            this.state.formData[name] = []
        }
        this.state.formData[name].splice(index, 1)
        this.setState({
            formData: Object.assign({}, this.state.formData)
        })
    }

    render() {
        let {
            diabetesDate,
            diabetesSymptomFlag,
            diabetesSymptomDuration,
            diabetesSymptom,
            diabetesFamilyFlag,
            drinkFlag,
            drinkYearNum,
            drinkAvgQuantity,
            drinkType,
            drinkAbstinenceFlag,
            drinkAbstinenceYearNum,
            smokeFlag,
            smokeYearNum,
            smokeAvgQuantity,
            smokeAbstinenceFlag,
            smokeAbstinenceYearNum,
            hypertensionFlag,
            hypertensionDuration,
            hypertensionPharmacyType,
            hypertensionPharmacyTypeOther,
            hypertensionPharmacy,
            dyslipidemiaFlag,
            dyslipidemiaDuration,
            dyslipidemiaHypertriglyceridemiaFlag,
            dyslipidemiaHighCholesterolFlag,
            dyslipidemiaHdlCholesterolFlag,
            dyslipidemiaLdlCholesterolFlag,
            dyslipidemiaAntilipemicFlag,
            dyslipidemiaAntilipemicPharmacy,
            hyperuricemiaFlag,
            hyperuricemiaDuration,
            hyperuricemiaDrugsTherapy,
            fattyLiverFlag,
            fattyLiverDuration,
            fattyLiverDrugsTherapy,
            gestationalDiabetesFlag
        } = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return (
            <div className="form-3">
                <div className="title">病史/不良嗜好</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <FormItem label="糖尿病确诊日期">
                            {
                                getFieldDecorator('diabetesDate', {
                                    initialValue: moment(diabetesDate),
                                    rules: [{ required: "true" }]
                                })(
                                    <DatePicker disabled={disabled} />
                                )
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="糖尿病相关症状">
                            {
                                getFieldDecorator('diabetesSymptomFlag', {
                                    initialValue: diabetesSymptomFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        {
                            getFieldValue('diabetesSymptomFlag') ? <span>持续时间<FormItem label="">
                                {
                                    getFieldDecorator('diabetesSymptomDuration', {
                                        initialValue: moment(diabetesSymptomDuration),
                                        rules: [{ required: "true" }]
                                    })(
                                        <DatePicker disabled={disabled} />
                                    )
                                }
                            </FormItem></span> : null
                        }
                    </div>

                    <div>
                        <FormItem label="主要症状">
                            {
                                getFieldDecorator('diabetesSymptom', {
                                    initialValue: diabetesSymptom?diabetesSymptom.split('、'):[],
                                    rules: [{ required: "true" }]
                                })(
                                    <CheckboxGroup disabled={disabled} options={[
                                        { label: '口干', value: '口干' },
                                        { label: '多饮', value: '多饮' },
                                        { label: '多尿', value: '多尿' },
                                        { label: '消瘦', value: '消瘦' },
                                        { label: '其他', value: '其他' },
                                    ]} />
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="糖尿病家族史">
                            {
                                getFieldDecorator('diabetesFamilyFlag', {
                                    initialValue: diabetesFamilyFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="嗜酒">
                            {
                                getFieldDecorator('drinkFlag', {
                                    initialValue: drinkFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>否</Radio>
                                        <Radio value={true}>是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('drinkFlag') ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('drinkYearNum', {
                                                initialValue: drinkYearNum,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="请提供" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )

                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('drinkAvgQuantity', {
                                                initialValue: drinkAvgQuantity,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="平均" addonAfter="两/天" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <div>
                                        <FormItem label="种类">
                                            {
                                                getFieldDecorator('drinkType', {
                                                    initialValue: drinkType?drinkType.split('、'):[],
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <CheckboxGroup disabled={disabled} options={[
                                                        { label: '白酒', value: '白酒' },
                                                        { label: '红酒', value: '红酒' },
                                                        { label: '啤酒', value: '啤酒' },
                                                        { label: '其他', value: '其他' },
                                                    ]} />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <FormItem label="戒酒">
                                        {
                                            getFieldDecorator('drinkAbstinenceFlag', {
                                                initialValue: drinkAbstinenceFlag,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Radio.Group disabled={disabled}>
                                                    <Radio value={false}>否</Radio>
                                                    <Radio value={true}>是</Radio>
                                                </Radio.Group>
                                            )
                                        }
                                        {
                                            getFieldValue('drinkAbstinenceFlag') ? <FormItem>
                                                {
                                                    getFieldDecorator('drinkAbstinenceYearNum', {
                                                        initialValue: drinkAbstinenceYearNum,
                                                        rules: [{ required: "true" }]
                                                    })(
                                                        <Input addonBefore="已戒" addonAfter="年" disabled={disabled} className="cover-input" />
                                                    )
                                                }
                                            </FormItem> : null
                                        }
                                    </FormItem>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="嗜烟">
                            {
                                getFieldDecorator('smokeFlag', {
                                    initialValue: smokeFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>否</Radio>
                                        <Radio value={true}>是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('smokeFlag') ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('smokeYearNum', {
                                                initialValue: smokeYearNum,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="请提供吸烟" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )

                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('smokeAvgQuantity', {
                                                initialValue: smokeAvgQuantity,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="平均" addonAfter="支/天" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    <div>
                        <FormItem label="戒烟">
                            {
                                getFieldDecorator('smokeAbstinenceFlag', {
                                    initialValue: smokeAbstinenceFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>否</Radio>
                                        <Radio value={true}>是</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('smokeAbstinenceFlag') ? <span>
                                    <FormItem>
                                        {

                                            getFieldDecorator('smokeAbstinenceYearNum', {
                                                initialValue: smokeAbstinenceYearNum,
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="请提供已戒" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )

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
                                getFieldDecorator('hypertensionFlag', {
                                    initialValue: hypertensionFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('hypertensionFlag') ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('hypertensionDurationYear', {
                                                initialValue: getFilterProper(hypertensionDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="已经诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('hypertensionDurationMonth', {
                                                initialValue: getFilterProper(hypertensionDuration, 1),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <div>
                                        <FormItem label="近3月用药种类">
                                            {
                                                getFieldDecorator('hypertensionPharmacyType', {
                                                    initialValue: hypertensionPharmacyType?hypertensionPharmacyType.split('、'):[],
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <CheckboxGroup disabled={disabled} style={{ 'maxWidth': '600px' }} options={[
                                                        { label: '无', value: '无' },
                                                        { label: 'β受体阻滞剂（βRB）', value: 'β受体阻滞剂（βRB）' },
                                                        { label: '钙离子通道拮抗剂（CCB）', value: '钙离子通道拮抗剂（CCB）' },
                                                        { label: '利尿药', value: '利尿药' },
                                                        { label: 'α受体阻滞剂（αRB）', value: 'α受体阻滞剂（αRB）' },
                                                        { label: '血管紧张素转化酶抑制剂（ACEI）', value: '血管紧张素转化酶抑制剂（ACEI）' },
                                                        { label: '利尿血管紧张素Ⅱ受体阻滞剂（ARB）', value: '利尿血管紧张素Ⅱ受体阻滞剂（ARB）' },
                                                        { label: '其他', value: '其他' },
                                                    ]} />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    {
                                        getFieldValue('hypertensionPharmacyType').indexOf('其他') >= 0 ? <TheRapyForm name="hypertensionPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} disabled={disabled} /> : null
                                    }
                                </span> : null
                            }
                        </FormItem>
                    </div>
                    
                    <div>
                        <FormItem label="血脂异常">
                            {
                                getFieldDecorator('dyslipidemiaFlag', {
                                    initialValue: dyslipidemiaFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('dyslipidemiaFlag') ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('dyslipidemiaDurationYear', {
                                                initialValue: getFilterProper(dyslipidemiaDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="已诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('dyslipidemiaDurationMonth', {
                                                initialValue: getFilterProper(dyslipidemiaDuration, 1),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <div style={{ 'maxWidth': '500px' }}>
                                        <FormItem label="高甘油三酯血症">
                                            {
                                                getFieldDecorator('dyslipidemiaHypertriglyceridemiaFlag', {
                                                    initialValue: dyslipidemiaHypertriglyceridemiaFlag,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="高胆固醇血症">
                                            {
                                                getFieldDecorator('dyslipidemiaHighCholesterolFlag', {
                                                    initialValue: dyslipidemiaHighCholesterolFlag,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="高低密度脂蛋白胆固醇血症">
                                            {
                                                getFieldDecorator('dyslipidemiaHdlCholesterolFlag', {
                                                    initialValue: dyslipidemiaHdlCholesterolFlag,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="低高密度脂蛋白胆固醇血症">
                                            {
                                                getFieldDecorator('dyslipidemiaLdlCholesterolFlag', {
                                                    initialValue: dyslipidemiaLdlCholesterolFlag,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="使用调脂药">
                                            {
                                                getFieldDecorator('dyslipidemiaAntilipemicFlag', {
                                                    initialValue: dyslipidemiaAntilipemicFlag,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
                                                    </Radio.Group>
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    {
                                        getFieldValue('dyslipidemiaAntilipemicFlag') ? <TheRapyForm name="dyslipidemiaAntilipemicPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} disabled={disabled} /> : null
                                    }
                                </span> : null
                            }
                        </FormItem>
                    </div>

                    <div>
                        <FormItem label="高尿酸血症/痛风">
                            {
                                getFieldDecorator('hyperuricemiaFlag', {
                                    initialValue: hyperuricemiaFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('hyperuricemiaFlag') ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('hyperuricemiaDurationYear', {
                                                initialValue: getFilterProper(hyperuricemiaDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="如有，已诊断" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('hyperuricemiaDurationMonth', {
                                                initialValue: getFilterProper(hyperuricemiaDuration, 1),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>

                                    <div>
                                        <FormItem label="近3个月药物治疗">
                                            {
                                                getFieldDecorator('hyperuricemiaDrugsTherapy', {
                                                    initialValue: hyperuricemiaDrugsTherapy,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
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
                                getFieldDecorator('fattyLiverFlag', {
                                    initialValue: fattyLiverFlag,
                                    rules: [{ required: "true" }]
                                })(
                                    <Radio.Group disabled={disabled}>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('fattyLiverFlag') ? <span>
                                    <FormItem>
                                        {
                                            getFieldDecorator('fattyLiverDurationYear', {
                                                initialValue: getFilterProper(fattyLiverDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonBefore="请提供已发现" addonAfter="年" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem>
                                        {
                                            getFieldDecorator('fattyLiverDurationMonth', {
                                                initialValue: getFilterProper(fattyLiverDuration, 0),
                                                rules: [{ required: "true" }]
                                            })(
                                                <Input addonAfter="月" disabled={disabled} className="cover-input" />
                                            )
                                        }
                                    </FormItem>
                                    <div>
                                        <FormItem label="近3个月药物治疗">
                                            {
                                                getFieldDecorator('fattyLiverDrugsTherapy', {
                                                    initialValue: fattyLiverDrugsTherapy,
                                                    rules: [{ required: "true" }]
                                                })(
                                                    <Radio.Group disabled={disabled}>
                                                        <Radio value={false}>无</Radio>
                                                        <Radio value={true}>有</Radio>
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
                            getFieldDecorator('gestationalDiabetesFlag', {
                                initialValue: gestationalDiabetesFlag,
                                rules: [{ required: "true" }]
                            })(
                                <Radio.Group disabled={disabled}>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
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

const ThisForm = Form.create()(Module3);

export default ThisForm