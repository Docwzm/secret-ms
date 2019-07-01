import React, { Component } from 'react';
import { Upload, Icon } from 'antd';
import configs from '@/configs/index'
import uuid from 'uuid'
// import ImgPreview from './imageViewer';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

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
    previewImgArray: [],
    imgPreviewVisible: false,
    currentPreviewImgIndex: 0,
  };


  handleCancel = () => {
    document.body.style.overflow = 'auto'
    this.setState({ previewVisible: false })
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    let currentPreviewImgIndex = 0;
    let previewImgArray = [];
    this.props.fileList.map((item, index) => {
      previewImgArray.push({
        src: item.url
      })
      if (item.uid == file.uid) {
        currentPreviewImgIndex = index;
      }
    })

    this.setState({
      imgPreviewVisible: true,
      previewImgArray,
      currentPreviewImgIndex
    });
  };

  handleChange = ({ fileList }) => {
    if (!this.props.disabled) {
      this.props.change(fileList)
    }
  };

  checkBefore(e) {
    e.stopPropagation()
    if (this.state.checkIndex) {
      this.setState({
        checkIndex: this.state.checkIndex - 1
      })
    }
  }

  checkAfter(e) {
    e.stopPropagation()
    if (this.state.checkIndex < this.props.fileList.length - 1) {
      this.setState({
        checkIndex: this.state.checkIndex + 1
      })
    }
  }


  del = (index) => {
    let checkIndex = index >= this.props.fileList.length - 1 ? 0 : index;
    this.props.fileList.splice(index, 1)
    if (this.props.fileList.length == 0) {
      this.handleCancel()
    } else {
      this.setState({
        checkIndex
      });
    }
    this.props.change({
      fileList: this.props.fileList
    })
  };

  render() {
    let { fileList } = this.props;
    let previewImgArr = [];
    fileList.map(item => {
      let src = item.url || item.thumbUrl;
      previewImgArr.push([src, src])
    })
    const { imgPreviewVisible, currentPreviewImgIndex, previewImgArray } = this.state;
    const action = configs.server + '/rpmhealthrecord_service/file/uploadProtectFile?requestId=' + uuid.v1().replace(/-/g, '') + '&catalog=crf_form'
    return (
      <div className="clearfix">
        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {
            !this.props.disabled ? <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div> : null
          }
        </Upload>

        <Viewer
          visible={imgPreviewVisible}
          onClose={() => { this.setState({ imgPreviewVisible: false }); }}
          images={previewImgArray}
          activeIndex={currentPreviewImgIndex}
        />

      </div>
    );
  }
}

const styles = {
  optWrap: {
    display: "flex",
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContents: 'center',
    width: '400px',
    height: '60px',
    borderRadius: '20px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '10px',
    background: 'rgba(0,0,0,0.8)'
  },
  btn: {
    display: 'block',
    cursor: 'pointer',
    textAlgin: 'center'
  },
  iconDone: {
    fontSize: '20px',
    color: '#ccc'
  },
  icon: {
    fontSize: '20px',
    color: '#fff'
  },
  imgWrap: {
    position: 'absolute',
    left: "50%",
    top: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100%',
    height: '600px',
    overflow: 'hidden'
  },
  img: {
    maxWidth: '90%',
    position: 'absolute',
    left: "50%",
    top: '50%',
    transform: 'translate(-50%,-50%)'
  },
  previewWrap: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    background: 'rgba(0,0,0,0.3)',
    zIndex: '100'
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