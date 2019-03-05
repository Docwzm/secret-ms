import React, {
    Component
} from 'react';
import { Badge, List, Avatar } from 'antd';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import { parseTime } from '../../../utils/index'

class leftSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.props.initRecentContactList()
    }

    dateFilter(time) {
        let date = new Date(time)
        let dateStr = parseTime(date, 'YYYY/MM/DD HH:mm')
        let nowDateStr = parseTime(new Date(), 'YYYY/MM/DD HH:mm')
        if (dateStr.split(' ')[0] == nowDateStr.split(' ')[0]) {
            //当天发送
            return dateStr.split(' ')[1]
        } else {
            return dateStr.split(' ')[0].slice(2, -1)
        }
    }

    setSelToId(item) {
        if(this.props.selToId==item.id){
            return ;
        }
        let recentSess = this.props.imInfo.recentSess.map(sess => {
            if(sess.id==item.id){
                sess.unReadMsgCount = 0;
            }
            return sess
        })
        this.props.setSelToId(item.id)
        this.props.setRecentSess(recentSess)
    }

    render() {
        return (
            <div className="leftSession">
                <List
                    dataSource={this.props.imInfo.recentSess}
                    renderItem={item => (
                        <List.Item key={item.id} onClick={this.setSelToId.bind(this,item)}>
                            <Badge count={item.unReadMsgCount} overflowCount={99}>
                                <Avatar src={item.headUrl} />
                            </Badge>
                            <div className="text">
                                <p className="name">{item.nickName}</p>
                                {item.unReadMsgCount != 0 ? <p className="content">{item.lastContent}</p> : null}
                            </div>
                            <div className="time">
                                {this.dateFilter(item.date)}
                            </div>
                        </List.Item>
                    )}
                >
                </List>
            </div>
        );
    }
}

export default connect(state => state, actions)(leftSession)