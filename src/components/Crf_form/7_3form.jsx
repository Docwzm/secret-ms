/**
 * 课题二 实验室检查1 v3
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'
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
                        <Input />
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
                // if (index < 4) {
                //     return text;
                // }
                if (index < 100) {
                    rowSpan = 0;
                }
                if (index == 0) {
                    rowSpan = 8;
                }
                if (index == 8) {
                    rowSpan = 4;
                }
                if (index == 12) {
                    rowSpan = 3
                }
                if (index == 15) {
                    rowSpan = 2
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
            time: '临床化学',
            key1: 'ALT/ GPT（丙氨酸转氨酶）',
            key2: 'ccAlt',
            key3: 'U/L'
        }, {
            key: '2',
            time: '临床化学',
            key1: 'AST / GOT（天冬氨酸转氨酶）',
            key2: 'ccAst',
            key3: 'U/L'
        }, {
            key: '3',
            time: '临床化学',
            key1: 'GGT（γ-谷氨酰氨基转移酶）',
            key2: 'ccGgt',
            key3: 'U/L'
        }, {
            key: '4',
            time: '临床化学',
            key1: 'TB（总胆红素）',
            key2: 'ccTb',
            key3: 'mmol/L'
        }, {
            key: '5',
            time: '临床化学',
            key1: 'ALB（白蛋白）',
            key2: 'ccAlb',
            key3: 'g/L'
        }, {
            key: '6',
            time: '临床化学',
            key1: 'BUN（尿素氮）',
            key2: 'ccBun',
            key3: 'mmol/L'
        }, {
            key: '7',
            time: '临床化学',
            key1: 'Cr（肌酐）',
            key2: 'ccCr',
            key3: 'μmol/L'
        }, {
            key: '8',
            time: '临床化学',
            key1: 'UA（尿酸）',
            key2: 'ccUa',
            key3: 'μmol/L'
        }, {
            key: '9',
            time: '血脂谱',
            key1: 'TG（甘油三酯）',
            key2: 'blpTg',
            key3: 'mmol/L'
        }, {
            key: '10',
            time: '血脂谱',
            key1: 'CHOL（胆固醇）',
            key2: 'blpChol',
            key3: 'mmol/L'
        }, {
            key: '11',
            time: '血脂谱',
            key1: 'LDL-c（低密度脂蛋白）',
            key2: 'blpLdl',
            key3: 'mmol/L'
        }, {
            key: '12',
            time: '血脂谱',
            key1: 'HDL-c（高密度脂蛋白）',
            key2: 'blpHdl',
            key3: 'mmol/L'
        }, {
            key: '13',
            time: '血糖',
            key1: 'FPG（空腹血糖）',
            key2: 'bsFpg',
            key3: 'mmol/L'
        },  {
            key: '14',
            time: '血糖',
            key1: 'HbA1c（糖化血红蛋白）',
            key2: 'bsGh',
            key3: '%'
        }, {
            key: '15',
            time: '血糖',
            key1: '糖化白蛋白',
            key2: 'bsGa',
            key3: '%'
        }, {
            key: '16',
            time: '炎症因子',
            key1: 'FFA（游离脂肪酸）',
            key2: 'tnfFfa',
            key3: 'μmol/L'
        }, {
            key: '17',
            time: '炎症因子',
            key1: 'hs-CRP',
            key2: 'tnfCrp',
            key3: 'mmol/L'
        }];
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <Table columns={columns} dataSource={data} bordered pagination={false} />
                    <FormItem label="相关资料">
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