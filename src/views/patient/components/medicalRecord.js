import React ,{Component}from 'react';
import {findMedicalRecord} from '../../../apis/relation'
import moment from 'moment'
import {Icon,Empty,Tag} from 'antd'
import ImgsViewer from 'react-images-viewer'



class MedicalRecord extends Component{
  state = {
    treatmentRecords:[],
    currentImgArray:[],
    currentImgIndex:0,
    isOpen:false
  }

  componentWillMount(){
    this.actionFindMedicalRecord({patientId:this.props.patientId,pageIndex:1,pageSize:20})
  }

  handlePreviewImg(imgList,index){
    let currentImgArray = []
    currentImgArray = imgList.map(item=>({src:item}))
    this.setState({currentImgArray,currentImgIndex:index,isOpen:true})
  }

  //上一张
  handleGotoPrevious(){
    let {currentImgIndex} = this.state
    this.setState({currentImgIndex:currentImgIndex-1})
  }

  //下一张
  handleGotoNext(){
    let {currentImgIndex} = this.state
    this.setState({currentImgIndex:currentImgIndex+1})
  }

  //关闭
  handleCloseViewer(){
    this.setState({isOpen:false})
  }

  /**
   * 诊疗记录美容
   * @param {*} data 
   */
  async actionFindMedicalRecord(data){
    let record = await findMedicalRecord(data);
    if(record && record.code === 200){
      this.setState({treatmentRecords:record.data.treatmentRecords})
    }
  }

  render(){
    const {treatmentRecords,currentImgArray,currentImgIndex,isOpen} = this.state;
    
    const recordItem = treatmentRecords.map((item,index)=>{
      let imgList = item.imageList || []
      let imgItem = imgList.map((img,index)=>{
        return(
          <span className="img" key={index} >
            <img src={img} alt="" onClick={this.handlePreviewImg.bind(this,imgList,index)}/>
            {/* <Icon className="delete-icon" type="close-circle" theme="filled" /> */}
          </span>
        )
      })
      return(
        <div className="day-item">
            <div className='day-item-left'><span>{moment(item.treatmentDate).format('YYYY年MM月DD日')}</span></div>
            <div className='day-item-right'>
                <div className="title">
                  {imgList.length > 0 ? <Tag color="#2db7f5">图片</Tag>:null}
                  {item.treatmentRemark?<Tag color="#87d068">备注</Tag>:null}
                </div>
                <div className="img-wrap">
                  {imgItem}
                </div>
                {item.treatmentRemark?<div className="remark">备注：<span>{item.treatmentRemark}</span></div>:null}
            </div>
        </div>
      )
    })
    return(
      <div className="tab3">
        {recordItem.length===0 ? <Empty style={{marginTop:"100px"}}/> : recordItem }
        <ImgsViewer 
          imgs={currentImgArray}
          currImg={currentImgIndex}
          isOpen={isOpen}
          onClickPrev={this.handleGotoPrevious.bind(this)}
          onClickNext={this.handleGotoNext.bind(this)}
          onClose={this.handleCloseViewer.bind(this)}
        />
      </div>
    )
  }
}

export default MedicalRecord