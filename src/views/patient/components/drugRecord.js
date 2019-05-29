/**
 * 用药记录
 */
import React, { Component } from 'react';
import { Form,  Button } from 'antd';
import TheRapyForm from '../../../components/Crf_form/17_THERAPY_form';
import { getDrugRecord,saveDrugRecord } from '../../../apis/crf'

class drugRecord extends Component {
    state = {
        formData:{}
    }

    componentWillMount() {
        // this.setState({
        //     formData: JSON.parse(JSON.stringify(this.props.data))
        // })
        this.setState({
            userId:this.props.patientId
        })
        this.getDrugRecord(this.props.patientId)
    }

    getDrugRecord(userId){
        getDrugRecord({
            userId
        }).then(res => {
            // if(res.data&&res.data.length!=0){
                let formData = Object.assign({},this.state.formData,{pharmacy:res.data})
                this.setState({
                    formData
                },() => {
                    console.log(this.state)
                })
            // }
        })
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            let crfPharmacyParamList = this.state.formData.pharmacy
            saveDrugRecord({
                userId:this.state.userId,
                crfPharmacyParamList
            }).then(res => {
                this.setCanSave(false)
            })
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
        this.setCanSave(true)
    }

    handleDelete = (name, index) => {
        if (this.state.formData[name]) {
            this.state.formData[name].splice(index, 1)
            this.setState({
                formData: Object.assign({}, this.state.formData)
            })
            this.setCanSave(true)
        }
    }

    handleCancel() {
        this.props.form.resetFields();
        this.setCanSave(false)
    }

    setCanSave(canSave){
        this.props.form.setFieldsValue({
            canSave
        })
    }

    render() {
        const {getFieldValue} = this.props.form
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <TheRapyForm name="pharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} />
                </Form>
                {
                    getFieldValue('canSave')? <div style={styles.btnWrap}>
                        <Button style={styles.footBtn} id="form-submit-btn" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const styles = {
    btnWrap:{
        textAlign:'right',
        margin: '20px 0'
    },
    footBtn:{
        marginRight:'20px',
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if(!props.form.getFieldValue('canSave')){
            props.form.setFieldsValue({
                canSave:true
            });
        }
    }
})(drugRecord);

export default ThisForm