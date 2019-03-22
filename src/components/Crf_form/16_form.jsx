/**
 * 血糖监测结果
 */
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import MyTable from './16_form_table.jsx';
import {filterFormValues} from './tool'
const FormItem = Form.Item;

class Module11 extends Component {
  state = {
    
  }

  //提交数据
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      let arr = filterFormValues(values,16);
      console.log(arr)
      return false;
      //数据校验通过后，传递到上级提交
      this.props.onSubmit(values)
    });
  }

  render() {
    let disabled = this.props.disabled
    return (
      <div style={styles.wrap}>
        <div style={styles.title}>强化治疗期间血糖监测结果</div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <MyTable name="haha" data={this.props.formData} form={this.props.form} disabled={disabled}></MyTable>
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