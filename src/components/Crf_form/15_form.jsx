/**
 * 强化CSII治疗情况
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, DatePicker, Icon } from 'antd';
import CSIITable from './15_form_table.jsx';
import {filterFormValues} from './tool'
const FormItem = Form.Item;
const { RangePicker } = DatePicker;


class Module11 extends Component {
    state = {
        tableData: []
    }

    componentWillMount(){
        this.setState({
            formData:JSON.parse(JSON.stringify(this.props.formData))
        })
    }

    handleAdd = () => {
        let csiiRecordList = this.state.formData.csiiRecordList.concat([{}])
        this.setState({
            formData:Object.assign({},this.state.formData,{csiiRecordList})
        })
    }

    handleDelete = (index) => {
        this.state.formData.csiiRecordList.splice(index,1)
        this.setState({
            formData:Object.assign({},this.state.formData)
        })
    }

    handleChange = (index,type,e) => {
        if(type=='date'){
            this.state.formData.startDate = e[0].format('YYYY-MM-DD');
            this.state.formData.endDate = e[1].format('YYYY-MM-DD');
        }else if(type=='measurementDate'){
            this.state.formData['csiiRecordList'][index][type] = e.valueOf()
        }else{
            this.state.formData['csiiRecordList'][index][type] = e.target.value
        }
    }

    handleCancel(){
        this.setState({
            formData:JSON.parse(JSON.stringify(this.props.formData))
        })
        this.props.onCancel();
    }

    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            let {
                csiiRecordList,
                startDate,
                endDate
            } = this.state.formData

            let data = {
                csiiRecordList,
                startDate,
                endDate
            }
            this.props.onSubmit(data)
        });
    }

    render() {
        let disabled = this.props.disabled;
        return (
            <div style={styles.wrap}>
                <div style={styles.title}>强化治疗情况</div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                <CSIITable data={this.state.formData} disabled={disabled} form={this.props.form} handleChange={this.handleChange} handleDelete={this.handleDelete} handleAdd={this.handleAdd}></CSIITable>
                    {
                        !disabled ? <div className="btn-wrap">
                            <FormItem>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button onClick={this.handleCancel.bind(this)}>取消</Button>
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
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm