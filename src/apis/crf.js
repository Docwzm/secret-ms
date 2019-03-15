import request from '../utils/request'
const SERVER_NAME = '/rpmprogram_service'

//获取crf表单列表
export function getCrfFormList({ contentId = 1, contentNum = 1 }) {
    return request({
        url: `${SERVER_NAME}/crf/crf_relation_list`,
        method: "post",
        data: {
            contentId,
            contentNum
        }
    })
}

//获取crf表单详情
export function getCrfFormDetail({ contentId, contentNum, fromId=1 }) {
    let pathName = ''
    switch (fromId) {
        case 1:
            pathName = 'get_demographic_crf'//人口学资料
    }
    return request({
        url: `${SERVER_NAME}/crf/${pathName}`,
        method: "post",
        data: {
            contentId,
            contentNum
        }
    })
}


//编辑/添加crf表单
export function setCrfForm(data,id) {
    let pathName = ''
    switch (id) {
        case 1:
            pathName = 'save_demographic_crf'//人口学资料
    }
    if(id){
        data.id = id;
    }
    return request({
        url: `${SERVER_NAME}/crf/${pathName}`,
        method: "post",
        data
    })
}


export function searchCrf(num){
    return request({
        url:`${SERVER_NAME}/crf/contents_with_crf`,
        method:'post',
        data:{
            searchText:num
        }
    })
}