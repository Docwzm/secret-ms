import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';
import configs from '../../configs/index'
import uuid from 'uuid'
import ImgPreview from '../imageViewer';

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


  handleCancel = () => {
    document.body.style.overflow = 'auto'
    this.setState({ previewVisible: false })
  };

  handlePreview = async file => {
    document.body.style.overflow = 'hidden'
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    let checkIndex = 0;
    this.props.fileList.map((item,index) => {
      if(item.uid == file.uid){
        checkIndex = index;
      }
    })

    console.log(checkIndex)

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


  del = (index) => {
    let checkIndex = index>=this.props.fileList.length-1?0:index;
    this.props.fileList.splice(index,1)
    if(this.props.fileList.length==0){
      this.handleCancel()
    }else{
      this.setState({
        checkIndex
      });
    }
    this.props.change({
      fileList:this.props.fileList
    })
  };

  render() {
    let { fileList } = this.props;
    let previewImgArr = [];
    fileList.map(item => {
      let src = item.url||item.thumbUrl;
      previewImgArr.push([src,src])
    })
    const { previewVisible, previewImage,checkIndex } = this.state;
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

        <ImgPreview
            visible={previewVisible}  // 是否可见
            onClose={this.handleCancel} // 关闭事件
            imgIndex={checkIndex}
            imgArr={previewImgArr} // 图片url
            picKey={'currentKey'} // 下载需要的key，根据自己需要决定
            canDel={true}
            del={this.del.bind(this)}
            maxWidth={1000}
            maxHeight={600}
            isAlwaysCenterZoom={true} // 是否总是中心缩放，默认false，若为true，每次缩放图片都先将图片重置回屏幕中间
        // isAlwaysShowRatioTips={true} // 是否总提示缩放倍数信息，默认false，只在点击按钮时提示，若为true，每次缩放图片都会提示
        />

        {/* <div hidden={!previewVisible} style={styles.previewWrap} onClick={()=> this.setState({previewVisible:false})}>
          <div style={styles.imgWrap}>
            {
              fileList.map((item,index) => {
                return <img style={styles.img} hidden={checkIndex != index} key={item.uid} src={item.url||item.thumbUrl} />
              })
            }
          </div>
          <div style={styles.optWrap} onClick={e => e.stopPropagation()}>
            <span style={styles.btn} onClick={this.checkBefore.bind(this)}><Icon style={checkIndex==0?styles.iconDone:styles.icon} type="left" /></span>
            <span style={styles.btn} onClick={this.del.bind(this)}><Icon style={styles.icon} type="delete" /></span>
            <span style={styles.btn} onClick={this.checkAfter.bind(this)}><Icon style={styles.icon} type="right" /></span>
          </div>
        </div> */}
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
    background:'rgba(0,0,0,0.8)'
  },
  btn:{
    display:'block',
    cursor:'pointer',
    textAlgin:'center'
  },
  iconDone:{
    fontSize:'20px',
    color:'#ccc'
  },
  icon:{
    fontSize:'20px',
    color:'#fff'
  },
  imgWrap:{
    position:'absolute',
    left:"50%",
    top:'50%',
    transform:'translate(-50%,-50%)',
    width:'100%',
    height:'600px',
    overflow:'hidden'
  },
  img:{
    maxWidth:'90%',
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