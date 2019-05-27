import moment from 'moment';


export const filterCrfFormType = (type) => {
    switch (type) {
        case 25:
            type = '7_1';
            break;
        case 26:
            type = '7_2';
            break;
        case 27:
            type = '7_3';
            break;
        case 28:
            type = '7_4';
            break;
        default:
            type = type+ '_'
            break;
    }
    return type
}

export const formNameObj = {
    0: '知情通知书',
    1: '入选标准',
    2: '人口学资料',
    3: '病史',
    4: '并发症评估',
    5: '生命体征',
    6: '其他体格检查',
    7: '实验室检查',
    8: '混合餐耐量试验',
    9: '心电图',
    10: '颈部大血管多普勒',
    11: '双下肢动脉彩超',
    12: '眼科检查',
    13: '踝肱动脉压指数',
    14: '腹部彩超',
    15: '强化治疗CSII 使用情况',
    16: '强化治疗血糖监测结果',
    17: '特殊事件记录',
    18: '其它信息记录',
    19: '六点血糖监测结果',
    20: '实验室检查',
    21: '其它信息记录',
    22: '其它信息记录',
    23: '其它信息记录',
    24: '辅助检查',
    25: '实验室检查',
    26: '实验室检查',
    27: '实验室检查',
    28: '实验室检查',
}

export function getFilterProper(data, index) {
    return data ? data.split('-')[index] : ''
}

//过滤血糖表
export function filterFormValues(values, type) {
    let arr = [];
    let filterProper = [];
    switch (type) {
        case 16:
            filterProper = ['measurementDate', 'mornBefore', 'mornAfter', 'noonBefore', 'noonAfter', 'evenBefore', 'evenAfter'];
            break;
        case 15:
            filterProper = ['measurementDate', 'basalSection', 'basalSum', 'beforeMorn', 'beforeNoon', 'beforeEven', 'beforeSum'];
            break;
    }

    for (let x in values) {
        let flag = false;
        filterProper.map(item => {
            if (x.indexOf(item) >= 0) {
                flag = true;
            }
        })
        if (flag) {
            let x_arr = x.split('_');
            let index = x_arr.length == 3 ? x_arr[2] : x_arr[1];
            let pro = x_arr.length == 3 ? x_arr[1] : x_arr[0];
            let value = values[x];
            if (!arr[index]) {
                arr[index] = {}
            }
            if (pro == 'measurementDate') {
                value = value.valueOf();
            }
            arr[index][pro] = value;
            delete values[x];
        }
    }
    return arr
}

