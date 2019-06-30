import request from '../utils/request'
const SERVICE_NAME = ''

/**
 * 上传图片
 * @param {*} data 
 */
const uploadImage = (file) => {
  return request({
    url: SERVICE_NAME + '/static/ueditor/1.4.3.3/php/controller.php?action=uploadimage',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data: file
  })
}

/**
 * 上传语音
 * @param {*} data 
 */
const uploadAudio = (file) => {
  return request({
    url: SERVICE_NAME + '/static/ueditor/1.4.3.3/php/controller.php?action=uploadvideo',
    method: 'post',
    headers: {'Content-Type':'multipart/form-data'},
    data: file
  })
}

export {
    uploadImage,
    uploadAudio
}