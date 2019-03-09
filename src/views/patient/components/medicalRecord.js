import React ,{Component}from 'react';
import {Table,Radio,Button} from 'antd'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


class MedicalRecord extends Component{
  render(){
    return(
      <div className="tab3">
        <div className="day-item">
            <div className='day-item-left'><span>2019年3月22日</span></div>
            <div className='day-item-right'>
                <div className="title">
                    <span>图片</span>
                    <span>备注</span>
                </div>
                <div className="img-wrap">
                    <span className="img"></span>
                </div>
                <div className="remark">备注：<span>建议注意三餐饮食，减少脂肪摄入，并在餐后做适量运动</span></div>
            </div>
        </div>
        <div className="day-item">
            <div className='day-item-left'><span>2019年3月22日</span></div>
            <div className='day-item-right'>
                <div className="title">
                    <span>图片</span>
                    <span>备注</span>
                </div>
                <div className="link-btn"><Button type="primary">院外强化治疗问诊表</Button></div>
                <div className="img-wrap">
                    <span className="img"></span>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default MedicalRecord