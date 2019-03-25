import request from '../utils/request'
const SERVER_NAME = '/rpmprogram_service'


//获取待录入列表
export function getCrfList({page,pagesize=10}) {
    return request({
        url: `${SERVER_NAME}/crf/ready_fill_list`,
        method: "post",
        data:{
            page,
            pagesize
        }
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
        case 3:
            pathName = 'get_medical_history_crf'//病史或不良嗜好
            break;
        case 4:
            pathName = 'get_complication_crf'//并发症评估
            break;
        case 5:
            pathName = 'get_vital_sign_crf'//生命特征
            break;
        case 6:
            pathName = 'get_physical_other_crf'//其他体格检查
            break;
        case 7:
        case 20:
            pathName = 'get_laboratory_crf'//实验室检查
            break;
        case 8:
            pathName = 'get_tolerance_crf'//混合餐耐量量试验
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
        case 12:
            pathName = 'get_ophthalmology_crf'//眼科检查
            break;
        case 13:
            pathName = 'get_abi_crf'//踝肱动脉压指数
            break;
        case 14:
            pathName = 'get_doppler_belly_crf'//腹部彩超
            break;
        case 15:
            pathName = 'get_csii_crf'//CSII
            break;
        case 16:
        case 19:
            pathName = 'get_blood_sugar_crf'//血糖信息
            break;
        case 17:
            pathName = 'get_special_event_crf'//特殊事件记录
        case 18:
        case 21:
        case 22:
        case 23:
            pathName = 'get_other_report_crf'//其它信息记录
            break;

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
export function setCrfForm(data, formType) {
    let pathName = ''
    switch (formType) {
        case 2:
            pathName = 'save_demographic_crf'//人口学资料
            break;
        case 3:
            pathName = 'save_medical_history_crf'//病史或不良嗜好
            break;
        case 4:
            pathName = 'save_complication_crf'//并发症评估
            break;
        case 5:
            pathName = 'save_vital_sign_crf'//生命特征
            break;
        case 6:
            pathName = 'save_physical_other_crf'//其他体格检查
            break;
        case 7:
        case 20:
            pathName = 'save_laboratory_crf'//实验室检查
            break;
        case 8:
            pathName = 'save_tolerance_crf'//混合餐耐量量试验
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
        case 12:
            pathName = 'save_ophthalmology_crf'//眼科检查
            break;
        case 13:
            pathName = 'save_abi_crf'//踝肱动脉压指数
            break;
        case 14:
            pathName = 'save_doppler_belly_crf'//腹部彩超
            break;
        case 15:
            pathName = 'save_csii_crf'//CSII
            break;
        case 16:
        case 19:
            pathName = 'save_blood_sugar_crf'//血糖信息
            break;
        case 17:
            pathName = 'save_special_event_crf'//特殊事件记录
            break;
        case 18:
        case 21:
        case 22:
        case 23:
            pathName = 'save_other_report_crf'//其它信息记录
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
