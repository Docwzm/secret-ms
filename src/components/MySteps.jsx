import React, { Component } from 'react';
import {Steps} from 'antd'

const Step = Steps.Step;

class PageSteps extends Component{
    render(){
        return(
            <div>
                <div className="step-wrap">
                    <div className="step">
                        <div>
                            <div className="step-content">
                            
                            </div>
                        </div>
                    </div>
                    <div className="step"></div>
                    <div className="step"></div>
                    <div className="step"></div>
                    <div className="step"></div>
                    <div className="step"></div>
                </div>
                <div className="content-list">
                    <div className='list-item'>
                        <div className="item">
                            <span>入选标准&排除标准</span>
                            <span className="item-status finish"></span>
                        </div>
                    </div>
                    <div className='list-item'>
                        <div className="item">
                            <span>入组信息&人口学资料</span>
                            <span className="item-status process"></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageSteps