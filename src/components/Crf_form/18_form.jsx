/**
 * 眼科检查
 */
import React,{Component} from 'react';
import {Form,Radio,Button,Input, DatePicker} from 'antd';
import PickForm  from './index'
const FormItem = Form.Item;

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
                span: 3
            },
            wrapperCol: {
                span: 21
            },
        }
        const tailFormItemLayoutComponent= {
            wrapperCol: {
                xs: {
                  span: 44,
                  offset: 0,
                },
                sm: {
                  span: 21,
                  offset: 3,
                },
            },
        }
        
        return(
            <div style={styles.wrap}>
                <div style={styles.title}>其他信息记录</div>
                <Form  onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem 
                        label="是否发放药品" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <>
                                <Radio.Group>
                                    <Radio value="a">否</Radio>
                                    <Radio value="b">是</Radio>
                                </Radio.Group>
                                <span>为，</span>
                                <Input addonBefore="甘精胰岛素剂量"  addonAfter="U/d" style={styles.input}/>
                                <Input addonBefore="二甲双胍剂量"  addonAfter="g/d" style={styles.input}/>
                            </>
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
        marginTop:"50px"
    },
    title:{
        fontSize:"18px",
        borderLeft:"4px solid #1890ff",
        paddingLeft:"10px"
    },
    form:{
        width:"50%",
        marginTop:"30px"
    },
    input:{
        width:"250px",
        marginRight:"10px"
    },
    datePicker:{
        margin:"10px 0"
    },
}

const ThisForm = Form.create()(Module11);

export default ThisForm