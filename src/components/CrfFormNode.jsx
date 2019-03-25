import React, { Component } from 'react';
import { Tabs } from 'antd';
import { formNameObj } from '../../utils/crfForm'
import './styles/detail.scss'

const TabPane = Tabs.TabPane;

class CrfFormNode extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return <Tabs activeKey={this.state.nodeKey} onChange={this.selectStep}>
            {
                this.state.vnodeList.map((item, index) => {
                    return <TabPane tab={<p className={item.status == 3 ? 'done' : (item.status == 2 ? 'wait' : '')}>{item.name}</p>} key={index}>
                        <div className="pro-list">
                            {
                                item.crfList.map((_item, _index) => {
                                    return <p key={_index} className={'pro' + (_item.status == 3 ? ' done' : (_item.status == 2 ? ' wait' : ''))} onClick={this.selectPro.bind(this, _item)}>{formNameObj[_item.crfFormType]}</p>
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