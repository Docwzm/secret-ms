import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

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

  checkBefore() {
    if(this.state.checkIndex){
      this.setState({
        checkIndex:this.state.checkIndex - 1
      })
    }
  }

  checkAfter() {
    if(this.state.checkIndex<this.props.fileList.length-1){
      this.setState({
        checkIndex:this.state.checkIndex + 1
      })
    }
  }


  del = (index) => {
    this.props.fileList.splice(index,1)
    this.props.change({
      fileList:this.props.fileList
    })
    if(this.props.fileList.length==0){
      this.handleCancel()
    }
  };

  render() {
    let { fileList } = this.props;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="http://sports-qa2.lifesense.com/rpmhealthrecord_service/file/uploadProtectFile?requestId=21231231ssss23&catalog=crf_form"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <div className="img-wrap">
            {
              fileList.map((item,index) => {
                return <img alt="example" hidden={this.state.checkIndex != index} key={item.uid} style={{ width: '100%' }} src={item.url} />
              })
            }
          </div>
          <div className="opt-wrap">
            <button onClick={this.checkBefore.bind(this)}>上一张</button>
            <button onClick={() => this.del(this.state.checkIndex)}>删除</button>
            <button onClick={this.checkAfter.bind(this)}>下一张</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PicturesWall