import configs from '../configs/index';
import uuid from 'uuid'

const baseURL = configs.server;
const appType = configs.appType;
const path = 'user-service/file/upload/headimg'

const actionUpload = () => {
    return baseURL + path + `?apptype=${appType}&requestId=${uuid.v1().replace(/-/g,'')}`
}

export{
    actionUpload
} 