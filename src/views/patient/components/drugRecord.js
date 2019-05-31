/**
 * 用药记录
 */
import React, { Component } from 'react';
import { Form,  Button } from 'antd';
import TheRapyForm from '../../../components/Crf_form/17_THERAPY_form';
import { getDrugRecord,saveDrugRecord } from '../../../apis/crf'

class drugRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originData:{},
            formData:{}
        }
    }

    componentWillMount() {
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
                    originData:JSON.parse(JSON.stringify(formData)),
                    formData
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
        this.setCanSave(true)
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
        this.setState({
            canSave:false,
            formData:JSON.parse(JSON.stringify(this.state.originData))
        })
    }

    setCanSave(canSave){
        this.setState({
            canSave
        })
    }

    render() {
        return (
            <div className="crf-form-wrap" style={styles.wrap}>
                <Form onSubmit={this.handleSubmit.bind(this)} style={styles.form}>
                    <TheRapyForm name="pharmacy" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} data={this.state.formData} form={this.props.form} />
                </Form>
                {
                    this.state.canSave? <div style={styles.btnWrap}>
                        <Button style={styles.footBtn} id="form-submit-btn" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const styles = {
    wrap:{
        border:0
    },
    form:{
        paddingLeft:0
    },
    btnWrap:{
        textAlign:'right',
        margin: '20px 0'
    },
    footBtn:{
        marginRight:'20px',
    }
}

const ThisForm = Form.create()(drugRecord);

export default ThisForm