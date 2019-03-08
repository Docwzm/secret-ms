import React from 'react'
import ReactDOM from 'react-dom'
import { message } from 'antd'
import '../styles/imageviewer.scss'

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
            isAlwaysCenterZoom: nextProps.isAlwaysCenterZoom,
            isAlwaysShowRatioTips: nextProps.isAlwaysShowRatioTips
        })
        this.getImgSize(nextProps.imgArr)
    }

    // 获取预览图片的默认宽高和位置
    getImgSize = (imgArr) => {
        let { ratio } = this.state
        // 默认最大宽高
        let maxDefaultWidth = 540
        let maxDefaultHeight = 320

        imgArr.map(item => {
            // 图片原始宽高
            let originWidth = item[0].width;
            let originHeight = item[0].height;
            // 默认展示宽高
            let defaultWidth = 0
            let defaultHeight = 0
            if (originWidth > maxDefaultWidth || originHeight > maxDefaultHeight) {
                if (originWidth / originHeight > maxDefaultWidth / maxDefaultHeight) {
                    defaultWidth = maxDefaultWidth
                    defaultHeight = Math.round(originHeight * (maxDefaultHeight / maxDefaultWidth))
                } else {
                    defaultWidth = Math.round(maxDefaultHeight * (originWidth / originHeight))
                    defaultHeight = maxDefaultHeight
                }
            } else {
                defaultWidth = originWidth
                defaultHeight = originHeight
            }

            item[0].width = defaultWidth * ratio;
            item[0].height = defaultHeight * ratio;
            // console.log(item[0])

            return item
        })

        this.setState({
            imgArr
        })

    }

    // 下载
    download = () => {
        let src = this.state.imgArr[this.state.imgIndex][0].url;
        let randomName = Math.random() * 13223198233
        
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
            a.download = src.slice(src.lastIndexOf('/')+1) || randomName
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
            // this.getImgSize()
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
            // this.getImgSize()
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
            dx: this.imgEl.offsetLeft,
            dy: this.imgEl.offsetTop
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
            // this.getImgSize()
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
            console.log(this.state.imgArr)
            console.log(this.state.imgIndex)
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

    render() {
        let { screenWidth, screenHeight, posLeft, posTop, angle, imgArr, imgIndex } = this.state
        let { visible } = this.props
        return imgArr.length > 0 ? (
            <div className={'preview-wrapper' + (visible ? ' show' : ' hide')} style={{ width: screenWidth, height: screenHeight }}>
                <i onClick={() => { this.closePreview() }} className='iconfont icon-icon-test31'>x</i>
                <div className='img-container'>
                    <img className='image'
                        ref='preview-img'
                        width={imgArr[imgIndex][0].width}
                        height={imgArr[imgIndex][0].height}
                        // onWheel={this.wheelScale}
                        style={{ transform:`translate(-50%, -50%) rotate(${angle}deg)`}}
                        // onMouseDown={this.mouseDown}
                        // onMouseMove={this.mouseMove}
                        // onMouseUp={this.mouseUp}
                        // onMouseOut={this.mouseOut}
                        // draggable='false'
                        src={imgArr[imgIndex][0].url} alt="预览图片" />
                </div>
                {/* <img className='origin-image' src={imgArr[imgIndex][1].url} ref={(originImg) => { this.originImgEl = originImg }} alt="预览图片" /> */}
                <div className='operate-con'>
                    <div onClick={this.changePic.bind(this, -1)} className='operate-btn'>
                        <i className='iconfont icon-icon-test10'></i>
                        <span>上一张</span>
                    </div>
                    <div onClick={this.download} className='operate-btn'>
                        <i className='iconfont icon-icon-test10'></i>
                        <span>下载</span>
                    </div>
                    {/* <a href={imgArr[imgIndex]} download className='operate-btn'>
                        <i className='iconfont icon-icon-test10'></i>
                        <span>下载</span>
                    </a> */}
                    {/* <div onClick={() => { this.scaleBig('click') }} className='operate-btn'>
                        <i className='iconfont icon-icon-test33'></i>
                        <span>放大</span>
                    </div> */}
                    <div onClick={this.retate} className='operate-btn'>
                        <i className='iconfont icon-icon-test34'></i>
                        <span>旋转</span>
                    </div>
                    {/* <div onClick={() => { this.scaleSmall('click') }} className='operate-btn'>
                        <i className='iconfont icon-icon-test35'></i>
                        <span>缩小</span>
                    </div> */}
                    <div onClick={this.changePic.bind(this, 0)} className='operate-btn'>
                        <i className='iconfont icon-icon-test35'></i>
                        <span>下一张</span>
                    </div>
                </div>
            </div>
        ) : null
    }
}