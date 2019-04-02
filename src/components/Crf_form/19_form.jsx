/**
 * 血糖监测结果
 */
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import MyTable from './16_form_table.jsx';
const FormItem = Form.Item;

class Module11 extends Component {
  componentWillMount() {
    this.setState({
      formData: JSON.parse(JSON.stringify(this.props.formData))
    })
  }

  //增加新行
  handleAdd() {
    if (!this.state.formData.bloodSugarReportList) {
      this.state.formData.bloodSugarReportList = [];
    }
    let bloodSugarReportList = this.state.formData.bloodSugarReportList.concat([{}])
    this.setState({
      formData: Object.assign({}, this.state.formData, { bloodSugarReportList })
    })
    this.props.setCanSave(true)
  }

  handleDelete(index) {
    if (this.state.formData.bloodSugarReportList) {
      this.state.formData.bloodSugarReportList.splice(index, 1)
      this.setState({
        formData: Object.assign({}, this.state.formData)
      })
      this.props.setCanSave(true)
    }
  }

  handleChange = (index, type, e) => {
    if (!this.state.formData['bloodSugarReportList']||this.state.formData['bloodSugarReportList'].length==0) {
      this.state.formData['bloodSugarReportList'] = [{}];
    }
    if (type == 'measurementDate') {
      this.state.formData['bloodSugarReportList'][index][type] = e.valueOf()
    } else {
      this.state.formData['bloodSugarReportList'][index][type] = e.target.value
    }
  }

  handleCancel() {
    this.setState({
      formData: JSON.parse(JSON.stringify(this.props.formData))
    })
    this.props.onCancel();
  }

  //提交数据
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      let {
        bloodSugarReportList,
      } = this.state.formData

      let data = {
        bloodSugarReportList,
      }

      //数据校验通过后，传递到上级提交
      this.props.onSubmit(data)
    });
  }

  render() {
    return (
      <div>
        <div className="title">强化治疗期间血糖监测结果</div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <MyTable name="bloodSugarReportList" handleChange={this.handleChange.bind(this)} handleDelete={this.handleDelete.bind(this)} handleAdd={this.handleAdd.bind(this)} data={this.state.formData} form={this.props.form}></MyTable>
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
})(Module11);

export default ThisForm