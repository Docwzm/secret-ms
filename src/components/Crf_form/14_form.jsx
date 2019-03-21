/**
 * 腹部彩超
 */
import React,{Component} from 'react';
import {Form,Button,Radio} from 'antd';
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
        let {fattyLiverFlag,fattyLiverOtherFlag} = this.props.formData;
        const disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={styles.wrap}>
                <div style={styles.title}>腹部彩超</div>
                <Form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem 
                        label="脂肪肝" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('fattyLiverFlag',{
                            initialValue: fattyLiverFlag,
                            rules:[{required:"true"}]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                        
                    </FormItem>
                    <FormItem 
                        label="其他异常" 
                        {...formItemLayoutComponent}
                    >
                        {getFieldDecorator('fattyLiverOtherFlag',{
                            initialValue: fattyLiverOtherFlag,
                            rules:[{required:"true"}]
                        })(
                            <Radio.Group disabled={disabled}>
                                <Radio value={false}>无</Radio>
                                <Radio value={true}>有</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
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