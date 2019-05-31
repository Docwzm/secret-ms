import React from 'react'
import { message, Icon } from 'antd'
import '../assets/styles/imageviewer.scss'

export default class ImgPreview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgArr: [],
            imgIndex: 0,
            screenHeight: 0,
            screenWidth: 0,
            ratio: 1,
            angle: 0,
            defaultWidth: 'auto',
            defaultHeight: 'auto',
            imgSrc: '',
            posTop: 0,
            posLeft: 0,
            isAlwaysCenterZoom: false, // 是否总是中心缩放
            isAlwaysShowRatioTips: false, // 是否总是显示缩放倍数信息,默认点击按钮缩放时才显示
            flags: false,
            isDraged: false,
            position: {
                x: 0,
                y: 0
            },
            nx: '',
            ny: '',
            dx: '',
            dy: '',
            xPum: '',
            yPum: ''
        }
        this.percent = 100
    }

    componentDidMount() {
        this.setState({
            screenWidth: window.screen.availWidth,
            screenHeight: window.screen.availHeight,
            ratio: 1,
            angle: 0
        }, () => {
            // this.getImgSize()
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            imgIndex: nextProps.imgIndex,
            imgArr: nextProps.imgArr,
            // imgSrc: nextProps.imgSrc,
            isAlwaysCenterZoom: nextProps.isAlwaysCenterZoom,
            isAlwaysShowRatioTips: nextProps.isAlwaysShowRatioTips
        })
    }

    // 获取预览图片的默认宽高和位置
    getImgSize = () => {
        let { ratio, isDraged, isAlwaysCenterZoom } = this.state
        let {maxWidth,maxHeight} = this.props
        let posTop = 0
        let posLeft = 0
        // 图片原始宽高
        let originWidth = this.originImgEl ? this.originImgEl.width : 0
        let originHeight = this.originImgEl ? this.originImgEl.height : 0
        // 默认最大宽高540/320
        let maxDefaultWidth = maxWidth?maxWidth:540
        let maxDefaultHeight = maxHeight?maxHeight:320
        // 默认展示宽高
        let defaultWidth = 0
        let defaultHeight = 0
        if (originWidth > maxDefaultWidth || originHeight > maxDefaultHeight) {
            if (originWidth / originHeight > maxDefaultWidth / maxDefaultHeight) {
                defaultWidth = maxDefaultWidth
                defaultHeight = Math.round(originHeight * (maxDefaultHeight / maxDefaultWidth))
                posTop = (defaultHeight * ratio / 2) * -1
                posLeft = (defaultWidth * ratio / 2) * -1
            } else {
                defaultWidth = Math.round(maxDefaultHeight * (originWidth / originHeight))
                defaultHeight = maxDefaultHeight
                posTop = (defaultHeight * ratio / 2) * -1
                posLeft = (defaultWidth * ratio / 2) * -1
            }
        } else {
            defaultWidth = originWidth
            defaultHeight = originHeight
            posTop = (defaultWidth * ratio / 2) * -1
            posLeft = (defaultHeight * ratio / 2) * -1
        }

        if (isAlwaysCenterZoom) {
            this.setState({
                posTop: posTop,
                posLeft: posLeft,
                defaultWidth: defaultWidth * ratio,
                defaultHeight: defaultHeight * ratio
            })
        } else {
            // 若拖拽改变过位置,则在缩放操作时不改变当前位置
            if (isDraged) {
                this.setState({
                    defaultWidth: defaultWidth * ratio,
                    defaultHeight: defaultHeight * ratio
                })
            } else {
                this.setState({
                    posTop: posTop,
                    posLeft: posLeft,
                    defaultWidth: defaultWidth * ratio,
                    defaultHeight: defaultHeight * ratio
                })
            }
        }
    }

    // 下载
    download = () => {
        let src = this.state.imgArr[this.state.imgIndex][1];
        var image = new Image()
        // 解决跨域 Canvas 污染问题
        image.setAttribute('crossOrigin', 'anonymous')
        image.onload = function () {
            var canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height

            var context = canvas.getContext('2d')
            context.drawImage(image, 0, 0, image.width, image.height)
            var url = canvas.toDataURL('image/png')

            // 生成一个a元素
            var a = document.createElement('a')
            // 创建一个单击事件
            var event = new MouseEvent('click')

            // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
            a.download = src.slice(src.lastIndexOf('/') + 1)
            // 将生成的URL设置为a.href属性
            a.href = url

            // 触发a的单击事件
            a.dispatchEvent(event)
        }

        image.src = src
    }

    // 放大
    scaleBig = (type = 'click') => {
        let { ratio, isAlwaysShowRatioTips } = this.state
        ratio += 0.15
        this.percent += 15
        this.setState({
            ratio: ratio
        }, () => {
            this.getImgSize()
        })
        if (isAlwaysShowRatioTips) {
            message.info(`缩放比例:${this.percent}%`, 0.2)
        } else {
            if (type === 'click') {
                message.info(`缩放比例:${this.percent}%`, 0.2)
            }
        }
    }

    // 缩小
    scaleSmall = (type = 'click') => {
        let { ratio, isAlwaysShowRatioTips } = this.state
        ratio -= 0.15
        if (ratio <= 0.1) {
            ratio = 0.1
        }
        if (this.percent - 15 > 0) {
            this.percent -= 15
        }
        this.setState({
            ratio: ratio
        }, () => {
            this.getImgSize()
        })
        if (isAlwaysShowRatioTips) {
            message.info(`缩放比例:${this.percent}%`, 0.2)
        } else {
            if (type === 'click') {
                message.info(`缩放比例:${this.percent}%`, 0.2)
            }
        }
    }

    // 滚轮缩放
    wheelScale = (e) => {
        e.preventDefault()
        if (e.deltaY > 0) {
            this.scaleBig('wheel')
        } else {
            this.scaleSmall('wheel')
        }
    }

    // 旋转
    retate = () => {
        let { angle } = this.state
        angle += 90
        this.setState({
            angle: angle
        })
    }

    // 按下获取当前数据
    mouseDown = (event) => {
        let touch
        if (event.touches) {
            touch = event.touches[0]
        } else {
            touch = event
        }
        let position = {
            x: touch.clientX,
            y: touch.clientY
        }
        this.setState({
            flags: true,
            position: position,
            dx: this.originImgEl.offsetLeft,
            dy: this.originImgEl.offsetTop
        })
    }

    mouseMove = (event) => {
        let { dx, dy, position, flags } = this.state
        if (flags) {
            event.preventDefault()
            let touch
            if (event.touches) {
                touch = event.touches[0]
            } else {
                touch = event
            }
            this.setState({
                isDraged: true,
                nx: touch.clientX - position.x,
                ny: touch.clientY - position.y,
                xPum: dx + touch.clientX - position.x,
                yPum: dy + touch.clientY - position.y
            }, () => {
                this.imgEl.style.left = this.state.xPum + 'px'
                this.imgEl.style.top = this.state.yPum + 'px'
            })
        }
    }

    mouseUp = () => {
        this.setState({
            flags: false
        })
    }

    mouseOut = () => {
        this.setState({
            flags: false
        })
    }

    // 关闭预览
    closePreview = () => {
        let { onClose } = this.props
        this.setState({
            ratio: 1,
            angle: 0,
            defaultWidth: 'auto',
            defaultHeight: 'auto',
            imgSrc: '',
            posTop: 0,
            posLeft: 0,
            flags: false,
            isDraged: false,
            position: {
                x: 0,
                y: 0
            },
            nx: '',
            ny: '',
            dx: '',
            dy: '',
            xPum: '',
            yPum: ''
        }, () => {
            this.getImgSize()
            this.percent = 100
            typeof onClose == 'function' && onClose()
        })
    }

    changePic(index) {
        if (index == -1) {
            //上一张
            if (this.state.imgIndex <= 0) {
                return;
            }
            // this.getImgSize();
            this.setState({
                angle: 0,
                imgIndex: this.state.imgIndex - 1
            })
        } else {
            //下一张
            if (this.state.imgIndex >= this.state.imgArr.length - 1) {
                return;
            }
            // this.getImgSize();
            this.setState({
                angle: 0,
                imgIndex: this.state.imgIndex + 1
            })
        }
    }


    del = (e) => {
        e.stopPropagation()
        this.props.del(this.state.imgIndex)
    }

    render() {
        const close_transform_style = {
            transform: `translate(${this.state.defaultWidth / 2}px,${-this.state.defaultHeight / 2}px)`
        }
        let { screenWidth, screenHeight, posLeft, posTop, angle, imgArr, imgIndex } = this.state
        let { visible,canDownload,canRepo,canDel } = this.props
        return imgArr.length > 0 ? (
            <div className={'preview-wrapper' + (visible ? ' show' : ' hide')} style={{ width: screenWidth, height: screenHeight }}>
                <div className='img-container'>
                    <div className="img-wrap" ref={(imgEl) => { this.imgEl = imgEl }} style={{ 'width':this.state.defaultWidth,'height':this.state.defaultHeight }}>
                        <Icon onClick={() => { this.closePreview() }} type="close" />
                        <img className='image'
                            onWheel={this.wheelScale}
                            style={{ transform: `rotate(${angle}deg)` }}
                            // onMouseDown={this.mouseDown}
                            // onMouseMove={this.mouseMove}
                            // onMouseUp={this.mouseUp}
                            // onMouseOut={this.mouseOut}
                            // draggable='false'
                            src={imgArr[imgIndex][1]} alt="预览图片" />
                    </div>
                </div>
                <img className='origin-image' src={imgArr[imgIndex][1]} onLoad={this.getImgSize} ref={(originImg) => { this.originImgEl = originImg }} alt="预览图片" />
                <div className='operate-con'>
                    <div onClick={this.changePic.bind(this, -1)} className={imgIndex==0?'operate-btn done':'operate-btn'}>
                        <Icon type="arrow-left" />
                    </div>
                    {
                        canDownload?<div onClick={this.download} className='operate-btn'>
                            <Icon type="download" />
                        </div>:null
                    }
                    {
                        canDel?<div onClick={this.del} className='operate-btn'>
                        <Icon type="delete" />
                    </div>:null
                    }
                    {/* <a href={imgArr[imgIndex]} download className='operate-btn'>
                        <i className='iconfont icon-icon-test10'></i>
                        <span>下载</span>
                    </a> */}
                    {/* <div onClick={() => { this.scaleBig('click') }} className='operate-btn'>
                        <i className='iconfont icon-icon-test33'></i>
                        <span>放大</span>
                    </div> */}
                    {
                        canRepo?<div onClick={this.retate} className='operate-btn'>
                            <Icon type="redo" />
                        </div>:null
                    }
                    {/* <div onClick={() => { this.scaleSmall('click') }} className='operate-btn'>
                        <i className='iconfont icon-icon-test35'></i>
                        <span>缩小</span>
                    </div> */}
                    <div onClick={this.changePic.bind(this, 0)} className={imgIndex==imgArr.length-1?'operate-btn done':'operate-btn'}>
                        <Icon type="arrow-right" />
                    </div>
                </div>
            </div>
        ) : null
    }
}