import request from '../utils/request'

//获取crf待录入列表
export function getCrfList() {
    return request({
        url: `${IM_URL}/get_account`,
        method: "post",
        data:{
            
        }
    })
}