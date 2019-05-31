/**
 * 过滤crf表单key（crfForm 不同课题，不同节点会有对应类似的表格）
 * @param {*} type crf表格key
 */
export const filterCrfFormType = (type) => {
    switch (type) {
        case 20:
            type = '7_';
            break;
        case 22:
        case 23:
            type = '21_';
            break;
        case 25:
            type = '7_1';
            break;
        case 26:
            type = '7_2';
            break;
        case 27:
        case 29:
            type = '7_3';
            break;
        case 28:
            type = '7_4';
            break;
        case 30:
        case 31:
        case 34:
            type = '18_2';
            break;
        case 32:
            type = '21_2';
            break;
        case 33:
            type = '22_2';
            break;
        case 35:
            type = '3_';
            break;
        default:
            type = type+ '_'
            break;
    }
    return type
}

/**
 * 获取crf表格名称
 * @param {*} type crf表格key
 */
export const getCrfNodeName = (type) => {
    let name = '';
    switch(type){
        case 0:
            name = '知情通知书';
            break;
        case 1:
            name = '入选标准';
            break;
        case 2:
            name = '人口学资料';
            break;
        case 3:
            name = '病史';
            break;
        case 4:
            name = '并发症评估';
            break;
        case 5:
            name = '生命体征';
            break;
        case 6:
            name = '其他体格检查';
            break;
        case 7:
            name = '实验室检查';
            break;
        case 8:
            name = '混合餐耐量试验';
            break;
        case 9:
            name = '心电图';
            break;
        case 10:
            name = '颈部大血管多普勒';
            break;
        case 11:
            name = '双下肢动脉彩超';
            break;
        case 12:
            name = '眼科检查';
            break;
        case 13:
            name = '踝肱动脉压指数';
            break;
        case 14:
            name = '腹部彩超';
            break;
        case 15:
            name = '强化治疗CSII 使用情况';
            break;
        case 16:
            name = '强化治疗血糖监测结果';
            break;
        case 17:
            name = '特殊事件记录';
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
            name = '其它信息记录';
            break;
        case 19:
            name = '六点血糖监测结果';
            break;
        case 20:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:                          
            name = '实验室检查';
            break;
        case 24:
            name = '辅助检查';
            break;
        case 35:
            name = '病史';
            break;
    }
    return name;
}

export function getFilterProper(data, index) {
    return data ? data.split('-')[index] : ''
}

