/**
 * 病史&不良嗜好
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { getFilterProper } from '../../utils/crfForm'
import TheRapyForm from './17_THERAPY_form';
import { validIntNumber } from '../../utils/formValidate'
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
            if (values.dyslipidemiaFlag || values.fattyLiverFlag || values.hypertensionFlag || values.hyperuricemiaFlag) {
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

            for (let x in values) {
                if (x.indexOf('dyslipidemiaAntilipemicPharmacy_') == 0 || x.indexOf('hypertensionPharmacy_') == 0) {
                    delete values[x];
                }
                if (typeof values[x] == 'object') {
                    if (values[x].format) {
                        values[x] = values[x].format('YYYY-MM-DD')
                    } else {
                        values[x] = values[x].join('、')
                    }
                }
            }

            if (values.dyslipidemiaAntilipemicFlag) {
                values.dyslipidemiaAntilipemicPharmacy = this.state.formData.dyslipidemiaAntilipemicPharmacy;
            }

            if (values.hypertensionFlag && values.hypertensionPharmacyType.indexOf('其他') >= 0) {
                values.hypertensionPharmacy = this.state.formData.hypertensionPharmacy;
            }

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
    }

    handleAdd(name) {
        if (!this.state.formData[name] || this.state.formData[name].length == 0) {
            this.state.formData[name] = [{}]
        }
        let data = this.state.formData[name].concat([{}])
        this.setState({
            formData: Object.assign({}, this.state.formData, { [name]: data })
        })
        this.props.setCanSave(true)
    }

    handleDelete = (name, index) => {
        if (!this.state.formData[name]) {
            this.state.formData[name] = []
        }
        this.state.formData[name].splice(index, 1)
        this.setState({
            formData: Object.assign({}, this.state.formData)
        })
        this.props.setCanSave(true)
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
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 9 },
            },
        };
        return (
            <div className="form-3">
                <div className="title">病史/不良嗜好</div>
                <Form labelAlign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="糖尿病确诊日期">
                        {
                            getFieldDecorator('diabetesDate', {
                                initialValue: moment(diabetesDate),
                            })(
                                <DatePicker />
                            )
                        }
                    </FormItem>

                    <FormItem label="糖尿病相关症状">
                        {
                            getFieldDecorator('diabetesSymptomFlag', {
                                initialValue: diabetesSymptomFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('diabetesSymptomFlag') ? <span>持续时间&nbsp;<FormItem className="inline-item" label="">
                                {
                                    getFieldDecorator('diabetesSymptomDuration', {
                                        initialValue: moment(diabetesSymptomDuration),
                                    })(
                                        <DatePicker />
                                    )
                                }
                            </FormItem></span> : null
                        }
                    </FormItem>

                    <FormItem label="主要症状">
                        {
                            getFieldDecorator('diabetesSymptom', {
                                initialValue: diabetesSymptom ? diabetesSymptom.split('、') : [],
                            })(
                                <CheckboxGroup options={[
                                    { label: '口干', value: '口干' },
                                    { label: '多饮', value: '多饮' },
                                    { label: '多尿', value: '多尿' },
                                    { label: '消瘦', value: '消瘦' },
                                    { label: '其他', value: '其他' },
                                ]} />
                            )
                        }
                    </FormItem>
                    <FormItem label="糖尿病家族史">
                        {
                            getFieldDecorator('diabetesFamilyFlag', {
                                initialValue: diabetesFamilyFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                    <FormItem label="嗜酒">
                        {
                            getFieldDecorator('drinkFlag', {
                                initialValue: drinkFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('drinkFlag') ? <FormItem className="inline-item">
                                <FormItem className="inline-item">
                                    {

                                        getFieldDecorator('drinkYearNum', {
                                            initialValue: drinkYearNum,
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="请提供" addonAfter="年" className="cover-input" />
                                        )

                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('drinkAvgQuantity', {
                                            initialValue: drinkAvgQuantity,
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="平均" addonAfter="两/天" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="种类" {...formItemLayout}>
                                    {
                                        getFieldDecorator('drinkType', {
                                            initialValue: drinkType ? drinkType.split('、') : [],
                                        })(
                                            <CheckboxGroup className="no-wrap" options={[
                                                { label: '白酒', value: '白酒' },
                                                { label: '红酒', value: '红酒' },
                                                { label: '啤酒', value: '啤酒' },
                                                { label: '其他', value: '其他' },
                                            ]} />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="戒酒" {...formItemLayout}>
                                    {
                                        getFieldDecorator('drinkAbstinenceFlag', {
                                            initialValue: drinkAbstinenceFlag,
                                        })(
                                            <Radio.Group>
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
                                                })(
                                                    <Input addonBefore="已戒" addonAfter="年" className="cover-input" />
                                                )
                                            }
                                        </FormItem> : null
                                    }
                                </FormItem>
                            </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="嗜烟">
                        {
                            getFieldDecorator('smokeFlag', {
                                initialValue: smokeFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('smokeFlag') ? <span>
                                <FormItem className="inline-item">
                                    {

                                        getFieldDecorator('smokeYearNum', {
                                            initialValue: smokeYearNum,
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="请提供吸烟" addonAfter="年" className="cover-input" />
                                        )

                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('smokeAvgQuantity', {
                                            initialValue: smokeAvgQuantity,
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="平均" addonAfter="支/天" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    <FormItem label="戒烟">
                        {
                            getFieldDecorator('smokeAbstinenceFlag', {
                                initialValue: smokeAbstinenceFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>否</Radio>
                                    <Radio value={true}>是</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('smokeAbstinenceFlag') ? <span>
                                <FormItem className="inline-item">
                                    {

                                        getFieldDecorator('smokeAbstinenceYearNum', {
                                            initialValue: smokeAbstinenceYearNum,
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="请提供已戒" addonAfter="年" className="cover-input" />
                                        )

                                    }
                                </FormItem>
                            </span> : null
                        }
                    </FormItem>
                    {/* <div>其他疾病1</div> */}
                    <FormItem label="高血压病">
                        {
                            getFieldDecorator('hypertensionFlag', {
                                initialValue: hypertensionFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('hypertensionFlag') ? <FormItem className="inline-item">
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('hypertensionDurationYear', {
                                            initialValue: getFilterProper(hypertensionDuration, 0),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="已经诊断" addonAfter="年" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('hypertensionDurationMonth', {
                                            initialValue: getFilterProper(hypertensionDuration, 1),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonAfter="月" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="近3月用药种类">
                                    {
                                        getFieldDecorator('hypertensionPharmacyType', {
                                            initialValue: hypertensionPharmacyType ? hypertensionPharmacyType.split('、') : [],
                                        })(
                                            <CheckboxGroup style={{ 'maxWidth': '600px' }} options={[
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
                            </FormItem> : null
                        }
                    </FormItem>
                    {
                        getFieldValue('hypertensionFlag') && getFieldValue('hypertensionPharmacyType') && getFieldValue('hypertensionPharmacyType').indexOf('其他') >= 0 ? <TheRapyForm name="hypertensionPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
                    }
                    <FormItem label="血脂异常">
                        {
                            getFieldDecorator('dyslipidemiaFlag', {
                                initialValue: dyslipidemiaFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('dyslipidemiaFlag') ? <FormItem className="inline-item">
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('dyslipidemiaDurationYear', {
                                            initialValue: getFilterProper(dyslipidemiaDuration, 0),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="已诊断" addonAfter="年" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('dyslipidemiaDurationMonth', {
                                            initialValue: getFilterProper(dyslipidemiaDuration, 1),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonAfter="月" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="高甘油三酯血症" {...formItemLayout2}>
                                    {
                                        getFieldDecorator('dyslipidemiaHypertriglyceridemiaFlag', {
                                            initialValue: dyslipidemiaHypertriglyceridemiaFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                                <FormItem label="高胆固醇血症"  {...formItemLayout2}>
                                    {
                                        getFieldDecorator('dyslipidemiaHighCholesterolFlag', {
                                            initialValue: dyslipidemiaHighCholesterolFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                                <FormItem label="高低密度脂蛋白胆固醇血症"  {...formItemLayout2}>
                                    {
                                        getFieldDecorator('dyslipidemiaHdlCholesterolFlag', {
                                            initialValue: dyslipidemiaHdlCholesterolFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                                <FormItem label="低高密度脂蛋白胆固醇血症"  {...formItemLayout2}>
                                    {
                                        getFieldDecorator('dyslipidemiaLdlCholesterolFlag', {
                                            initialValue: dyslipidemiaLdlCholesterolFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                                <FormItem label="使用调脂药"  {...formItemLayout2}>
                                    {
                                        getFieldDecorator('dyslipidemiaAntilipemicFlag', {
                                            initialValue: dyslipidemiaAntilipemicFlag,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                            </FormItem> : null
                        }
                    </FormItem>
                    {
                        getFieldValue('dyslipidemiaFlag') && getFieldValue('dyslipidemiaAntilipemicFlag') ? <TheRapyForm name="dyslipidemiaAntilipemicPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
                    }

                    <FormItem label="高尿酸血症/痛风">
                        {
                            getFieldDecorator('hyperuricemiaFlag', {
                                initialValue: hyperuricemiaFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('hyperuricemiaFlag') ? <FormItem className="inline-item">
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('hyperuricemiaDurationYear', {
                                            initialValue: getFilterProper(hyperuricemiaDuration, 0),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="如有，已诊断" addonAfter="年" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('hyperuricemiaDurationMonth', {
                                            initialValue: getFilterProper(hyperuricemiaDuration, 1),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonAfter="月" className="cover-input" />
                                        )
                                    }
                                </FormItem>

                                <FormItem label="近3个月药物治疗" {...formItemLayout2}>
                                    {
                                        getFieldDecorator('hyperuricemiaDrugsTherapy', {
                                            initialValue: hyperuricemiaDrugsTherapy,
                                        })(
                                            <Radio.Group className="no-wrap">
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                            </FormItem> : null
                        }
                    </FormItem>
                    <FormItem label="脂肪肝">
                        {
                            getFieldDecorator('fattyLiverFlag', {
                                initialValue: fattyLiverFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            getFieldValue('fattyLiverFlag') ? <FormItem className="inline-item">
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('fattyLiverDurationYear', {
                                            initialValue: getFilterProper(fattyLiverDuration, 0),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonBefore="请提供已发现" addonAfter="年" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem className="inline-item">
                                    {
                                        getFieldDecorator('fattyLiverDurationMonth', {
                                            initialValue: getFilterProper(fattyLiverDuration, 0),
                                            rules: [{
                                                validator: validIntNumber
                                            }]
                                        })(
                                            <Input addonAfter="月" className="cover-input" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label="近3个月药物治疗" {...formItemLayout2}>
                                    {
                                        getFieldDecorator('fattyLiverDrugsTherapy', {
                                            initialValue: fattyLiverDrugsTherapy,
                                        })(
                                            <Radio.Group className="no-wrap">
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                            </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="妊娠期糖尿病史（女性）">
                        {
                            getFieldDecorator('gestationalDiabetesFlag', {
                                initialValue: gestationalDiabetesFlag,
                            })(
                                <Radio.Group>
                                    <Radio value={false}>无</Radio>
                                    <Radio value={true}>有</Radio>
                                </Radio.Group>
                            )
                        }
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button type="primary" disabled={this.props.disabled} onClick={this.handleSubmit.bind(this)}>保存</Button>
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
})(Module3);

export default ThisForm