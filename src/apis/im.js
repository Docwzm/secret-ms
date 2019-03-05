import request from '../utils/request'
const IM_URL = '/im_service'

//登陆
export function login(appType = 20, imType = 0, userType=0, userId="dc4e9ea7b71c44d99b13d6052ed8466d", name="阳阳") {
    return request({
        url: `${IM_URL}/get_account`,
        method: "post",
        data:{
            appType,
            imType,
            userType,
            userId,
            name
        }
    })
}

//群历史记录
export function getGroupLogApi(tid, endTime = 0, count = 20) {
    return request({
        url: `${IM_URL}/get_team_msg`,
        method: "post",
        data:{
            tid,
            endTime,
            count
        }
    })
}

export function getFrendList(page=1,pageSize=20){
    return request({
      url: `patient_service/v2/query_salesman_patient_warning`,
      method: 'post',
      data: {
        dateType: 7,
        page,
        pageSize,
      },
    })
  }