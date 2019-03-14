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
                            rules: [{ required: "true" }]
                        })(
                            <Input disabled={disabled} className="small-input" />
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
                            getFieldDecorator('value', {
                                rules: [{ required: "true" }]
                            })(
                                <Input addonBefore="1" addonAfter="μg/min" disabled={disabled} className="cover-input" />
                            )
                        }
                    </FormItem>
                    <span style={styles.space}></span>
                    <FormItem>
                        {
                            getFieldDecorator('value2', {
                                rules: [{ required: "true" }]
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
            key1: 'key01',
            key2: 'key02',
            key3: 'key03'
        }, {
            key: '2',
            time: '30min',
            key1: 'key11',
            key2: 'key12',
            key3: 'key13'
        }, {
            key: '3',
            time: '60min',
            key1: 'key21',
            key2: 'key22',
            key3: 'key23'
        }, {
            key: '4',
            time: '120min',
            key1: 'key31',
            key2: 'key32',
            key3: 'key33'
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