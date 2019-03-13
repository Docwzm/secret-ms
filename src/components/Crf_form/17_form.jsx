/**
 * 眼科检查
 */
import React,{Component} from 'react';
import {Form,Radio,Button} from 'antd';
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
                span: 2
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
                  offset: 2,
                },
            },
        }
        
        return(
            <div style={styles.wrap}>
                <div style={styles.title}>特殊时间记录</div>
                <Form  onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem 
                        label="不良事件" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <Radio.Group>
                                <Radio value="a">正常</Radio>
                                <Radio value="b">异常</Radio>
                            </Radio.Group>
                        )}

                        <PickForm  name="17_AE"/>
                        
                    </FormItem>
                    <FormItem 
                        label="低血糖事件" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <Radio.Group>
                                <Radio value="a">无</Radio>
                                <Radio value="b">有</Radio>
                            </Radio.Group>
                        )}
                        <PickForm  name="17_SAE"/>
                    </FormItem>
                    <FormItem 
                        label="新增用药" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <Radio.Group>
                                <Radio value="a">无</Radio>
                                <Radio value="b">有</Radio>
                            </Radio.Group>
                        )}
                        <PickForm name="17_THERAPY" />
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
        width:"150px",
        marginRight:"10px"
    },
    datePicker:{
        margin:"10px 0"
    },
}

const ThisForm = Form.create()(Module11);

export default ThisForm