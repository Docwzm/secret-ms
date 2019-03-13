/**
 * 眼科检查
 */
import React,{Component} from 'react';
import {Form,Button,Input,Table,Icon,DatePicker,InputNumber} from 'antd';

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

    handleAddColumn(){

    }

    render(){
        const {tableData} = this.state;
        
        const table1Header = () => (
            <div>
                <div style={styles.tableTitle}>合并用药表</div>
                <div style={styles.datePicker}>
                    日期：<RangePicker  />&nbsp;&nbsp;
                    中心编号：<InputNumber style={styles.input}/>&nbsp;&nbsp;
                    随机分组号：<InputNumber style={styles.input}/>&nbsp;&nbsp;
                    患者编号：<InputNumber style={styles.input}/>&nbsp;&nbsp;
                </div>
            </div>
        )
        const table1Column = [{
            title:"商品名",
            align:"center"
        },{
            title:"化学名",
            align:"center"
        },{
            title:"适应症",
            align:"center"
        },{
            title:"剂量/频次",
            align:"center"
        },{
            title:"给药途径",
            align:"center"
        },{
            title:"开始时间",
            align:"center"
        },{
            title:"结束时间",
            align:"center"
        }]
        return(
            <Table 
                style={styles.table}
                bordered
                title={table1Header}
                dataSource={tableData}
                columns={table1Column}
                rowKey={record => record.id}
                footer={()=>(<Button type="primary" onClick={this.handleAddColumn.bind(this)}><Icon type="plus"/>增加一行</Button>)}
            >
            </Table>
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
    tableTitle:{
        fontSize:"16px",    
        padding:"10px 0",
        fontWeight:"bold"
    }
}

const ThisForm = Form.create()(Module11);

export default ThisForm