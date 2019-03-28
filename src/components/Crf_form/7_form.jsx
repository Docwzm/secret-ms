/**
 * 实验室检查1
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, Checkbox } from 'antd';
import { validDoubleNumber } from '../../utils/formValidate'
const FormItem = Form.Item;

class Module4 extends Component {
    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交

            values.urAlbumen = values.urAlbumen_plus[0] == 1 ? values.urAlbumen + '-' : values.urAlbumen + '+';
            values.urKetoneBody = values.urKetoneBody_plus[0] == 1 ? values.urKetoneBody + '-' : values.urKetoneBody + '+';
            values.urRbc = values.urRbc_plus[0] == 1 ? values.urRbc + '-' : values.urRbc + '+';
            values.urSugar = values.urSugar_plus[0] == 1 ? values.urSugar + '-' : values.urSugar + '+';
            values.urWbc = values.urWbc_plus[0] == 1 ? values.urWbc + '-' : values.urWbc + '+';
            delete values.urWbc_plus
            delete values.urSugar_plus
            delete values.urRbc_plus
            delete values.urKetoneBody_plus
            delete values.urAlbumen_plus
            this.props.onSubmit(values)
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const renderContent = (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            if (index > 2 && index < 8) {
                obj.children = <div>
                    <FormItem>
                        {
                            getFieldDecorator(value, {
                                initialValue: this.props.formData[value] ? this.props.formData[value].slice(0, -1) : '',
                                rules:[{
                                    validator:validDoubleNumber
                                }]
                            })(
                                <Input className="middle-input" />
                            )
                        }
                        <span>+</span>
                        {
                            getFieldDecorator(value + '_plus', {
                                initialValue: this.props.formData[value] && this.props.formData[value].indexOf('-') >= 0 ? [1] : []
                            })(
                                <Checkbox.Group>
                                    <Checkbox value={1}>-</Checkbox>
                                </Checkbox.Group>
                            )
                        }
                    </FormItem>
                </div>
            } else {
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
            }
            return obj;
        };
        const columns = [{
            title: '',
            colSpan: 0,
            dataIndex: 'time',
            render: (text, row, index) => {
                let rowSpan = 1;
                // if (index < 4) {
                //     return text;
                // }
                if (index < 100) {
                    rowSpan = 0;
                }
                if (index == 0) {
                    rowSpan = 3;
                }
                if (index == 3) {
                    rowSpan = 5;
                }
                if (index == 8) {
                    rowSpan = 8
                }
                if (index == 16) {
                    rowSpan = 4
                }
                if (index == 20) {
                    rowSpan = 4
                }
                if (index == 24) {
                    rowSpan = 2
                }

                return {
                    children: text,
                    props: {
                        rowSpan: rowSpan,
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
            dataIndex: 'key3',
        }];
        const data = [{
            key: '1',
            time: '血常规',
            key1: 'Hb（血红蛋白）',
            key2: 'brHb',
            key3: 'g/L'
        }, {
            key: '2',
            time: '血常规',
            key1: 'WBC（白细胞）',
            key2: 'brWbc',
            key3: <span>10<sup>9</sup>/L</span>
        }, {
            key: '3',
            time: '血常规',
            key1: 'PLT（血小板）',
            key2: 'brPlt',
            key3: <span>10<sup>9</sup>/L</span>
        }, {
            key: '4',
            time: '尿常规',
            key1: '蛋白',
            key2: 'urAlbumen',
            key3: ''
        }, {
            key: '5',
            time: '尿常规',
            key1: '糖',
            key2: 'urSugar',
            key3: ''
        }, {
            key: '6',
            time: '尿常规',
            key1: '酮体',
            key2: 'urKetoneBody',
            key3: ''
        }, {
            key: '7',
            time: '尿常规',
            key1: '红细胞',
            key2: 'urRbc',
            key3: ''
        }, {
            key: '8',
            time: '尿常规',
            key1: '白细胞',
            key2: 'urWbc',
            key3: ''
        }, {
            key: '9',
            time: '临床化学',
            key1: 'ALT/ GPT（丙氨酸转氨酶）',
            key2: 'ccAlt',
            key3: 'U/L'
        }, {
            key: '10',
            time: '临床化学',
            key1: 'AST / GOT（天冬氨酸转氨酶）',
            key2: 'ccAst',
            key3: 'U/L'
        }, {
            key: '11',
            time: '临床化学',
            key1: 'GGT（γ-谷氨酰氨基转移酶）',
            key2: 'ccGgt',
            key3: 'U/L'
        }, {
            key: '12',
            time: '临床化学',
            key1: 'TB（总胆红素）',
            key2: 'ccTb',
            key3: 'mmol/L'
        }, {
            key: '13',
            time: '临床化学',
            key1: 'ALB（白蛋白）',
            key2: 'ccAlb',
            key3: 'g/L'
        }, {
            key: '14',
            time: '临床化学',
            key1: 'BUN（尿素氮）',
            key2: 'ccBun',
            key3: 'mmol/L'
        }, {
            key: '15',
            time: '临床化学',
            key1: 'Cr（肌酐）',
            key2: 'ccCr',
            key3: 'μmol/L'
        }, {
            key: '16',
            time: '临床化学',
            key1: 'UA（尿酸）',
            key2: 'ccUa',
            key3: 'μmol/L'
        }, {
            key: '17',
            time: '血脂谱',
            key1: 'TG（甘油三酯）',
            key2: 'blpTg',
            key3: 'mmol/L'
        }, {
            key: '18',
            time: '血脂谱',
            key1: 'CHOL（胆固醇）',
            key2: 'blpChol',
            key3: 'mmol/L'
        }, {
            key: '19',
            time: '血脂谱',
            key1: 'LDL-c（低密度脂蛋白）',
            key2: 'blpLdl',
            key3: 'mmol/L'
        }, {
            key: '20',
            time: '血脂谱',
            key1: 'HDL-c（高密度脂蛋白）',
            key2: 'blpHdl',
            key3: 'mmol/L'
        }, {
            key: '21',
            time: '血糖',
            key1: 'FPG（空腹血糖）',
            key2: 'bsFpg',
            key3: 'mmol/L'
        }, {
            key: '22',
            time: '血糖',
            key1: 'PPG（餐后2h血糖）',
            key2: 'bsPpg',
            key3: 'mmol/L'
        }, {
            key: '23',
            time: '血糖',
            key1: 'HbA1c（糖化血红蛋白）',
            key2: 'bsGh',
            key3: '%'
        }, {
            key: '24',
            time: '血糖',
            key1: '糖化白蛋白',
            key2: 'bsGa',
            key3: '%'
        }, {
            key: '25',
            time: '炎症因子',
            key1: 'FFA（游离脂肪酸）',
            key2: 'tnfFfa',
            key3: 'μmol/L'
        }, {
            key: '26',
            time: '炎症因子',
            key1: 'hs-CRP',
            key2: 'tnfCrp',
            key3: 'mmol/L'
        }];

        return (
            <div>
                <div className="title">实验室检查</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <Table columns={columns} dataSource={data} bordered pagination={false} />
                    {
                        this.props.canSave ? <div className='btn-wrap'>
                            <FormItem>
                                <Button disabled={this.props.disabled} type="primary" htmlType="submit">保存</Button>
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
})(Module4);

export default ThisForm