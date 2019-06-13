/**
 * 课题二 实验室检查1 v8
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table } from 'antd';
import { validDoubleNumber } from '../../../utils/formValidate'
import PicturesWall from '../crfFormUpload'
const FormItem = Form.Item;

class Module extends Component {
    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            this.props.onSubmit(values)
        });
    }

    render() {
        const { fileList } = this.props.formData
        const { getFieldDecorator } = this.props.form;
        const renderContent = (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            obj.children = <FormItem>
                {
                    getFieldDecorator(value, {
                        initialValue: this.props.formData[value],
                        rules:[{
                            validator:validDoubleNumber
                        }]
                    })(
                        <Input className="middle-input"/>
                    )
                }
            </FormItem>
            return obj;
        };
        
        const columns = [{
            title: '',
            colSpan: 0,
            dataIndex: 'time',
            render: (text, row, index) => {
                let rowSpan = 1;
                let colSpan = 1;
           
                if (index < 100) {
                    rowSpan = 0;
                }
                if (index == 0) {
                    rowSpan = 3;
                }

                return {
                    children: text,
                    props: {
                        rowSpan: rowSpan,
                        colSpan
                    },
                };
            },
        }, {
            title: '测定项目',
            colSpan: 2,
            dataIndex: 'key1',
        }, {
            title: '检验结果',
            dataIndex: 'key2',
            render: renderContent
        }, {
            title: '单位',
            dataIndex: 'key3'
        }];
        const data = [{
            key: '1',
            time: '血糖',
            key1: 'FPG（空腹血糖）',
            key2: 'bsFpg',
            key3: 'mmol/L'
        },  {
            key: '2',
            time: '血糖',
            key1: 'HbA1c（糖化血红蛋白）',
            key2: 'bsGh',
            key3: '%'
        }, {
            key: '3',
            time: '血糖',
            key1: '糖化白蛋白',
            key2: 'bsGa',
            key3: '%'
        }];

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Table columns={columns} dataSource={data} bordered pagination={false} />
                    <FormItem label="相关资料（非必须）" {...formItemLayout}>
                        {
                            getFieldDecorator('imageList', {
                                initialValue: '',
                            })(
                                <PicturesWall fileList={fileList} del={this.props.delUploadImg} change={this.props.changeData}/>
                            )
                        }
                    </FormItem>
                    {
                        this.props.canSave ? <div className='btn-wrap'>
                            <FormItem>
                                <Button id="form-submit-btn" disabled={this.props.disabled} type="primary" htmlType="submit">保存</Button>
                                <Button onClick={this.props.onCancel}>取消</Button>
                            </FormItem>
                        </div> : null
                    }
                </Form>
            </div>
        )
    }
}

const ThisForm = Form.create({
    onValuesChange:(props, changedValues, allValues) => {
        if(!props.canSave){
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm