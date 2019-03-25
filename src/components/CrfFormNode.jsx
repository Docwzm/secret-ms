import React, { Component } from 'react';
import { Tabs } from 'antd';
import { formNameObj } from '../utils/crfForm'

const TabPane = Tabs.TabPane;

class CrfFormNode extends Component {
    render() {
        return <Tabs activeKey={this.props.activeKey} onChange={this.props.selectStep}>
            {
                this.props.list.map((item, index) => {
                    return <TabPane tab={<p className={item.status == 3 ? 'done' : (item.status == 2 ? 'wait' : '')}>{item.name}</p>} key={index}>
                        <div className="pro-list">
                            {
                                item.crfList.map((_item, _index) => {
                                    return <p key={_index} className={'pro' + (_item.status == 3 ? ' done' : (_item.status == 2 ? ' wait' : ''))} onClick={this.props.selectPro.bind(this, _item)}>{formNameObj[_item.crfFormType]}</p>
                                })
                            }
                        </div>
                    </TabPane>
                })
            }
        </Tabs>
    }
}

export default CrfFormNode