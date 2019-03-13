/**
 * 眼科检查
 */
import React,{Component} from 'react';
import {Form,Radio,Button,Row,Col,Input,DatePicker,InputNumber,Checkbox} from 'antd';
const FormItem = Form.Item;
const {RangePicker } = DatePicker;


class Module11 extends Component{
    state={
        
    }

    //提交数据
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            console.log(values) 
            this.props.onSubmit(values)
        });
    }

    handleAddColumn(){

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        //比较特殊的表单布局
        const formItemLayoutComponent = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            },
        }
        const tailFormItemLayoutComponent= {
            wrapperCol: {
                xs: {
                  span: 44,
                  offset: 0,
                },
                sm: {
                  span: 20,
                  offset: 4,
                },
            },
        }
        
        return(
            <div style={styles.wrap}>
                <div style={styles.title}>
                    <div style={styles.bold}>V4院外强化治疗结束</div>
                    <div style={styles.datePicker}>
                        日期：<RangePicker  />&nbsp;&nbsp;
                        中心编号：<InputNumber style={styles.input}/>&nbsp;&nbsp;
                        随机分组号：<InputNumber style={styles.input}/>&nbsp;&nbsp;
                        患者编号：<InputNumber style={styles.input}/>&nbsp;&nbsp;
                    </div>
                </div>
                
                <Form style={styles.form}  onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem 
                        label="是否仍处于缓解" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <>
                                <Radio.Group>
                                    <Radio value="a">是</Radio>
                                    <Radio value="b">否</Radio>
                                </Radio.Group>
                                <span>用药方案为，</span>
                            </>
                        )}
                        
                    </FormItem>
                    <FormItem 
                        label="二甲双胍剂量" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <Input style={styles.formInput}/>
                        )}
                    </FormItem>
                    <FormItem 
                        label="其他" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <Input style={styles.formInput}/>
                        )}
                    </FormItem>

                    <FormItem 
                        label="预计下次访视时间" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <DatePicker />
                        )}
                    </FormItem>  
                    <FormItem {...tailFormItemLayoutComponent}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const styles = {
    wrap:{
        marginTop:"50px",
        border:"1px solid #e8e8e8",
        borderRadius:"4px"
    },
    title:{
        fontSize:"16px",
        padding:"20px",
        borderBottom:"1px solid #e8e8e8"
    },

    input:{
        width:"150px",
        marginRight:"10px"
    },
    formInput:{
        width:"250px"
    },
    datePicker:{
        margin:"10px 0"
    },
    bold:{
        fontWeight:"bold"
    },
    form:{
        marginTop:"20px"
    },
    col:{
        margin:"10px 0"
    },
    textarea:{
        width:"400px"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm