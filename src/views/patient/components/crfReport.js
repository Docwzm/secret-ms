/**
 * 特殊事件记录
 */
import React, { Component } from 'react';
import { Form, Button, Modal } from 'antd';
import AeForm from '../../../components/Crf_form/17_AE_form';
import SaeForm from '../../../components/Crf_form/17_SAE_form';
import SaeTable from '../../../components/Crf_form/17_SAE_table';
import { getCrfReport, saveCrfReport } from '../../../apis/crf'
import '../../../assets/styles/form.scss'

class mySaeForm extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleCancel(){
        this.props.form.resetFields();
        this.props.handleCancel()
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            for (let x in values) {
                if (typeof values[x] == 'object') {
                    if (values[x].format) {
                        values[x] = values[x].format('YYYY-MM-DD')
                    } else {
                        values[x] = values[x].join('、')
                    }
                }
            }
            this.props.handleSubmit(values)
            this.props.form.resetFields();
        })
    }
    render() {
        return (
            <div  className="crf-form-wrap" style={styles.wrap}>
                <Form layout="horizontal" labelalign="left" onSubmit={this.handleSubmit.bind(this)}>
                    <SaeForm type={this.props.type} patientInfo={this.props.patientInfo} data={this.props.data} form={this.props.form}></SaeForm>
                </Form>
                {
                    this.props.type !='check' ?  <div style={styles.btnWrap}>
                        <Button style={styles.footBtn} id="form-submit-btn" type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div> :null
                }
            </div>
        )
    }
}

const MySaeForm = Form.create()(mySaeForm);




class crfReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            originData:{},
            formData: {},
            saeVisible: false,
        }
        this.mySae = React.createRef();
    }

    componentWillMount() {
        console.log(this.props.patientInfo)
        this.setState({
            userId: this.props.patientId
        })
        this.getCrfReport(this.props.patientId)
    }

    getCrfReport(userId) {
        getCrfReport({
            userId
        }).then(res => {
            if (res.data) {
                let formData = Object.assign({}, this.state.formData, {
                    aeReport: res.data.crfAeReportList,
                    saeReport: res.data.crfSaeReportList,
                })
                this.setState({
                    originData:JSON.parse(JSON.stringify(formData)),
                    formData
                })
            }
        })
    }

    saveCrfReport(data) {
        saveCrfReport(data).then(res => {
            this.setCanSave(false)
            this.setState({
                originData:JSON.parse(JSON.stringify(this.state.formData)),
            })
        })
    }

    //提交数据
    handleReportSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (err) return;
            //数据校验通过后，传递到上级提交
            // values.aeReport = this.state.formData.aeReport
            // // values.pharmacy = this.state.formData.pharmacy

            // let data = {};
            // if (this.state.formData.saeReport && this.state.formData.saeReport[0].id) {
            //     data.id = this.state.formData.saeReport[0].id
            // }

            // for (let x in values) {
            //     if (x.indexOf('aeReport_') >= 0 || x.indexOf('pharmacy_') >= 0) {
            //         delete values[x]//删除新增用药和不良事件多余数据
            //     } else {
            //         if (x != 'aeFlag' && x != 'aeReport' && x != 'saeFlag' && x != 'saeReport'
            //             && x != 'pharmacyFlag' && x != 'pharmacy') {
            //             if (typeof values[x] == 'object') {
            //                 if (values[x].format) {
            //                     values[x] = values[x].format('YYYY-MM-DD')
            //                 } else {
            //                     values[x] = values[x].join('、')
            //                 }
            //             }
            //             data[x] = values[x] // sae表单数据封装
            //             delete values[x]
            //         }
            //     }
            // }
            // if (values.saeFlag) {
            //     values.saeReport = [data]
            // }
            let crfAeReportList = this.state.formData.aeReport
            let crfSaeReportList = this.state.formData.saeReport

            // console.log(crfAeReportList)
            // console.log(crfSaeReportList)
            // return false;

            this.saveCrfReport({
                userId: this.state.userId,
                crfAeReportList,
                crfSaeReportList
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

    setCanSave(canSave) {
        this.setState({
            canSave
        })
    }

    handleCancel() {
        this.props.form.resetFields();
        this.setState({
            canSave:false,
            formData:JSON.parse(JSON.stringify(this.state.originData))
        })
    }

    handleSaeSubmit(saeFormData) {
        let saeReport = this.state.formData.saeReport?this.state.formData.saeReport:[];
        if(this.state.saeEditType=='edit'){
            saeReport[this.state.curretnSaeIndex] = saeFormData
        }else{
            saeReport = saeReport.concat([{...saeFormData}])
        }
        
        let formData = Object.assign({},this.state.formData,{saeReport})
        this.setState({
            formData,
            saeVisible: false,
            curretnSaeIndex:null,
            saeEditType:null,
        })
        this.setCanSave(true)
    }

    handleOpenSae(type) {
        this.setState({
            saeVisible: true,
            saeEditType:null,
        })
    }

    handleCheck(name,index,type){
        this.setState({
            currentSaeData:this.state.formData[name][index],
            curretnSaeIndex:index,
            saeVisible: true,
            saeEditType:type
        })
    }

    handleSaeCancel() {
        this.setState({
            saeVisible: false,
            currentSaeData:null
        })
    }

    render() {
        return (
            <div className="crf-form-wrap" style={styles.wrap}>
                <Modal
                    style={{top:'50%',marginTop:'-290px'}}
                    width="800px"
                    height={600}
                    title="创建SAE报告表"
                    visible={this.state.saeVisible}
                    onCancel={this.handleSaeCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <MySaeForm patientInfo={this.props.patientInfo} type={this.state.saeEditType}  data={this.state.currentSaeData} handleCancel={this.handleSaeCancel.bind(this)} handleSubmit={this.handleSaeSubmit.bind(this)}></MySaeForm>
                </Modal>

                <Form onSubmit={this.handleReportSubmit.bind(this)} style={styles.form}>
                    <div style={styles.tableWrap}>
                        <div style={styles.title}>AE报告表</div>
                        <AeForm name="aeReport" handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} data={this.state.formData} form={this.props.form} />
                    </div>
                    <div style={styles.tableWrap}>
                        <div style={styles.title}>SAE报告表</div>
                        <SaeTable name="saeReport" handleCheck={this.handleCheck.bind(this)}  handleOpenSae={this.handleOpenSae.bind(this)} handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} handleChange={this.handleChange.bind(this)} data={this.state.formData} form={this.props.form}></SaeTable>
                    </div>
                </Form>
                {
                    this.state.canSave ? <div style={styles.btnWrap}>
                        <Button style={styles.footBtn} id="form-submit-btn" type="primary" onClick={this.handleReportSubmit.bind(this)}>保存</Button>
                        <Button onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div> : null
                }
            </div>
        )
    }
}

const styles = {
    wrap:{
        marginTop:0,
        border:0
    },
    form:{
        paddingLeft:0
    },
    btnWrap: {
        textAlign: 'right',
        margin: '20px 0'
    },
    footBtn: {
        marginRight: '20px',
    },
    tableWrap:{
        marginBottom:'20px'
    },
    title:{
        fontSize:'20px',
        margin:'10px 0'
    }
}

const ThisForm = Form.create()(crfReport);

export default ThisForm