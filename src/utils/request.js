import axios from "axios"
import uuid from 'uuid'
import configs from '../configs/index'
import { message } from 'antd';

axios.defaults.withCredentials = true;
// 创建axios实例
const request = axios.create({
    baseURL: configs.server,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    },
    //withCredentials: true
})


// request拦截器
request.interceptors.request.use(
    config => {
        config.headers['requestId'] = `${uuid.v1().replace(/-/g,'')}`
        config.headers['appType'] = configs.appType
        return config
    },
    error => {
        message.error(error.message);
        Promise.reject(error)
    }
)

// respone拦截器
request.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            message.error(res.msg);
            // 50008:非法的token; 50012:其他客户端登录了;  410:Token 过期了;
            if (res.code === 401) {

            }
            return Promise.reject(res)
        } else {
            return response.data
        }
    },
    error => {
        message.error(error.message);
        return Promise.reject(error)
    }
)

export default request