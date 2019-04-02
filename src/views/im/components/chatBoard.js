import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import ImgPreview from './imageViewer';
import no_patient_pic from '../images/icon-friend.png'
import Board from './board';
import ControlBox from './controlBox';
import '../styles/chatBoard.scss'

class chatBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewImg: false,
            previewImgArr: [],
            preViewImgIndex: 0,
        }
    }
    closePreiveImg = () => {
        this.setState({
            previewImg: false
        })
    }
    openPreviewImg = (UUID) => {
        const previewImgArr = [];
        let index = 0;
        let preViewImgIndex = 0;
        this.props.imInfo.historyMsg[this.props.imInfo.selToId].map(item => {
            let type = item.MsgBody[0].MsgType
            let content = item.MsgBody[0].MsgContent
            if (type == "TIMImageElem") {
                if (content.UUID == UUID) {
                    preViewImgIndex = index;
                }
                let imgArr = [];
                content.ImageInfoArray.map(img_item => {
                    let type = img_item.Type || img_item.type;
                    let img_url = img_item.URL || img_item.url;
                    if (type == 2) {
                        imgArr[0] = img_url;
                    } else if (type == 1) {
                        imgArr[1] = img_url;
                    }
                })
                previewImgArr.push(imgArr)
                index += 1;
            }
        })
        this.setState({
            previewImg: true,
            previewImgArr,
            preViewImgIndex
        })
    }
    

    render() {
        let selToId = this.props.imInfo.selToId;
        let currentFriend = this.props.imInfo.friendList ? this.props.imInfo.friendList[selToId] : {};

        return (
            <div className="chatBoard">
                <ImgPreview
                    visible={this.state.previewImg}  // 是否可见
                    onClose={this.closePreiveImg} // 关闭事件
                    imgIndex={this.state.preViewImgIndex}
                    imgArr={this.state.previewImgArr} // 图片url
                    picKey={'currentKey'} // 下载需要的key，根据自己需要决定
                    isAlwaysCenterZoom={true} // 是否总是中心缩放，默认false，若为true，每次缩放图片都先将图片重置回屏幕中间
                // isAlwaysShowRatioTips={true} // 是否总提示缩放倍数信息，默认false，只在点击按钮时提示，若为true，每次缩放图片都会提示
                />
                {
                    selToId && currentFriend ? <div className="chat-wrap">
                        <Board openPreviewImg={this.openPreviewImg}/>
                        <ControlBox />
                    </div> : <div className="no-selTo">
                            <img src={no_patient_pic} />
                            <p>请选择患者</p>
                        </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(state => {
    return {
        imInfo: state.imInfo
    }
}, actions)(chatBoard))