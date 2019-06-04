/**
 * 随访节点
 * params {*}
 * 
 * list:随访各个节点数据
 * activeKey:当前选中的节点key
 * onChange:节点切换回调
 * selectPro:表单点击回调
 * 
 */
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { getCrfNodeName } from '../../utils/crfForm'
import '../../assets/styles/crfFormNode.scss'
const TabPane = Tabs.TabPane;

class CrfFormNode extends Component {
    render() {
        const list = this.props.list || []
        return <Tabs className="crf-tabs" activeKey={this.props.activeKey} onChange={this.props.selectStep}>
            {
                list.map((item, index) => {
                    return <TabPane tab={<div><p className={item.status == 3 ? 'done' : (item.status == 2 ? 'wait' : '')}>{item.name.indexOf('V')==0?item.name:item.name.substring(0,1)}</p><i></i></div>} key={index}>
                        <div className="pro-list">
                            {
                                item.crfList.map((_item, _index) => {
                                    return <p key={_index} className={'pro' + (_item.id==this.props.activeFormId?' active':'') + (_item.status == 3 ? ' done' : (_item.status == 2 ? ' wait' : ''))} onClick={this.props.selectPro.bind(this, _item)}>{getCrfNodeName(_item.crfFormType)}</p>
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