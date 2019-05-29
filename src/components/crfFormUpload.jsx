import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import configs from '../configs/index'
import uuid from 'uuid'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    checkIndex: 0,

  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    let checkIndex = 0;
    this.props.fileList.map((item,index) => {
      if(item.uid == file.uid){
        checkIndex = index;
      }
    })

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      checkIndex
    });
  };

  handleChange = ({ fileList }) => {
    this.props.change({
      fileList
    })
  };

  checkBefore(e) {
    e.stopPropagation()
    if(this.state.checkIndex){
      this.setState({
        checkIndex:this.state.checkIndex - 1
      })
    }
  }

  checkAfter(e) {
    e.stopPropagation()
    if(this.state.checkIndex<this.props.fileList.length-1){
      this.setState({
        checkIndex:this.state.checkIndex + 1
      })
    }
  }


  del = (e) => {
    e.stopPropagation()
    this.setState({
      checkIndex:this.state.checkIndex>=this.props.fileList.length-1?0:this.state.checkIndex
    })
    this.props.fileList.splice(this.state.checkIndex,1)
    this.props.change({
      fileList:this.props.fileList
    })
    if(this.props.fileList.length==0){
      this.handleCancel()
    }
  };

  beforeUpload = () => {

  }

  render() {
    let { fileList } = this.props;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const action = configs.server+'/rpmhealthrecord_service/file/uploadProtectFile?requestId='+uuid.v1().replace(/-/g, '')+'&catalog=crf_form'
    return (
      <div className="clearfix">
        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 10 ? null : uploadButton}
        </Upload>
        <div hidden={!previewVisible} style={styles.previewWrap} onClick={()=> this.setState({previewVisible:false})}>
          <div style={styles.imgWrap} onClick={e => e.stopPropagation()}>
            {
              fileList.map((item,index) => {
                return <img style={styles.img} hidden={this.state.checkIndex != index} key={item.uid} src={item.url||item.thumbUrl} />
              })
            }
          </div>
          <div style={styles.optWrap} onClick={e => e.stopPropagation()}>
            <span style={styles.btn} onClick={this.checkBefore.bind(this)}><Icon style={styles.icon} type="left" /></span>
            <span style={styles.btn} onClick={this.del.bind(this)}><Icon style={styles.icon} type="delete" /></span>
            <span style={styles.btn} onClick={this.checkAfter.bind(this)}><Icon style={styles.icon} type="right" /></span>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  optWrap:{
    display:"flex",
    justifyContent:'space-around',
    alignItems:'center',
    alignContents:'center',
    width:'400px',
    height:'60px',
    borderRadius:'20px',
    position:'absolute',
    left:'50%',
    transform:'translateX(-50%)',
    bottom:'10px',
    background:'rgba(0,0,0,0.5)'
  },
  btn:{
    display:'block',
    cursor:'pointer',
    textAlgin:'center'
  },
  icon:{
    fontSize:'20px',
  },
  imgWrap:{
    position:'absolute',
    left:"50%",
    top:'50%',
    transform:'translate(-50%,-50%)'
  },
  img:{
    position:'absolute',
    left:"50%",
    top:'50%',
    transform:'translate(-50%,-50%)'
  },
  previewWrap:{
    position:'fixed',
    width:'100%',
    height:'100%',
    left:'0',
    top:'0',
    background:'rgba(0,0,0,0.3)',
    zIndex:'100'
  },
  // mask:{
  //   position:'fixed',
  //   width:'100%',
  //   height:'100%',
  //   left:'0',
  //   top:'0'
  // }
}

export default PicturesWall