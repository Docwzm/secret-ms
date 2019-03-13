/**
 * 踝肱动脉压指数（ABI）
 */
import React,{Component} from 'react';
import {Form,Button,InputNumber} from 'antd';
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
                <div style={styles.title}>踝肱动脉压指数（ABI）</div>
                <Form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem 
                        label="右侧" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <InputNumber style={styles.input} placeholder="0.00" min={0} step={0.01} />
                        )}
                        
                    </FormItem>
                    <FormItem 
                        label="左侧" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('key',{
                            rules:[{required:"true"}]
                        })(
                            <InputNumber style={styles.input} placeholder="0.00" min={0} step={0.01} />
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
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm