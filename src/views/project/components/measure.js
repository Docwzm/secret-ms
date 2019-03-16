import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { enumObj } from '../../../utils/enum';
import '../styles/measure.scss';

class Measure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proType: {
                1: '血糖',
                2: '血压',
                3: '体重'
            }
        }
    }
    render() {
        let data = this.props.data;
        return <div className="measure">
            <div className="pro-name">{data.name}</div>
            <div className="list">
                {
                    data.list.map((item, index) => {
                        return <div key={index} className="item">
                            <span className="name">测量
                                {
                                    enumObj.measurementType.map(_item => {
                                        if (_item.key == item.type) {
                                            return _item.value
                                        }
                                    })
                                }
                            </span>
                            <span>频率：{
                                enumObj.frequency.map(_item => {
                                    if (_item.key == item.frequency) {
                                        return _item.value
                                    }
                                })}
                            </span>
                        </div>
                    })
                }
            </div>
        </div>;
    }
}

export default withRouter(Measure)