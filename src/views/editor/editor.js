import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Viewer from 'react-viewer';
import { Upload, Icon, Form, Button, message } from 'antd';
import { getBase64 } from '@/utils'
import './styles/editor.scss'
import 'react-viewer/dist/index.css';
const FormItem = Form.Item;

class Editor extends React.Component {
  state = {
    visible: false,
    currentImgArray: [],
    currentImgIndex: 0,
    bgFileList: [],
  };


  componentWillMount() {
    this.getInfo()
  }

  getInfo() {
    let bgFileList = [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ]
    this.setState({
      bgFileList
    })
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    let src = file.url || file.preview;
    this.setState({ currentImgArray: [{ src }], currentImgIndex: 0, isOpen: true, visible: true })
  }

  handleChange = ({ fileList }) => {
    console.log(fileList)
    fileList.splice(0, fileList.length - 1)
    this.setState({ bgFileList:fileList })
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      //数据校验通过后，传递到上级提交
      if(this.state.bgFileList.length==0){
        message.warn('请上传图片')
      }else{
        console.log(this.state.bgFileList)
      }
    });
  }

  handleCancel = () => {
    this.setState({
      bgFileList: []
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { currentImgArray, currentImgIndex, bgFileList } = this.state;
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    

    return (
      <div className="clearfix">
        <Form labelalign="left">
          <FormItem label="" {...formItemLayout2}>
            {
              getFieldDecorator('imageList', {
                initialValue: '',
              })(
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={bgFileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {/* {fileList.length >= 1 ? null : uploadButton} */}
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                </Upload>
              )
            }
          </FormItem>
        </Form>

        <div className="btn-wrap">
          <Button id="form-submit-btn" type="primary" disabled={this.props.disabled} onClick={this.handleSubmit}>保存</Button>
          <Button onClick={this.handleCancel}>取消</Button>
        </div>

        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); }}
          images={currentImgArray}
          activeIndex={currentImgIndex}
        />

      </div>
    );
  }
}

export default withRouter(Form.create({
  onValuesChange: (props, changedValues, allValues) => {

  }
})(Editor))