/**
 * 眼科检查
 */
import React,{Component} from 'react';
import {Form,Button,Input,Table,DatePicker,Icon} from 'antd';

const {RangePicker } = DatePicker;

class Module11 extends Component{
    state={
        tableData:[]
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

    //增加新行
    handleAddColumn(){

    }

    render(){
        const {tableData} = this.state

        const columns = [{
            title:"日期",
            align:"center",
        },{
            title:"早餐前",
            align:"center",
        },{
            title:"早餐后2h",
            align:"center",
        },{
            title:"中餐前",
            align:"center",
        },{
            title:"中餐后2h",
            align:"center",
        },{
            title:"晚餐前",
            align:"center",
        },{
            title:"晚餐后2h",
            align:"center",
        }]
        return(
            <div style={styles.wrap}>
                <div style={styles.title}>六点血糖监测结果</div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Table 
                        style={styles.table}
                        bordered
                        dataSource={tableData}
                        columns={columns}
                        rowKey={record => record.id}
                        footer={()=>(<Button type="primary" onClick={this.handleAddColumn.bind(this)}><Icon type="plus"/>增加一行</Button>)}
                    >

                    </Table>
                    <div style={styles.tableSubmit}>
                        <Button type="primary">保存</Button>
                    </div>
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
    table:{
        margin:"40px auto"
    },
    datePicker:{
        margin:"10px 0"
    },
    tableTitle:{
        fontSize:"16px",
        fontWeight:500
    },
    tableSubmit:{
        textAlign:"center"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm