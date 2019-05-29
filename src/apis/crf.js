import request from '../utils/request'
const SERVER_NAME = '/rpmprogram_service'


/**
 * 获取待录入列表
 * @param {*} param0 
 */
export function getCrfList({ page, pagesize = 10 }) {
    return request({
        url: `${SERVER_NAME}/crf/ready_fill_list`,
        method: "post",
        data: {
            page,
            pagesize
        }
    })
}


/**
 * 获取crf表单列表
 * @param {*} param0 
 */
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

/**
 * 获取crf表单详情
 * @param {*} param0 
 */
export function getCrfFormDetail({ contentId, contentNum, crfFormType }) {
    let pathName = ''
    switch (crfFormType) {
        case 2:
            pathName = 'get_demographic_crf'//人口学资料
            break;
        case 3:
        case 35:
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
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
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
            break;
        case 18:
        case 21:
        case 22:
        case 23:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
            pathName = 'get_other_report_crf'//其它信息记录
            break;
        case 24:
            pathName = 'get_assist_examine_crf'//辅助检查
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


/**
 * 编辑/添加crf表单
 * @param {*} data 
 * @param {*} formType 
 */
export function setCrfForm(data, formType) {
    let pathName = ''
    console.log(formType)
    switch (formType) {
        case 2:
            pathName = 'save_demographic_crf'//人口学资料
            break;
        case 3:
        case 35:
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
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
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
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
            pathName = 'save_other_report_crf'//其它信息记录
            break;
        case 24:
            pathName = 'save_assist_examine_crf'//辅助检查
            break;
    }
    return request({
        url: `${SERVER_NAME}/crf/${pathName}`,
        method: "post",
        data
    })
}

/**
 * 查询患者crf
 * @param {*} data 
 */
export function searchCrf(data) {
    return request({
        url: `${SERVER_NAME}/crf/contents_with_crf`,
        method: 'post',
        data
    })
}

/**
 * 查询患者crf
 * @param {*} data 
 */
export function searchCrfV2(data) {
    return request({
        url: `${SERVER_NAME}/crf/contents_with_crf_v2`,
        method: 'post',
        data
    })
}


/**
 * 查询crf待录入列表患者
 * @param {*} data 
 */
export function searchCrfV3(data) {
    return request({
        url: `${SERVER_NAME}/crf/contents_with_crf_v2`,
        method: 'post',
        data
    })
}


/**
 * 为用户追加节点
 * @param {*} param0 
 */
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


/**
 * 获取用药记录
 * @param {*} param0 
 */
export function getDrugRecord({
    userId
}) {
    return request({
        url: `${SERVER_NAME}/crf/list_crf_pharmacy`,
        method: 'post',
        data: {
            userId
        }
    })
}

/**
 * 保存用药记录
 * @param {*} param0 
 */
export function saveDrugRecord({
    userId,
    crfPharmacyParamList
}) {
    return request({
        url: `${SERVER_NAME}/crf/save_list_crf_pharmacy`,
        method: 'post',
        data: {
            userId,
            crfPharmacyParamList
        }
    })
}


/**
 * 获取特殊事件（ae报告和sae报告）
 * @param {*} param0 
 */
export function getCrfReport({
    userId
}) {
    return request({
        url: `${SERVER_NAME}/crf/list_crf_ae_sae`,
        method: 'post',
        data: {
            userId
        }
    })
}

/**
 * 保存特殊事件
 */
export function saveCrfReport({
    userId,
    crfAeReportList,
    crfSaeReportList
}) {
    return request({
        url: `${SERVER_NAME}/crf/save_list_crf_ae_sae`,
        method: 'post',
        data: {
            userId,
            crfAeReportList,
            crfSaeReportList
        }
    })
}

