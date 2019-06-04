/**
 * 病史&不良嗜好
 */
import React, { Component } from 'react';
import { Form, Radio, Button, Input, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { getFilterProper } from '../../../utils/crfForm'
import TheRapyForm from './17_THERAPY_form';
import PicturesWall from '../crfFormUpload'
import { validIntNumber } from '../../../utils/formValidate'
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Module extends Component {

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
            if (values.hyperuricemiaFlag) {
                values.hyperuricemiaDuration = values.hyperuricemiaDurationYear + '-' + values.hyperuricemiaDurationMonth;
                delete values.hyperuricemiaDurationYear;
                delete values.hyperuricemiaDurationMonth;
            }

            if (values.dyslipidemiaFlag) {
                values.dyslipidemiaDuration = values.dyslipidemiaDurationYear + '-' + values.dyslipidemiaDurationMonth;
                delete values.dyslipidemiaDurationYear;
                delete values.dyslipidemiaDurationMonth;
            }

            if (values.fattyLiverFlag) {
                values.fattyLiverDuration = values.fattyLiverDurationYear + '-' + values.fattyLiverDurationMonth;
                delete values.fattyLiverDurationYear;
                delete values.fattyLiverDurationMonth;
            }

            if (values.hypertensionFlag) {
                values.hypertensionDuration = values.hypertensionDurationYear + '-' + values.hypertensionDurationMonth;
                delete values.hypertensionDurationYear
                delete values.hypertensionDurationMonth;
            }

            if(values.diabetesDrugsTherapy){
                values.diabetesPharmacyType = values.diabetesPharmacyType_1 + '、' +values.diabetesPharmacyType_2 + '、' +values.diabetesPharmacyType_3 + '、' +values.diabetesPharmacyType_4 + '、' +values.diabetesPharmacyType_5 + '、' + values.diabetesPharmacyType_6;
                delete values.diabetesPharmacyType_1
                delete values.diabetesPharmacyType_2
                delete values.diabetesPharmacyType_3
                delete values.diabetesPharmacyType_4
                delete values.diabetesPharmacyType_5
                delete values.diabetesPharmacyType_6
            }

            for (let x in values) {
                if (x.indexOf('dyslipidemiaAntilipemicPharmacy_') == 0 || x.indexOf('hypertensionPharmacy_') == 0 || x.indexOf('hyperuricemiaPharmacy_') == 0 || x.indexOf('fattyLiverPharmacy_') == 0 ) {
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

            if (values.dyslipidemiaFlag && values.dyslipidemiaAntilipemicFlag) {
                values.dyslipidemiaAntilipemicPharmacy = this.state.formData.dyslipidemiaAntilipemicPharmacy;
            }

            if (values.hypertensionFlag && values.hypertensionDrugsTherapy && values.hypertensionPharmacyType.length >= 0) {
                values.hypertensionPharmacy = this.state.formData.hypertensionPharmacy;
            }

            if (values.hyperuricemiaFlag && values.hyperuricemiaDrugsTherapy) {
                values.hyperuricemiaPharmacy = this.state.formData.hyperuricemiaPharmacy;
            }

            if (values.fattyLiverFlag && values.fattyLiverDrugsTherapy) {
                values.fattyLiverPharmacy = this.state.formData.fattyLiverPharmacy;
            }

            this.props.onSubmit(values)
        });
    }


    handleChange = (name, index, type, value) => {
        if (!this.state.formData[name]) {
            this.state.formData[name] = [];
        }
        if (!this.state.formData[name][index]) {
            this.state.formData[name][index] = {}
        }

        this.state.formData[name][index][type] = value

    }

    handleAdd(name) {
        if (!this.state.formData[name]) {
            this.state.formData[name] = []
        }
        let data = this.state.formData[name].concat([{}])
        this.setState({
            formData: Object.assign({}, this.state.formData, { [name]: data })
        })
        this.props.setCanSave(true)
    }

    handleDelete = (name, index) => {
        if (this.state.formData[name]) {
            this.state.formData[name].splice(index, 1)
            this.setState({
                formData: Object.assign({}, this.state.formData)
            })
            this.props.setCanSave(true)
        }
    }

    render() {
        let {
            diabetesDate,
            diabetesSymptomFlag,
            diabetesSymptomDuration,
            diabetesSymptom,
            diabetesFamilyFlag,
            diabetesSymptomOther,
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
            hypertensionDrugsTherapy,
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
            gestationalDiabetesFlag,
            diabetesDrugsTherapy,
            diabetesPharmacyType,
            fileList
        } = this.props.formData;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 6 },
                sm: {span: 7 },
                md: { span: 6 },
                lg: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: {span: 17 },
                md: { span: 18 },
                lg: { span: 20 },
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
        const formItemLayout3 = {
            labelCol: {
                xs: { span: 6 },
                sm: {span: 7 },
                md: { span: 6 },
                lg: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: {span: 17 },
                md: { span: 18 },
                lg: { span: 12 },
            },
        };

        return (
            <div className="form-3">
                <Form labelalign="left" {...formItemLayout} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label="糖尿病确诊日期">
                        {
                            getFieldDecorator('diabetesDate', {
                                initialValue: diabetesDate ? moment(diabetesDate) : '',
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
                            getFieldValue('diabetesSymptomFlag') ? <FormItem className="inline-item">
                                <span>持续时间&nbsp;<FormItem className="inline-item" label="">
                                    {
                                        getFieldDecorator('diabetesSymptomDuration', {
                                            initialValue: diabetesSymptomDuration ? moment(diabetesSymptomDuration) : '',
                                        })(
                                            <DatePicker />
                                        )
                                    }
                                </FormItem></span>

                                <div className="my-form-item">
                                    <span className="label">主要症状：</span>
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
                                    {
                                        getFieldValue('diabetesSymptom') && getFieldValue('diabetesSymptom').indexOf('其他')>=0 ? <span>
                                            {
                                                getFieldDecorator('diabetesSymptomOther', {
                                                    initialValue: diabetesSymptomOther,
                                                })(
                                                    <Input className="middle-input"/>
                                                )
                                            }
                                        </span>:null
                                    }
                                </div>

                                <div className="my-form-item">
                                    <span className="label">糖尿病家族史：</span>
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
                                </div>

                            </FormItem> : null
                        }
                    </FormItem>

                    {
                        this.props.crfFormType == '35' ? <FormItem label="近3月内糖尿病治疗方案" >
                            {
                                getFieldDecorator('diabetesDrugsTherapy', {
                                    initialValue: diabetesDrugsTherapy,
                                })(
                                    <Radio.Group>
                                        <Radio value={false}>无</Radio>
                                        <Radio value={true}>有</Radio>
                                    </Radio.Group>
                                )
                            }
                            {
                                getFieldValue('diabetesDrugsTherapy') ? <FormItem className="inline-item">
                                    <div className="my-form-item">
                                        <span className="label" style={styles.diabetesDrugsTherapyLabel}>双股类：</span>
                                        <FormItem className="inline-item">
                                            {
                                                getFieldDecorator('diabetesPharmacyType_1', {
                                                    initialValue: diabetesPharmacyType?diabetesPharmacyType.split('、')[0]:'',
                                                    rules: [{
                                                        validator: validIntNumber
                                                    }]
                                                })(
                                                    <Input addonAfter="mg/日" className="cover-input"/>
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <div className="my-form-item">
                                        <span className="label" style={styles.diabetesDrugsTherapyLabel}>磺脲类：</span>
                                        <FormItem className="inline-item">
                                            {
                                                getFieldDecorator('diabetesPharmacyType_2', {
                                                    initialValue: diabetesPharmacyType?diabetesPharmacyType.split('、')[1]:'',
                                                    rules: [{
                                                        validator: validIntNumber
                                                    }]
                                                })(
                                                    <Input addonAfter="mg/日" className="cover-input" />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <div className="my-form-item">
                                        <span className="label" style={styles.diabetesDrugsTherapyLabel}>葡萄糖苷酶抑制剂：</span>
                                        <FormItem className="inline-item">
                                            {
                                                getFieldDecorator('diabetesPharmacyType_3', {
                                                    initialValue: diabetesPharmacyType?diabetesPharmacyType.split('、')[2]:'',
                                                    rules: [{
                                                        validator: validIntNumber
                                                    }]
                                                })(
                                                    <Input addonAfter="mg/日" className="cover-input" />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <div className="my-form-item">
                                        <span className="label" style={styles.diabetesDrugsTherapyLabel}>格列奈类：</span>
                                        <FormItem className="inline-item">
                                            {
                                                getFieldDecorator('diabetesPharmacyType_4', {
                                                    initialValue: diabetesPharmacyType?diabetesPharmacyType.split('、')[3]:'',
                                                    rules: [{
                                                        validator: validIntNumber
                                                    }]
                                                })(
                                                    <Input addonAfter="mg/日" className="cover-input" />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <div className="my-form-item">
                                        <span className="label" style={styles.diabetesDrugsTherapyLabel}>噻唑烷二酮：</span>
                                        <FormItem className="inline-item">
                                            {
                                                getFieldDecorator('diabetesPharmacyType_5', {
                                                    initialValue: diabetesPharmacyType?diabetesPharmacyType.split('、')[4]:'',
                                                    rules: [{
                                                        validator: validIntNumber
                                                    }]
                                                })(
                                                    <Input addonAfter="mg/日" className="cover-input" />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                    <div className="my-form-item">
                                        <span className="label" style={styles.diabetesDrugsTherapyLabel}>胰岛素治疗：</span>
                                        <FormItem className="inline-item">
                                            {
                                                getFieldDecorator('diabetesPharmacyType_6', {
                                                    initialValue: diabetesPharmacyType?diabetesPharmacyType.split('、')[5]:'',
                                                    rules: [{
                                                        validator: validIntNumber
                                                    }]
                                                })(
                                                    <Input addonAfter="mg/日" className="cover-input" />
                                                )
                                            }
                                        </FormItem>
                                    </div>
                                </FormItem>:null
                            }
                        </FormItem>:null
                    }

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
                                        getFieldValue('drinkAbstinenceFlag') ? <FormItem className="inline-item">
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
                            getFieldValue('smokeFlag') ? <FormItem className="inline-item">
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

                            </FormItem> : null
                        }
                    </FormItem>

                    <FormItem label="戒烟" {...formItemLayout}>
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
                            getFieldValue('smokeAbstinenceFlag') ? <FormItem className="inline-item">
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
                            </FormItem> : null
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
                                <div className="my-form-item">
                                    <span className="label">近3月用药种类:</span>
                                    {
                                        getFieldDecorator('hypertensionDrugsTherapy', {
                                            initialValue: hypertensionDrugsTherapy,
                                        })(
                                            <Radio.Group>
                                                <Radio value={false}>无</Radio>
                                                <Radio value={true}>有</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </div>
                                {
                                    getFieldValue('hypertensionDrugsTherapy') ? <FormItem>
                                        {
                                            getFieldDecorator('hypertensionPharmacyType', {
                                                initialValue: hypertensionPharmacyType ? hypertensionPharmacyType.split('、') : [],
                                            })(

                                                <CheckboxGroup style={{ 'maxWidth': '600px' }} options={[
                                                    // { label: '无', value: '无' },
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
                                    </FormItem> : null
                                }
                            </FormItem> : null
                        }
                    </FormItem>
                    {
                        getFieldValue('hypertensionFlag') && getFieldValue('hypertensionDrugsTherapy') && getFieldValue('hypertensionPharmacyType') && getFieldValue('hypertensionPharmacyType').length > 0 && getFieldValue('hypertensionPharmacyType').indexOf('无') < 0 ? <TheRapyForm name="hypertensionPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
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
                    {
                        getFieldValue('hyperuricemiaFlag') && getFieldValue('hyperuricemiaDrugsTherapy') ? <TheRapyForm name="hyperuricemiaPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
                    }

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
                    {
                        getFieldValue('fattyLiverFlag') && getFieldValue('fattyLiverDrugsTherapy') ? <TheRapyForm name="fattyLiverPharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} /> : null
                    }

                    <FormItem label="妊娠期糖尿病史(女性)">
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
                    <FormItem label="相关资料" {...formItemLayout3}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
                    </FormItem>
                </Form>
                {
                    this.props.canSave ? <div className="btn-wrap">
                        <Button id="form-submit-btn" type="primary" disabled={this.props.disabled} onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.props.onCancel}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const styles = {
    diabetesDrugsTherapyLabel:{
        width:'140px',
        display:'inline-block'
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm