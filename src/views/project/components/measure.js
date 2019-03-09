import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/measure.scss';

class Measure extends Component {
    render() {
        let data = this.props.data;
        return <div className="measure">
            <div className="pro-name">{data.proName}</div>
            <div className="list">
                {
                    data.list.map((item,index) => {
                        return <div key={index} className="item">
                            <span className="name">测量{item.name}</span>
                            <span>频率：{item.count}</span>
                        </div>
                    })
                }
            </div>
        </div>;
    }
}

export default withRouter(Measure)