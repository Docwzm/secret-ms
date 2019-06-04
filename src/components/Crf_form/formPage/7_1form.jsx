/**
 * 课题1 实验室检查 v1
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table, Select } from 'antd';
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
            values.urAlbumen = values.urAlbumen_plus ? values.urAlbumen + '/' + values.urAlbumen_plus : values.urAlbumen;
            values.urKetoneBody = values.urKetoneBody_plus ? values.urKetoneBody + '/' + values.urKetoneBody_plus : values.urKetoneBody;
            values.urRbc = values.urRbc_plus ? values.urRbc + '/' + values.urRbc_plus : values.urRbc;
            values.urSugar = values.urSugar_plus ? values.urSugar + '/' + values.urSugar_plus : values.urSugar;
            values.urWbc = values.urWbc_plus ? values.urWbc + '/' + values.urWbc_plus : values.urWbc;
            delete values.urWbc_plus
            delete values.urSugar_plus
            delete values.urRbc_plus
            delete values.urKetoneBody_plus
            delete values.urAlbumen_plus
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
            if (index < 3) {
                obj.children = <FormItem>
                    {
                        getFieldDecorator(value, {
                            initialValue: this.props.formData[value],
                            rules: [{
                                validator: validDoubleNumber
                            }]
                        })(
                            <Input className="middle-input"/>
                        )
                    }
                </FormItem>
            } else if (index > 2 && index < 8) {
                obj.children = <div>
                    <FormItem>
                        {
                            getFieldDecorator(value, {
                                initialValue: this.props.formData[value] ? this.props.formData[value].split('/')[0] : '',
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input className="middle-input" />
                            )
                        }
                        <span>
                            {
                                getFieldDecorator(value + '_plus', {
                                    initialValue: this.props.formData[value] && this.props.formData[value].split('/').length > 1 ? this.props.formData[value].split('/')[1] : ''
                                })(
                                    <Select style={{ 'width': '70px' }}>
                                        <options value='-'>-</options>
                                        <options value='+'>+</options>
                                        <options value='2+'>2+</options>
                                        <options value='3+'>3+</options>
                                        <options value='4+'>4+</options>
                                    </Select>
                                )
                            }
                        </span>
                    </FormItem>
                </div>
            } else {
                obj.children = <div>
                    <FormItem className="inline-item">
                        {
                            getFieldDecorator('uae1', {
                                initialValue: this.props.formData['uae1'],
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input addonBefore={<span className="icon-num">1</span>} addonAfter="μg/min" className="cover-input" />
                            )
                        }
                    </FormItem>
                    <FormItem className="inline-item">
                        {
                            getFieldDecorator('uae2', {
                                initialValue: this.props.formData['uae2'],
                                rules: [{
                                    validator: validDoubleNumber
                                }]
                            })(
                                <Input addonBefore={<span className="icon-num">2</span>} addonAfter="μg/min" className="cover-input" />
                            )
                        }
                    </FormItem>
                </div>
                obj.props.colSpan = 2
            }

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
                if (index == 3) {
                    rowSpan = 5;
                }
                if (index == 8) {
                    rowSpan = 8
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
            dataIndex: 'key1'
        }, {
            title: '检验结果',
            dataIndex: 'key2',
            render: renderContent
        }, {
            title: '单位',
            dataIndex: 'key3',
            render: (text, row, index) => {
                let colSpan = 1;
                if (index == 8) {
                    colSpan = 0
                }
                return {
                    children: text,
                    props: {
                        colSpan
                    },
                };
            },
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
            time: '尿蛋白',
            key1:'尿白蛋白排泄率'
        }];

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        }; 

        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <Table columns={columns} dataSource={data} bordered pagination={false} />
                <FormItem label="相关资料" {...formItemLayout}>
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
        )
    }
}

const ThisForm = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        if (!props.canSave) {
            props.setCanSave(true)
        }
    }
})(Module);

export default ThisForm