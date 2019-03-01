import React, {
    Component
} from 'react';
import { Badge, List, Avatar } from 'antd';

export default class leftSession extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    id: 1,
                    name: '1',
                    email: '1test'
                },
                {
                    id: 1,
                    name: '1',
                    email: '1test'
                }
            ]
        }
    }
    componentWillMount() {
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className="leftSession">
                <List
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Badge count={1} overflowCount={10}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Badge>
                            <div className="text">
                                <p className="name">name</p>
                                <p className="content">content</p>
                            </div>
                            <div className="time">
                                09-10
                            </div>
                        </List.Item>
                    )}
                >
                </List>
            </div>
        );
    }
}