/**
 * 混合餐耐量试验
 */
import React, { Component } from 'react';
import { Form, Button, Input, Table } from 'antd';
const FormItem = Form.Item;

class Module4 extends Component {
    //提交数据
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            //数据校验通过后，传递到上级提交
            console.log(values)
            this.props.onSubmit(values)
        });
    }

    render() {
        let disabled = this.props.disabled;
        const { getFieldDecorator } = this.props.form;
        const renderContent = (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            if (index === 4) {
                obj.props.colSpan = 0;
            } else {
                obj.children = <FormItem>
                    {
                        getFieldDecorator(value, {
                            initialValue:this.props.formData[value],
                        })(
                            <Input disabled={disabled} className="middle-input" />
                        )
                    }
                </FormItem>
            }
            return obj;
        };

        const columns = [{
            title: '时间',
            dataIndex: 'time',
            render: (text, row, index) => {
                if (index < 4) {
                    return text;
                }
                text = <div>
                    <FormItem label="尿白蛋白排泄率">
                        {
                            getFieldDecorator('uae1', {
                                initialValue:this.props.formData['uae1'],
                            })(
                                <Input addonBefore="1" addonAfter="μg/min" disabled={disabled} className="cover-input" />
                            )
                        }
                    </FormItem>
                    <span style={styles.space}></span>
                    <FormItem>
                        {
                            getFieldDecorator('uae2', {
                                initialValue:this.props.formData['uae2'],
                            })(
                                <Input addonBefore="2" addonAfter="μg/min" disabled={disabled} className="cover-input" />
                            )
                        }
                    </FormItem>
                </div>
                return {
                    children: text,
                    props: {
                        colSpan: 4,
                    },
                };
            },
        }, {
            title: '血糖 （mmol/L）',
            dataIndex: 'key1',
            render: renderContent,
        }, {
            title: '胰岛素(μU/ml)',
            dataIndex: 'key2',
            render: renderContent
        }, {
            title: '胰岛素(μU/ml)',
            dataIndex: 'key3',
            render: renderContent,
        }];

        const data = [{
            key: '1',
            time: '0 min',
            key1: 'bs0',
            key2: 'insulin0',
            key3: 'cp0'
        }, {
            key: '2',
            time: '30min',
            key1: 'bs30',
            key2: 'insulin30',
            key3: 'cp30'
        }, {
            key: '3',
            time: '60min',
            key1: 'bs60',
            key2: 'insulin60',
            key3: 'cp60'
        }, {
            key: '4',
            time: '120min',
            key1: 'bs120',
            key2: 'insulin120',
            key3: 'cp120'
        }, {
            key: '5',
            key1: 'key111'
        }];
        return (
            <div>
                <div>混合餐耐量试验</div>
                <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
                    <Table columns={columns} dataSource={data} bordered pagination={false} />
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
    space:{
        margin: '0 10px'
    }
}

const ThisForm = Form.create()(Module4);

export default ThisForm