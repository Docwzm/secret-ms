import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Viewer from 'react-viewer';
import QRCode from 'qrcode.react';
import { Upload, Icon, Form, Button, message } from 'antd';
import { getBase64 } from '@/utils'
import './styles/editor.scss'
import 'react-viewer/dist/index.css';
import { getCookie } from '../../utils';
import configs from '@/configs'
import {addBg} from '@/apis/dataCenter'
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
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
    ]
    this.setState({
      bgFileList
    })
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    let src = file.url || file.preview;
    this.setState({ currentImgArray: [{ src }], currentImgIndex: 0, isOpen: true, visible: true })
  }

  handleChange = ({ fileList }) => {
    fileList.splice(0, fileList.length - 1)
    this.setState({ bgFileList: fileList })
  }

  handleSubmit = (e) => {
    e && e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      //数据校验通过后，传递到上级提交
      if (this.state.bgFileList.length == 0) {
        message.warn('请上传图片')
      } else {
        let image_id = this.state.bgFileList[0].response.id
        addBg({
          image_id
        }).then(res => {
          console.log(res)
        })
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
    let qrCodeUrl = ''
    if (bgFileList && bgFileList.length != 0) {
      if (bgFileList[0].url) {
        qrCodeUrl = bgFileList[0].url
      } else if (bgFileList[0].response && bgFileList[0].response.url) {
        qrCodeUrl = configs.server + bgFileList[0].response.url
      }
    }
    if (qrCodeUrl) {
      qrCodeUrl = 'https://172.16.10.112:3000/#/secret/write?bg=' + qrCodeUrl
    }
    const formItemLayout2 = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

    return (
      <div className="clearfix">
        <Form labelalign="left">
          <FormItem label="背景图片上传" {...formItemLayout2}>
            {
              getFieldDecorator('imageList', {
                initialValue: '',
              })(
                <Upload
                  name="upfile"
                  action={configs.server + "/static/ueditor/1.4.3.3/php/controller.php?action=uploadimage"}
                  listType="picture-card"
                  fileList={bgFileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                // headers={headers}
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
          {
            qrCodeUrl ?
              <FormItem label="二维码链接" {...formItemLayout2}>
                <QRCode value={qrCodeUrl} />
              </FormItem> : null
          }

          <FormItem label=" " colon={false}  {...formItemLayout2}>
            <div className="btn-wrap">
              <Button id="form-submit-btn" type="primary" disabled={this.props.disabled} onClick={this.handleSubmit}>保存</Button>
              <Button onClick={this.handleCancel}>取消</Button>
            </div>
          </FormItem>


        </Form>


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