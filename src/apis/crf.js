import request from '../utils/request'
const SERVER_NAME = '/rpmprogram_service'


//获取待录入列表
export function getCrfList() {
    return request({
        url: `${SERVER_NAME}/crf/ready_fill_list`,
        method: "post",
    })
}


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
export function getCrfFormDetail({ contentId, contentNum, crfFormType }) {
    let pathName = ''
    console.log(crfFormType)
    switch (crfFormType) {
        case 2:
            pathName = 'get_demographic_crf'//人口学资料
            break;
        case 4:
            pathName = 'get_complication_crf'//并发症评估
            break;
        case 7:
            pathName = 'get_laboratory_crf'//实验室检查
            break;
        case 9:
            pathName = 'get_ecg_crf'//心电图
            break;
        case 10:
            pathName = 'get_doppler_cervical_vessel_crf'//颈部大血管多普勒
            break;
        case 11:
            pathName = 'get_doppler_lower_artery_crf'//双下肢动脉彩超
            break;
        case 13:
            pathName = 'get_abi_crf'//踝肱动脉压指数
            break;
        case 14:
            pathName = 'get_doppler_belly_crf'//腹部彩超
            break;

    }
    console.log(pathName)
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
export function setCrfForm(data, formType) {
    let pathName = ''
    switch (formType) {
        case 2:
            pathName = 'save_demographic_crf'//人口学资料
            break;
        case 4:
            pathName = 'save_complication_crf'//并发症评估
            break;
        case 7:
            pathName = 'save_laboratory_crf'//实验室检查
            break;
        case 9:
            pathName = 'save_ecg_crf'//心电图
            break;
        case 10:
            pathName = 'save_doppler_cervical_vessel_crf'//颈部大血管多普勒
            break;
        case 11:
            pathName = 'save_doppler_lower_artery_crf'//双下肢动脉彩超
            break;
        case 13:
            pathName = 'save_abi_crf'//踝肱动脉压指数
            break;
        case 14:
            pathName = 'save_doppler_belly_crf'//腹部彩超
            break;
    }
    return request({
        url: `${SERVER_NAME}/crf/${pathName}`,
        method: "post",
        data
    })
}


export function searchCrf(num) {
    return request({
        url: `${SERVER_NAME}/crf/contents_with_crf`,
        method: 'post',
        data: {
            searchText: num
        }
    })
}

//为用户追加节点
export function addProNode({
    programId,
    nodeId
}) {
    return request({
        url: `${SERVER_NAME}/program/doctor/add_user_program_node`,
        method: 'get',
        params: {
            programId,
            nodeId
        }
    })
}
