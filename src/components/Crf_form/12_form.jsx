/**
 * 眼科检查
 */
import React,{Component} from 'react';
import {Form,Radio,Button,Input} from 'antd';
import { formItemLayoutComponent,tailFormItemLayoutComponent} from '../../utils/formItemLayout'

const FormItem = Form.Item;

class Module11 extends Component{

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

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={styles.wrap}>
                <div style={styles.title}>眼科检查</div>
                <Form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem 
                        label="眼科检查" 
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
                        
                    </FormItem>
                    <FormItem 
                        label="糖尿病视网膜病变" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <>
                                <Radio.Group>
                                    <Radio value="a">无</Radio>
                                    <Radio value="b">有</Radio>
                                </Radio.Group>
                                <span>为，</span>
                                <Input  addonAfter="期od" style={styles.input}/>
                                <Input  addonAfter="期os" style={styles.input}/>
                            </>
                        )}
                    </FormItem>
                    <FormItem 
                        label="黄斑水肿" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <>
                                <Radio.Group>
                                    <Radio value="a">无</Radio>
                                    <Radio value="b">有</Radio>
                                </Radio.Group>
                                <span>为，</span>
                                <Input  addonAfter="期od" style={styles.input}/>
                                <Input  addonAfter="期os" style={styles.input}/>
                            </>
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
        width:"150px",
        marginRight:"10px"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm