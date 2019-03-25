import React, { Component } from 'react';
import {Form,Upload, Icon,Modal} from 'antd'
import {formItemLayout} from '../../../utils/formItemLayout'
import '../styles/center.css'
const FormItem = Form.Item


class Certification extends Component{
    state = {
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
        previewVisible:false
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
    }

    render(){
        const {fileList,previewVisible,previewImage} = this.state

        const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">Upload</div>
            </div>
        );
        
        return(
            <Form className="user-center">
                <FormItem {...formItemLayout} label="医师执业证书">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                </FormItem>
                <FormItem {...formItemLayout} label="医师资格证书">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                </FormItem>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Form>
        )
    }
}

export default Certification