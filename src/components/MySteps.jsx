import React, { Component } from 'react';
import {Steps} from 'antd'

const Step = Steps.Step;

class PageSteps extends Component{
    render(){
        return(
            <div>
                <Steps 
                    progressDot={(icon,info)=>(<span className="dot" onClick={this.props.onStepClick.bind(this,icon,info)}></span>)} 
                    current={1}
                >
                    <Step title="V0" />
                    <Step title="V1" />
                    <Step title="V2" />
                    <Step title="V3" />
                    <Step title="V4" />
                    <Step title="V5" />
                    <Step title="V6" />
                    <Step title="V7" />
                    <Step title="V8" />
                    <Step title="V9" />
                </Steps>
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